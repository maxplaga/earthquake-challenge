import React, {Component} from 'react';
import "./Page.css";

import DonationBox from "./DonationBox/DonationBox.jsx";

import EventList from "./EventList/EventList.jsx";

export default class Page extends Component {
    render() {
        return (
            <div className="eq-page">
                <h1>Earthquake</h1>
                <p>You can find all the latest earthquakes on this site.</p>
                <DonationBox/>
                <EventList/>
            </div>
        );
    }
}