import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Movie from "./Pages/Movie";
import MovieList from "./Pages/MovieList";
import Contact from "./Pages/Contact";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/movie/:netflixid">
                <Movie />
              </Route>
              <Route exact path="/movies/:page">
                <MovieList />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
