import React from 'react';
import {getIPForSignIn} from "../../ServerIP/ServerIP";
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';



class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            details:''
        }
    }

    // handle the event of the username
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    };

    // handle the event of the password
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    };

    // post to the server thee username and password to sign in
    onSubmitSignIn = () => {
        var authenticationData = {
            Username : this.state.signInEmail,
            Password : this.state.signInPassword,
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : 'us-east-2_xJqEhZxoR', // Your user pool id here
            ClientId : '7tb5udokv621igkmivpm23fecn'
        };
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username : this.state.signInEmail,
            Pool : userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess:  (result)=> {
                var accessToken = result.getAccessToken().getJwtToken();
                fetch(getIPForSignIn(), {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        accessToken: accessToken
                    })
                }).then(response => response.json())
                    .then(user => {
                        console.log(user);
                        if (user.id) {
                            this.props.loadUser(user);
                            this.props.onRouteChange(user.type);
                        }
                    }).catch(res=>this.setState({details:"Username or password incorrect"}));

                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                /*AWS.config.region = '<region>';

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : '...', // your identity pool id here
                    Logins : {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                    }
                });

                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();
                        console.log('Successfully logged!');
                    }
                });*/
            },

            onFailure: (err)=> {
                console.log(err);
            },

        });
    };

    // sign in form
    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                       className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                       className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"/>
                            </div>
                            <p className={'details-incorrect'}><span>{this.state.details}</span></p>
                        </fieldset>
                        <div>
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button" value="Sign in"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default SignIn;