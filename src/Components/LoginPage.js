import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Apis from '../Common/api.js';
import axios from 'axios';
import { LoginPageStyles as styles } from '../Styles'

class LoginPage extends Component{
	constructor(props){
		super(props);
		this.state={
			name:''
		};
	}

	LoginHandler = () =>{
		console.log("Calling login Handler")
		let url = Apis.base+Apis.addUser;
		console.log(url);
		try {
			axios.post(url,{
				name:this.state.name,
				date: (new Date(Date.now())).toLocaleTimeString()
			}).then((resp)=> {
				document.location.href = "/Chatroom/"+ this.state.name;
			});
		}
		catch(e){
			console.log(e);
		}
	}

	render(){
		return(
			<div style={styles.backgroundGradient}>
				<div style={styles.loginCard}>
					<div style={styles.flex}>
						<h1 style={styles.heading}>Enter Your Nick Name</h1>
					</div>
					<div style={styles.flex}>
						<input style={styles.inputField} value={this.state.name} onChange={(event)=>this.setState({name:event.target.value})}/>
					</div>
					<div style={styles.flex}>
					 	<Button onClick={this.LoginHandler} primary style={styles.joinButton}>JOIN CHAT</Button>
					</div>
				</div>
			</div>
		)
	}

}

export default LoginPage;