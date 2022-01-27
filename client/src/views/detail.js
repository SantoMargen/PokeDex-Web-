import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "../apis/apiPokemon";

export default function Detail() {
  const { name } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/pokemon/${name}`,
    })
      .then(({ data }) => {
        const moves = data.moves?.map((el) => {
          let splitted = el.move.name.split("-");
          splitted = splitted.map((el) => {
            return capital(el);
          });
          return splitted.join(" ");
        });

        let abilities = data.abilities?.map((el) => {
          let splitted = el.ability.name.split("-");
          splitted = splitted.map((el) => {
            return capital(el);
          });
          return splitted.join(" ");
        });

        if (abilities.length > 1) {
          abilities = abilities.join(", ");
        }
        const pokemonData = {
          id: data.id,
          name: data.name,
          height: Number(data.height) / 10,
          weight: Number(data.weight) / 10,
          types: data.types,
          imgUrl: data.sprites.front_default,
          abilities,
          moves,
          stats: data.stats,
        };

        return pokemonData;
      })
      .then((pokemonData) => {
        axios({
          method: "GET",
          url: `/pokemon-species/${name}`,
        })
          .then(({ data }) => {
            pokemonData.species = data.genera[7].genus;
            pokemonData.evoChain =
              data.evolution_chain.url[data.evolution_chain.url.length - 2];
            return pokemonData;
          })
          .then((pokemonData) => {
            axios({
              method: "GET",
              url: `/evolution-chain/${pokemonData.evoChain}`,
            })
              .then(({ data }) => {
                let evoChain = [];
                function getEvo(arr) {
                  if (arr[0].evolves_to.length > 0) {
                    evoChain.push(arr[0].species.name);
                    getEvo(arr[0].evolves_to);
                  } else {
                    evoChain.push(arr[0].species.name);
                    return 0;
                  }
                }
                getEvo([data.chain]);
                evoChain = evoChain.map((el) => {
                  return capital(el);
                });
                pokemonData.evolutions = evoChain.join(", ");

                setDetails(pokemonData);
              })
              .catch((err) => {
                console.log(err.response.data);
              })
              .finally(() => {
                setIsLoading(false);
              });
          })
          .catch((err) => {
            console.log(err.response.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [name]);

  function capital(word) {
    if (word) {
      let result = word[0].toUpperCase();
      for (let i = 1; i < word.length; i++) {
        result += word[i];
      }
      return result;
    }
  }
  // console.log(details);

  const statList = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

  if (isLoading) {
    return (
      <div id="Detail" className="page py-5">
        <div className="wrapper">
          <h1 className="text-center p-3 mb-5">Pokedex is Loading...</h1>

          <div className="cardContainer d-flex flex-row flex-wrap mx-3"></div>
        </div>
      </div>
    );
  }
  return (
    <div id="Details" className="page">
      <div className="wrapper">
        <div className="detailName d-flex flex-column p-5">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1 className="text-left">{capital(details.name)}</h1>
            <h5>#{details.id}</h5>
          </div>
          <div className="types mt-1">
            {details.types?.map((el) => {
              return (
                <span className="py-1 px-3 mx-1" key={el.type.name}>
                  {capital(el.type.name)}
                </span>
              );
            })}
          </div>
          <div className="picture ">
            <img
              src={details.imgUrl}
              alt="sprites"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="400"
            />
          </div>
        </div>
        <div
          className="detailsBody p-4"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <ul className="nav nav-pills my-3 " id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-about-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-about"
                type="button"
                role="tab"
                aria-controls="pills-about"
                aria-selected="true"
              >
                About
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-stats-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-stats"
                type="button"
                role="tab"
                aria-controls="pills-stats"
                aria-selected="false"
              >
                Base Stats
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-stats-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-stats"
                type="button"
                role="tab"
                aria-controls="pills-stats"
                aria-selected="false"
              >
                Evolution
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-moves-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-moves"
                type="button"
                role="tab"
                aria-controls="pills-moves"
                aria-selected="false"
              >
                Moves
              </button>
            </li>
          </ul>
          <div className="tab-content mt-4" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-about"
              role="tabpanel"
              aria-labelledby="pills-about-tab"
            >
              <div className="row mb-3">
                <div className="col-3 col-sm-2 col-md-1">
                  <strong>Species</strong>
                </div>
                <div className="col-9 col-sm-10 col-md-11">
                  {details.species}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 col-sm-2 col-md-1">
                  <strong>Height</strong>
                </div>
                <div className="col-9 col-sm-10 col-md-11">
                  {details.height} cm
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 col-sm-2 col-md-1">
                  <strong>Weight</strong>
                </div>
                <div className="col-9 col-sm-10 col-md-11">
                  {details.weight} kg
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 col-sm-2 col-md-1">
                  <strong>Abilities</strong>
                </div>
                <div className="col-9 col-sm-10 col-md-11">
                  {details.abilities}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-stats"
              role="tabpanel"
              aria-labelledby="pills-stats-tab"
            >
              {details.stats?.map((el, idx) => {
                return (
                  <div className="row mb-3" key={el.stat.name}>
                    <div className="col-3 col-sm-2 col-md-1">
                      <strong>{capital(statList[idx])}</strong>
                    </div>
                    <div className="col-9 col-sm-10 col-md-11 d-flex flex-row align-items-center">
                      <div className="d-inline-block me-4">{el.base_stat}</div>

                      <div className="progress w-75">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={el.base_stat}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${el.base_stat}%`,
                            backgroundColor:
                              el.base_stat >= 60
                                ? "rgb(123, 196, 152)"
                                : "rgb(239, 68, 68)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="tab-pane fade"
              id="pills-moves"
              role="tabpanel"
              aria-labelledby="pills-moves-tab"
            >
              {details.moves?.map((el) => {
                return (
                  <strong className="p-2 tag me-1 mb-1" key={el}>
                    {el}
                  </strong>
                );
              })}
            </div>
          </div>
          <Link to="/" className="btn btn-secondary mt-4">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
