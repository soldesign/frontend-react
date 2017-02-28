import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.min.css';
import './css/bootstrap-grid.min.css';
import './css/bootstrap-reboot.min.css';
import  {Button, Table, Nav, NavItem, Navbar, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';

var apiurl='http://localhost:8000/v1'
var grafanabase = 'https://grafana.me-soldesign.com'

class KaranaPropertiesRow extends Component {
  render() {
    return <tr>
            <th>Karana Name</th>
            <th>Note</th>
            <th>Link</th>
          </tr>;
  }
}

class KaranaRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.karana.name}</td>
        <td>{this.props.karana.note}</td>
        <td><a href={grafanabase + '/dashboard/script/karanabase.js?u_id=' + this.props.karana.owner + '&k_id=' + this.props.karana.uuid } target="_blank">link</a></td>
      </tr>
    );
  }
}

class UserPropertiesRow extends Component {
  render() {
    return <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
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
    this.props.onUserSelection(this.props.user.uuid,'show');
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role}</td>
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
    this.props.onAddKarana(this.props.user.uuid,'form_karana');
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role}</td>
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
    	<FormGroup controlId="formHorizontalEmail">
	      <Col componentClass={ControlLabel} sm={2}>
	        {this.props.label}
	      </Col>
	      <Col sm={10}>
	        <FormControl type="text" placeholder={this.props.label} onChange={this.handleChange}/>
	      </Col>
	    </FormGroup>
      //<FormGroup type="text" label={this.props.label} value={this.props.value} onChange={this.handleChange} />
    );
  }
}

class KaranaForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	Name: '',
    	Owner: this.props.resid,
    	Note:'',
    	Post_Int:'30',
    	Get_Int:'6'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

	handleSubmit(event) {
		var data = JSON.stringify({
		    name: this.state.Name,
		    owner: this.state.Owner,
		    note: this.state.Note,
		    config: {
		    	post_int: this.state.Post_Int,
		    	get_int: this.state.Get_Int,
		    },
		  })
		fetch(apiurl + "/karanas/new", {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: '{"data":"' + data.replace(/"/g, '\\"') + '"}'
		}).then(function(response) {
  		console.log(response.headers.get('Content-Type'))
		  console.log(response.headers.get('Date'))
		  console.log(response.status)
		  console.log(response.statusText)
		  alert('The response is ' + response.status)
		})

		event.preventDefault();
  }

  handleValueChange(label,value) {
  	this.setState({
      [label]: value,
    });
  }

	render() {
    return (
			<Form horizontal onSubmit={this.handleSubmit}>
        <FormInputTemplate value={this.state.Name} label='Name' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Owner} label='Owner' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Note} label='Note' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Post_Int} label='Post_Int' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Get_Int} label='Get_Int' onValueChange={this.handleValueChange}/>
				<FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Button type="submit">
		          Submit
		        </Button>
		      </Col>
		    </FormGroup>      
		  </Form>
		);
  }
}

class UserForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	Name: '',
    	Email:'',
    	Role: '',
      Password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

	handleSubmit(event) {
		var data = JSON.stringify({
		    name: this.state.Name,
		    email: this.state.Email,
		    role: this.state.Role,
		    credentials: {
		    	login: this.state.Email,
		    	password: this.state.Password,
		    },
		  })
		fetch(apiurl + "/users/new", {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: '{"data":"' + data.replace(/"/g, '\\"') + '"}'
		}).then(function(response) {
  		console.log(response.headers.get('Content-Type'))
		  console.log(response.headers.get('Date'))
		  console.log(response.status)
		  console.log(response.statusText)
		  alert('The response is ' + response.status)
		})
    event.preventDefault();
  }

  handleValueChange(label,value) {
  	this.setState({
      [label]: value,
    });
  }

	render() {
    return (
			<Form horizontal onSubmit={this.handleSubmit}>
        <FormInputTemplate value={this.state.Name} label='Name' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Email} label='Email' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Role} label='Role' onValueChange={this.handleValueChange}/>
        <FormInputTemplate value={this.state.Password} label='Password' onValueChange={this.handleValueChange}/>
				<FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Button type="submit">
		          Submit
		        </Button>
		      </Col>
		    </FormGroup>      
		  </Form>
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
    var user_ids = Object.keys(this.props.users)
    user_ids.map((user_id) => {
      rows.push(<UserRow user={this.props.users[user_id]} key={this.props.users[user_id].uuid} onUserSelection={this.handleUserSelection} />)
    	return true
    }
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
    var user_ids = Object.keys(this.props.users)
    user_ids.map((user_id) => {
      if(this.props.users[user_id].uuid === this.props.resid) {
        rows_user.push(<UserRow2 user={this.props.users[user_id]} key={this.props.users[user_id].uuid} onAddKarana={this.handleAddKarana}/>);
      }
      return true
    });
    var karana_ids = Object.keys(this.props.karanas)
    karana_ids.map((karana_id) => {
      if(this.props.karanas[karana_id].owner === this.props.resid){
        rows_karana.push(<KaranaRow karana={this.props.karanas[karana_id]} key={this.props.karanas[karana_id].uuid} />);
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
	      <Table striped bordered condensed hover>
	        <thead>
	          <KaranaPropertiesRow />
	        </thead>
	        <tbody>{rows_karana}</tbody>
	      </Table>
      </div>
    );
  }
}


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
		else if (res !== 'user' && type === 'form_karana'){
		 	return <KaranaForm resid={res}/>
		}
		return <div> hello </div>
	}
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleUserShowSelection = this.handleUserShowSelection.bind(this);
    this.handleUserFormSelection = this.handleUserFormSelection.bind(this);
    this.sync_db = this.sync_db.bind(this);
  }
  handleUserShowSelection(e) {
    this.props.onResourceSelection('user','show');
  }
  
  handleUserFormSelection(e) {
    this.props.onResourceSelection('user','form');
  }
  sync_db(){
  	fetch(apiurl + "/sync/db/all", {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: ''
		}).then(function(response) {
  		console.log(response.headers.get('Content-Type'))
		  console.log(response.headers.get('Date'))
		  console.log(response.status)
		  console.log(response.statusText)
		  alert('The response is ' + response.status)
		})
  }
  render() {
    return(
    	<Navbar>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#">Karana Management</a>
		      </Navbar.Brand>
		    </Navbar.Header>
	      <Nav className="pills" activeKey={1}>
	        <NavItem eventKey={1} onClick={this.handleUserShowSelection}>Show Users</NavItem>
	        <NavItem eventKey={2} onClick={this.handleUserFormSelection}> Add User </NavItem>
	        <NavItem eventKey={3} onClick={this.sync_db}> Sync DB </NavItem>
	      </Nav>
	    </Navbar>
    );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.fetch_res()
    this.state = {
      resource: 'user',
      type: 'show',
      karanas: [],
      users: [],
    };
    this.handleResourceSelection = this.handleResourceSelection.bind(this);
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }
  componentDidMount() {
  	this.fetch_resID = setInterval(
      () => this.fetch_res(),
      5000
    );

  }

  componentWillUnmount() {
    clearInterval(this.fetch_resID);
  }

  fetch_res() {
  	fetch(apiurl + "/users")
      .then(response => response.json())
      .then(json => {
        var user_list = JSON.parse(json)['results'][0]
        this.setState({
          users: user_list,
        });
      });

	 	fetch(apiurl + "/karanas")
      .then(response => response.json())
      .then(json => {
        var user_list = JSON.parse(json)['results'][0]
        this.setState({
          karanas: user_list,
        });
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
