import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
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
    this.handleForm = this.handleForm.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getGeometry = this.getGeometry.bind(this);
    this.closeMap = this.closeMap.bind(this);
  }
  handleForm(event) {
    event.preventDefault();
    this.getAddress(this.refs.postalCode.value, this.getGeometry);
    this.setState({
      isloading: true
    });
  }
  getAddress(postalCode, callback) {
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
  }
  getGeometry(location) {
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
  }
  closeMap() {
    this.setState({
      showMap: false
    })
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
          <form  className="search-engine" onSubmit={ this.handleForm }>
            <h2>Consultar</h2>
            <label>CEP: </label>
            <input type="number" placeholder="02050-010" required autoFocus ref="postalCode"/>
            <button>Buscar</button>
          </form>
          
          {
            error &&  <Error />
          }
          
          {
            isloading &&  <Loader />
          }

          {
            showMap && 
            <div className="search-results">
              <SearchResults
                address={ this.state.address }
                geometry={ this.state.geometry }
                closeMap={ this.closeMap }/>
              <GoogleMapLoader
                containerElement={ <div 
                className="search-results__map" style={{height: 500, width: '100%'}} /> }
                googleMapElement={
                  <GoogleMap defaultZoom={15} center={{ lat: this.state.geometry.lat, lng: this.state.geometry.lng}} >
                    <Marker position={{ lat: this.state.geometry.lat, lng: this.state.geometry.lng}} />
                  </GoogleMap>
                } />
            </div>
          }
        </div>
      </div>
    );
  }
}