import ReactTable from "react-table";
import React,{Component} from "react";
import NewTechnician from "../NewTechnician/NewTechnician";
import './Technicians.css';
import {getIPForDeleteUser, getIPForGetAllUsers, poolData} from "../../ServerIP/ServerIP";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";

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
                            this.deleteTechnician(props.original.email,props.original.id)
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
    // delete technician from AWS cognito
    deleteTechnician = (email,id) => {

        var authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: 'm123456789!',
        });


        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username : email,
            Pool : userPool
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess:  (result)=> {
                cognitoUser.deleteUser((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully deleted the user.");
                        console.log(result);
                        fetch(getIPForDeleteUser() + id, {
                            method: 'delete',
                            headers: {'Content-Type': 'application/json'},
                        }).then(res => {
                            this.setState({isLoaded: false});
                            this.componentDidMount();
                        });
                    }
                });
            },
            onFailure: function (err) {
                console.log(err);
            },
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
                        <ReactTable noDataText={"Loading..."} columns={columns}
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

