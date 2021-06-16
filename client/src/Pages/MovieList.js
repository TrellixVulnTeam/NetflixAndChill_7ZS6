import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import he from "he";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";
import useFetch from "../Hooks/useFetch";
import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Nav-bar";

const MovieList = () => {
  const { page } = useParams();

  const [hovered, setHovered] = useState(false);
  const [show] = useState(true);
  const [curId, setCurId] = useState(0);
  const [curPage, setCurPage] = useState(page);

  const [option, setOption] = useState("Relevance");
  const [tempOption, setTempOption] = useState("Relevance");
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(Math.floor(curPage) - 5);
  const [end, setEnd] = useState(Math.floor(curPage) + 4);

  const checkImage = (movie) => {
    var ans = movie.largeimage;
    if (ans === "") {
      ans = movie.image;
    }
    return ans;
  };

  const { data, pending, setPending, movies, total } = useFetch(
    `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${search}-!0%2C2021-!0%2C5-!0%2C10-!0-!Any-!Any-!Any-!gt0-!%7D&t=ns&cl=all&st=adv&ob=${option}&p=${curPage}`
  );

  useEffect(() => {
    setStart(Math.floor(curPage) - 5);
    setEnd(Math.floor(curPage) + 4);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [data, curPage]);
  const handleSubmit = (e) => {
    e.preventDefault();

    setOption(tempOption);
    if (tempSearch === "") {
      setSearch("''");
    } else {
      makeQuery(tempSearch);
    }

    setPending(true);
  };

  const makeQuery = (sent) => {
    var res = sent.split(" ");

    var newStr = "";
    for (var i = 0; i < res.length; i++) {
      if (i === res.length - 1) {
        newStr += res[i];
      } else {
        newStr += res[i] + "%20";
      }
    }

    setSearch(newStr);
    setCurPage(1);

  };

  const onHover = (id) => {
    setHovered(true);
    setCurId(id);
  };

  const offHover = () => {
    setHovered(false);
  };

  return (
    <>
      <Navbar back={false} />

      <div className="all">
        <div className="movies">
          <Container>
            <div id="filters">
              <form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                  <Col
                    id="first"
                    className="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center"
                  >
                    <label>Sort by:</label>
                    <select
                      value={tempOption}
                      onChange={(e) => setTempOption(e.target.value)}
                    >
                      <option value="Relevance">Relevance</option>
                      <option value="Date">Date</option>
                      <option value="Rating">Rating</option>
                      <option value="Title">Title</option>
                      <option value="FilmYear">FilmYear</option>
                      <option value="Runtime">Runtime</option>
                    </select>
                  </Col>
                  <Col
                    id="second"
                    className="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center"
                  >
                    <label id="searchLabel">Search: </label>
                    <input
                      type="text"
                      value={tempSearch}
                      onChange={(e) => setTempSearch(e.target.value)}
                      id="searchInput"
                    />
                  </Col>
                  <Col
                    id="third"
                    className="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center"
                  >
                    <Button
                      type="submit"
                      id="search"
                      className="btn-info btn-xs"
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </Container>
          <Container id="allMovies">
            <h2 id="mTitle" className="text-center">
              Results
            </h2>
            <Row className="justify-content-center">
              <div id="resMovies">
                {pending && <Loading />}

                {movies.map((movie) => (
                  <Col
                    className="movie-preview col-12"
                    key={movie.netflixid}
                    id={"movie" + movie.netflixid}
                    onMouseEnter={() => onHover(movie.netflixid)}
                    onMouseLeave={() => offHover()}
                  >
                    {/* this part shows the extra part on hover of movie card */}
                    <Link to={`/movie/${movie.netflixid}`}>
                      <img src={checkImage(movie)} alt="Movie" />
                      <p>{he.decode(movie.title)}</p>
                      {hovered && show && curId === movie.netflixid && (
                        <p>
                          {" "}
                          <span id="headings">Type:</span> {movie.type}
                        </p>
                      )}
                    </Link>
                  </Col>
                ))}
              </div>
            </Row>
          </Container>

          {!pending && (
            <Pagination
              pages={total}
              start={start}
              end={end}
              curPage={curPage}
              setCurPage={setCurPage}
              setPending={setPending}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MovieList;
