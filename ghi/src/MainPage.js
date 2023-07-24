import "./index.css";
import SearchMovies from "./searchMovies";
import MovieGenres from "./Genres";
import NewReleasesList from "./NewReleasesList";
import TopRatedList from "./TopRatedList";

function MainPage() {
  return (
    <div className="back-color">
      <h1 className="display-5 fw-bold text-center text-light">Reel Reviews</h1>
      <div className="wrapper">
        <SearchMovies />
      </div>
      <div>
        <NewReleasesList />
      </div>
      <div>
        <TopRatedList />
        {/* <MovieGenres /> */}
      </div>
      <div>{/* <NewReleasesList /> */}</div>
      <div>{/* <TopRatedList /> */}</div>
    </div>
  );
}

export default MainPage;
