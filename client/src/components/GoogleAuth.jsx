import React from 'react';
import styles from './style/app.css';

class GoogleAuth extends React.Component {
	constructor() {
		super();
		this.state = {	isSignedIn: null };
		this.onAuthChange = this.onAuthChange.bind(this);
		this.onSignIn = this.onSignIn.bind(this);
		this.onSignOut = this.onSignOut.bind(this);
		this.renderAuthButton = this.renderAuthButton.bind(this);
	}

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '166265351248-n671isu5alcpaqomoo3uar1j5ovp7agj.apps.googleusercontent.com',
				scope: 'email',
				prompt: 'select_account'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange();
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	onAuthChange() {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
		if (!this.auth.currentUser.get().getId()) this.props.setUser(0, '', '', '', false);
		else {
			this.props.setUser(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().getEmail(), this.auth.currentUser.get().getBasicProfile().getName(), this.auth.currentUser.get().getBasicProfile().getImageUrl(), this.auth.isSignedIn.get());
		}
	}

	onSignIn() {
		this.auth.signIn();
	}

	onSignOut() {
		this.auth.signOut();
	}

	renderAuthButton(isSignedIn) {
		if (isSignedIn === null) {
			return null;
		} else if (isSignedIn) {
			return (
				<button onClick={this.onSignOut} style={{position: 'fixed', top: '1%', left: '1%', border: 'none', color: '#f6f6f6', backgroundColor: '#252525', padding: '10px'}}>
					<ion-icon name="logo-google"></ion-icon>
						&nbsp;&nbsp;&nbsp;&nbsp;Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignIn} style={{position: 'fixed', top: '1%', left: '1%', border: 'none', color: '#f6f6f6', backgroundColor: 'transparent', padding: '10px'}}>
					<ion-icon name="logo-google"></ion-icon>
						&nbsp;&nbsp;&nbsp;&nbsp;Sign In with Google
				</button>
			);
		}
	}

	render() {
		const { isSignedIn } = this.state;
		return <div>{this.renderAuthButton(isSignedIn)}</div>;
	}

}

export default GoogleAuth;