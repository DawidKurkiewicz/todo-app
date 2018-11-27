import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';



class App extends Component {

  state = {
    tasks: [
      { taskName: 'odkurzanie', completed: false },
      { taskName: 'karmienie', completed: false }
    ],
    taskName: ''
  }

  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }
  handleClick = () => {
    let tasks = this.state.tasks;
    tasks.push({ taskName: this.state.taskName, completed: false })
    this.setState({ tasks })
  }
  render() {
    return (
      <div className="App">
        <div>
          <TextField hintText="enter your task here" onChange={this.handleChange}
          />
          <RaisedButton label="add task" primary={true} onClick={this.handleClick} />
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
