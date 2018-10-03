import React , {Component} from 'react';
import Technicians from "../Technicians/Technicians";
import 'react-table/react-table.css';
import Server from "../Server/Server";
import Kiosks from "../Kiosks/Kiosks";
import TechniciansController from "../TechniciansController/TechniciansController";

class TechnicianUI extends Component{

    constructor(props){
        super(props);
        this.state = {
            servers:[],
            route:'server',
            kiosks:[],
            kiosk:null,
            data:[],
            serverRoute:'',
            kioskRoute:''

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
        if (!kiosk.good) {
            this.setState({route: route, kiosk: kiosk});
        }
    };

    sendToTechnician = (techID,problem,date1) =>{
        const macAddress = this.state.kiosk.macAddress;
        const date = date1.toString();
        fetch('http://10.0.0.58:8080/users/assign/'+techID+'/'+macAddress+'/'+problem+'/'+date,{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            /*body: JSON.stringify({
                job: job,
            }),*/
        });
        this.onRouteChange('server');

    };
    updateServerRoute = (route)=> {this.setState({serverRoute:route})};
    updateKioskRoute = (route)=>{this.setState({kioskRoute:route})};

    render(){
        return(
            <div className='ma0 '>
                {this.state.route === 'server'?
                    <div>
                        <p className={"f4 link dim black underline pointer"} onClick={()=>this.onRouteChange('listTechnician',[])}>Technician List</p>
                        <div style={{display: 'flex'}}>
                            {this.state.servers.map((server, id) => {
                                return <Server onRouteChange={this.onRouteChange} server={server} updateRoute={this.updateServerRoute} key={id}/>
                            })}
                        </div>
                    </div>
                    :(
                        this.state.route === 'kiosk' ?
                            <div>
                                <p onClick={() => this.onRouteChange('server',[])} className='f3 link dim black underline pointer'>Back</p>
                                <p onClick={() => this.onRouteChange('server',[])} className='f3 link dim black underline pointer'>
                                    {this.state.serverRoute}</p>
                                <div style={{display: 'flex'}}>
                                    {this.state.kiosks.map((kiosk, id) => {
                                        return <Kiosks updateState={this.updateState} onRouteChangeTech={this.onRouteChangeTech}
                                                       updateKioskRoute={this.updateKioskRoute}
                                                       kiosk={kiosk} key={id}/>
                                    })}
                                </div>
                            </div>
                            :(this.state.route === 'listTechnician' ?

                                <Technicians onRouteChange={this.onRouteChange} />
                                :
                                <div>
                                    <p onClick={() =>{this.updateKioskRoute('');
                                        this.onRouteChange('kiosk',this.state.kiosks)}}
                                       className='f3 link dim black underline pointer'>Back</p>
                                    <p onClick={() =>{this.updateKioskRoute('');
                                        this.onRouteChange('kiosk',this.state.kiosks)}}
                                       className='f3 link dim black underline pointer'>
                                        {this.state.serverRoute+'->'+this.state.kioskRoute}</p>
                                    <TechniciansController sendToTechnician={this.sendToTechnician} kiosk={this.state.kiosk} data={this.state.data}/>
                                </div>

                            )
                    )

                }
            </div>
        );
    }
}

export default TechnicianUI;