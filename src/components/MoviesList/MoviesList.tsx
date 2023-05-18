import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import axios from "axios";
import {
  getLoading,
  getMovieSpaData,
  getMovieSpaMetaData,
} from "../../selectors/app.selectors.ts";
import { MovieRecord } from "../../types";
import Card from "../Card";
import {
  setLoading,
  setSearchQuery,
  storeData,
  storeMeta,
} from "../../reducer/app.ts";
import loadingIcon from "../../assets/loading.gif";
import restClient from "../../utils/restClient.ts";
import Pagination from "../Pagination";
import style from "./MovieList.module.scss";

type FetchDataParams = (query: string, page: number) => void;

const MoviesList = () => {
  const dispatch = useDispatch();
  const moviesList = useSelector(getMovieSpaData);
  const movieSpaMetaData = useSelector(getMovieSpaMetaData);
  const loading = useSelector(getLoading);
  const [error, setError] = useState("");

  const fetchData: FetchDataParams = useCallback(async (query, page) => {
    dispatch(setLoading(true));

    await restClient
      .get(`3/${query ? "search" : "discover"}/movie`, {
        params: {
          sort_by: "popularity.desc",
          api_key: "55cb1648d07699027c2a8b6e13e07b3f",
          page,
          ...(query ? { query } : null),
        },
      })
      .then((response) => {
        if (response.data) {
          dispatch(storeData(response?.data?.results));

          delete response.data.results;
          dispatch(storeMeta(response?.data));
        }
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          setError(e?.response?.data?.status_message);
        }
      })
      .finally(() => dispatch(setLoading(false)));
  }, []);

  useEffect(() => {
    fetchData("", 1);
  }, []);

  const onSearchChange = debounce((event) => {
    const searchKey = event.target.value;
    dispatch(setSearchQuery(searchKey));

    fetchData(searchKey, searchKey ? movieSpaMetaData?.page : 1);
  }, 350);

  return (
    <>
      {loading && (
        <img
          className={style["movie-list__loading"]}
          src={loadingIcon}
          alt="movie-spa-loading"
        />
      )}
      <input
        className={style["movie-list__search"]}
        placeholder="Search movie"
        id="search"
        type="search"
        onChange={onSearchChange}
      />
      {/* eslint-disable-next-line no-nested-ternary */}
      {moviesList?.length ? (
        <div className={style["movie-list"]}>
          {moviesList.map((movie: MovieRecord) => {
            return <Card key={movie.title + movie.id} movie={movie} />;
          })}
        </div>
      ) : error ? (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
      ) : (
        <h3>No movies</h3>
      )}
      {!!moviesList?.length && movieSpaMetaData?.total_pages !== 1 && (
        <Pagination callback={fetchData} />
      )}
    </>
  );
};

export default MoviesList;
