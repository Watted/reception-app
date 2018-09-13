import React from 'react';
import {Link} from "react-router-dom";

const Navigation = ({onRouteChange,isSignedIn}) => {
    if(isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link to={'/SignOut'}> <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p></Link>
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