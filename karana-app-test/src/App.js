import React, { Component } from 'react';
import './App.css';

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
  render() {
    return (
      <tr>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
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


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleUserShowSelection = this.handleUserShowSelection.bind(this);
    this.handleKaranaShowSelection = this.handleKaranaShowSelection.bind(this);    
    this.handleUserFormSelection = this.handleUserFormSelection.bind(this);
    this.handleKaranaFormSelection = this.handleKaranaFormSelection.bind(this);
  }
  handleUserShowSelection(e) {
    this.props.onResourceSelection('user','show');
    console.log(e);
  }
  
  handleKaranaShowSelection(e) {
    this.props.onResourceSelection('karana','show');
    console.log(e);
  }

  handleUserFormSelection(e) {
    this.props.onResourceSelection('user','form');
    console.log(e);
  }
  
  handleKaranaFormSelection(e) {
    this.props.onResourceSelection('karana','form');
    console.log(e);
  }

  render() {
    return(
      <div>
        <ul>
          <li >
            <a onClick={this.handleUserShowSelection}>Show Users</a>
          </li>
          <li >
            <a onClick={this.handleUserFormSelection}> Add User </a>
          </li>
          <li >
            <a onClick={this.handleKaranaShowSelection}> Show Karanas </a>
          </li>
          <li >
            <a onClick={this.handleKaranaFormSelection}> Add Karana </a>
          </li>
        </ul>
      </div>
    );
  }
}

class UserShow extends Component {
  render() {
    var rows = [];
    this.props.users.forEach(function(user) {    
      rows.push(<UserRow user={user} key={user.name} />);
    });
    return (
      <table>
        <thead>
          <UserPropertiesRow />
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class KaranaShow extends Component {
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
}
// class ResourceForm extends Component {
//     render() {
//     var rows = [];
//     if (this.props.resource === 'user'){
//         rows.push(<UserInputRow />);
//     } else {
//         rows.push(<KaranaInputRow />);
//     }
//     return (
//       <table>
//         <thead>
//           {this.props.resource === 'user' ? <UserInputPropertiesRow /> : <KaranaInputPropertiesRow />}
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// }

function DisplayAction(props){
	const res = props.resource
	const type = props.type
	if (res === 'karana' && type === 'show'){
	 	return <KaranaShow karanas={props.karanas}/>
	}
	else if (res === 'user' && type === 'show'){
	 	return <UserShow users={props.users}/>
	}
	else if (res === 'user' && type === 'form'){
	 	return <div> Form for user</div>
	}
	else if (res === 'karana' && type === 'form'){
	 	return <KaranaForm />
	}
	return <div> Hello </div>
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: 'karana',
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
  render() {
	 
    return (
      <div >
        <SideBar onResourceSelection={this.handleResourceSelection} />
        <DisplayAction users={this.state.users} karanas={this.state.karanas} resource={this.state.resource} type={this.state.type}/>
      </div>
    );
  }
}

export default App;
