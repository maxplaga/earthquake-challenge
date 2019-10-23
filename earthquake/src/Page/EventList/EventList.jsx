import React, {Component} from 'react';

const fetch = require('node-fetch');

export default class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
    }

    componentDidMount() {
        const startTime = '2019-01-01';
        const endTime = '2019-01-02';
        const limit = '5';
        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&limit=${limit}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({events: json.features});
                console.log(this.state.events)
            })

    }


    render() {
        return (
            <div>
                <h3>Events</h3>

                <div>
                    <p>list</p>
                    {this.state.events.map(elem => {
                        return <p key={elem.id}>{elem.properties.title}</p> }) }
                </div>
            </div>
        );
    }
}