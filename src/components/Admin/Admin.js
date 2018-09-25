import React , {Component} from 'react';
import Technicians from "../Technicians/Technicians";
import 'react-table/react-table.css';
import './Admin.css';
import Server from "../Server/Server";
import Kiosks from "../Kiosks/Kiosks";

class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {
            servers:[],
            route:'server',
            kiosks:[],
        }
    }
    componentDidMount() {
        console.log("render");
        fetch('http://10.0.0.58:8080/servers/all')
            .then(response => response.json())
            .then(servers => {
                console.log(servers);
                this.setState({servers:servers});

            });
    }


    onRouteChange = (route,kiosks) =>{
        this.setState({route:route,kiosks:kiosks});
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
                                            return <Kiosks onRouteChange={this.onRouteChange} kiosk={kiosk} key={id}/>
                                        })}
                                    </div>
                                </div>
                                :
                                <Technicians onRouteChange={this.onRouteChange} />
                        )

                    }

                </div>
        );
    }
}

export default Admin;