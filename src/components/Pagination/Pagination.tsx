import React from "react";
import { useSelector } from "react-redux";
import {
  getMovieSpaMetaData,
  getSearchKey,
} from "../../selectors/app.selectors.ts";
import style from "./Pagination.module.scss";

type CallbackFunction = (query: string, page: number) => void;

interface ChildComponentProps {
  callback: CallbackFunction;
}

const Pagination: React.FC<ChildComponentProps> = ({ callback }) => {
  const movieSpaMetaData = useSelector(getMovieSpaMetaData);
  const searchKey = useSelector(getSearchKey);
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={style.pagination}>
      <button
        className={style.pagination__button}
        disabled={movieSpaMetaData.page === 1}
        type="button"
        onClick={() => {
          toTop();
          callback(searchKey, movieSpaMetaData.page - 1);
        }}
      >
        PREVIOUS
      </button>
      <button
        type="button"
        className={style.pagination__button}
        disabled={movieSpaMetaData?.total_pages === movieSpaMetaData?.page}
        onClick={() => {
          toTop();
          callback(searchKey, movieSpaMetaData.page + 1);
        }}
      >
        NEXT
      </button>
    </div>
  );
};

export default React.memo(Pagination);
