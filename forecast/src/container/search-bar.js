import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchWeather } from "../actions";

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather(this.state.term);

    this.setState({term: ''});
  }

  render () {
    return (
      <form className="input-group" onSubmit={this.onSubmit.bind(this)}>
        <input
          placeholder="Get a five day forecast in your favourite cities"
          className="form-control"
          onChange={this.onInputChange.bind(this)}
          value={this.state.term}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Search</button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

// passing null because state is the first argument, but we don't care about that state back
// we are manipulating state (setting)
export default connect(null, mapDispatchToProps)(SearchBar);
