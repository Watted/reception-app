import React , {Component} from 'react';
import Technicians from "../Technicians/Technicians";
import 'react-table/react-table.css';
import './Admin.css';
import Server from "../Server/Server";
import Kiosks from "../Kiosks/Kiosks";
import ReactTable from "react-table";

class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {
            servers:[],
            route:'server',
            kiosks:[],
            kiosk:null,
            data : [],
            columns:[
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
                    Cell: props =>{ return (<p className={"link dim black underline ma0 pointer"} onClick={()=>{this.sendToTechnician(props.original.id)}}>Send</p>)},
                    sortable: false,
                    filterable: false,
                    width:100,
                    maxWidth:100,
                    minWidth:100,
                }],
        }
    }
    componentDidMount() {
        fetch('http://10.0.0.58:8080/servers/all')
            .then(response => response.json())
            .then(servers => {
                console.log(servers);
                this.setState({servers:servers});

            });
    }

    updateState = (user)=>{
      this.setState({data:user});
    };


    onRouteChange = (route,kiosks) =>{
        this.setState({route:route,kiosks:kiosks});
    };

    onRouteChangeTech = (route,kiosk) =>{
        this.setState({route:route,kiosk:kiosk});
    };

    sendToTechnician = (techID) =>{
        console.log("id:  " + techID);
        console.log("kiosk: " + this.state.kiosk.id);
        fetch('http://10.0.0.58:8080/users/assign',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                techID:techID,
                kiosk: this.state.kiosk,
            }),
        }).then(response => response.json())
            .then(kiosk => {
                console.log(kiosk);
            });
        this.onRouteChange('server');

    };


    render(){
        return(
                <div className='pa3 ma0 '>
                    {this.state.route === 'server'?
                        <div>
                            <p className={"f4 link dim black underline pa3 pointer"} onClick={()=>this.onRouteChange('listTechnician',[])}>Technician List</p>
                            <div style={{display: 'flex'}}>
                                {this.state.servers.map((server, id) => {
                                    return <Server onRouteChange={this.onRouteChange} server={server} key={id}/>
                                })}
                            </div>
                        </div>
                        :(
                            this.state.route === 'kiosk' ?
                                <div>
                                    <p onClick={() => this.onRouteChange('server',[])} className='f3 link dim black underline pa3 pointer'>Back</p>
                                    <div style={{display: 'flex'}}>
                                        {this.state.kiosks.map((kiosk, id) => {
                                            return <Kiosks updateState={this.updateState} onRouteChangeTech={this.onRouteChangeTech} kiosk={kiosk} key={id}/>
                                        })}
                                    </div>
                                </div>
                                :(this.state.route === 'listTechnician' ?
                                        <Technicians onRouteChange={this.onRouteChange} />
                                    :
                                    <ReactTable noDataText={"There is no Technicians away"} columns={this.state.columns}
                                                data={this.state.data}
                                                filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>
                                )
                        )

                    }

                </div>
        );
    }
}

export default Admin;