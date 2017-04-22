import React, { Component } from 'react';

class Error extends Component {
  render() {
    return(
      <div className="error">
          <p>Aconteceu algo errado! Não encontrei o CEP informado. :(</p>
      </div>
    );
  }
}
export default Error