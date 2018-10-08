import React , {Component} from 'react';
import 'react-table/react-table.css';
import {getIPForTechProblem, getIPForUpdateTechProblem} from "../../ServerIP/ServerIP";
import ReactTable from "react-table";


class TechnicianUI extends Component{

    constructor(props){
        super(props);
        this.state ={
            isLoaded:false,
            data:[],
            columns: [
                {
                    Header: 'Problem',
                    accessor: 'problem',
                },
                {
                    Header: 'Mac Address',
                    accessor: 'macAdd',
                },
                {
                    Header: 'Date',
                    accessor: 'date',
                },
                {
                    Header: 'Action',
                    Cell: props => {
                        return (<p className={"link dim black underline ma0 pointer"} onClick={() => {
                            console.log(props.original);
                            this.checkedProblem(props.original);
                        }}>Checked</p>)
                    },
                    sortable: false,
                    filterable: false,
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100,
                }],
        }
    }

    componentDidMount(){
        fetch(getIPForTechProblem() + this.props.techMail)
            .then(response => response.json())
            .then(this.refresh);
    }

    // update the list
    refresh = (res) => {
        console.log(res);
        this.setState({data: res, isLoaded:true});
    };

    checkedProblem = (jobs)=>{
        console.log(jobs.problem);
        fetch(getIPForUpdateTechProblem()+ this.props.techMail+'/'+jobs.problem+
            '/'+jobs.macAdd+
            '/'+jobs.date,{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                //job: jobs,
            })
        }).then(user => {
                console.log(user);
                this.componentDidMount();
            });
    };

    render(){
        const {data, columns} = this.state;
        return(
            <div className='ma0 pa3 '>
                <div>
                    <ReactTable noDataText={this.state.isLoaded?"There is no notifications...":"Loading..."} columns={columns}
                                data={data}
                                filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>
                </div>
            </div>
        );
    }
}

export default TechnicianUI;