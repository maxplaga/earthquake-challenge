import React, {Component} from 'react';

export default class EventList extends Component {

    convertMillisecondsToDate = (number) => {
        const d = new Date(number);
        return d.getUTCFullYear() +"/"+ (d.getUTCMonth()+1) +"/"+ d.getUTCDate() + " - " + d.getUTCHours() + ":" + d.getUTCMinutes() ;
    };

    render() {
        const events = this.props.events;
        return (
            <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Magnitude</th>
                    <th scope="col">Type</th>
                    <th scope="col">Place</th>
                    <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                {events.map( (elem ,index) => {
                    return <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{elem.properties.mag}</td>
                        <td>{elem.properties.type}</td>
                        <td>{elem.properties.place}</td>
                        <td>
                            {this.convertMillisecondsToDate(elem.properties.time)}
                        </td>
                        </tr>
                })}
                </tbody>
            </table>
            </div>
        );

    }
}