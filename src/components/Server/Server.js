import React, {Component} from 'react';
import Circle from "../Circle/Circle";

class Server extends Component {
    constructor(props){
        super(props);
        this.state ={
            id:'',
            name:'',
            kiosks : [],
            good:null,
            color:''
        }

    }

    componentWillMount(){
        const {id,name,kiosks,good} = this.props.server;
        this.setState({id:id ,name:name,kiosks: kiosks});

        if(good){
            this.setState({color:'green'});
        }else{
            if (this.props.kiosk.exceptions) {
                this.setState({color:'red'});
            }
        }
    }

    render(){
        return (
            <article className="pointer br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" onClick={()=>this.props.onRouteChange('kiosk',this.state.kiosks)}>
                <div className="tc">
                    <Circle bgColor={'green'} />
                    <h1 className="f3 mb2">{this.state.name}</h1>
                </div>
            </article>
        );
    }
};

export default Server;