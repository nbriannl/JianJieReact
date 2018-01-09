import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import "./App.css";
import { Button, Card, List, Input, Checkbox, Icon } from 'semantic-ui-react'

class ToDoItem extends Component {
  constructor(props) {
    super(props)
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  render() {
    return (
      <List.Item>
        <Checkbox
          label={this.props.todo.text}
          checked={this.props.todo.checked}
          onChange={this.onCheckboxChange}
        />
      </List.Item>
    );
  }

  onCheckboxChange(event, data) {
    this.props.onChange(data.checked, this.props.index)
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          text: "apple",
          checked: false,
        },
        {
          text: "orange",
          checked: false,
        },
      ],
    };
    this.onCheckboxChange = this.onCheckboxChange.bind(this);    
  }

  render() {
    return (
      <div className="App Aligner">
        <Card color='red' className='Aligner-item toDoCard'>
          <Card.Content>
            <Card.Header>To Do List <Icon name='list' /></Card.Header>
            <Card.Meta>A list of things to do</Card.Meta>
            <Card.Description>This is a list of things to do.</Card.Description>
            <Input fluid action='Add Item' placeholder='Insert Item To Do...' />
            <List divided relaxed>
              {this.state.todos.map((todo, index) => {
                return (
                  <ToDoItem 
                    todo={todo}
                    index={index}
                    onChange={this.onCheckboxChange} 
                  />
                );
              })}
            </List>
          </Card.Content>
        </Card>
      </div>
    )
  }

  onCheckboxChange(value, index) {
    // get old value
    let todos = this.state.todos;
    // get value of specific todo we want
    let todo = todos[index];
    // modify the old values with our new values
    todos[index] = {text: todo.text, checked: value };
    // set the new todos as the new state.
    this.setState({ todos: todos });

  }
}

export default App;
