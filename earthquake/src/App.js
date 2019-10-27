import React from 'react';
import './App.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Page from './Page/Page';

function App() {
    return (
        <div className="app">
            <header className="app-header d-flex">
                <span className="align-self-center">
                    <h3 className="app-header-title">Earthquake</h3>
                    <h5 className="app-header-subtitle">You can find all the latest earthquakes on this site.</h5>
                </span>
            </header>
            <Page/>
        </div>
    );
}

export default App;
