import React, {Component} from 'react';
import "./Page.css";

import SearchBox from "./SearchBox/SearchBox.jsx";
import EventList from "./EventList/EventList.jsx";
import Map from "./Map/Map.jsx"

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestEvents: [],
            nearbyEvents: [],
        };
    }


    componentDidMount() {
        this.getLatestEvents();
        this.getNearbyEvents();
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

    getNearbyEvents = () => {
        const format = 'geojson';
        const startTime = '2016-01-01';
        const endTime = '2019-10-03';
        const limit = '5';
        const latitude = '52.403';
        const longitude = '13.0626';
        const maxradiuskm = '2000';

        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=${format}&starttime=${startTime}&endtime=${endTime}&limit=${limit}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxradiuskm}`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({nearbyEvents: json.features});
            })

    };

    render() {
        const latestEvents = this.state.latestEvents;
        const nearbyEvents = this.state.nearbyEvents;

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
                    <div className="row">
                        <div className="col">
                            <h3>Events near you:</h3>
                            <EventList events={nearbyEvents}/>
                        </div>
                        <div className="col">
                            <Map></Map>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}