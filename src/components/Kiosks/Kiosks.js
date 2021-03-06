import React, {Component} from 'react';
import Circle from "../Circle/Circle";
import {tenSeconds} from "../../ServerIP/ServerIP";


class Kiosks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
        }
    }

    // after render get all the technician from the server and handle the color of server
    componentDidMount() {
        this.updateComponent();
    }

    updateComponent = ()=>{
        console.log(this.props.kiosk);
        if (this.props.kiosk.good) {
            this.setState({color: 'green'});
        } else {
            let status = "";
            this.props.kiosk.exceptions.forEach((exception) => {
                if (exception.exType === 'RED') {
                    status = "red";
                }
                else {
                    if(status === ""){
                        status = "yellow";
                    }
                }
            });
            this.setState({color: status});
        }

    };

    // after render get all the servers from the server
    componentWillMount() {
        this.interval = setInterval(() =>{
            this.updateComponent();
        }, tenSeconds);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    // to show the kiosk and handle it
    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
                     onClick={() => {
                         this.props.updateKioskRoute(this.props.kiosk.macAddress);
                         this.props.onRouteChangeTech('listTech', this.props.kiosk)
                     }}>
                <div className="tc">
                    <Circle bgColor={this.state.color}/>
                    <h1 className="f3 mb2">{this.props.kiosk.hotelName}</h1>
                    <h2 className="f5 fw4 gray mt0">{this.props.kiosk.exceptions.exceptionDisc}</h2>
                </div>
            </article>

        );
    }
};

export default Kiosks;