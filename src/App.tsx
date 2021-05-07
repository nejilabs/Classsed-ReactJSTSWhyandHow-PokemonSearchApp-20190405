import { Component } from "react";
import PokemonSearch from "./components/PokemonSearch";

export class App extends Component {
  // Start: Template
  render() {
    return (
      <div>
        <PokemonSearch name="userWithPokemons" numberOfPokemons={5} />
        <PokemonSearch name="userWithoutPokemons" />
      </div>
    );
  }
  // End: Template
}

export default App;
