import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import "./App.css";
import { Button, Card, List, Input, Checkbox, Icon, Grid } from 'semantic-ui-react'

class ToDoItem extends Component {
  constructor(props) {
    super(props)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    return (
      <List.Item>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={15} verticalAlign='middle'>
              <Checkbox
                label={this.props.todo.text}
                checked={this.props.todo.checked}
                onChange={this.handleCheckboxChange}
              />
            </Grid.Column>
            <Grid.Column width={1}>
              <Button
                negative circular size='tiny' icon='remove circle'
                onClick={this.handleItemDelete}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </List.Item>
    );
  }

  handleItemDelete(event, data) {
    this.props.onDelete(this.props.index);
  }

  handleCheckboxChange(event, data) {
    //corresponds to TodoList.handleCheckboxChange(value, index) 
    this.props.onChange(data.checked, this.props.index)
  }
}

function EmptyToDoListItem(props) {
  return (
    <List.Item>
      <Checkbox
        label='Empty list! Add an item.'
        disabled
      />
    </List.Item>
  )
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
      function () {
        this.checkFieldValueValid();
      }
    );
  }

  checkFieldValueValid() {
    //console.log("this.state.value:" + this.state.value);
    const originalString = this.state.value;
    const checkString = this.state.value.replace(/\s/g, "");
    //console.log("checkString = \'" + checkString + '\'');
    //console.log(checkString.length);

    if (originalString.length !== 0 && checkString.length <= 0) {
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

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
      ],
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  render() {
    const isTodoListEmpty = (this.state.todos.length === 0) ? true : false;
    let listItems = null;
    if (isTodoListEmpty) {
      listItems = <EmptyToDoListItem />
    } else {
      listItems = this.state.todos.map((todo, index) => {
        return (
          <ToDoItem
            todo={todo}
            index={index}
            key={index + 'tomato'}
            onChange={this.handleCheckboxChange}
            onDelete={this.handleItemDelete}
          />
        );
      })
    }

    return (
      <div className="Aligner-item" >
        <Card color={this.props.cardColor} >
          <Card.Content>
            <Card.Header>To Do List <Icon name='list' /></Card.Header>
            <Card.Meta>A list of things to do</Card.Meta>
            <AddItemField onSubmit={this.handleItemSubmit} />
            <List divided relaxed>
              {listItems}
            </List>
          </Card.Content>
        </Card>
      </div>
    )
  }

  handleItemDelete(index) {
    console.log('handleItemDeleteFunction');
    // get old value
    let todos = this.state.todos;
    // get value of specific todo to delete
    let todoToRemove = todos[index]
    // modify the old value by remove the specfic value
    if (index > -1) {
      todos.splice(index, 1);
    }
    // set the new todos as new state
    this.setState({ todos: todos });
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

class App extends Component {
  render() {
    return (
      <div className="App Aligner">
        <ToDoList cardColor='green' />
        <br />
        <ToDoList cardColor='yellow'/>
      </div>
    )
  }
}

export default App;
