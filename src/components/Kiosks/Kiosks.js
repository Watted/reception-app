import React, {Component} from 'react';
import Circle from "../Circle/Circle";


class Kiosks extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'',
        }
    }

    componentWillMount(){
        if(this.props.kiosk.good){
            this.setState({color:'green'});
        }else{
            if (this.props.kiosk.exceptions) {
                this.setState({color:'red'});
            }
        }
        console.log("exception:  " + this.props.kiosk.exceptions);
    }

    render(){
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="tc">
                   <Circle bgColor={this.state.color}/>
                        <h1 className="f3 mb2">{this.props.kiosk.hotelName}</h1>
                        <h2 className="f5 fw4 gray mt0">{this.props.kiosk.exceptions}</h2>
                </div>
            </article>
        );
    }
};

export default Kiosks;