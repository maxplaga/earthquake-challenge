import React, {Component} from 'react';
import "./Page.css";

import SearchBox from "./SearchBox/SearchBox.jsx";
import EventList from "./EventList/EventList.jsx";
import NearbyEvents from "./NearbyEvents/NearbyEvents.jsx"

import moment from 'moment';

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
        const startTime = moment().subtract('24', 'hour').toISOString();
        const endTime = moment().toISOString();
        const limit = '3';
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
                        <div className="col">
                            <div className="eq-card">

                                <div className="shadow p-3 mb-5 bg-white rounded">
                                    <h3>Most recent Events:</h3>
                                    <EventList events={latestEvents}/>
                                </div>

                            </div>
                        </div>
                        <div className="col">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                asdf
                            </div>
                        </div>
                    </div>

                    <SearchBox/>

                    <NearbyEvents/>
                </div>

            </div>
        );
    }
}