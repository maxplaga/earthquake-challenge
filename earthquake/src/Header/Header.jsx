import React from 'react';

function Header() {
    return (
        <header className="app-header d-flex">
            <span className="align-self-center">
                <h3 className="app-header-title">Earthquake</h3>
                <h5 className="app-header-subtitle">You can find all the latest earthquakes on this site.</h5>
            </span>
        </header>
    );
}

export default Header;
