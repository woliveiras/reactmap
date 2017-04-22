import React, { Component } from 'react';

export default class SearchResults extends Component {
    render() {
        return (
            <div className="loader">
                <div className="loader__spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }    
}