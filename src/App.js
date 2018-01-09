import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import "./App.css";
import { Card, List, Input, Checkbox, Icon } from 'semantic-ui-react'

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


class AddItemField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // alert(this.state.value);
    event.preventDefault();
    const value = this.state.value;
    const onSubmit = this.props.onSubmit;

    onSubmit(value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input fluid action='Add Item' placeholder='Insert Item To Do...'
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
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
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    return (
      <div className="App Aligner">
        <Card color='red' className='Aligner-item toDoCard'>
          <Card.Content>
            <Card.Header>To Do List <Icon name='list' /></Card.Header>
            <Card.Meta>A list of things to do</Card.Meta>
            <Card.Description>This is a list of things to do.</Card.Description>
            <AddItemField onSubmit={this.onFormSubmit} />
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

  onFormSubmit(item) {
    // alert(item + ' is being added!');
    let todos = this.state.todos;
    todos.push({ text: item, checked: false })
    this.setState({ todos: todos });
  }

  onCheckboxChange(value, index) {
    // get old value
    let todos = this.state.todos;
    // get value of specific todo we want
    let todo = todos[index];
    // modify the old values with our new values
    todos[index] = { text: todo.text, checked: value };
    // set the new todos as the new state.
    this.setState({ todos: todos });

  }
}

export default App;
