import ReactTable from "react-table";
import React,{Component} from "react";
import {Link} from "react-router-dom";
import uuid from 'uuid/v1';

class Technicians extends Component{

    constructor(props) {
        super(props);
        this.state={
            user:{
                id:uuid(),
                name: "",
                email: "",
                password: "",
                type:"Technician",
            }
        }
    }


    render() {
        return (
            <div className='pa3 ma0 '>
                    <Link to={"/technicians/new"}><p className={"f3 link dim black underline pa3 pointer"} >Add New Technician</p></Link>
                    <Link to={"/home"}><button>Back</button></Link>
                    <ReactTable noDataText={"There is no Technicians"} columns={this.props.columns} data={this.props.data}
                                filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>
            </div>
        );
    };


};

export default Technicians;

