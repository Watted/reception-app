import React, {Component} from 'react';
import ReactTable from "react-table";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './TechniciansController.css';
import Popup from "reactjs-popup";


class TechniciansController extends Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: moment(),
            problem:'',
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
                    Cell: props =>{ return (<input type={'checkbox'} onChange={() => this.handleChecked(props.original.exceptionDisc)}/>)},
                    sortable: false,
                    filterable: false,
                    width:100,
                    maxWidth:100,
                    minWidth:100,
                }
            ],
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
                    Cell: props =>{ return (<p className={"link dim black underline ma0 pointer"} onClick={()=>{this.props.sendToTechnician(props.original.id,this.state.problem,this.state.startDate._d)}}>Send</p>)},
                    sortable: false,
                    filterable: false,
                    width:100,
                    maxWidth:100,
                    minWidth:100,
                }],
        }
    }

    componentWillMount(){
        let redData = this.props.kiosk.exceptions.filter((item,j)=>item.exType !== "YELLOW");
        let yellowData = this.props.kiosk.exceptions.filter((item,j)=>item.exType !== "RED");
        this.setState({redData:redData,yellowData: yellowData});
    }

    // update the date pick
    handleChange = date => this.setState({startDate: date });

    // update the checklist
    handleChecked = item =>this.setState({problem:item});

    // upload the list of technicians to table and select one of them to repair the kiosk that it has the problem
    render(){
        const contentStyle = {
            maxWidth: "600px",
            width: "90%",
            background: 'linear-gradient(89deg,#e6ffdb 0%,#8a8a8a  100%)'

    };

        return (
            <div>
                <Popup trigger={<button className="button">Notifications List</button>}
                       contentStyle={contentStyle}>
                    {close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header"> Notifications List </div>
                            <div className="content">
                                <ReactTable noDataText={'There is no exception...'}
                                            columns={this.state.columns2} data={this.state.yellowData}
                                            filterable={true} defaultSortDesc={true} defaultPageSize={4} minRows={5}/>
                            </div>
                    </div>
                        )}
                </Popup>
                <div >
                    <ReactTable className={'status-red-table'} noDataText={'There is no exception...'}
                                columns={this.state.columns1} data={this.state.redData}
                                filterable={true} defaultSortDesc={true} defaultPageSize={4} minRows={5}/>
                    <ReactTable className='status-yellow-table' noDataText={"Loading..."} columns={this.state.columns}
                                data={this.props.data}
                                filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>
                    <div style={{display: 'flex', justifyContent: 'flex-start', padding:10}}>
                        <label htmlFor={'date-picker'}>when he suppose to repair it: </label>
                        <DatePicker name={'date-picker'}
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                        />
                    </div>
                </div>


            </div>
        );
    }
};

export default TechniciansController;