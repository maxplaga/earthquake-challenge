import React, {Component} from 'react';
import "./Page.css";

import SearchBox from "./SearchBox/SearchBox.jsx";
import EventList from "./EventList/EventList.jsx";
import NearbyEvents from "./NearbyEvents/NearbyEvents.jsx"

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestEvents: [],
        };
    }


    componentDidMount() {
        this.getLatestEvents();
    }

    getLatestEvents = () => {
        const format = 'geojson';
        const startTime = '2019-01-01';
        const endTime = '2019-01-02';
        const limit = '5';
        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=${format}&starttime=${startTime}&endtime=${endTime}&limit=${limit}`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({latestEvents: json.features});
            })

    };

    render() {
        const latestEvents = this.state.latestEvents;

        return (
            <div className="eq-page">
                <div className="container">
                    <h1>Earthquake</h1>
                    <p>You can find all the latest earthquakes on this site.</p>

                    <div className="row">
                        <h3>Most recent Events:</h3>
                        <EventList events={latestEvents}/>
                    </div>

                    <SearchBox/>

                    <NearbyEvents/>
                </div>

            </div>
        );
    }
}