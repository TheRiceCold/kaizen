import { bash } from 'lib/utils'
import options from 'options'

class TaskService extends Service {
  static {
    Service.register (
      this, {},
      {
        'active-tag': ['string', 'rw'],
        'active-project': ['string', 'rw'],
        'active-task': ['jsobject', 'rw'],
        'tags': ['jsobject', 'r'],
        'projects-in-active-tag': ['jsobject', 'r'],
        'tasks-in-active-tag-project': ['jsobject', 'r'],
        'task-data': ['jsobject', 'r'],
        'popup-state': ['string', 'rw'],
      },
    )
  }

  constructor(taskdata) {
    super()
    this._taskDataDirectory = taskdata
    this.initData()

    Utils.monitorFile(this._taskDataDirectory, () => this.initData())
  }

  _taskDataDirectory = ''
  _taskData = {}

  _activeTag = ''
  _activeProject = ''
  _activeTask = {}

  _tags = []
  _projectsInActiveTag = []
  _tasksInActiveTagProject = []

  _savedActiveTag = ''
  _savedActiveProject = ''

  _popupState = 'modify'

  get tags() { return this._tags }

  get projectsInActiveTag() {
    return this._projectsInActiveTag
  }

  set projectsInActiveTag(projects) {
    this._projectsInActiveTag = projects
    this.changed('projects-in-active-tag')
  }

  get tasksInActiveTagProject() {
    return this._tasksInActiveTagProject
  }

  set popupState(state) {
    this._popupState = state
    this.changed('popup-state')
  }

  get popupState() { return this._popupState }

  get taskData() { return this._taskData }

  get activeTag() { return this._activeTag }
  set activeTag(tag) {
    if (tag === this._activeTag) return
    this._activeTag = tag
    this._activeProject = Object.keys(this._taskData[tag])[0]
    this.changed('active-tag')
    this.changed('active-project')

    this._projectsInActiveTag = Object.keys(this._taskData[tag])
    this.changed('projects-in-active-tag')

    this.fetchTasks()
  }

  get activeProject() { return this._activeProject }

  set activeProject(project) {
    if (project === this._activeProject) return
    this._activeProject = project
    this.changed('active-project')
    this.fetchTasks()
  }

  get activeTask() { return this._activeTask }

  set activeTask(t) {
    this._activeTask = t
    this.changed('active-task')
  }

  execute(tdata) {
    let cmd = ''
    if (this._popupState === 'add') {
      cmd  = `task rc.data.location="${this._taskDataDirectory}" add `
      cmd += `tag:"${tdata.tags[0]}" project:"${tdata.project}" due:"${tdata.due}" `
      cmd += `description:"${tdata.description}" `
    } else if (this._popupState == 'modify') {
      cmd  = `task rc.data.location="${this._taskDataDirectory}" uuid:"${tdata.uuid}" mod `
      cmd += `tag:"${tdata.tags[0]}" project:"${tdata.project}" due:"${tdata.due}" `
      cmd += `description:"${tdata.description}" `
    }

    try {
      const data = bash(cmd)
      console.dir(data)
    } catch(err) {
      logError(err)
    }
  }

  delete() {
    if (!this._activeTask.uuid) return
    try {
      const data = bash`echo 'yes' | task rc.data.location="${this._taskDataDirectory}" delete ${this._activeTask.uuid}`
      console.dir(data)
    } catch(err) {
      logError(err)
    }
  }

  done() {
    if (!this._activeTask.uuid) return
    try {
      const data = bash`echo 'yes' | task rc.data.location="${this._taskDataDirectory}" done ${this._activeTask.uuid}`
      console.dir(data)
    } catch(err) {
      logError(err)
    }
  }

  undo() { }

  initData() { this.initTags() }

  initTags() {
    const cmd = `task rc.data.location='${this._taskDataDirectory}' status:pending _unique tags`
    bash(cmd).then(out => {
      const tags = out.split('\n')
      this._tags = tags

      tags.map(tag => {
        this._taskData[tag] = {}

        if (this._activeTag === '')
          this._activeTag = tag

        this.initProjects(tag)
      })
    }).catch(logError)
  }

  initProjects(tag) {
    const cmd = `task rc.data.location='${this._taskDataDirectory}' tag:'${tag}' status:pending _unique project`
    bash(cmd).then(out => {
      const projects = out.split('\n')
      projects.map(project => {
        if (project === undefined)
          project = '(none)'

        if (this._activeTag === tag && this._activeProject === '') {
          this._activeProject = project
          this.projectsInActiveTag = projects
        }

        this.fetchTasks(tag, project)
        this._taskData[tag][project] = {}
      })
    }).catch(err => logError('TaskService: initProjects: '+err))
  }

  fetchTasks(t = this._activeTag, p = this._activeProject) {
    const p_cmd = p || ''
    const cmd = `task status:pending tag:'${t}' project:'${p_cmd}' rc.data.location='${this._taskDataDirectory}' export`
    bash(cmd).then(out => {
      const tasks = JSON.parse(out)
      this._taskData[t][p].tasks = tasks

      if (t === this._activeTag && p === this._activeProject) {
        this._tasksInActiveTagProject = tasks
        this._activeTask = this._tasksInActiveTagProject[0]
        this.changed('tasks-in-active-tag-project')
        this.changed('active-task')
      }
    }).catch(err => logError('TaskService: fetchTasks: '+err))
  }
}

export default new TaskService(options.dashboard.tasksDirectory.value)
