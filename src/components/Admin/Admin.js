import React , {Component} from 'react';
import Technicians from "../Technicians/Technicians";
import 'react-table/react-table.css';
import uuid from 'uuid/v1';
import {Link, Route, Switch} from "react-router-dom";

import './Admin.css';
import NewTechnician from "../NewTechnician/NewTechnician";

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
                {id: uuid(),name:'Mohammed',email:'wattk308@gmail.com',type:'Technician'},
                {id: uuid(),name:'Abed',email:'abed@gmail.com',type:'Technician'},
                {id: uuid(),name:'Ahmad',email:'ahmad@gmail.com',type:'Technician'},
                {id: uuid(),name:'Omar',email:'omar@gmail.com',type:'Technician'}],
            columns:[
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                },
                {
                    Header: 'Type',
                    accessor: 'type',
                    sortable: false,
                    filterable: false,
                },
                {
                    Header: 'Action',
                    Cell: props =>{ return (<p className={"link dim black underline ma0 pointer"} onClick={()=>{this.deleteTechnician(props.original.id)}}>Delete</p>)},
                    sortable: false,
                    filterable: false,
                    width:100,
                    maxWidth:100,
                    minWidth:100,
                }],
        }
    }



    onCreateNewUser = (technician)=>{
        let data = this.state.data;
        data.push(technician);
        this.setState({...this.state,data:data});
        console.log(this.state.data);
    };

    deleteTechnician = (id) =>{
        const index = this.state.data.findIndex(post => {
            return post.id === id;
        });
        this.setState(state=>({data: state.data.filter((row,j)=>j !== index)}));
    };

    technicianRender = () =>(<Technicians addTechnicianRender={this.addTechnicianRender} onCreateNewUser={this.onCreateNewUser} columns={this.state.columns} data={this.state.data} filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>);

    addTechnicianRender = () => (<NewTechnician onCreateNewUser={this.onCreateNewUser}/>);

    render(){
        return(
                <div className='pa3 ma0 '>
                    <Link to={'/technicians'}><p className={"f4 link dim black underline pa3 pointer"}>Technician List</p></Link>
                    <div>
                        <Switch>
                            <Route exact={true} path='/technicians' render={this.technicianRender}/>
                            <Route exact={true} path="/technicians/new" render={this.addTechnicianRender}/>
                        </Switch>
                    </div>
                </div>
        );
    }
}

export default Admin;