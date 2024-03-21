import { LabelProps } from 'types/widgets/label'

const battery = await Service.import('battery')

export default Widget.Label().hook(battery, (self: LabelProps) => {
  const { percent: p, charging, available } = battery
  self.visible = available
  self.toggleClassName('charging', charging)
  self.toggleClassName('error', p < 15 && !charging)
  self.label = (p < 10) ? ' ' : (p < 30) ? ' ' : (p < 60) ? ' ' : (p < 90) ? ' ' : ' '
})
