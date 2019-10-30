import React, {Component} from 'react';

import EventList from "../EventList/EventList.jsx";

import moment from 'moment';

import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


export default class NearbyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract('7', 'days'),
            endDate: moment(),
            focusedInput: null,
            nearbyEvents: [],
            radiuskm: 200,
            numberOfResults: 5,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getNearbyEvents();
    }

    getNearbyEvents = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (geoLocation) => {
                    const format = 'geojson';
                    const startTime = this.state.startDate.toISOString();
                    const endTime = this.state.endDate.toISOString();
                    const limit = this.state.numberOfResults;

                    const latitude = geoLocation.coords.latitude;
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

    handleNumberOfResultsChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value}, () => this.getNearbyEvents());
    };


    render() {
        const nearbyEvents = this.state.nearbyEvents;

        return (
            <div>
                <h3>Nearby events</h3>


                <div className="d-flex justify-content-between">
                    <div className="d-flex align-self-center">
                        <label htmlFor="customRange1">Search radius in km
                            <input name="radiuskm" type="range" className="custom-range"
                                   id="customRange1" min="10" max="3000" value={this.state.radiuskm}
                                   onChange={this.handleChange}/>
                        </label>
                        <p>{this.state.radiuskm}</p>
                    </div>

                    <div className="align-self-center">
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
                            isOutsideRange={() => false}
                        />
                    </div>
                    <div className="align-self-center">
                        <button type="button" className="btn btn-primary"
                                onClick={this.onClickRefresh}>Go
                        </button>
                    </div>


                    <div className="d-flex align-self-center">
                        <label htmlFor="eq-numberSelect">
                            Number of results
                        </label>
                        <select id="eq-numberSelect" className="custom-select"
                                name="numberOfResults"
                                value={this.state.numberOfResults}
                                onChange={this.handleNumberOfResultsChange}>
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="100">100</option>
                        </select>

                    </div>
                </div>
                <EventList events={nearbyEvents}/>
            </div>
        );
    }
}