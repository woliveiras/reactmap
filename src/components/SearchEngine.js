import React from 'react';

const SearchEngine = (props) => {
    return(
        <form  className="search-engine" onSubmit={ props.handleForm }>
        <h2>Consultar</h2>
        <label>CEP: </label>
        <input type="number" placeholder="02050-010" required autoFocus name="postalCode"/>
        <button>Buscar</button>
        </form>
    )
};

export default SearchEngine;