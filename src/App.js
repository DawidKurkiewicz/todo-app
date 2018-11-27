import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton'
const API_URL = 'https://dawid-kurkiewicz.firebaseio.com'

class App extends Component {

  state = {
    tasks: [],
    taskName: ''
  }

  loadData() {
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          this.setState({ tasks: [] })
          return;
        }
        const array = Object.entries(data)
        const taskList = array.map(([id, values]) => {
          values.id = id
          return values;
        });
        this.setState({ tasks: taskList })
      })

  }


  componentWillMount() {
    this.loadData()
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }

  addTask = () => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks;
      const newTask = { taskName: this.state.taskName, completed: false }
      fetch(`${API_URL}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(newTask)
      })
        .then(response => response.json())
        .then(data => {
          newTask.id = data.name;
          tasks.push(newTask)
          this.setState({ tasks, taskName: '' })
        })

    }
  }


  handleClick = () => {
    this.addTask()
  }

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.addTask()
    }
  }

  handleDelete = (id) => {
    fetch(`${API_URL}/tasks/${id}.json`, {
      method: 'DELETE'
    })
      .then(() => {
        this.loadData()
      })
  }

  handleCheck= (task) => {
    // task.completed = !task.completed
    // fetch(`${API_URL}/tasks/${task.id}.json`, {
    //   method: 'PUT',
    //   body: JSON.stringify(task)
    // })
    task.completed = !task.completed
    fetch(`${API_URL}/tasks/${task.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(task)
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          <TextField
            hintText="enter your task here"
            value={this.state.taskName}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
          />
          <RaisedButton
            label="add task"
            primary={true}
            onClick={this.handleClick} />
        </div>
        <List>
          {this.state.tasks.map(task => (
            <ListItem
              key={task.id}
              primaryText={task.taskName}
              leftCheckbox=
              {<Checkbox
              defaultChecked={task.completed}
                onCheck={() => this.handleCheck(task)} />}
              rightIconButton={
                <IconButton>
                  <DeleteIcon onClick={() => this.handleDelete(task.id)} />
                </IconButton>}

            />
          ))}
        </List>
      </div>
    );
  }
}

export default App;
