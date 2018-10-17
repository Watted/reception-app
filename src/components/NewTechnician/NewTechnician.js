import React, {Component} from 'react';
import Field from "../Field/Field";
import './NewTechnician.css';
import {getIPForAddNewTech} from "../../ServerIP/ServerIP";
import {CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";


class NewTechnician extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message:'',
            route:'create',
            user: {
                name: "",
                email: "",
                password: "",
                confirm:''
            }
        }
    }

    // to handle the event of the field
    updateField = (fieldName, value) => {
        this.setState(prevState => {
            return {
                user: {
                    ...this.state.user,
                    [fieldName]: value
                }
            }
        })
    };

    onConfirm = ()=>{
        var poolData = {
            UserPoolId : 'us-east-2_xJqEhZxoR', // Your user pool id here
            ClientId : '7tb5udokv621igkmivpm23fecn' // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username : this.state.user.email,
            Pool : userPool
        };

        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(this.state.user.confirm, true, (err, result)=> {
            if (err) {
                this.setState({message:err.message});
                return;
            }else{
                console.log('confirm result: ' + result);
                this.props.componentDidMount();
                this.props.onRouteChange('list');
            }
        });
    };

    // update the new user in the database
    // post to the server the new technician
    onCreateNewUser = () => {

        var poolData = {
            UserPoolId : 'us-east-2_xJqEhZxoR', // Your user pool id here
            ClientId : '7tb5udokv621igkmivpm23fecn' // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);

        var attributeList = [];

        var dataEmail = {
            Name: 'email',
            Value: this.state.user.email
        };


        var attributeEmail = new CognitoUserAttribute(dataEmail);


        attributeList.push(attributeEmail);

        userPool.signUp(this.state.user.email, this.state.user.password, attributeList, null, (err, result)=>{
            if (err) {
                console.log(err);
                this.setState({message: err.message});
                return;
            }else {
                var cognitoUser = result.user;
                fetch(getIPForAddNewTech(), {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: this.state.user.email,
                        name: this.state.user.name
                    })
                }).then(user => {
                    console.log(user);
                    console.log('user name is ' + cognitoUser.getUsername());
                    this.setState({route: 'confirm',message:''});
                });

            }
        });
    };

    // upload the form of new technician
    render() {
        return (
            <div>
                {this.state.route === 'create' ?
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
                        <div className={"new-user-wrapper"}>
                            <h2 className='new-user-header'>Create new user</h2>
                            <Field name={'name'} type={'text'} onChange={this.updateField}/>
                            <Field name={'email'} type={'text'} onChange={this.updateField}/>
                            <Field name={'password'} type={'password'} onChange={this.updateField}/>
                            <p hidden={!this.state.message}>{this.state.message}</p>
                            <div className={'footer'}>
                                <button type='button' className={"back-user-btn"}
                                        onClick={() => this.props.onRouteChange('list')}>Back
                                </button>
                                <button onClick={this.onCreateNewUser} className="create-new-user-btn"
                                        disabled={!this.state.user.name || !this.state.user.email || !this.state.user.password}
                                        type="button">Create
                                </button>

                            </div>
                        </div>
                    </article>
                    : <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
                        <div className={"new-user-wrapper"}>
                            <h2 className='new-user-header'>Create new user</h2>
                            <Field name={'confirm'} type={'text'} onChange={this.updateField}/>
                            <p hidden={!this.state.message}>{this.state.message}</p>
                            <div className={'footer'}>
                                <button type='button' className={"back-user-btn"}
                                        onClick={() => this.props.onRouteChange('list')}>Back
                                </button>
                                <button onClick={this.onConfirm} className="create-new-user-btn"
                                        disabled={!this.state.user.confirm}
                                        type="button">Confirm
                                </button>
                            </div>
                        </div>
                    </article>
                }
            </div>
        );
    }
};

export default NewTechnician;