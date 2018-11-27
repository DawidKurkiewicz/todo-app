import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

const API_URL = 'https://dawid-kurkiewicz.firebaseio.com'

class App extends Component {

  state = {
    tasks: [],
    taskName: ''
  }

  componentWillMount() {
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        console.log('mam dane', data)
      })
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }
  handleClick = () => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks;
      const newTask = { taskName: this.state.taskName, completed: false }
      fetch(`${API_URL}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(newTask)
      }).then(() => {
        tasks.push(newTask);
        this.setState({ tasks, taskName: '' })
      })

    }
  }



  render() {
    return (
      <div className="App">
        <div>
          <TextField
            hintText="enter your task here"
            value={this.state.taskName}
            onChange={this.handleChange}
          />
          <RaisedButton
            label="add task"
            primary={true}
            onClick={this.handleClick} />
        </div>
        <div>

          {this.state.tasks.map((task, index) => (
            <div>{task.taskName}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
