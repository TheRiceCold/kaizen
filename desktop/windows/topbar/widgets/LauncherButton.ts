import BarButton from '../BarButton'

export default BarButton({
  window: 'launcher',
  child: Widget.Label({ label: '' }),
  onClicked() { App.toggleWindow('launcher') },
})
