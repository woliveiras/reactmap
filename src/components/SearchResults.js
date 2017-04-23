import React from 'react';

const SearchResults = (props) => {
    return (
        <address>
        <button className="search-results__close" onClick={ props.closeMap } title="Fechar">x</button>
        <strong>{ props.address.logradouro }</strong>
        <p>{ props.address.bairro }</p>
        <p>{ props.address.localidade } - { props.address.uf }</p>
        <p>{ props.address.cep }</p>
        </address>
    );
}

export default SearchResults;