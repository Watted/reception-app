import React, {Component} from 'react';
import ReactTable from "react-table";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class TechniciansController extends Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: moment(),
            problem:'',
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

    // update the date pick
    handleChange = date => this.setState({startDate: date });

    // update the checklist
    handleChecked = item =>this.setState({problem:item});

    // upload the list of technicians to table and select one of them to repair the kiosk that it has the problem
    render(){
        return (
            <div>
                <ReactTable className='tech-table' noDataText={"There is no Technicians away"} columns={this.state.columns}
                            data={this.props.data}
                            filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>
                <div style={{display: 'flex', justifyContent: 'flex-start', padding:10}}>
                    <label htmlFor={'date-picker'}>when he suppose to repair it: </label>
                        <DatePicker name={'date-picker'}
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                    {this.props.kiosk.exceptions.map((item,id)=>{
                            return (<label style={{padding:5}} key={id}><input name={id} type={'checkbox'} onChange={()=>this.handleChecked(item.exceptionDisc)}/>{item.exceptionDisc}</label>)
                            }
                        )
                    }
                </div>

            </div>
        );
    }
};

export default TechniciansController;