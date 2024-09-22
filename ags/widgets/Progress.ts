import { type CircularProgressProps } from 'types/widgets/circularprogress'

const { CircularProgress, Icon } = Widget

export const CircularProgressIcon = (
  props: CircularProgressProps,
  icon: string,
) => CircularProgress({ startAt: 0.75, ...props }, Icon({ icon }))
