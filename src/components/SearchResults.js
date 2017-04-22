import React, { Component } from 'react';

export default class SearchResults extends Component {
    render() {
        return (
              <address>
                <strong>{ this.props.address.logradouro }</strong>
                <p>{ this.props.address.bairro }</p>
                <p>{ this.props.address.localidade } - { this.props.address.uf }</p>
                <p>{ this.props.address.cep }</p>
                <p>lat: {this.props.geometry.lat}</p>
                <p>lng: {this.props.geometry.lng}</p>
              </address>
        );
    }    
}