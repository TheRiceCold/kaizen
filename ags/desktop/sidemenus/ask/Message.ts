// import GtkSource from 'gi://GtkSource?version=3.0'
import md2pango from 'misc/md2pango'

import { ButtonLabel, VBox } from 'widgets'

import options from 'options'
import { sh, bash } from 'lib/utils'

const { Gio, GLib, Gtk, GtkSource } = imports.gi
const LATEX_DIR = `${GLib.get_user_cache_dir()}/ags/media/latex`
const USERNAME = GLib.get_user_name()

function loadCustomColorScheme(filePath) {
  const file = Gio.File.new_for_path(filePath)
  const [success] = file.load_contents(null)

  if (!success) {
    logError('Failed to load the XML file.')
    return
  }

  const schemeManager = GtkSource.StyleSchemeManager.get_default()
  schemeManager.append_search_path(file.get_parent().get_path())
}
loadCustomColorScheme(App.configDir + '/assets/themes/sourceviewtheme.xml')

function substituteLang(str) {
  const subs = [
    { from: 'bash', to: 'sh' },
    { from: 'javascript', to: 'js' },
  ]
  for (const { from, to } of subs)
    if (from === str) return to
  return str
}

function HighlightedCode(content, lang) {
  const buffer = new GtkSource.Buffer()
  const langManager = GtkSource.LanguageManager.get_default()
  const displayLang = langManager.get_language(substituteLang(lang))

  if (displayLang)
    buffer.set_language(displayLang)

  buffer.set_text(content, -1)

  const schemeManager = GtkSource.StyleSchemeManager.get_default()
  buffer.set_style_scheme(schemeManager.get_scheme('custom'))

  return new GtkSource.View({ buffer, wrap_mode: Gtk.WrapMode.NONE })
}

const TextBlock = (content = '') => Widget.Label({
  xalign: 0,
  wrap: true,
  hpack: 'fill',
  label: content,
  useMarkup: true,
  selectable: true,
  className: 'chat-txtblock chat-txt',
})

bash`rm -rf ${LATEX_DIR}/*`.then(() => bash`mkdir -p ${LATEX_DIR}`).catch(logError)

const Latex = (content = '') => {
  const latexViewArea = Widget.Box({
    attribute: {
      async render(self, text) {
        if (text.length == 0) return
        const styleContext = self.get_style_context()
        const fontSize = styleContext.get_property('font-size', Gtk.StateFlags.NORMAL)

        const timeSinceEpoch = Date.now()
        const fileName = `${timeSinceEpoch}.tex`
        const outFileName = `${timeSinceEpoch}-symbolic.svg`
        const outIconName = `${timeSinceEpoch}-symbolic`
        const scriptFileName = `${timeSinceEpoch}-render.sh`
        const filePath = `${LATEX_DIR}/${fileName}`
        const outFilePath = `${LATEX_DIR}/${outFileName}`
        const scriptFilePath = `${LATEX_DIR}/${scriptFileName}`

        Utils.writeFile(text, filePath).catch(print)
        // Since MicroTex doesn't support file path input properly, we gotta cat it
        // And escaping such a command is a fucking pain so I decided to just generate a script
        // Note: MicroTex doesn't support `&=`
        // You can add this line in the middle for debugging: echo "$text" > ${filePath}.tmp
        const renderScript = `#!/usr/bin/env bash
text=$(cat ${filePath} | sed 's/$/ \\\\\\\\/g' | sed 's/&=/=/g')
LaTeX -headless -input="$text" -output=${outFilePath} -textsize=${fontSize * 1.1} -padding=0 -maxwidth=${latexViewArea.get_allocated_width() * 0.85}
sed -i 's/fill="rgb(0%, 0%, 0%)"/style="fill:#000000"/g' ${outFilePath}
sed -i 's/stroke="rgb(0%, 0%, 0%)"/stroke="#ffffff"/g' ${outFilePath}
`
        Utils.writeFile(renderScript, scriptFilePath).catch(print)
        sh(`chmod a+x ${scriptFilePath}`)
        Utils.timeout(100, () => {
          sh(`bash ${scriptFilePath}`)
          Gtk.IconTheme.get_default().append_search_path(LATEX_DIR)

          self.child?.destroy()
          self.child = Gtk.Image.new_from_icon_name(outIconName, 0)
        })
      }
    },
    setup(self) { self.attribute.render(self, content).catch(print) }
  })

  return Widget.Box({
    className: 'chat-latex',
    attribute: {
      updateText(text) {
        latexViewArea.attribute.render(latexViewArea, text).catch(logError)
      }
    },
    child: Widget.Scrollable({
      vscroll: 'never',
      hscroll: 'automatic',
      child: latexViewArea
    })
  })
}

function CodeBlock(content = '', lang = 'txt') {
  if (lang === 'tex' || lang === 'latex')
    return Latex(content)

  const SourceView = HighlightedCode(content, lang)

  const Topbar = Widget.Box({ className: 'topbar' },
    Widget.Label({ xalign: 0, label: lang, hexpand: true }),
    ButtonLabel('󰆏', () => {
      const buffer = SourceView.get_buffer()
      const copyContent = buffer.get_text(buffer.get_start_iter(), buffer.get_end_iter(), false)
      sh('wl-copy ' + copyContent)
    }, { vpack: 'center' })
  )

  return VBox({
    className: 'chat-codeblock',
    attribute: {
      updateText(text: string) {
        SourceView.get_buffer().set_text(text, -1)
      }
    },
    children: [
      Topbar,
      Widget.Box(
        { className: 'code', homogeneous: true },
        Widget.Scrollable({ vscroll: 'never' }, SourceView)
      )
    ]
  })
}

const MessageContent = (content) => {
  const contentBox = VBox({
    attribute: {
      fullUpdate(self, content, useCursor = false) {
        // Clear and add first text widget
        const children = contentBox.get_children()
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          child.destroy()
        }
        contentBox.add(TextBlock())
        // Loop lines. Put normal text in markdown parser
        // and put code into code highlighter (TODO)
        const lines = content.split('\n')
        let lastProcessed = 0
        let inCode = false
        for (const [index, line] of lines.entries()) {
          // Code blocks
          const codeBlockRegex = /^\s*```([a-zA-Z0-9]+)?\n?/
          if (codeBlockRegex.test(line)) {
            const kids = self.get_children()
            const lastLabel = kids[kids.length - 1]
            const blockContent = lines.slice(lastProcessed, index).join('\n')

            if (!inCode) {
              lastLabel.label = md2pango(blockContent)
              contentBox.add(CodeBlock('', codeBlockRegex.exec(line)[1]))
            }
            else {
              lastLabel.attribute.updateText(blockContent)
              contentBox.add(TextBlock())
            }

            lastProcessed = index + 1
            inCode = !inCode
          }
          // Breaks
          const dividerRegex = /^\s*---/
          if (!inCode && dividerRegex.test(line)) {
            const kids = self.get_children()
            const lastLabel = kids[kids.length - 1]
            const blockContent = lines.slice(lastProcessed, index).join('\n')
            lastLabel.label = md2pango(blockContent)
            contentBox.add(TextBlock())
            lastProcessed = index + 1
          }
        }
        if (lastProcessed < lines.length) {
          const kids = self.get_children()
          const lastLabel = kids[kids.length - 1]
          const blockContent = lines.slice(lastProcessed, lines.length).join('\n')
          if (!inCode)
            lastLabel.label = `${md2pango(blockContent)}${useCursor ? options.ai.writingCursor : ''}`
          else
            lastLabel.attribute.updateText(blockContent)
        }
        contentBox.show_all()
      }
    }
  })

  contentBox.attribute.fullUpdate(contentBox, content, false)
  return contentBox
}

export const ChatMessage = (message, modelName = 'Model') => {
  const TextSkeleton = (extraClassName = '') => Widget.Box({
    classNames: ['chat-message-skeletonline', extraClassName]
  })

  const messageContentBox = MessageContent(message.content)
  const messageLoadingSkeleton = VBox(Array.from({ length: 3 }, (_, id) => TextSkeleton(`chat-message-skeletonline-offset${id}`)))

  const messageArea = Widget.Stack({
    homogeneous: message.role !== 'user',
    transition: 'crossfade',
    transitionDuration: options.transition,
    children: {
      thinking: messageLoadingSkeleton,
      message: messageContentBox,
    },
    shown: message.thinking ? 'thinking' : 'message',
  })

  return Widget.Box({ className: 'chat-message' },
    VBox([
      Widget.Label({
        xalign: 0,
        wrap: true,
        hpack: 'start',
        useMarkup: true,
        label: (message.role == 'user' ? USERNAME : modelName),
        className: `chat-name chat-name-${message.role == 'user' ? 'user' : 'bot'}`,
      }), messageArea
    ])
      .hook(message, () => messageArea.shown = message.thinking ? 'thinking' : 'message', 'notify::thinking')
      .hook(message, () => messageContentBox.attribute.fullUpdate(messageContentBox, message.content, message.role != 'user'), 'notify::content')
      .hook(message, () => messageContentBox.attribute.fullUpdate(messageContentBox, message.content, false), 'notify::done')
  )
}

export const SystemMessage = (content, commandName: string) => Widget.Box(
  { className: 'chat-message' },
  VBox([
    Widget.Label({
      xalign: 0,
      wrap: true,
      hpack: 'start',
      label: `System  •  ${commandName}`,
    }), MessageContent(content)
  ])
)
