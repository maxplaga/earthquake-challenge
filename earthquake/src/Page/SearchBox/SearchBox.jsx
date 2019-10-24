import React, {Component} from 'react';

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 20,
            numberOfResults: 5,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
        });
    }


    handleChange (evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

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
                            <input name="radius" type="number" min="1" max="100" value={this.state.radius}
                                   onChange={this.handleChange}/>
                        </label>
                        <button type="button"
                                onClick={this.handleSubmit}>Search
                        </button>
                        <br/>
                        <label htmlFor="eq-numberSelect">
                            Number of results
                            <select id="eq-numberSelect" className="custom-select" name="numberOfResults" onChange={this.handleChange}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                    </form>

                    <br/>
                    <p>{this.state.radius}</p>
                    <p>{this.state.numberOfResults}</p>
                </div>
            </div>
        );
    }
}