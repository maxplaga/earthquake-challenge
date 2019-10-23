import React, {Component} from 'react';

export default class EventList extends Component {

    render() {
        const events = this.props.events;
        return (
            <div>
                <h3>Events</h3>

                <div>
                    {events.map(elem => {
                        return <p key={elem.id}>{elem.properties.title}</p> }) }
                </div>
            </div>
        );
    }
}