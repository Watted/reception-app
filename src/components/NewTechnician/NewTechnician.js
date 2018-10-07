import React, {Component} from 'react';
import Field from "../Field/Field";
import './NewTechnician.css';

class NewTechnician extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
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

    // update the new user in the database
    // post to the server the new technician
    onCreateNewUser = () => {

        const email = this.state.user.email;
        const name = this.state.user.name;
        fetch('http://10.0.0.58:8080/users/addTech/' + name + '/' + email, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                 password: this.state.user.password,
             })
        }).then(user => {
            console.log(user);
            this.props.componentDidMount();
        });
        this.props.onRouteChange('list');
    };

    // upload the form of new technician
    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
                <div className={"new-user-wrapper"}>
                    <h2 className='new-user-header'>Create new user</h2>
                    <Field name={'name'} type={'text'} onChange={this.updateField}/>
                    <Field name={'email'} type={'text'} onChange={this.updateField}/>
                    <Field name={'password'} type={'password'} onChange={this.updateField}/>
                    <p hidden={!this.state.message}>{this.state.message}</p>
                    <div className={'footer'}>
                        <button type='button' className={"back-user-btn"}
                           onClick={() => this.props.onRouteChange('list')}>Back</button>
                        <button onClick={this.onCreateNewUser} className="create-new-user-btn"
                                disabled={!this.state.user.name || !this.state.user.email || !this.state.user.password}
                                type="button">Create
                        </button>
                    </div>
                </div>
            </article>
        );
    }
};

export default NewTechnician;