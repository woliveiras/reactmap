import React, { Component } from 'react';

export default class SearchResults extends Component {
    render() {
        return (
              <address>
                <button className="search-results__close" onClick={ this.props.closeMap } title="Fechar">x</button>
                <strong>{ this.props.address.logradouro }</strong>
                <p>{ this.props.address.bairro }</p>
                <p>{ this.props.address.localidade } - { this.props.address.uf }</p>
                <p>{ this.props.address.cep }</p>
              </address>
        );
    }    
}