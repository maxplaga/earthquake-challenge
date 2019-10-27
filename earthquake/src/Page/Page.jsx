import React, {Component} from 'react';
import "./Page.css";

import NearbyEvents from "./NearbyEvents/NearbyEvents"
import RecentEvents from "./RecentEvents/RecentEvents"

import Map from "./Map/Map";

export default class Page extends Component {


    render() {
        return (
            <div className="eq-page">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <NearbyEvents/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <RecentEvents/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <Map/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        );
    }
}