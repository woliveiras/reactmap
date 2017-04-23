import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import SearchEngine from './components/SearchEngine';
import SearchResults from './components/SearchResults';
import Loader from './components/Loader';
import Error from './components/Error';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isloading: false,
      showMap: false,
      error: false,
      address: {
        bairro: null,
        cep: null,
        complemento: null,
        localidade: null,
        logradouro: null,
        uf: null,
        geometry: {}
      }
    };
    this.handleForm = (event) => {
      event.preventDefault();
      this.getAddress(event.target.postalCode.value, this.getGeometry);
      this.setState({
        isloading: true
      });
    };
    this.getAddress = (postalCode, callback) => {
      $.getJSON({
          url: `https://viacep.com.br/ws/${postalCode}/json/?callback=callback`,    
          dataType: 'jsonp',
          success: (data) => {
            this.setState({
              error: false,
              address: {
                bairro: data.bairro,
                cep: data.cep,
                complemento: data.complemento,
                localidade: data.localidade,
                logradouro: data.logradouro,
                uf: data.uf
              }
            });
            callback(data);
          },
          error: (res) => {
            if (res !== 200) {
              this.setState({
                error: true
              });
            }
          }
      });
    };
    this.getGeometry = (location) => {
        $.getJSON({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location.logradouro}-${location.bairro}-${location.localidade}`,
            success: (data) => {
              this.setState({
                error: false,
                isloading: false,
                showMap : true,
                geometry: data.results[0].geometry.location
              });
            },
            error: (res) => {
              if (res !== 200) {
                this.setState({
                  error: true
                });
              }
            }
        });
    };
    this.closeMap = () => {
      this.setState({
        showMap: false
      })
    };
  }
  render() {
    const error = this.state.error;
    const isloading = this.state.isloading && error === false;
    const showMap = this.state.showMap && !isloading && error === false;    
    return (
      <div className="main">
        <div className="container">
          <header>
            <h1>Consulta de Endereço</h1>
          </header>
          <SearchEngine handleForm={ this.handleForm } />
          { error &&  <Error /> }
          { isloading &&  <Loader /> }
          { showMap &&
            <SearchResults 
              address={ this.state.address }
              geometry={ this.state.geometry }
              closeMap={ this.closeMap }
            />
          }
        </div>
      </div>
    );
  }
}