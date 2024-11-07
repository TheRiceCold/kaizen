import { sh } from './cmd'

const { active, clients, messageAsync } = await Service.import('hyprland')

export const getClients = async () =>
  await messageAsync('j/clients')
    .then((out: typeof clients) => JSON.parse(out) as typeof clients)
    .catch(logError)

export const getLayouts = async () =>
  sh('hyprctl layouts')
    .then((out: string) => out.split(/\n/))
    .catch(logError)

export const getActiveClient = (type: 'class' | 'title' = 'class') =>
  active.client[type]

export const bindActiveClient = (type: 'class' | 'title', as: (t: string) => any) =>
  active.client.bind(type).as(as)

export const dispatch = (args: string) => messageAsync(`dispatch ${args}`)

export function sendBatch(batch: string[]) {
  const cmd = batch
    .filter((x) => !!x)
    .map((x) => `keyword ${x}`)
    .join('; ')
  return messageAsync(`[[BATCH]]/${cmd}`)
}
