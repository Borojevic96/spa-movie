import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import "./style/App.scss";

const App = () => {
  return (
    <>
      <Header />
      <div className="content">
        <MoviesList />
      </div>
    </>
  );
};

export default App;
