import React, {Component} from 'react';

class Kiosks extends Component {

    render(){
        return (
            <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <div className="tc">
                    <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h4 w4 dib ba b--black-05 pa2"
                         title={this.props.kiosk.macAddress} alt={''}/>
                        <h1 className="f3 mb2">{this.props.kiosk.hotelName}</h1>
                        <h2 className="f5 fw4 gray mt0">{this.props.kiosk.exceptions}</h2>
                </div>
            </article>
        );
    }
};

export default Kiosks;