import React, {Component} from 'react';
import Circle from "../Circle/Circle";

class Server extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            kiosks: [],
            color: 'green'
        }

    }
    componentDidMount(){
       this.updateComponent();
    }

    // before render update the information about the server
    componentWillMount() {
        this.interval = setInterval(()=>{
            this.updateComponent();
        },10000);
    }

    updateComponent = () =>{
        const {id, name, kiosks, status} = this.props.server;
        this.setState({color: status});
        this.setState({id: id, name: name, kiosks: kiosks});
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // upload the server with handle the route
    render() {
        return (
            <article className="pointer br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
                     onClick={() => {
                         this.props.updateRoute(this.props.server.name);
                         this.props.onRouteChange('kiosk', this.state.kiosks)
                     }}>
                <div className="tc">
                    <Circle bgColor={this.state.color}/>
                    <h1 className="f3 mb2">{this.state.name}</h1>
                </div>
            </article>
        );
    }
};

export default Server;