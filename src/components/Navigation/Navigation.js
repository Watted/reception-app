import React from 'react';

const Navigation = ({onRouteChange,isSignedIn,name}) => {
    if(isSignedIn) {
        return (
                <nav  style={{display: 'flex'}}>
                    <p style={{justifyContent: 'flex-start'}} className='f3 dim black pa3'>logged in as: {name}</p>
                    <p style={{justifyContent: 'flex-end'}} onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                </nav>
        )
    }else {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
            </nav>
        )
    }
};

export default Navigation;