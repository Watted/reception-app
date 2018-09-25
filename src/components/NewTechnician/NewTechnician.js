import React, {Component} from 'react';
import Field from "../Field/Field";
import {Link} from "react-router-dom";

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
    };

    render(){
        return(
            <div>
                <Link to='/technicians'><button className="new-user-back-btn">Back</button></Link>
                <div className={"new-user-wrapper"}>
                    <h2 className='new-user-header'>Create new user</h2>
                    <Field name={'name'} type={'text'} onChange={this.updateField}/>
                    <Field name={'email'} type={'text'} onChange={this.updateField}/>
                    <Field name={'password'} type={'text'} onChange={this.updateField}/>
                    <p hidden={!this.state.message}>{this.state.message}</p>
                    <Link to={'/technicians'}> <button onClick={this.onCreateNewUser} className="create-new-user-btn"
                                                       disabled={!this.state.user.name|| !this.state.user.email || !this.state.user.password} type="button">Create</button></Link>
                </div>
            </div>
        );
    }
};

export default NewTechnician;