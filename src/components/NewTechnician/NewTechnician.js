import React, {Component} from 'react';
import Field from "../Field/Field";

class NewTechnician extends Component{

    constructor(props) {
        super(props);
        this.state={
            user:{
                name: "",
                email: "",
                password: "",
            }
        }
    }

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
    onCreateNewUser = () =>{
         fetch('http://localhost:4000/technician',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.user.email,
                password: this.state.user.password,
                name: this.state.user.name,
            })
        }).then(response => response.json())
            .then(user => {
              console.log(user);
            });
         this.props.onRouteChange('list');
    };

    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className={"new-user-wrapper"}>
                    <h2 className='new-user-header'>Create new user</h2>
                    <Field name={'name'} type={'text'} onChange={this.updateField}/>
                    <Field name={'email'} type={'text'} onChange={this.updateField}/>
                    <Field name={'password'} type={'text'} onChange={this.updateField}/>
                    <p hidden={!this.state.message}>{this.state.message}</p>
                    <p className={"f3 link dim black underline pa3 pointer"} onClick={()=>this.props.onRouteChange('list')}>Back</p>
                    <button onClick={this.onCreateNewUser} className="create-new-user-btn"
                                                           disabled={!this.state.user.name|| !this.state.user.email || !this.state.user.password} type="button">Create</button>
                </div>
            </article>
        );
    }
};

export default NewTechnician;