import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Admin from './components/Admin/Admin';
import './App.css';


import SignIn from "./components/SignIn/SignIn";


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
                name:user.techName,
                email:user.email,
            }});
        console.log(user.name)
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
          <Navigation name={this.state.user.name} isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {this.state.route === 'home'
               ? <Admin/>
              : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          }
      </div>
    );
  }
}

export default App;
