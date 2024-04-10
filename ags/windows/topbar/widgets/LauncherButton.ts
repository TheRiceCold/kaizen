import BarButton from '../BarButton'
import options from 'options'

const { icon, label, action } = options.bar.launcher

export default BarButton({
  window: 'launcher',
  onClicked: action.bind(),
  child: Widget.Box([
    Widget.Icon({
      className: icon.colored.bind().as(c => c ? 'colored' : ''),
      visible: icon.icon.bind().as(v => !!v),
      icon: icon.icon.bind(),
    }),
    Widget.Label({
      className: label.colored.bind().as(c => c ? 'colored' : ''),
      visible: label.label.bind().as(v => !!v),
      label: label.label.bind(),
    }),
  ]),
})
