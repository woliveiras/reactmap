import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

class App extends Component {
  constructor() {
    super();
    this.state = {
      address: {
        bairro: null,
        cep: null,
        complemento: null,
        localidade: null,
        logradouro: null,
        uf: null,
        geometry: {}
      },
      showMap: false
    };
    this.handleForm = this.handleForm.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getGeometry = this.getGeometry.bind(this);
  }
  handleForm(event) {
    event.preventDefault();
    this.getAddress(this.refs.postalCode.value, this.getGeometry);
  }
  getAddress(postalCode, callback) {
    $.getJSON({
        url: `https://viacep.com.br/ws/${this.refs.postalCode.value}/json/?callback=callback`,    
        dataType: 'jsonp',
        success: (data) => {
          this.setState({
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
        }
    });
  }
  getGeometry(location) {
      $.getJSON({
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location.logradouro}-${location.bairro}-${location.localidade}`,
          success: (data) => {
            this.setState({ showMap : true, geometry: data.results[0].geometry.location});
          }
      });
  }
  render() {
    return (
      <div>
          <h1>Consulta de Endereço</h1>
          <form onSubmit={ this.handleForm }>
            <h2>Consultar</h2>
            <label>CEP: </label>
            <input type="text" placeholder="02050-010" required ref="postalCode"/>
            <button>Buscar</button>
          </form>
          {
            this.state.showMap && 
            <div>
              <address>
                <strong>{ this.state.address.logradouro }</strong>
                <p>{ this.state.address.bairro }</p>
                <p>{ this.state.address.localidade } - { this.state.address.uf }</p>
                <p>{ this.state.address.cep }</p>
                <p>lat: {this.state.geometry.lat}</p>
                <p>lng: {this.state.geometry.lng}</p>
              </address>
              <GoogleMapLoader
                containerElement={ <div style={{height: 500, width: '100%'}} /> }
                googleMapElement={
                  <GoogleMap defaultZoom={15} center={{ lat: this.state.geometry.lat, lng: this.state.geometry.lng}} >
                    <Marker position={{ lat: this.state.geometry.lat, lng: this.state.geometry.lng}} />
                  </GoogleMap>
                }
              />
            </div>
          }
      </div>
    );
  }
}

export default App;
