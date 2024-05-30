import screenTools from 'service/screen'
import powermenu from 'service/powermenu'
import Annotation from 'service/annotation'

import { sh } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const Item = (label, onActivate) => Widget.MenuItem({
  onActivate,
  cursor: 'pointer',
  child: Widget.Box([
    Widget.Label(label),
  ]),
})

export default event => {
  return Widget.Menu({
    children: [
      Item('Refresh', () => sh('pkill ags & ags')),
      Widget.MenuItem({
        child: Widget.Label('Open '),
        submenu: Widget.Menu({
          children: [
            Item('Terminal', () => sh('foot')),
            Item('Browser', () => sh('firefox')),
            Item('Files', () => sh('nautilus')),
            Item('Dashboard', () => App.openWindow('dashboard')),
            Item('Shortcuts', () => App.openWindow('shortcuts')),
          ],
        }),
      }),
      Widget.MenuItem({
        child: Widget.Label('Tools '),
        submenu: Widget.Menu({
          children: [
            Item('Draw', () => Annotation.start()),
            Item('Zoom', () => { }),
            Item('Color', () => toggleWidget('color')),
            Widget.MenuItem({
              child: Widget.Label('Recorder'),
              submenu: Widget.Menu({
                children: [
                  Item('Region', () => screenTools.recorder()),
                  Item('Fullscreen', () => screenTools.recorder('fullscreen')),
                  Item('Region | Audio', () => screenTools.recorder()), // TODO:
                  Item('Fullscreen | Audio', () => screenTools.recorder('fullscreen')), // TODO:
                ]
              })
            }),
            Widget.MenuItem({
              child: Widget.Label('Screenshot'),
              submenu: Widget.Menu({
                children: [
                  Item('Fullscreen', () => screenTools.screenshot()),
                  Item('Region', () => screenTools.screenshot(false)),
                ]
              })
            }),
            Item('Keyboard', () => toggleWidget('keyboard')),
          ],
        }),
      }),
      Widget.MenuItem({
        child: Widget.Label('Session '),
        submenu: Widget.Menu({
          className: 'submenu',
          children: [
            Item('Lock', () => { }),
            Item('Sleep', () => powermenu.action('sleep')),
            Item('Reboot', () => powermenu.action('reboot')),
            Item('Log Out', () => powermenu.action('logout')),
            Item('Shutdown', () => powermenu.action('shutdown')),
          ],
        }),
      }),
    ]
  }).popup_at_pointer(event)
}
