import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import  { Table, Nav, NavItem } from 'react-bootstrap';

class KaranaPropertiesRow extends Component {
  render() {
    return <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Link</th>
          </tr>;
  }
}

class KaranaRow extends Component {
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

class UserPropertiesRow extends Component {
  render() {
    return <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Karana</th>
          </tr>;
  }
}

class UserRow extends Component {
	constructor(props) {
    super(props);
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }
	handleUserSelection(e) {
    this.props.onUserSelection(this.props.user.name,'show');
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
        <td><a onClick={this.handleUserSelection}> Show Karanas </a></td>
      </tr>
    );
  }
}

class UserRow2 extends Component {
	constructor(props) {
    super(props);
    this.handleAddKarana = this.handleAddKarana.bind(this);
  }
	handleAddKarana(e) {
    this.props.onAddKarana('karana','form');
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
				<td><a onClick={this.handleAddKarana}> Add Karanas </a></td>
      </tr>
    );
  }
}

class FormInputTemplate extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onValueChange(this.props.label, event.target.value)
  }

  render() {
    return (
      <label>
        {this.props.label}
        <input type="text" value={this.props.value} onChange={this.handleChange} />
      </label>
    );
  }
}

class KaranaForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	Name: '',
    	Owner:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

	handleSubmit(event) {
    alert('A name was submitted: ' + this.state.Name + ' ' + this.state.Owner);
    event.preventDefault();
  }

  handleValueChange(label,value) {
  	this.setState({
      [label]: value,
    });
  }

	render() {
    return (
			<form onSubmit={this.handleSubmit}>
        <FormInputTemplate value={this.state.Name} label='Name' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Owner} label='Owner' onValueChange={this.handleValueChange}/>
        <input type="submit" value="Submit" />
      </form>
		);
  }
}

class UserForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	Name: '',
    	Email:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

	handleSubmit(event) {
    alert('A name was submitted: ' + this.state.Name + ' ' + this.state.Email);
    event.preventDefault();
  }

  handleValueChange(label,value) {
  	this.setState({
      [label]: value,
    });
  }

	render() {
    return (
			<form onSubmit={this.handleSubmit}>
        <FormInputTemplate value={this.state.Name} label='Name' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Email} label='Email' onValueChange={this.handleValueChange}/>
        <input type="submit" value="Submit" />
      </form>
		);
  }
}


class UsersShow extends Component {
	constructor(props) {
    super(props);
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }

	handleUserSelection(user_id,type) {
    this.props.onUserSelection(user_id,type);
  }

  render() {
    var rows = [];
    this.props.users.map((user) => 
      rows.push(<UserRow user={user} key={user.name} onUserSelection={this.handleUserSelection} />)
    );
    return (
      <Table striped bordered condensed hover>
        <thead>
          <UserPropertiesRow />
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class UserShow extends Component {
	constructor(props) {
    super(props);
    this.handleAddKarana = this.handleAddKarana.bind(this);
  }

	handleAddKarana(resource,type) {
    this.props.onAddKarana(resource,type);
  }
  render() {
    var rows_user = [];
    var rows_karana = [];
    this.props.users.map((user) => {   
      if(user.name === this.props.resid) {
        rows_user.push(<UserRow2 user={user} key={user.name} onAddKarana={this.handleAddKarana}/>);
      }
      return true
    });
    this.props.karanas.map((karana) => {
      if(karana.owner === this.props.resid){     
        rows_karana.push(<KaranaRow karana={karana} key={karana.name} />);
      }
      return true
    });
    return (
      <div>
	      <Table striped bordered condensed hover>
	        <thead>
	          <UserPropertiesRow />
	        </thead>
	        <tbody>{rows_user}</tbody>
	      </Table>
	      <Table responsive>
	        <thead>
	          <KaranaPropertiesRow />
	        </thead>
	        <tbody>{rows_karana}</tbody>
	      </Table>
      </div>
    );
  }
}

/*class KaranaShow extends Component {
  render() {
    var rows = [];
    this.props.karanas.forEach(function(karana) {    
      rows.push(<KaranaRow karana={karana} key={karana.name} />);
    });
    return (
      <table>
        <thead>
          <KaranaPropertiesRow />
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}*/

class DisplayAction extends Component{
	constructor(props) {
    super(props);
    this.handleUserSelection = this.handleUserSelection.bind(this);
    this.handleAddKarana = this.handleAddKarana.bind(this);
  }
	handleUserSelection(user_id,type) {
    this.props.onUserSelection(user_id,type);
  }
  handleAddKarana(resource,type) {
    this.props.onAddKarana(resource,type);
  }
  render() {
		const res = this.props.resource
		const type = this.props.type
		if (res !== 'karana' && res !== 'user' && type === 'show'){
		 	return <UserShow resid={res} users={this.props.users} karanas={this.props.karanas} onAddKarana={this.handleAddKarana}/>
		}
		else if (res === 'user' && type === 'show'){
		 	return <UsersShow users={this.props.users} onUserSelection={this.handleUserSelection}/>
		}
		else if (res === 'user' && type === 'form'){
		 	return <UserForm />
		}
		else if (res === 'karana' && type === 'form'){
		 	return <KaranaForm />
		}
		return <div> hello </div>
	}
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleUserShowSelection = this.handleUserShowSelection.bind(this);
    this.handleUserFormSelection = this.handleUserFormSelection.bind(this);
  }
  handleUserShowSelection(e) {
    this.props.onResourceSelection('user','show');
  }
  
  handleUserFormSelection(e) {
    this.props.onResourceSelection('user','form');
  }
  
  render() {
    return(
      <Nav bsStyle="nav-pills" activeKey={1}>
        <NavItem eventKey={1} onClick={this.handleUserShowSelection}>Show Users</NavItem>
        <NavItem eventKey={2} onClick={this.handleUserFormSelection}> Add User </NavItem>
      </Nav>
    );
  }
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: 'user',
      type: 'show',
      karanas: [],
      users: [],
    };
    this.KARANAS = [
		  {name: 'MichasKarana', owner: 'Micha', link: 'https://grafana.me-soldesign.com'},
		  {name: 'MichasKarana2', owner: 'Micha', link: 'https://grafana.me-soldesign.com'},
		  {name: 'SteffensKarana', owner: 'Steffen', link: 'https://grafana.me-soldesign.com'},
		  {name: 'FranksKarana', owner: 'Frank', link: 'https://grafana.me-soldesign.com'},
		  {name: 'SetusKarana', owner: 'Setu', link: 'https://grafana.me-soldesign.com'},
		  {name: 'TobiasKarana', owner: 'Tobias', link: 'https://grafana.me-soldesign.com'},
		];
		this.USERS = [
		  {name: 'Micha', email: 'micha@ex.de'},
		  {name: 'Steffen', email: 'steffen@ex.de'},
		  {name: 'Frank', email: 'frank@ex.de'},
		  {name: 'Setu', email: 'setu@ex.de'},
		  {name: 'Tobias', email: 'tobias@ex.de'},
	  ];
    this.handleResourceSelection = this.handleResourceSelection.bind(this);
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }
   componentDidMount() {
    this.setState({
      karanas: this.KARANAS,
      users: this.USERS
    });
  }

  handleResourceSelection(resource,type) {
    this.setState({
      resource: resource,
      type: type
    });
  }
  handleUserSelection(user_id,type) {
    this.setState({
      resource: user_id,
      type: type
    });
  }

  render() {
	 
    return (
      <div >
        <SideBar onResourceSelection={this.handleResourceSelection} />
        <DisplayAction users={this.state.users} karanas={this.state.karanas} resource={this.state.resource} type={this.state.type} onUserSelection={this.handleUserSelection} onAddKarana={this.handleResourceSelection}/>
      </div>
    );
  }
}

export default App;
