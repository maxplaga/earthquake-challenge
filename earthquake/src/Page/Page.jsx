import React, {Component} from 'react';
import "./Page.css";

import SearchBox from "./SearchBox/SearchBox.jsx";

import EventList from "./EventList/EventList.jsx";

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
    }


    componentDidMount() {
        const format = 'geojson';
        const startTime = '2019-01-01';
        const endTime = '2019-01-02';
        const limit = '5';
        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=${format}&starttime=${startTime}&endtime=${endTime}&limit=${limit}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({events: json.features});
                console.log(this.state.events)
            })

    }

    render() {
        return (
            <div className="eq-page">
                <h1>Earthquake</h1>
                <p>You can find all the latest earthquakes on this site.</p>
                <SearchBox/>
                <EventList events={this.state.events}/>
            </div>
        );
    }
}