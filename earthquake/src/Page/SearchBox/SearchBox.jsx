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
                </div>
            </div>
        );
    }
}