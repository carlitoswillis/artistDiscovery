/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchArea from './components/searcharea';

import $ from 'jQuery';



class SpotifySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', results: [] };
  }

  handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    this.handleClear()
    e.preventDefault();
    e.stopPropagation();
    const { searchTerm } = this.state;
    // var axios = require('axios');
    // const config = {
    //   method: 'get',
    //   url: '/spotify?searchTerm=test',
    //   headers: { }
    // };

    // axios(config)
    // .then(function (response) {
    //   this.setState({ results: response.data });
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });


    if (searchTerm !== '') {
      const settings = {
        url: `/spotify?searchTerm=${searchTerm}`,
        method: 'GET',
        timeout: 0,
      };
      $.ajax(settings).done((response) => {
        this.setState({ results: response });
      });
    }
  }

  handleClear() {
    const state = { results: [] };
    this.setState(state);
  }

  render() {
    const { results } = this.state;
    return (
      <div class="container">
        <h1>Artist Finder</h1>
        <div onClick={() => { this.handleClear(); }} onKeyDown={() => { this.handleClear(); }} className="buttons" id="flush">
        </div>
        <SearchArea platform="Spotify" results={results} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(
  // <App testInfo={test()} />,
  <SpotifySearch />,
  document.getElementById('app'),
);
