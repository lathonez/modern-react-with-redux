import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import Map from '../components/map';

class WeatherList extends Component {

  constructor(props) {
    super(props)
  }

  renderWeather(cityData) {

    const name = cityData.city.name;
    const temp = cityData.list.map(weathers => weathers.main.temp);
    const pressure = cityData.list.map(weathers => weathers.main.pressure);
    const humidity = cityData.list.map(weathers => weathers.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><Map lat={lat} lon={lon}/></td>
        <td><Chart data={temp} color="orange" units={'K'}/></td>
        <td><Chart data={pressure} color="yellow" units={'hPa'}/></td>
        <td><Chart data={humidity} color="blue" units={'%'}/></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather.bind(this))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps( { weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
