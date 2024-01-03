import { Widget, App, Utils } from '../../../../../imports.js'
import { ChatGPT } from '../../../../../services/main.js'
import icons from '../../../../../icons.js'
import Keys from '../../../../../keys.js'
import { state as QSState } from '../../main.js'

import WebKit2 from 'gi://WebKit2?version=4.1'
import { Marked } from '../../../../../node_modules/marked/lib/marked.esm.js'
import { markedHighlight } from '../../../../../node_modules/marked-highlight/src/index.js'
//highlightjs requires some modifications to work with gjs, mainly just how it's exported
import hljs from './highlightjs/lib/index.js'

const { Gtk, Gdk } = imports.gi

const parser = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, {language}).value
    }
  })
)
const renderer = {
  code(code, language) {
    language ||= 'plaintext'
    const encoded = encodeURIComponent(code)
    return `
      <div class="code">
        <div class="code-header"><span data-language="${language}">${language}</span><button onClick="copyCode(this, '${encoded}')">Copy</button></div>
        <pre><code>${code}</code></pre>
      </div>`
  }
}

parser.use({renderer})

const WebView = Widget.subclass(WebKit2.WebView)

const styleString = Utils.readFile(`${App.configDir}/highlight.css`)
const stylesheet = new WebKit2.UserStyleSheet(
  styleString, 0, 0, null, null)

/**
 * @param {import('modules/chatGPT/AIService').ChatGPTMessage} msg
 * @param {Widget.Scrollable} scrollable
 */
const MessageContent = (msg, scrollable) => {
  const view = WebView({hexpand: true})
    .hook(msg, (/** @type WebKit2.WebView */view) => {
      const content = `<script>
      function copyCode(button, encodedCode) {
        const decodedCode = decodeURIComponent(encodedCode);
        const tempElement = document.createElement('pre');
        tempElement.innerHTML = decodedCode;
        navigator.clipboard.writeText(tempElement.innerText);
        button.innerText = 'Copied';
        setTimeout(() => button.innerText = 'Copy', 2000);
      }</script>` + parser.parse(msg.content)
      view.load_html(content, 'file://')
    }, 'notify::content')
    .on('load-changed', /** @param {WebKit2.WebView} view, @param {WebKit2.LoadEvent} event*/(view, event) => {
      if (event === 3) {
        view.evaluate_javascript('document.body.scrollHeight', -1, null, null, null, (view, result) => {
          const height = view.evaluate_javascript_finish(result)?.to_int32() || -1
          view.get_parent().css = `min-height: ${height}px;`
          // @ts-ignore
          const adjustment = scrollable.get_vadjustment()
          adjustment.set_value(adjustment.get_upper() - adjustment.get_page_size())
        })
      }
    })
    // HACK: evil way to disable context menu
    .on('context-menu', (view, menu) => {
      menu.remove_all()
    }).on('decide-policy', (view, decision, type) => {
      if(type != 0) {
        decision.ignore()
        return
      }
      const uri = decision.get_request().get_uri()
      if (uri === 'file:///') {
        decision.use()
        return
      }
      decision.ignore()
      Utils.execAsync(['xdg-open', uri])
    })
  view.get_settings().set_javascript_can_access_clipboard(true)
  view.get_settings().set_enable_write_console_messages_to_stdout(true)
  view.get_user_content_manager().add_style_sheet(stylesheet)
  return Utils.Box({ css: 'padding: 1px;', children: [view] })
}

const Message = (msg, scrollable) => Widget.Box({
  class_name: `ai-message ${msg.role}`,
  vertical: true,
  children: [
    Widget.Label({
      label: Keys[msg.role] || msg.role,
      xalign: 0,
      class_name: `ai-role ${msg.role}`,
      hexpand: true,
      wrap: true,
    }),
    MessageContent(msg, scrollable),
  ]
})

export default () => {
  const box = Widget.Box({
    class_name: 'ai-container',
    vertical: true,
    children: [
      Widget.Scrollable({
        class_name: 'ai-message-list',
        hscroll: 'never',
        vscroll: 'always',
        vexpand: true,
        setup: self => {
          const viewport = self.child
          //prevent jump to the top of clicked element
          // @ts-ignore
          viewport.set_focus_vadjustment(new Gtk.Adjustment(undefined))
        },
        child: Widget.Box({ vertical: true })
          .hook(ChatGPT, (box, idx) => {
            const msg = ChatGPT.messages[idx]
            if (!msg) return
            const msgWidget = Message(msg, box.get_parent())
            box.add(msgWidget)
          }, 'newMsg')
          .hook(ChatGPT, box => {
            box.children = []
          }, 'clear')
      }),
      Widget.Box({
        spacing: 5,
        className: 'ai-entry-box',
        children: [
          Widget.Entry({
            className: 'ai-entry',
            placeholder_text: 'Ask ChatGPT',
            onAccept: (entry) => {
              if (!entry || !entry.text || entry.text.length == 0) return
              if(entry.text.startsWith('/system'))
                ChatGPT.setSystemMessage(entry.text.substring(7))
              else ChatGPT.send(entry.text)
              entry.text = ''
            },
            hexpand: true,
          })
            .on('key-press-event', (entry, event) => {
              const keyval = event.get_keyval()[1]
              if (
                (keyval === Gdk.KEY_c)
                && ((event.get_state()[1]) & Gdk.ModifierType.CONTROL_MASK) > 0) {
                ChatGPT.clear()
              }
            })
            .hook(QSState, entry => {
              if (QSState.value === 'chatgpt') entry.grab_focus()
            })
            .hook(App, (entry, window, visible) => {
              if (window === 'sideright' && visible && QSState.value === 'chatgpt') entry.grab_focus()
            }),
          Widget.Button({
            className: 'ai-send-button',
            onClicked: btn => {
              // @ts-ignore
              const entry = btn.get_parent().children[0]
              ChatGPT.send(entry.text)
              entry.text = ''
            },
            child: Widget.Icon(icons.ui.send),
          }),
        ]
      }),
    ],
  })
  return box
}
