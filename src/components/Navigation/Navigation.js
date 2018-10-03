import React from 'react';
import './Navigation.css';

// to handle the route of sign in and sign out
const Navigation = ({onRouteChange,isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pointer'>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pointer'>Sign In</p>
            </nav>
        )
    }
};

export default Navigation;