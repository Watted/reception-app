import ReactTable from "react-table";
import React,{Component} from "react";
import NewTechnician from "../NewTechnician/NewTechnician";
import './Technicians.css';
import {getIPForDeleteUser, getIPForGetAllUsers} from "../../ServerIP/ServerIP";

class Technicians extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            route: 'list',
            data: [],
            columns: [
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'techName',
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                },
                {
                    Header: 'Action',
                    Cell: props => {
                        return (<p className={"link dim black underline ma0 pointer"} onClick={() => {
                            this.deleteTechnician(props.original.id)
                        }}>Delete</p>)
                    },
                    sortable: false,
                    filterable: false,
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100,
                }],
        };

    }

    // update the route
    onRouteChange = (route) => {
        this.setState({route: route});
    };

    // after render get the technicians from the database
    componentDidMount() {
        console.log("render");
        fetch(getIPForGetAllUsers())
            .then(response => response.json())
            .then(this.refresh);
    }

    // update the list
    refresh = (res) => {
        this.setState({data: res, isLoaded: true,});
    };

    // delete technician from the database with this id
    deleteTechnician = (id) => {
        fetch(getIPForDeleteUser() + id, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
            this.setState({isLoaded: false});
            this.componentDidMount();
        });
    };

    // upload the technicians table to add/delete technician
    render() {
        const {data, columns} = this.state;
        return (
            <div className='pa3 ma0 '>
                {this.state.route === 'list' ?
                    <div>
                        <div className={'header'}>
                            <p onClick={() => this.onRouteChange('newTechnician')}
                               className={"f3 link dim black underline pa3 pointer"}>Add New Technician</p>
                            <p className={"f3 link dim black underline pa3 pointer"}
                               onClick={() => this.props.onRouteChange('server', [])}>Back</p>
                        </div>
                        <ReactTable noDataText={"There is no Technicians"} columns={columns}
                                    data={data}
                                    filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>
                    </div>
                    : <div>
                        <NewTechnician componentDidMount={() => this.componentDidMount()}
                                       onRouteChange={this.onRouteChange}/>
                    </div>
                }
            </div>
        );
    };


};

export default Technicians;

