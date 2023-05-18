import React from "react";
import { MovieRecord } from "../../types";
import style from "./Card.module.scss";

const Card: React.FC<{ movie: MovieRecord }> = ({ movie }) => {
  const url = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className={style.card}>
      <div className={style.card__poster}>
        <img
          className={style["card__poster-image"]}
          src={`${url}/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className={style.card__description}>
        <h3 className={style["card__description-title"]}>{movie.title}</h3>
        <p className={style["card__description-overview"]}>{movie.overview}</p>
        <p className={style["card__description-vote"]}>
          {movie.vote_average?.toFixed(1)}
        </p>
        <a className={style["card__description-read-more"]} href="/">
          Read more
        </a>
      </div>
    </div>
  );
};

export default React.memo(Card);
