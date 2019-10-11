import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions'

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '840949472308-4q0g97fohi1j4250o7mc2s2fmpsnspm1.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            const currentUser = this.auth.currentUser.get();
            const email = currentUser.getBasicProfile().getEmail().split('@')[0];
            console.log(email);
            this.props.signIn(currentUser.getId(), currentUser.getBasicProfile().getImageUrl(), email);
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButtons() {
        if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign out
                </button>
            )
        } else if(this.props.isSignedIn === null) {
            return null;
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButtons()}</div>
    }
}

const mapStateToProps = (state) => {
   return { 
       isSignedIn: state.auth.isSignedIn,
       userId: state.auth.userId,
       imageUrl: state.auth.imageUrl,
       username: state.auth.username
    }
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth);