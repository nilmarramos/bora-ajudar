import Rebase from 're-base'
import firebase from 'firebase'

const config = {
	apiKey: 'AIzaSyC4i2cEXOadTARRbKyZ615WPs0PUsFZQig',
	authDomain: 'bora-ajudar-15f8b.firebaseapp.com',
	databaseURL: 'https://bora-ajudar-15f8b.firebaseio.com',
	projectId: 'bora-ajudar-15f8b',
	storageBucket: '',
	messagingSenderId: '515990387757'
};
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export const auth = firebase.auth()

export default base