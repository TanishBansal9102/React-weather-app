import React, { Component } from "react";
import "../css/WeatherCard.css";
import "../css/weather-icons.min.css";
import { Button } from "semantic-ui-react";

class WeatherCard extends Component {
  constructor(props) {
    super(props);

    this.saveDataToLocalStorage = this.saveDataToLocalStorage.bind(this);
    this.deleteDataFromLocalStorage = this.deleteDataFromLocalStorage.bind(this);
  }

  deleteDataFromLocalStorage() {
    const existingCities = JSON.parse(localStorage.getItem("cityList"));
    const indexOfCity = existingCities.indexOf(this.props.weatherData.city);

    existingCities.splice(indexOfCity, 1);
    localStorage.setItem("cityList", JSON.stringify(existingCities));
    this.props.callBackFromParent(existingCities);
  }

  saveDataToLocalStorage() {
    // Get data from LocalStorage if there is any and push back with new city
    const existingCities = JSON.parse(localStorage.getItem("cityList")) || [];

    existingCities.push(this.props.weatherData.city);
    localStorage.setItem("cityList", JSON.stringify(existingCities));
    this.props.callBackFromParent(existingCities);
  }

  render() {
    const { city, weather, country, temp } = this.props.weatherData;
    const celcius = Math.round(temp - 273.15);
    const saveBtn = (
      <Button
        positive
        size="mini"
        onClick={this.saveDataToLocalStorage}
        content="Save to favorites"
      />
    );
    const deleteBtn = (
      <Button
        negative
        size="mini"
        onClick={this.deleteDataFromLocalStorage}
        content="Delete from favorites"
      />
    );
    const existingCities = this.props.savedCities;

    return (
      <div className="WeatherCard">
        <h1 className="WeatherCard-degrees">{celcius}°</h1>
        <div className="WeatherCard-icon-container">
          <i className={`wi wi-owm-${weather[0].id} WeatherCard-icon`} />
          <p>{weather[0].main}</p>
        </div>
        <h2 className="WeatherCard-city">
          {city}, {country}
        </h2>
        {existingCities.includes(city) ? deleteBtn : saveBtn}
      </div>
    );
  }
}

export default WeatherCard;
