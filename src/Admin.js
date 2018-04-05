import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { auth } from './base'

import AdminCampanhas from './AdminCampanhas'
const AdminHome = props => <p>Seja Bem vindo</p>

class Admin extends Component{
	state = {
		isAuthing: true,
		isLoggedIn: false,
		user: null
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			this.setState({
				isAuthing: false,
				isLoggedIn: !!user,
				user
			})
		})
	}

	render() {
		if (this.state.isAuthing) {
			return <p>Aguarde...</p>
		}
		if (!this.state.isLoggedIn) {
			return <Redirect to='/login'/>
		}
		return (
			<div className='card'>
				<h1>Painel administrativo</h1>
				<Route path='/' component={AdminHome}/>
				<Route path={`${this.props.match.url}/campanhas`} component={AdminCampanhas}/>
			</div>
		)
	}
}

export default Admin