import React, { Component } from 'react'
import { auth } from './base'
import { Redirect } from 'react-router-dom'

class Login extends Component{
	state = {
		isLoggedIn: false,
		error: false,
		isLogging: false
	}
	handleLogin = () => {
		this.setState({
			isLogging: true,
			error: false
		})
		auth
			.signInWithEmailAndPassword(this.email.value, this.password.value)
			.then(user  => {
				this.setState({
					isLoggedIn: true
				})
			})
			.catch(err => {
				this.setState({
					error: true,
					isLogging: false
				})
			})
	}

	render() {
		if (this.state.isLoggedIn) {
			return <Redirect to='/admin'/>
		}
		return (
			<div>
				<input type="email" ref={ref => this.email = ref} />
				<input type="password" ref={ref => this.password = ref} />
				{this.state.error && <p>Email e/ou Senha invalidos</p>}
				<button disabled={this.state.isLogging} onClick={this.handleLogin}>Entrar</button>
			</div>
		)
	}
}
export default Login