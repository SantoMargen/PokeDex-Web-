import axios from "../apis/apiPokemon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PokeCard({ details }) {
  const [pokemonData, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/pokemon/${details}`,
    })
      .then(({ data }) => {
        setPokemon({
          name: data.name,
          types: data.types,
          imageUrl: data.sprites.front_default,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function typePokemon(type) {
    let result = type[0].toUpperCase();
    for (let i = 1; i < type.length; i++) {
      result += type[i];
    }
    return result;
  }

  if (isLoading) {
    return (
      <div id="Card" className="page py-5">
        <div className="wrapper">
          <h1 className="text-center p-3 mb-5">Pokedex is Loading...</h1>

          <div className="cardContainer d-flex flex-row flex-wrap mx-3"></div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/pokemon/${pokemonData.name}`}>
      <div
        className="card m-4"
        style={{
          width: "25rem",
          borderRadius: "20%",
          backgroundColor: "#9AD0EC",
        }}
      >
        <h3>{typePokemon(details)}</h3>

        {pokemonData.types?.map((el) => {
          return (
            <span className="py-1 px-3 mx-1" key={el.type.name}>
              {typePokemon(el.type.name)}
            </span>
          );
        })}

        <img src={pokemonData.imageUrl} alt="sprites" />
      </div>
    </Link>
  );
}
