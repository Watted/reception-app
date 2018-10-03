import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Admin from './components/Admin/Admin';
import './App.css';
import SignIn from "./components/SignIn/SignIn";
import TechnicianUI from "./components/TechnicianUI/TechnicianUI";
import LocalAdmin from "./components/LocalAdmin/LocalAdmin";


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
                type: ''
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
            }
        });
        console.log(user.name)
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
                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                <div className="nav-left" hidden={!this.state.isSignedIn}>
                    <p className='app-logged-in f3 dim black'>logged in as: {this.state.user.type}</p>
                </div>
                <div className='switch'>
                    {this.state.route === 'SYS_ADMIN'
                        ? <Admin/>
                        : (this.state.route === 'LOCAL_ADMIN' ?
                                <LocalAdmin/>
                                : (this.state.route === 'TECH') ?
                                    <TechnicianUI/>
                                    : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
