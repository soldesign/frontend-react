import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class KaranaPropertiesRow extends React.Component {
  render() {
    return <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Link</th>
          </tr>;
  }
}

class KaranaRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.karana.name}</td>
        <td>{this.props.karana.owner}</td>
        <td><a href={this.props.karana.link}>link</a></td>
      </tr>
    );
  }
}

class UserPropertiesRow extends React.Component {
  render() {
    return <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Karana</th>
          </tr>;
  }
}

class UserRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
      </tr>
    );
  }
}


class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserSelection = this.handleUserSelection.bind(this);
    this.handleKaranaSelection = this.handleKaranaSelection.bind(this);
  }
  handleUserSelection(e) {
    this.props.onResourceSelection('user');
  }
  
  handleKaranaSelection(e) {
    this.props.onResourceSelection('karana');
  }

  render() {
    return(
      <div>
        <ul>
          <li >
            <a onClick={this.handleUserSelection}>Show Users</a>
          </li>
          <li >
            <a> Add User </a>
          </li>
          <li >
            <a onClick={this.handleKaranaSelection}> Show Karanas </a>
          </li>
        </ul>
      </div>
    );
  }
}

class ResourceTable extends React.Component {
  render() {
    var rows = [];
    if (this.props.resource === 'user'){
      this.props.users.forEach(function(resource) {    
        rows.push(<UserRow user={resource} key={resource.name} />);
      });
    } else {
      this.props.karanas.forEach(function(resource) {    
        rows.push(<KaranaRow karana={resource} key={resource.name} />);
      });
    }
    return (
      <table>
        <thead>
          {this.props.resource === 'user' ? <UserPropertiesRow /> : <KaranaPropertiesRow />}
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: 'karana'
    };
    this.handleResourceSelection = this.handleResourceSelection.bind(this);
  }

  handleResourceSelection(resource) {
    this.setState({
      resource: resource
    });
  }

  render() {
    return (
      <div className="App">
        <SideBar onResourceSelection={this.handleResourceSelection} />
        <ResourceTable users={this.props.users} karanas={this.props.karanas} resource={this.state.resource}/>
      </div>
    );
  }
}

export default App;
