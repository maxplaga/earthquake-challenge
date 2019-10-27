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
                <div>
                    <form id="eq-form-criteria" onSubmit={this.handleSubmit}>
                       <button type="button"
                                onClick={this.handleSubmit}>Search
                        </button>
                        <br/>

                    </form>
                </div>
            </div>
        );
    }
}