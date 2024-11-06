import WindowMenu from 'desktop/dropdowns/window'
import BarButton from '../../BarButton'

import options from 'options'

const { active } = await Service.import('hyprland')

export default (num: number) =>
  Widget.Box({ className: 'client' },
    Widget.Label().bind(
      'label', active.client, 'class',
      (c: string) => c === '' ? num.toString() : `${num}:`),
    BarButton({
      onClicked: WindowMenu,
      label: active.bind('client').as((client) => {
        const clientSub: string[] = options.statusbar.clientSubs.value
          .find((name: string) => name.startsWith(client.class + ':'))

        if (clientSub) {
          const [, subName] = clientSub.split(':')
          return subName
        }

        return client.title === 'Settings' ? client.title
          : client.title === 'com.github.Aylur.ags'
            ? 'Inspect' : client.class
      }),
      visible: active.bind('client').as(({ title, class: c }) => !!title && !!c),
    }),
  )
