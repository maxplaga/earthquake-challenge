import React, {Component} from 'react';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoLocation: undefined,
        };
    }


    setGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    console.log(pos);
                    this.setState({geoLocation: pos});
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    getImg = () => {
        const latitude = this.state.geoLocation.coords.latitude;
        const longitude = this.state.geoLocation.coords.longitude;
        const latlongvalue = latitude + "," + longitude;
        const img_url =
            "https://maps.googleapis.com/maps/api/staticmap?center="
            + latlongvalue +
            "&zoom=14&size=400x300&key=AIzaSyAa8HeLH2lQMbPeOiMlM9D1VxZ7pbGQq8o";
        return img_url;
    };


    render() {
        const geoLocation = this.state.geoLocation;

        return (
            <div>
                <h3>Your position</h3>

                <button type="button" className="btn btn-primary"
                        onClick={this.setGeoLocation}>Locate me!
                </button>

                {geoLocation &&
                <div className="card mt-3">
                    <img src={this.getImg()} className="card-img-top" alt="Map with your location"/>
                    <div className="card-body">
                        <h5 className="card-title">Your location</h5>
                        <p className="card-text">This is where we located your browser. Please keep
                            in mind that some inaccuracy is to be expected.</p>
                    </div>
                </div>
                }

            </div>
        );
    }
}