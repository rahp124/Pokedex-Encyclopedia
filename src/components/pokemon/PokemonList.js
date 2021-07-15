import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import Loading from '../layout/Loading';
import axios from 'axios';

export default class PokemonList extends Component {
  state = {
    num: 20,
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${this.state.num}`);
    this.setState({ pokemon: res.data['results'] });
  }

  setLink = () => {
    const num = this.state.num + 20;
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${num}`).then((res) => {
      this.setState({
        pokemon: res.data.results,
      })
    });
    this.setState({
      num: num,
    });
  }

  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
        <button style = {{width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center'}} onClick={() => this.setLink()} > Load More</button>
      </div>
    );
  }
}
