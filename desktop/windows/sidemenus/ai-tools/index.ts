import GPTView from './gpt/View'
import GPTSendMessage from './gpt/SendMessage'

import GeminiView from './gemini/View'
import GeminiSendMessage from './gemini/SendMessage'

import Textbox  from './Textbox'
import MenuRevealer from '../MenuRevealer'

import { setupCursorHover } from 'misc/cursorhover'

export const currentApi = Variable('gemini')

export const APIS = {
  gemini: {
    contentWidget: GeminiView,
    name: 'Assistant (Gemini Pro)',
    placeholderText: 'Message Gemini...',
    tabIcon: Widget.Icon({ hpack: 'center', icon: 'google-gemini-symbolic' }),
  },
  gpt: {
    contentWidget: GPTView,
    name: 'Assistant (GPTs)',
    tabIcon: Widget.Icon({ hpack: 'center', icon: 'openai-symbolic' }),
    placeholderText: 'Message the model...',
  },
}

const CommandButton = (command: string) => Widget.Button({
  label: command,
  attribute: { command },
  setup: setupCursorHover,
  className: 'sidebar-chat-chip sidebar-chat-chip-action',
}).hook(currentApi, self => {
  const cmd = self.attribute.command
  self.onClicked = () => (APIS[currentApi.value] === 0) 
    ? GeminiSendMessage(cmd) : GPTSendMessage(cmd)
})

const Content = Widget.Box(
  { vertical: true },
  Widget.Box(
    { hpack: 'center' },
    Widget.Button({
      setup: setupCursorHover,
      tooltipText: 'Assistant (Gemini Pro)',
      child: Widget.Icon('google-gemini-symbolic'),
    }),
    Widget.Button({
      setup: setupCursorHover,
      tooltipText: 'Assistant (GPTs)',
      child: Widget.Icon('openai-symbolic'),
    })
  ),
  Widget.Stack({
    transition: 'slide_left_right',
    children: { gemini: GeminiView, gpt: GPTView }
  })
)

const Commands = Widget.Box([
  Widget.Box({ hexpand: true }),
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
])

export default MenuRevealer('ai-tools', [Content, Commands, Textbox])
