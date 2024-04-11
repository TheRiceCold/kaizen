import BarButton from '../BarButton'

export default BarButton({
  window: 'launcher',
  onClicked: () => App.toggleWindow('launcher'),
  child: Widget.Label({ className: 'colored', label: '' }),
})
