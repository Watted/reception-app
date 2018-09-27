import React, {Component} from 'react';
import Circle from "../Circle/Circle";


class Kiosks extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'',

        }
    }

    componentDidMount(){
        fetch('http://localhost:4000/users/all')
            .then(response => response.json())
            .then(user => {
                console.log(user);
                this.props.updateState(user);

            });
        if(this.props.kiosk.good){
            this.setState({color:'green'});
        }else{
            this.setState({color:'red'});
        }
        console.log('kiosk: ' + this.props.kiosk.good);
    }


    render(){
        return (
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" onClick={()=>this.props.onRouteChangeTech('listTech',this.props.kiosk)}>
                        <div className="tc">
                            <Circle bgColor={this.state.color}/>
                            <h1 className="f3 mb2">{this.props.kiosk.hotelName}</h1>
                            <h2 className="f5 fw4 gray mt0">{this.props.kiosk.exceptions.desc}</h2>
                        </div>
                    </article>

        );
    }
};

export default Kiosks;