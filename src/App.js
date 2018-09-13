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
            username:"",
            password:"",
            isSignedIn:false,
            route: 'signin',
        }
    }

    onRouteChange = (route) =>{
        if (route === 'signout') {
            this.setState({isSignedIn:false});
        }else if (route === 'home') {
            this.setState({isSignedIn:true});
        }
        this.setState({route:route})
    };

    //adminRender = ()=>(<Admin/>);

  render() {
    return (
      <div className="App">
          <Particles className='particles'
                     params={particlesOptions}
          />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {this.state.route === 'home'
               ? <Admin/>
              : <SignIn onRouteChange={this.onRouteChange}/>
          }
          {/*<div>
              <Switch>
                  <Route exact={true} path='/Admin' render={this.adminRender}/>
                  <Route exact={true} path='/technicians' render={this.technicianRender}/>
                  <Route exact={true} path="/technicians/new" render={this.addTechnicianRender}/>
              </Switch>
          </div>*/}
      </div>
    );
  }
}

export default App;
