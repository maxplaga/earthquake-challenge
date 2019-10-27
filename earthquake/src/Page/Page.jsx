import React, {Component} from 'react';
import "./Page.css";

import SearchBox from "./SearchBox/SearchBox.jsx";
import EventList from "./EventList/EventList.jsx";
import NearbyEvents from "./NearbyEvents/NearbyEvents.jsx"

import moment from 'moment';
import Map from "./Map/Map";

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
                    <div className="row">
                        <div className="col">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <h3>Most recent Events:</h3>
                                <EventList events={latestEvents}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <Map/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <NearbyEvents/>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        );
    }
}