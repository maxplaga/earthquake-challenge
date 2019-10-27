import React from 'react';
import './App.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Page from './Page/Page';
import Header from './Header/Header'

function App() {
    return (
        <div className="app">
            <Header/>
            <Page/>
        </div>
    );
}

export default App;
