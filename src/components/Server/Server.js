import React, {Component} from 'react';
import Circle from "../Circle/Circle";

class Server extends Component {
    constructor(props){
        super(props);
        this.state ={
            id:'',
            name:'',
            kiosks : [],
            good:true,
            color:'green'
        }

    }

    componentWillMount(){
        const {id,name,kiosks,good} = this.props.server;
        if (good === false) {
            this.setState({color:'red',good:false});

        }
        console.log("heee" + good);
        this.setState({id:id ,name:name,kiosks: kiosks});


    }

    render(){
        return (
            <article className="pointer br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" onClick={()=>this.props.onRouteChange('kiosk',this.state.kiosks)}>
                <div className="tc">
                    <Circle bgColor={this.state.color} />
                    <h1 className="f3 mb2">{this.state.name}</h1>
                </div>
            </article>
        );
    }
};

export default Server;