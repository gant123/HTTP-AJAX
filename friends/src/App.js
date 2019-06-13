import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Card from './Components/Card';
import Form from './Components/Form';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      newFriend: {
        name: '',
        age: '',
        emaiSl: ''
      }
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => this.setState({ friends: response.data }))
      .catch(err => console.log(err));
  }

  addNewFriend(e) {
    e.preventDefault();

    axios
      .post('http://localhost:5000/friends', this.state.newFriend)
      .then(response =>
        this.setState({ friends: response.data }, this.clearInputs())
      )
      .catch(err => console.log(err));
  }

  clearInputs() {
    let nf = {
      name: '',
      age: '',
      email: ''
    };
    this.setState({ newFriend: nf });
  }

  handleChange(event) {
    // handle change
    let nf = {
      ...this.state.newFriend,
      [event.target.name]: event.target.value
    };
    this.setState({ newFriend: nf });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Fun Friends:</h1>
          <nav>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/friends"
            >
              Friends List
            </NavLink>
            <NavLink activeClassName="active" className="nav-link" to="/new">
              Add Friend
            </NavLink>
          </nav>
          <Route
            path="/new"
            render={props => (
              <Form
                {...props}
                handleChange={this.handleChange.bind(this)}
                addNewFriend={this.addNewFriend.bind(this)}
                newFriend={this.state.newFriend}
              />
            )}
          />
          <div className="friends-container">
            <Route
              path="/friends"
              render={() =>
                this.state.friends.map(friend => <Card friend={friend} />)
              }
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
