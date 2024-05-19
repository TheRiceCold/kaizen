import AppButton from './AppButton'

import options from 'options'
import { sh, getAllFiles, searchIcons } from 'lib/utils'

const { dock } = options.popups
const apps = await Service.import('applications')
const hyprland = await Service.import('hyprland')

const focus = ({ address }) =>
  sh(`hyprctl dispatch focuswindow address:${address}`).catch(print)

export default Widget.Box({
  homogeneous: true,
  className: 'dock-apps',
  children: dock.pinnedApps
    .map(term => ({ app: apps.query(term)?.[0], term }))
    .filter(({ app }) => app)
    .map(({ app, term = true }) => {
      const iconFiles = dock.icons.searchPaths.map(e => getAllFiles(e)).flat(1)

      const newButton = AppButton({
        tooltipText: app.name,
        onClicked() {
          for (const client of hyprland.clients)
            if (client.class.toLowerCase().includes(term))
              return focus(client)

          app.launch()
        },
        onMiddleClick: () => app.launch(),
        icon: dock.searchPinnedAppIcons ? searchIcons(app.name, iconFiles) : app.icon_name,
        setup(self) {
          self.revealChild = true
          self.hook(hyprland, () => {
            const running = hyprland.clients.find(c => c.class.toLowerCase().includes(term)) || false

            self.toggleClassName('notrunning', !running)
            self.toggleClassName('focused', hyprland.active.client.address == running.address)
            self.setTooltipText(running ? running.title : app.name)
          }, 'notify::clients')
        },
      })
      newButton.revealChild = true
      return newButton
    }),
})
