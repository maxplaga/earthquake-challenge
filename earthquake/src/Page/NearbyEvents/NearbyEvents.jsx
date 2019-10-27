import React, {Component} from 'react';

import 'react-dates/initialize';

import EventList from "../EventList/EventList.jsx";
import Map from "../Map/Map.jsx"

import moment from 'moment';

import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


export default class NearbyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoLocation: undefined,
            startDate: moment().subtract('7', 'days'),
            endDate: moment(),
            focusedInput: null,
            nearbyEvents: [],
            radiuskm: 200,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getNearbyEvents();
    }

    getNearbyEvents = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition (
                (geoLocation) => {
                    const format = 'geojson';
                    const startTime = this.state.startDate.toISOString();
                    const endTime = this.state.endDate.toISOString();
                    const limit = '5';

                    const latitude =  geoLocation.coords.latitude;
                    const longitude = geoLocation.coords.longitude;

                    const maxradiuskm = this.state.radiuskm;

                    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=${format}&starttime=${startTime}&endtime=${endTime}&limit=${limit}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxradiuskm}`)
                        .then((response) => response.json())
                        .then((json) => {
                            this.setState({nearbyEvents: json.features});
                        })
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }

    };

    onClickRefresh = () => {
        this.getNearbyEvents();
    };

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }


    render() {
        const nearbyEvents = this.state.nearbyEvents;

        return (
            <div className="row">


                <div className="col">
                    <div className="shadow p-3 mb-5 bg-white rounded">

                        <h3>Nearby events</h3>

                        <div className="d-inline-block">
                            <label htmlFor="customRange1">Search radius in km</label>
                            <input name="radiuskm" type="range" className="custom-range"
                                   id="customRange1" min="10" max="3000" value={this.state.radiuskm}
                                   onChange={this.handleChange}/>
                        </div>
                        <p>{this.state.radiuskm}</p>


                        <DateRangePicker
                            startDate={this.state.startDate}
                            startDateId="your_unique_start_date_id"
                            endDate={this.state.endDate}
                            endDateId="your_unique_end_date_id"
                            onDatesChange={({startDate, endDate}) => this.setState({
                                startDate,
                                endDate
                            })}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({focusedInput})}
                        />


                        <button type="button" className="btn btn-primary"
                                onClick={this.onClickRefresh}>Go
                        </button>

                        <EventList events={nearbyEvents}/>
                    </div>
                </div>
                <div className="col">
                    <div className="shadow p-3 mb-5 bg-white rounded">
                        <Map/>
                    </div>
                </div>
            </div>
        );
    }
}