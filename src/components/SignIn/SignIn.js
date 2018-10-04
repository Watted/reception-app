import React from 'react';


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
        fetch('http://10.0.0.58:8080/auth/signin/' + this.state.signInEmail, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: this.state.signInPassword
            })
        }).then(response => response.json())
            .then(user => {
                console.log(user);
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange(user.type);
                }
            }).catch(res=>this.setState({details:"Username or password incorrect"}));
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
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Sign in"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default SignIn;