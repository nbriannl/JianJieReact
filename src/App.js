import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import "./App.css";
import { Card, List, Input, Checkbox, Icon } from 'semantic-ui-react'

class ToDoItem extends Component {
  constructor(props) {
    super(props)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  render() {
    return (
      <List.Item>
        <Checkbox
          label={this.props.todo.text}
          checked={this.props.todo.checked}
          onChange={this.handleCheckboxChange}
        />
      </List.Item>
    );
  }

  handleCheckboxChange(event, data) {
    this.props.onChange(data.checked, this.props.index)
  }
}

class AddItemField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isValidValue: true,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange(event) {
    event.preventDefault();
    this.setState(
      { value: event.target.value }, 
      function() {
        this.checkFieldValueValid();
      }
    );
  }

  checkFieldValueValid() {
    console.log("this.state.value:" + this.state.value);    
    const originalString = this.state.value;
    const checkString = this.state.value.replace(/\s/g, "");
    console.log("checkString = \'" + checkString +'\'');        
    console.log(checkString.length);

    if (originalString.length != 0 && checkString.length <= 0) {
      this.setState({ isValidValue: false });
    } else {
      this.setState({ isValidValue: true });
    }
  }

  handleSubmit(event) {
    // alert(this.state.value);
    event.preventDefault();
    const value = this.state.value;
    const onSubmit = this.props.onSubmit;
    if (value.trim() === '') {
      this.setState({ isValidValue: false });
    } else {
      if (this.state.isValidValue === false) {
        this.setState({ isValidValue: true });
      }
      onSubmit(value);
      this.setState({ value: '' });
    }
  }

  render() {
    const isValidValue = this.state.isValidValue;
    let error = isValidValue ? false : true;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input fluid error={error} action='Add Item' placeholder='Insert Item To Do...'
          value={this.state.value}
          onChange={this.handleFieldChange}
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
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
  }

  render() {
    return (
      <div className="App Aligner">
        <Card color='red' className='Aligner-item toDoCard'>
          <Card.Content>
            <Card.Header>To Do List <Icon name='list' /></Card.Header>
            <Card.Meta>A list of things to do</Card.Meta>
            <Card.Description>This is a list of things to do.</Card.Description>
            <AddItemField onSubmit={this.handleItemSubmit} />
            <List divided relaxed>
              {this.state.todos.map((todo, index) => {
                return (
                  <ToDoItem
                    todo={todo}
                    index={index}
                    onChange={this.handleCheckboxChange}
                  />
                );
              })}
            </List>
          </Card.Content>
        </Card>
      </div>
    )
  }

  handleItemSubmit(item) {
    // alert(item + ' is being added!');
    let todos = this.state.todos;
    todos.push({ text: item, checked: false })
    this.setState({ todos: todos });
  }

  handleCheckboxChange(value, index) {
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
