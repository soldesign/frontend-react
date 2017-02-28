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
            <th>Grafana Link</th>
            <th>Manage</th>
          </tr>;
  }
}

class KaranaRow extends Component {
	constructor(props) {
    super(props);
    this.handleKaranaEdit = this.handleKaranaEdit.bind(this);
    this.handleKaranaDelete = this.handleKaranaDelete.bind(this);
  }
	handleKaranaEdit(e) {
    this.props.onKaranaSelection(this.props.karana,'edit_karana');
  }
  handleKaranaDelete(e) {
    alert('Delete karana: for testing')
  }
  render() {
    return (
      <tr>
        <td>{this.props.karana.name}</td>
        <td>{this.props.karana.note}</td>
        <td><a href={grafanabase + '/dashboard/script/karanabase.js?u_id=' + this.props.karana.owner + '&k_id=' + this.props.karana.uuid } target="_blank">show data</a></td>
        <td><a onClick={this.handleKaranaEdit} > edit </a> <a onClick={this.handleKaranaDelete} > delete </a></td>
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
            <th>Manage</th>
          </tr>;
  }
}

class UserRow extends Component {
	constructor(props) {
    super(props);
    this.handleUserSelection = this.handleUserSelection.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }
	handleUserSelection(e) {
    this.props.onUserSelection(this.props.user.uuid,'show_user_karana');
  }
 	handleUserEdit(e) {
    this.props.onUserSelection(this.props.user,'edit_user');
  }
  handleUserDelete(e) {
    alert('Delete user: for testing')
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role}</td>
        <td><a onClick={this.handleUserSelection}> Show Karanas </a></td>
        <td><a onClick={this.handleUserEdit} > edit </a> <a onClick={this.handleUserDelete} > delete </a></td>
      </tr>
    );
  }
}

class UserRow2 extends Component {
	constructor(props) {
    super(props);
    this.handleAddKarana = this.handleAddKarana.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }
	handleAddKarana(e) {
    this.props.onKaranaSelection(this.props.user.uuid,'form_karana');
  }
  handleUserEdit(e) {
    this.props.onKaranaSelection(this.props.user,'edit_user');
  }
  handleUserDelete(e) {
    alert('Delete user: for testing')
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role}</td>
				<td><a onClick={this.handleAddKarana}> Add Karanas </a></td>
        <td><a onClick={this.handleUserEdit} > edit </a> <a onClick={this.handleUserDelete} > delete </a></td>
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
	        <FormControl type="text" value={this.props.value} onChange={this.handleChange}/>
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

class KaranaEdit extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	Name: this.props.karana.name,
    	//Owner: this.props..resid,
    	Note:this.props.karana.note,
    	Post_Int:this.props.karana.config.post_int,
    	Get_Int:this.props.karana.config.get_int
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

	handleSubmit(event) {
		var data = JSON.stringify({
		    name: this.state.Name,
		    //owner: this.state.Owner,
		    note: this.state.Note,
		    config: {
		    	post_int: this.state.Post_Int,
		    	get_int: this.state.Get_Int,
		    },
		  })
		alert('Edit User with: ' + this.state.Name + ' ' + this.state.Note)
		fetch(apiurl + "/karanas/" + this.props.karana.uuid, {
		  method: 'PUT',
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

class UserEdit extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	Name: this.props.user.name,
    	//Email:this.props.email,
    	Role: this.props.user.role,
      Password: ''
    };
    var pass = this.props.user.credentials.password
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

	handleSubmit(event) {
		if (this.state.Password !== ''){
			this.pass = this.state.Password
		}
		var data = JSON.stringify({
		    name: this.state.Name,
		    //email: this.state.Email,
		    role: this.state.Role,
		    credentials: {
		    	//login: this.state.Email,
		    	password: this.pass,
		    },
		  })
		alert('Edit User with: ' + this.state.Name + ' ' + this.state.Role)
		fetch(apiurl + "/users/" + this.props.user.uuid, {
		  method: 'PUT',
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
         <ControlLabel>Edit User {this.props.user.email}</ControlLabel>
        <FormInputTemplate value={this.state.Name} label='Name' onValueChange={this.handleValueChange}/>
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
    this.handleKaranaSelection = this.handleKaranaSelection.bind(this);
  }

	handleKaranaSelection(resource,type) {
    this.props.onKaranaSelection(resource,type);
  }
  render() {
    var rows_user = [];
    var rows_karana = [];
    var user_ids = Object.keys(this.props.users)
    user_ids.map((user_id) => {
      if(this.props.users[user_id].uuid === this.props.resid) {
        rows_user.push(<UserRow2 user={this.props.users[user_id]} key={this.props.users[user_id].uuid} onKaranaSelection={this.handleKaranaSelection}/>);
      }
      return true
    });
    var karana_ids = Object.keys(this.props.karanas)
    karana_ids.map((karana_id) => {
      if(this.props.karanas[karana_id].owner === this.props.resid){
        rows_karana.push(<KaranaRow karana={this.props.karanas[karana_id]} key={this.props.karanas[karana_id].uuid} onKaranaSelection={this.handleKaranaSelection} />);
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
    this.handleResourceSelection = this.handleResourceSelection.bind(this);
  }
	handleResourceSelection(user_id,type) {
    this.props.onResourceSelection(user_id,type);
  }

  render() {
		const res = this.props.resource
		const type = this.props.type
		if ( type === 'show_user_karana'){
		 	return <UserShow resid={res} users={this.props.users} karanas={this.props.karanas} onKaranaSelection={this.handleResourceSelection}/>
		}
		else if (type === 'show_user'){
		 	return <UsersShow users={this.props.users} onUserSelection={this.handleResourceSelection}/>
		}
		else if (type === 'form_user'){
		 	return <UserForm />
		}
		else if (type === 'edit_user'){
		 	return <UserEdit user={res} />
		}
		else if (type === 'form_karana'){
		 	return <KaranaForm resid={res}/>
		}
		else if (type === 'edit_karana'){
		 	return <KaranaEdit karana={res} />
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
    this.props.onResourceSelection('user','show_user');
  }
  
  handleUserFormSelection(e) {
    this.props.onResourceSelection('user','form_user');
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
      type: 'show_user',
      karanas: [],
      users: [],
    };
    this.handleResourceSelection = this.handleResourceSelection.bind(this);
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


  render() {
	 
    return (
      <div >
        <SideBar onResourceSelection={this.handleResourceSelection} />
        <DisplayAction users={this.state.users} karanas={this.state.karanas} resource={this.state.resource} type={this.state.type} onResourceSelection={this.handleResourceSelection}/>
      </div>
    );
  }
}

export default App;
