import React, { Component } from "react";
import User from "../interfaces/User.interface";

interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}

export class PokemonSearch extends Component<User, SearchState, Pokemon> {
  // Start: Fields
  pokemonRef: React.RefObject<HTMLInputElement>;
  // End: Fields

  // Start: Constructor
  constructor(props: User) {
    super(props);
    this.state = {
      error: false,
      pokemon: null,
    };
    this.pokemonRef = React.createRef();
  }
  // End: Constructor

  // Start: Methods
  /**
   * @name handleSearchClick()
   */
  handleSearchClick = (): void => {
    const inputValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then((res) => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then((data) => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default,
          },
        });
      });
    });
  };
  // End: Methods

  // Start: Template
  render() {
    const { name: userName, numberOfPokemons } = this.props;
    const { error, pokemon } = this.state;

    let resultMarkup;
    if (error) {
      resultMarkup = <p>Pokemon not found, please try again</p>;
    } else if (this.state.pokemon) {
      resultMarkup = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and{" "}
            {pokemon.baseExperience} base experience points
          </p>
        </div>
      );
    }

    return (
      <div>
        <p>
          User {userName}
          {numberOfPokemons && <span> has {numberOfPokemons} pokemons</span>}
        </p>
        <input type="text" ref={this.pokemonRef} />
        <button className="my-button" onClick={this.handleSearchClick}>
          Search
        </button>
        {resultMarkup}
      </div>
    );
  }
  // End: Template
}

export default PokemonSearch;
