import React, {Component} from 'react';

class Server extends Component {
    constructor(props){
        super(props);
        this.state ={
            id:'',
            name:'',
            kiosks : [],
        }

    }

    componentWillMount(){
        const {id,name,kiosks} = this.props.server;
        this.setState({id:id ,name:name,kiosks: kiosks});
    }

    render(){
        return (
            <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10" onClick={()=>this.props.onRouteChange('kiosk',this.state.kiosks)}>
                <div className="tc">
                    <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h4 w4 dib ba b--black-05 pa2"
                         title={this.state.id} alt={''}/>
                    <h1 className="f3 mb2">{this.state.name}</h1>
                </div>
            </article>
        );
    }
};

export default Server;