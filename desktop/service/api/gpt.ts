import options from 'options'
import { fileExists } from 'lib/utils'
import { initMessages, providers } from 'data/chatgpt'

const { Gio, GLib, Soup } = imports.gi

// We're using many models to not be restricted to 3 messages per minute.
// The whole chat will be sent every request anyway.
Utils.exec(`mkdir -p ${GLib.get_user_cache_dir()}/ags/user/ai`)
const CHAT_MODELS = ['gpt-3.5-turbo-1106', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-0613']

class GPTMessage extends Service {
  static {
    Service.register(this,
      { 'delta': ['string'] },
      {
        'content': ['string'],
        'thinking': ['boolean'],
        'done': ['boolean'],
      })
  }

  _role = ''
  _content = ''
  _thinking
  _done = false

  constructor(role, content, thinking = true, done = false) {
    super()
    this._role = role
    this._content = content
    this._thinking = thinking
    this._done = done
  }

  get done() { return this._done }
  set done(isDone) { this._done = isDone; this.notify('done') }

  get role() { return this._role }
  set role(role) { this._role = role; this.emit('changed') }

  get content() { return this._content }
  set content(content) {
    this._content = content
    this.notify('content')
    this.emit('changed')
  }

  get label() { return this._parserState.parsed + this._parserState.stack.join('') }

  get thinking() { return this._thinking }
  set thinking(value) {
    this._thinking = value
    this.notify('thinking')
    this.emit('changed')
  }

  addDelta(delta) {
    if (this.thinking) {
      this.thinking = false
      this.content = delta
    }
    else
      this.content += delta
    this.emit('delta', delta)
  }
}

class GPTService extends Service {
  static {
    Service.register(this, {
      initialized: [],
      clear: [],
      newMsg: ['int'],
      hasKey: ['boolean'],
      providerChanged: [],
    })
  }

  _assistantPrompt = true
  _requestCount = 0
  _temperature = options.ai.defaultTemperature.value
  _currentProvider = options.ai.defaultGPTProvider.value
  _messages = []
  _modelIndex = 0
  _key = ''
  _key_file_location = `${GLib.get_user_cache_dir()}/ags/user/ai/${providers[this._currentProvider]['key_file']}`
  _url = GLib.Uri.parse(providers[this._currentProvider]['base_url'], GLib.UriFlags.NONE)

  _decoder = new TextDecoder()

  _initChecks() {
    this._key_file_location = `${GLib.get_user_cache_dir()}/ags/user/ai/${providers[this._currentProvider]['key_file']}`
    if (fileExists(this._key_file_location)) this._key = Utils.readFile(this._key_file_location).trim()
    else this.emit('hasKey', false)
    this._url = GLib.Uri.parse(providers[this._currentProvider]['base_url'], GLib.UriFlags.NONE)
  }

  constructor() {
    super()
    this._initChecks()

    if (this._assistantPrompt) this._messages = [...initMessages]
    else this._messages = []

    this.emit('initialized')
  }

  get modelName() { return CHAT_MODELS[this._modelIndex] }
  get getKeyUrl() { return providers[this._currentProvider]['key_get_url'] }
  get providerID() { return this._currentProvider }
  set providerID(value) {
    this._currentProvider = value
    this.emit('providerChanged')
    this._initChecks()
  }
  get providers() { return providers }

  get keyPath() { return this._key_file_location }
  get key() { return this._key }
  set key(keyValue) {
    this._key = keyValue
    Utils.writeFile(this._key, this._key_file_location)
      .then(this.emit('hasKey', true))
      .catch(print)
  }

  get temperature() { return this._temperature }
  set temperature(value) { this._temperature = value }

  get messages() { return this._messages }
  get lastMessage() { return this._messages[this._messages.length - 1] }

  clear() {
    if (this._assistantPrompt)
      this._messages = [...initMessages]
    else
      this._messages = []
    this.emit('clear')
  }

  get assistantPrompt() { return this._assistantPrompt }
  set assistantPrompt(value) {
    this._assistantPrompt = value
    if (value) this._messages = [...initMessages]
    else this._messages = []
  }

  readResponse(stream, aiResponse) {
    aiResponse.thinking = false
    stream.read_line_async(0, null, (stream, res) => {
      if (!stream) return
      const [bytes] = stream.read_line_finish(res)
      const line = this._decoder.decode(bytes)
      if (line && line != '') {
        const data = line.substr(6)
        if (data == '[DONE]') return
        try {
          const result = JSON.parse(data)
          if (result.choices[0].finish_reason === 'stop') {
            aiResponse.done = true
            return
          }
          aiResponse.addDelta(result.choices[0].delta.content)
          // print(result.choices[0])
        }
        catch {
          aiResponse.addDelta(line + '\n')
        }
      }
      this.readResponse(stream, aiResponse)
    })
  }

  addMessage(role, message) {
    this._messages.push(new GPTMessage(role, message))
    this.emit('newMsg', this._messages.length - 1)
  }

  send(msg) {
    this._messages.push(new GPTMessage('user', msg, false, true))
    this.emit('newMsg', this._messages.length - 1)
    const aiResponse = new GPTMessage('assistant', 'thinking...', true, false)

    const body = {
      model: CHAT_MODELS[this._modelIndex],
      messages: this._messages.map(msg => {
        const m = { 
          role: msg.role, 
          content: msg.content 
        }
        return m
      }),
      temperature: this._temperature,
      // temperature: 2, // <- Nuts
      stream: true,
    }

    const proxyResolver = new Gio.SimpleProxyResolver({ 'default-proxy': options.ai.proxyUrl.value })
    const session = new Soup.Session({ 'proxy-resolver': proxyResolver })
    const message = new Soup.Message({ method: 'POST', uri: this._url })
    message.request_headers.append('Authorization', `Bearer ${this._key}`)
    message.set_request_body_from_bytes('application/json', new GLib.Bytes(JSON.stringify(body)))

    session.send_async(message, GLib.DEFAULT_PRIORITY, null, (_, result) => {
      const stream = session.send_finish(result)
      this.readResponse(new Gio.DataInputStream({
        close_base_stream: true,
        base_stream: stream
      }), aiResponse)
    })
    this._messages.push(aiResponse)
    this.emit('newMsg', this._messages.length - 1)
  }
}

export default new GPTService()
