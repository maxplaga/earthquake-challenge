import React, {Component} from 'react';

export default class DonationBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 0,
        };
    }

    componentDidMount() {
        this.setState({
        });
    }

    handleChange = (event) => {
        this.setState({radius: Number(event.target.value)});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert(this.state.radius)
    };

    render() {
        return (
            <div>
                <h3>Find erupting events</h3>

                <div>
                    <form id="eq-form-criteria" onSubmit={this.handleSubmit}>
                        <label>
                            <input name="amount" type="number" min="1" max="100" value={this.state.radius}
                                   onChange={this.handleChange}/>
                        </label>
                        <button type="button"
                                onClick={this.handleSubmit}>Search
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}