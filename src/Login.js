import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    // setting initial state for user signin/out for username and password
    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
    }

    handleSignIn = async () => {
        // making a request to our signin route on our API and checking with the data on our server
        const signIn = await request.post(`https://guarded-lake-55222.herokuapp.com/api/auth/signin`, {
            username: this.state.usernameSignIn,
            password: this.state.passwordSignIn,
        })
        // setting the user object into local storage to so we can navigate to other pages after we log in 
        localStorage.setItem('user', JSON.stringify(signIn.body));
        // this redirects the user after sign in
        this.props.history.push('/');
    }
    
    handleSignUp = async () => {
        const signUp = await request.post(`https://guarded-lake-55222.herokuapp.com/api/auth/signup`, {
            username: this.state.usernameSignUp,
            password: this.state.passwordSignUp,
        })

        localStorage.setItem('user', JSON.stringify(signUp.body));
        // this redirects the user after sign up
        this.props.history.push('/');
    }
    
    
    render() {
        return (
            // all of these inputs are going to set state to our inputted values and then run our handleSignUp and handleSignIn methods
            <div>Username* 
                <input value={ this.state.usernameSignUp} onChange={(e) => this.setState({ usernameSignUp: e.target.value})} />
                Password*
                <input value={ this.state.passwordSignUp} onChange={(e) => this.setState({ passwordSignUp: e.target.value})} />

                <button onClick={ this.handleSignUp }>Sign up</button>  
        
                <br />
                Username*
                <input value={ this.state.usernameSignIn} onChange={(e) => this.setState({ usernameSignIn: e.target.value})} />
                Password*
                <input value={ this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value})} />

                <button onClick={this.handleSignIn}>Sign in</button>
            </div>
        )
    }
}
