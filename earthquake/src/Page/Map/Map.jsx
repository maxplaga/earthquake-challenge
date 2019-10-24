import React, {Component} from 'react';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoLocation: undefined,
        }
        ;
    }


    componentDidMount() {
        console.log("cdm");

    }

    setGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition (
                (pos) => {
                    console.log(pos);
                    this.setState({geoLocation: pos});
                }
                );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    showLocation() {
        console.log("show location");
        console.log(this.state.geoLocation);
        var latitude =  this.state.geoLocation.coords.latitude;
        var longitude = this.state.geoLocation.coords.longitude;
        var latlongvalue = latitude + "," + longitude;
        var img_url =
            "https://maps.googleapis.com/maps/api/staticmap?center="
            + latlongvalue +
            "&zoom=14&size=400x300&key=AIzaSyAa8HeLH2lQMbPeOiMlM9D1VxZ7pbGQq8o";
        document.getElementById("mapholder").innerHTML =
            "<img src='"+img_url+"'>";
    }

    errorHandler(err) {
        if(err.code === 1) {
            alert("Error: Access is denied!");
        } else if( err.code === 2) {
            alert("Error: Position is unavailable!");
        }
    }

    getImg = () => {
        const latitude =  this.state.geoLocation.coords.latitude;
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
                <p>position:</p>

                <button type="button" className="btn btn-primary" onClick={this.setGeoLocation}>Locate me!</button>

                {geoLocation &&
                    <div>
                        <p>Longitude: {geoLocation.coords.longitude}</p>
                        <p>Latitude: {geoLocation.coords.latitude}</p>
                        <img src={this.getImg()} alt={"Map with your location"}/>
                    </div>


                }
      </div>
        );
    }
}