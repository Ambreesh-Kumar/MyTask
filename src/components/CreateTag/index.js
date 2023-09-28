import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

class CreateTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTagList: props.tagsList,
      activeTag: props.tagsList[0].optionId,
      task: '',
      taskList: [],
      activeFilterTag: null,
      isActive: false,
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {activeTag, task} = this.state
    const newTask = {id: v4(), activeTag, task}
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      activeTag: prevState.initialTagList[0].optionId,
      task: '',
    }))
  }

  onChangeTagValue = event => {
    this.setState({activeTag: event.target.value})
  }

  onChangeTaskValue = event => {
    this.setState({task: event.target.value})
  }

  onFilterTask = currentTag => {
    this.setState(prevState => {
      const newIsActive =
        prevState.activeFilterTag !== currentTag ? true : !prevState.isActive
      return {
        activeFilterTag: currentTag,
        isActive: newIsActive,
      }
    })
  }

  render() {
    const {
      initialTagList,
      activeTag,
      task,
      taskList,
      activeFilterTag,
      isActive,
    } = this.state
    const filteredList =
      activeFilterTag !== null && isActive === true
        ? taskList.filter(item => item.activeTag === activeFilterTag)
        : taskList

    return (
      <div className="bg-container">
        <div className="form-main-container">
          <h1 className="form-container-main-heading">Create a task!</h1>
          <form className="formElement" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label className="label" htmlFor="taskInput">
                Task
              </label>
              <input
                type="text"
                className="inputElement"
                id="taskInput"
                placeholder="Enter the task here"
                onChange={this.onChangeTaskValue}
                value={task}
              />
            </div>
            <div className="input-container">
              <label htmlFor="selectOption" className="label">
                Tags
              </label>
              <select
                className="selectElement"
                id="selectOption"
                value={activeTag}
                onChange={this.onChangeTagValue}
              >
                {initialTagList.map(item => (
                  <option value={item.optionId} className="tag-option">
                    {item.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-task-button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-list-main-container">
          <div className="tag-container">
            <h1 className="tag-heading">Tags</h1>
            <ul className="tag-unordered-list">
              {initialTagList.map(item => (
                <li className="tag-list" key={item.optionId}>
                  <button
                    type="button"
                    className={`tag-button ${
                      item.optionId === activeFilterTag && isActive
                        ? 'yellowBg'
                        : ''
                    }`}
                    onClick={() => this.onFilterTask(item.optionId)}
                  >
                    {item.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="task-container">
            <h1 className="task-heading">Tasks</h1>
            {filteredList.length > 0 ? (
              <ul className="task-unordered-list">
                {filteredList.map(item => {
                  const activeItem = initialTagList.find(
                    object => object.optionId === item.activeTag,
                  )
                  return (
                    <li className="task-list" key={item.id}>
                      <p className="list-task">{item.task}</p>
                      <p className="list-tag">{activeItem.displayText}</p>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="no-task-found-container">
                <p className="no-task">No Tasks Added Yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CreateTag
