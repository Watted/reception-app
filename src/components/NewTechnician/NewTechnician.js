import React, {Component} from 'react';
import Field from "../Field/Field";
import {Link} from "react-router-dom";
import uuid from "uuid/v1";

class NewTechnician extends Component{

    constructor(props) {
        super(props);
        this.state={
            user:{
                id:uuid(),
                name: "",
                username: "",
                password: "",
                type:"Technician",
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

    render(){
        return(
            <div>
                <Link to='/technicians'><button className="new-user-back-btn">Back</button></Link>
                <div className={"new-user-wrapper"}>
                    <h2 className='new-user-header'>Create new user</h2>
                    <Field name={'name'} type={'text'} onChange={this.updateField}/>
                    <Field name={'username'} type={'text'} onChange={this.updateField}/>
                    <Field name={'password'} type={'text'} onChange={this.updateField}/>
                    <p hidden={!this.state.message}>{this.state.message}</p>
                    <Link to={'/technicians'}> <button onClick={()=>this.props.onCreateNewUser(this.state.user)} className="create-new-user-btn"
                                                       disabled={!this.state.user.name|| !this.state.user.username || !this.state.user.password} type="button">Create</button></Link>
                </div>
            </div>
        );
    }
};

export default NewTechnician;