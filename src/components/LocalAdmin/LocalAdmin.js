import React , {Component} from 'react';
import 'react-table/react-table.css';
import Kiosks from "../Kiosks/Kiosks";
import {getIPForGetKioksForServer, tenSeconds} from "../../ServerIP/ServerIP";
import ReactTable from "react-table";


class LocalAdmin extends Component{

    constructor(props){
        super(props);
        this.state ={
            server:null,
            isLoaded:false,
            route:'kiosks',
            kioskRoute:'',
            kiosk:null,
            redData:[],
            yellowData:[],
            columns2:[
                {
                    Header: 'Exception',
                    accessor: 'exceptionDisc',
                },
                {
                    Header: 'Date',
                    accessor: 'date',
                },
                {
                    Header: 'Status',
                    accessor:'exType',
                    sortable: false,
                    filterable: false,
                },
            ],
            columns1:[
                {
                    Header: 'Exception',
                    accessor: 'exceptionDisc',
                },
                {
                    Header: 'Date',
                    accessor: 'date',
                },
                {
                    Header: 'Status',
                    accessor:'exType',
                    sortable: false,
                    filterable: false,
                },
                {
                    Header: 'Checked',
                    Cell: props =>{ return (<p className={"link dim black underline ma0 pointer"} onClick={()=>{this.sendToHotel(props.original.exceptionDisc)}}>Send</p>)},
                    sortable: false,
                    filterable: false,
                    width:100,
                    maxWidth:100,
                    minWidth:100,
                }
            ],

        }
    };

    componentDidMount(){
        this.updateComponent();

    }

    updateComponent = ()=>{
        console.log(this.props.serverIdForAdmin);
        fetch(getIPForGetKioksForServer()+this.props.serverIdForAdmin)
            .then(response => response.json())
            .then(server => {
                console.log(server);
                this.setState({server: server,isLoaded: true});

            });
    };
    // after render get all the servers from the server
    componentWillMount() {
        this.interval = setInterval(() =>{
            this.updateComponent();
        }, tenSeconds);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    updateKioskRoute = (route) => {
        this.setState({kioskRoute: route})
    };

    sendToHotel =(exception) =>{
        console.log("send: "+ exception);
    };

    onRouteChangeTech = (route, kiosk) => {
        if (!kiosk.good) {
            let redData = kiosk.exceptions.filter((item,j)=>item.exType !== "YELLOW");
            let yellowData = kiosk.exceptions.filter((item,j)=>item.exType !== "RED");
            this.setState({route: route, kiosk: kiosk,redData:redData,yellowData: yellowData});
        }
    };

    onRouteChange = (route) => {
        this.setState({route: route});
    };

    render(){
        return(
            <div className='ma0'>
                {this.state.isLoaded === false ?
                    <div>Loading....</div> :
                    (this.state.route === 'kiosks' ?
                            <div>
                                <p className='f2 dim black underline'>{this.props.serverIdForAdmin}</p>
                                <div style={{display: 'flex'}}>
                                    {this.state.server.kiosks.map((kiosk, id) => {
                                        return <Kiosks onRouteChangeTech={this.onRouteChangeTech}
                                                       updateKioskRoute={this.updateKioskRoute}
                                                       kiosk={kiosk} key={id}/>
                                    })}
                                </div>
                            </div>
                            :

                            <div>
                                <div>
                                    <p onClick={() => {
                                        this.updateKioskRoute('');
                                        this.onRouteChange('kiosks')
                                    }}
                                       className='f3 link dim black underline pointer'>Back</p>
                                </div>
                                <div>
                                    <ReactTable className={'status-red-table'} noDataText={'There is no exception...'}
                                                columns={this.state.columns2} data={this.state.redData}
                                                filterable={true} defaultSortDesc={true} defaultPageSize={5}
                                                minRows={5}/>
                                    <ReactTable className='status-yellow-table' noDataText={"Loading..."}
                                                columns={this.state.columns1}
                                                data={this.state.yellowData}
                                                filterable={true} defaultSortDesc={true} defaultPageSize={5}
                                                minRows={5}/>
                                </div>


                            </div>
                    )
                }
            </div>
        );
    }
}

export default LocalAdmin;