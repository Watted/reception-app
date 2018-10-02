import React , {Component} from 'react';
import Technicians from "../Technicians/Technicians";
import 'react-table/react-table.css';
import './Admin.css';
import Server from "../Server/Server";
import Kiosks from "../Kiosks/Kiosks";
import TechniciansController from "../TechniciansController/TechniciansController";

class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {
            servers:[],
            route:'server',
            kiosks:[],
            kiosk:null,
            data:[],

        }
    }
    componentDidMount() {
        fetch('http://localhost:4000/servers/all')
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

    sendToTechnician = (techID,problem,date) =>{
        console.log("problem:  " + problem +' date: ' + date);
        const macAddress = this.state.kiosk.macAddress;
        fetch('http://localhost:4000/users/assign',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                techID:techID,
                job: {macAddress,problem,date},
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
                                    <TechniciansController sendToTechnician={this.sendToTechnician} kiosk={this.state.kiosk} data={this.state.data}/>
                                )
                        )

                    }

                </div>
        );
    }
}

export default Admin;