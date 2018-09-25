import ReactTable from "react-table";
import React,{Component} from "react";
import {Link} from "react-router-dom";

class Technicians extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            data : [],
            columns:[
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                },
                {
                    Header: 'Type',
                    accessor: 'type',
                    sortable: false,
                    filterable: false,
                },
                {
                    Header: 'Action',
                    Cell: props =>{ return (<p className={"link dim black underline ma0 pointer"} onClick={()=>{this.deleteTechnician(props.original.id)}}>Delete</p>)},
                    sortable: false,
                    filterable: false,
                    width:100,
                    maxWidth:100,
                    minWidth:100,
                }],
        };

    }


    componentDidMount() {
        console.log("render");
        fetch('http://localhost:4000/users')
            .then(response => response.json())
            .then(users => {
                console.log(users);
                this.setState({data:users,isLoaded:true,});

            });
    }

    deleteTechnician = (id) =>{
        const index = this.state.data.findIndex(post => {
            return post.id === id;
        });
        this.setState(state=>({data: state.data.filter((row,j)=>j !== index)}));
    };


    render() {
        const {isLoaded,data,columns} = this.state;
        return (
            <div className='pa3 ma0 '>
                    <Link to={"/technicians/new"}><p className={"f3 link dim black underline pa3 pointer"} >Add New Technician</p></Link>
                    <button onClick={()=>this.props.onRouteChange('server',[])}>Back</button>
                {isLoaded ?
                    <ReactTable noDataText={"There is no Technicians"} columns={columns}
                                data={data}
                                filterable={true} defaultSortDesc={true} defaultPageSize={5} minRows={5}/>
                    : <div>Loading...</div>
                }
            </div>
        );
    };


};

export default Technicians;

