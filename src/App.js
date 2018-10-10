import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Admin from './components/Admin/Admin';
import './App.css';
import SignIn from "./components/SignIn/SignIn";
import TechnicianUI from "./components/TechnicianUI/TechnicianUI";
import LocalAdmin from "./components/LocalAdmin/LocalAdmin";
import Particles from 'react-particles-js';

//to show animation on the screen
const particlesOptions = {
    particles: {
        number:{
            value: 30,
            density: {
                enable: true,
                value_area:400
            }
        }
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            route: 'signin',
            user: {
                id: '',
                name: "",
                email: '',
                type: '',
                serverIdForAdmin:''
            }
        }
    }

    // update the user who has sign in
    loadUser = (user) => {
        this.setState({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
                serverIdForAdmin:user.serverIdForAdmin
            }
        });
        console.log(user.serverIdForAdmin)
    };

    // to change the route of the url from sign in to any user
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false, user: {id: '', name: '', email: '', type: ''}});
        } else if (route === 'SYS_ADMIN' || route === 'LOCAL_ADMIN' || route === 'TECH') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route})
    };

    // to render the page between Navigation page to Admin/Local/Technician page
    render() {
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation type={this.state.user.type} isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>

                <div className='switch'>
                    {this.state.route === 'SYS_ADMIN'
                        ? <Admin/>
                        : (this.state.route === 'LOCAL_ADMIN' ?
                                <LocalAdmin serverIdForAdmin={this.state.user.serverIdForAdmin}/>
                                : (this.state.route === 'TECH') ?
                                    <TechnicianUI techMail={this.state.user.email}/>
                                    : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
