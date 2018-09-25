import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Admin from './components/Admin/Admin';
import Particles from 'react-particles-js';
import './App.css';


import SignIn from "./components/SignIn/SignIn";

const particlesOptions = {
    particles: {
        number:{
            value: 30,
            density: {
                enable: true,
                value_area:600
            }
        }
    }
};

class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            isSignedIn:false,
            route: 'signin',
            user:{
                id:'',
                name:"",
                email: '',
            }
        }
    }

    loadUser =(user)=>{
        this.setState({user:{
                id:user.id,
                name:user.name,
                email:user.email,
            }})
    };

    onRouteChange = (route) =>{
        if (route === 'signout') {
            this.setState({isSignedIn:false});
        }else if (route === 'home') {
            this.setState({isSignedIn:true});
        }
        this.setState({route:route})
    };


  render() {
    return (
      <div className="App">
          <Particles className='particles'
                     params={particlesOptions}
          />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {this.state.route === 'home'
               ? <Admin/>
              : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          }
      </div>
    );
  }
}

export default App;
