import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

configure({ adapter: new Adapter() });

describe("App", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(<App />);
    }
    return mountedApp;
  };

  beforeEach(() => {
    mountedApp = undefined;
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("always renders a `SearchBar`", () => {
    expect(app().find(SearchBar).length).toBe(1);
  });

  it("doesn't render a `WeatherCard at first`", () => {
    expect(app().find(WeatherCard).length).toBe(0);
  });

  describe("`SearchBar`", () => {
    const searchBar = shallow(<SearchBar />);

    it("receives its props", () => {
      expect(Object.keys(searchBar.props()).length).toBe(2);
    });

    it("should display a message, if a search is done without text", () => {
      // fakeEvent was created to define preventDefault() in handleChange function
      const fakeEvent = { preventDefault: () => console.log("preventDefault") };
      expect(searchBar.find("Form").length).toBe(1);
      searchBar.find('Form').simulate('submit', fakeEvent);
      expect(searchBar.find('Message').length).toBe(1);
    });
  });

  describe("`WeatherCard`", () => {
    let wrapper;
    beforeEach(() => {
      const weatherData = {
        weather: 'Cloudy',
        city: 'Espoo',
        country: 'FI',
        temp: 10
      };
      const savedCities = ['Helsinki'];
      const updateSavedCities = jest.fn();
      wrapper = mount(<WeatherCard weatherData={weatherData} savedCities={savedCities} callBackFromParent={updateSavedCities} />);
    });

    it("exists", () => {
      expect(wrapper.exists()).toBe(true);
    });

    it("receives its props", () => {
      expect(Object.keys(wrapper.props()).length).toBe(3);
    });
  });

});