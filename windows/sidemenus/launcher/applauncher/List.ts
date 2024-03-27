import AppItem from './AppItem'

const apps = await Service.import('applications')
const { query } = apps

const applist = Variable(query(''))

const SeparatedAppItem = (
  app: Parameters<typeof AppItem>[0]
) => Widget.Revealer(
  { attribute: { app } },
  Widget.Box(
    { vertical: true },
    Widget.Separator(),
    AppItem(app),
  ),
)

const List = Widget.Box({
  vertical: true,
  children: applist.bind().as(list => list.map(SeparatedAppItem)),
})

List.hook(apps, () => applist.value = query(''), 'notify::frequents')

export default List
