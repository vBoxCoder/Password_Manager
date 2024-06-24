import React, { Component } from 'react'; 
import './App.css'; 
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa'; 

class App extends Component { 
// Constructor to initialize the component's state 
constructor(props) { 
	super(props); 

	this.state = { 
	website: '', 
	username: '', 
	password: '', 
	passwords: [], 
	alertVisible: false, 
	editing: false, 
	editIndex: null, 
	showPassword: false, 
	}; 
} 

componentDidMount() { 
	this.showPasswords(); 
} 

// Function to copy a password to the clipboard 
copyPassword = async (pass) => { 
	try { 
	const textArea = document.createElement('textarea'); 
	textArea.value = pass; 
	document.body.appendChild(textArea); 
	textArea.select(); 
	document.execCommand('copy'); 
	document.body.removeChild(textArea); 
	this.setState({ alertVisible: true }); 
	setTimeout(() => { 
		this.setState({ alertVisible: false }); 
	}, 2000); 
	} catch (error) { 
	console.error('Error copying text:', error); 
	} 
}; 

// Function to delete a password entry 
deletePassword = (website) => { 
	const updatedPasswords = this.state.passwords.filter( 
	(e) => e.website !== website 
	); 
	this.setState({ passwords: updatedPasswords }); 
	alert(`Successfully deleted ${website}'s password`); 
}; 

// Function to clear the form and reset editing mode 
showPasswords = () => { 
	this.setState({ 
	passwords: [], 
	website: '', 
	username: '', 
	password: '', 
	editing: false, 
	editIndex: null, 
	showPassword: false, 
	}); 
}; 

savePassword = () => { 
	const { website, username, password, editing, editIndex, passwords } = 
	this.state; 

	if (!website || !username || !password) { 
	alert('Please fill in all fields.'); 
	return; 
	} 

	if (editing && editIndex !== null) { 
	// Replace the old entry with the updated one 
	const updatedPasswords = [...passwords]; 
	updatedPasswords[editIndex] = { 
		website, 
		username, 
		password, 
	}; 
	this.setState({ 
		passwords: updatedPasswords, 
		editing: false, 
		editIndex: null, 
		website: '', 
		username: '', 
		password: '', 
	}); 
	} else { 
	const newPassword = { 
		website, 
		username, 
		password, 
	}; 
	this.setState((prevState) => ({ 
		// Add the new entry to passwords array 
		passwords: [...prevState.passwords, newPassword], 
		website: '', 
		username: '', 
		password: '', 
	})); 
	} 
}; 

// Function to edit a password entry 
editPassword = (index) => { 
	const { passwords } = this.state; 
	this.setState({ 
	editing: true, 
	editIndex: index, 
	website: passwords[index].website, 
	username: passwords[index].username, 
	password: passwords[index].password, 
	}); 
}; 

// Function to toggle password visibility 
togglePasswordVisibility = () => { 
	this.setState((prevState) => ({ 
	showPassword: !prevState.showPassword, 
	})); 
}; 

renderPasswordList = () => { 
	const { passwords, showPassword } = this.state; 

	return passwords.map((item, index) => ( 
	<div className="passwordItem" key={index}> 
		<div className="listItem"> 
		<div className="listLabel">Website:</div> 
		<div className="listValue">{item.website}</div> 
		<div className="listLabel">Username:</div> 
		<div className="listValue">{item.username}</div> 
		<div className="listLabel">Password:</div> 
		<div className="listValue"> 
			<span className="passwordField"> 
			{showPassword ? item.password : item.password.replace(/./g, '*')} 
			</span> 
		</div> 
		<div className="passwordButtons"> 
			<button 
			className="showPasswordButton"
			onClick={this.togglePasswordVisibility} 
			> 
			{showPassword ? 'Hide' : 'Show'} 
			</button> 
		</div> 
		<div className="iconContainer"> 
			<div 
			className="icon"
			onClick={() => this.copyPassword(item.password)} 
			> 
			<FaCopy size={20} color="#555" /> 
			</div> 
			<div className="icon" onClick={() => this.editPassword(index)}> 
			<FaEdit size={20} color="#555" /> 
			</div> 
			<div 
			className="icon"
			onClick={() => this.deletePassword(item.website)} 
			> 
			<FaTrash size={20} color="#555" /> 
			</div> 
		</div> 
		</div> 
	</div> 
	)); 
}; 

render() { 
	const { website, username, password, editing } = this.state; 

	return ( 
	<div className="container"> 
		<div className="content"> 
		<h1 className="heading">Password Manager</h1> 
		<h2 className="subHeading"> 
			Your Passwords 
			{this.state.alertVisible && <span id="alert">(Copied!)</span>} 
		</h2> 
		{this.state.passwords.length === 0 ? ( 
			<p className="noData">No Data To Show</p> 
		) : ( 
			<div className="table">{this.renderPasswordList()}</div> 
		)} 

		<h2 className="subHeading"> 
			{editing ? 'Edit Password' : 'Add a Password'} 
		</h2> 
		<input 
			className="input"
			placeholder="Website"
			value={website} 
			onChange={(e) => this.setState({ website: e.target.value })} 
		/> 
		<input 
			className="input"
			placeholder="Username"
			value={username} 
			onChange={(e) => this.setState({ username: e.target.value })} 
		/> 
		<input 
			className="input"
			placeholder="Password"
			type="password"
			value={password} 
			onChange={(e) => this.setState({ password: e.target.value })} 
		/> 
		<div className="submitButton" onClick={this.savePassword}> 
			<span className="submitButtonText"> 
			{editing ? 'Update Password' : 'Add Password'} 
			</span> 
		</div> 
		</div> 
	</div> 
	); 
} 
};

export default App; 
