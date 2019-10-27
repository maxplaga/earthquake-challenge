import React, {Component} from 'react';

import EventList from "../EventList/EventList.jsx";

import moment from 'moment';

export default class RecentEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentEvents: [],
        };
    }

    componentDidMount() {
        this.getRecentEvents();
    }

    getRecentEvents = () => {
        const format = 'geojson';
        const startTime = moment().subtract('24', 'hour').toISOString();
        const endTime = moment().toISOString();
        const limit = '3';
        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=${format}&starttime=${startTime}&endtime=${endTime}&limit=${limit}`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({recentEvents: json.features});
            })
    };

    render() {
        const recentEvents = this.state.recentEvents;

        return (
            <div>
                <h3>Most recent Events:</h3>
                <EventList events={recentEvents}/>
            </div>

        );
    }
}