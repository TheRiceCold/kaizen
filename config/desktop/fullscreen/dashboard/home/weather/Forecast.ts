import options from 'options'
import Hourly from './Hourly'
import Daily from './Daily'

export const currentDay = Variable(0)

export default Widget.Stack({
  className: 'forecast',
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: { daily: Daily(currentDay), hourly: Hourly(currentDay) },
})
