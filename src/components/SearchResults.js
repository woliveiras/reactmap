import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

const SearchResults = (props) => {
    return (
        <div className="search-results">
            <address>
                <button className="search-results__close" onClick={ props.closeMap } title="Fechar">x</button>
                <strong>{ props.address.logradouro }</strong>
                <p>{ props.address.bairro }</p>
                <p>{ props.address.localidade } - { props.address.uf }</p>
                <p>{ props.address.cep }</p>
            </address>
            <GoogleMapLoader
            containerElement={ <div className="search-results__map" style={{ height: 500, width: '100%' }} /> }
            googleMapElement={
                <GoogleMap defaultZoom={15} center={{ lat: props.geometry.lat, lng: props.geometry.lng}} >
                <Marker position={{ lat: props.geometry.lat, lng: props.geometry.lng}} />
                </GoogleMap>
            } />
        </div>
    );
}

export default SearchResults;