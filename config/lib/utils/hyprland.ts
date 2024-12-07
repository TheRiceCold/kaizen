import { bind } from 'astal'
import Hyprland from 'gi://AstalHyprland'

const hypr = Hyprland.get_default()

export const focusedClient = bind(hypr, 'focusedClient')
export const focusedWorkspace = bind(hypr, 'focusedWorkspace')

export const sendBatch = (batch: string[]) => hypr.message_async(
  `[[BATCH]]/${batch
    .filter(x => !!x)
    .map(x => `keyword ${x}`)
    .join('; ')}`, (_, res) => print(hypr.message_finish(res))
)
