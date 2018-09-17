import React from 'react';

const Header = (props) => {
     return (   
        <div className="header">
            <div className={props.location.pathname !== '/voting' ? 'header__name' : 'header__name header__name--moved'} >
                jukebox.io 
            </div>
        </div>
    );
};

export default Header;