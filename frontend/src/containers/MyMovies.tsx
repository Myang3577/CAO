import React, { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { listMovies } from "../actions/movieListActions";
import { GlobalState } from "../reducers/rootReducer";
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import { ENTER_KEYCODE } from "./SearchBar";
import { LoadingState } from "../reducers/otherReducer";

function MyMovies() {
  const dispatch = useDispatch();
  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );
  const movieListData = useSelector<GlobalState, []>(
    (state) => state.movieListData.movieListData
  );
  const movieListLoading = useSelector<GlobalState, LoadingState>(
    (state) => state.movieListData.loading
  );

  const [movieFilter, setMovieFilter] = useState("");
  const [filterMovieList, setFilterMovieList]: any = useState([]);

  useEffect(() => {
    dispatch(listMovies(username));
  }, [dispatch, username]);

  useEffect(() => {
    setFilterMovieList(movieListData);
  }, [movieListData]);

  useEffect(() => {
    if (movieFilter.trim() !== "") {
      setFilterMovieList((filterMovieList: any) =>
        filterMovieList.filter((e: any) =>
          e.original_title.toLowerCase().includes(movieFilter)
        )
      );
    } else {
      setFilterMovieList(movieListData);
    }
  }, [movieFilter, movieListData]);

  const handleSubmit = () => {
    if (movieFilter.trim() !== "") {
      setFilterMovieList(
        filterMovieList.filter((e: any) =>
          e.original_title.includes(movieFilter)
        )
      );
    } else {
      setFilterMovieList(movieListData);
    }
  };

  return (
    <div className="page-container">
      <Typography variant="h4" gutterBottom>
        MyMovies
        <IconButton onClick={() => dispatch(listMovies(username))}>
          <RefreshIcon />
        </IconButton>
      </Typography>

      <TextField
        label="Filter MyMovies"
        variant={"outlined"}
        value={movieFilter}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setMovieFilter(e.target.value.toLowerCase());
        }}
        onKeyDown={(e: any) => {
          if (e.keyCode === ENTER_KEYCODE) {
            handleSubmit();
          }
        }}
      />

      <MovieGrid movieList={filterMovieList} loading={movieListLoading} />
    </div>
  );
}

export default MyMovies;
