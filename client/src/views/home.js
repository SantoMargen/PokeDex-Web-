import React, { useEffect, useState } from "react";
import axios from "../apis/apiPokemon";
import Card from "../components/card";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: "/pokemon",
    })
      .then(({ data }) => setPokemons(data.results))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (error) return <h1>{error}</h1>;

  if (isLoading) {
    return (
      <div id="HomePage" className="page py-5">
        <div className="wrapper">
          <h1 className="text-center p-3 mb-5">Pokedex is Loading...</h1>

          <div className="cardContainer d-flex flex-row flex-wrap mx-3"></div>
        </div>
      </div>
    );
  }

  return (
    <div id="HomePage" className="page py-5">
      <div className="wrapper">
        <h1 className="text-center p-3 m-5">Pokedex</h1>
        <div className="cardContainer d-flex flex-row flex-wrap m-3">
          {pokemons.map((pokemon) => {
            return <Card details={pokemon.name} key={pokemon.name} />;
          })}
        </div>
      </div>
    </div>
  );
}
