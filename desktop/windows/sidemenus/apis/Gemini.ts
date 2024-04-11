import options from 'options'
import { bash } from 'lib/utils'
import { setupCursorHover, setupCursorHoverInfo } from 'misc/cursorhover'

const { Gtk } = imports.gi

const GeminiInfo = Widget.Box({
  vertical: true,
  children: [
    Widget.Icon({
      hpack: 'center',
      icon: 'google-gemini-symbolic',
    }),
    Widget.Label({
      wrap: true,
      label: 'Assistant (Gemini Pro)',
      justify: Gtk.Justification.CENTER,
    }),
    Widget.Box({
      hpack: 'center',
      children: [
        Widget.Label({
          wrap: true,
          label: 'Powered by Google',
          justify: Gtk.Justification.CENTER,
        }),
        Widget.Button({
          label: 'info',
          setup: setupCursorHoverInfo,
          tooltipText: 'Uses gemini-pro.\nNot affiliated, endorsed, or sponsored by Google.\n\nPrivacy: Chat messages aren\'t linked to your account,\n    but will be read by human reviewers to improve the model.',
        }),
      ]
    }),
  ]
})

export const GoogleAiInstructions = Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition,
  revealChild: true,
  // setup: (self) => self.hook(GeminiService, (self, hasKey) => {
  //   self.revealChild = (GeminiService.key.length == 0);
  // }, 'hasKey'),
  child: Widget.Button({
    child: Widget.Label({
      useMarkup: true,
      wrap: true,
      className: 'txt sidebar-chat-welcome-txt',
      justify: Gtk.Justification.CENTER,
      label: 'A Google AI API key is required\nYou can grab one <u>here</u>, then enter it below',
      // setup: self => self.set_markup("This is a <a href=\"https://www.github.com\">test link</a>")
    }),
    setup: setupCursorHover,
    onClicked: () => bash`xdg-open https://makersuite.google.com/app/apikey &`
  })
})

export default Widget.Box({
  vpack: 'center',
  vertical: true,
  children: [
    GeminiInfo,
    GoogleAiInstructions,
    // GeminiSettings(),
  ]
})
