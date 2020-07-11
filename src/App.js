import React from 'react';
import { Cards, CountryPicker, Chart, News } from './components';
import styles from './App.module.css';
import logo from './images/logo.png';
import API from './api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import context from './context';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      country: this.context,
      isLoading: true,
      countryList: [],
    };
  }

  // load global / worldwide data for initial render
  async componentDidMount() {
    const data = await API.getCardData();
    const countryList = await API.getCountries();
    this.setState({ data, countryList, isLoading: false });
  }

  // if user select a country in CountryPicker, change the country in the state
  handleCountryChange = async (country) => {
    const data = await API.getCardData(country);
    this.setState({ data, country });
  };

  render() {
    const { data, country, isLoading, countryList } = this.state;

    if (isLoading) return <div>Loading... </div>

    return (
      <Router>
        <div className={styles.wrapper}>
          <img className={styles.logo} src={logo} alt='logo' />

          {/* site navigation */}
          <ul className={styles.horizontalNav}>
            <li><NavLink exact={true} to='/' activeClassName={styles.active}>Stats</NavLink></li>
            <li><NavLink to='/news' activeClassName={styles.active}>News</NavLink></li>
          </ul>

          <Switch>
            {/* stats page */}
            <Route exact path='/'>
              <Cards data={data} />
              <CountryPicker handleCountryChange={this.handleCountryChange} countryList={countryList} />
              <Chart data={data} country={country} />
            </Route>

            {/* news page */}
            <Route path='/news'>
              <News />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

App.contextType = context;

export default App;
