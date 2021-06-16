import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useFetch from "../Hooks/useFetch";
import Loading from "../Components/Loading";
import he from "he";
import axios from "axios";
import CreateChilling from "../Components/CreateChilling";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Components/Nav-bar";
import { Link } from "react-router-dom";

const Movie = () => {
  const { netflixid } = useParams();
  const [wait, setWait] = useState(true);
  const [chill, setChill] = useState(true);
  const [added, setAdded] = useState(false);
  const [movie, setMovie] = useState([]);
  const [chillings, setChillings] = useState([]);

  const { data, pending, error } = useFetch(
    `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q=${netflixid}`
  );

  useEffect(() => {
    if (pending === false) {
      setWait(false);

      setMovie(data.RESULT.nfinfo);

      axios
        .get(`/chillings/movie/${netflixid}`)
        .then((response) => {
          setChillings(response.data);
          setChill(false);
          setAdded(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data, added]);

  return (
    <>
      {/* navbar with  back logo */}
      <Navbar back={true} /> 
      {(error != null && (
        <h1 id="errorMovie">
          Error finding that movie. <Link to="/">Click here</Link> to go back to
          home page.
        </h1>
      )) || (
        // do this part only if error == null meaning there is a movie with that id
        <div className="all">
          <div className="movie-details">
            {wait ? (
              <Loading />
            ) : (
              <Container>
                <Row className="mb-5">
                  <Col className="col-md-6 col-sm-12 d-flex justify-content-center mb-2">
                    <Card
                      id="movieCard"
                      style={{ width: "25rem", background: "wheat" }}
                    >
                      <Card.Body>
                        {(movie.image1 !== "" && (
                          <Card.Img src={movie.image1} />
                        )) || <Card.Img src={movie.image2} />}
                        <Card.Title className="text-center mt-4">
                          <span id="headings">Title: </span>
                          {he.decode(movie.title)}
                        </Card.Title>
                        <Card.Text className="text-center">
                          <span id="headings">Type: </span>
                          {movie.type}
                        </Card.Text>
                        {!movie.rating === "0" && (
                          <Card.Text className="text-center">
                            <span id="headings">Rating: </span>
                            {movie.avgrating}
                          </Card.Text>
                        )}
                        <Card.Text className="text-center">
                          <span id="headings">Released: </span>
                          {movie.released}
                        </Card.Text>
                        <Card.Text className="text-center">
                          <span id="headings">Runtime: </span>
                          {movie.runtime}
                        </Card.Text>
                        <Card.Text className="text-center">
                          <span id="headings">Synopsis: </span>
                          {he.decode(movie.synopsis)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col className="col-md-6 col-sm-12 d-flex justify-content-center">
                    {!wait && (
                      <CreateChilling
                        nid={netflixid}
                        title={he.decode(movie.title)}
                        getAdded={(added) => setAdded(added)}
                      />
                    )}
                  </Col>
                </Row>

                <div id="allChillings">
                  <h1 className="text-center">All Chillings for this title</h1>
                  <Row className="justify-content-around">
                    {chillings.length === 0 && <p>No chillings found.</p>}
                    {!chill &&
                      chillings.map((chilling) => (
                        <Col
                          key={chilling._id}
                          className="col-md-4 col-sm-6 col-xs-12 mt-5"
                        >
                          <Card id="chillingCard">
                            <Card.Body>
                              <Card.Text>
                                <span id="headings">Username:</span>{" "}
                                {chilling.username}
                              </Card.Text>
                              <Card.Text>
                                <span id="headings">Date:</span> {chilling.date}
                              </Card.Text>
                              <Card.Text>
                                <span id="headings">People:</span>{" "}
                                {chilling.people}
                              </Card.Text>
                              <Card.Text>
                                <span id="headings">Duration:</span>{" "}
                                {chilling.duration}
                              </Card.Text>
                              <Card.Text>
                                <span id="headings">Language:</span>{" "}
                                {chilling.language}
                              </Card.Text>
                              <Card.Text>
                                <span id="headings">Country:</span>{" "}
                                {chilling.country}
                              </Card.Text>
                              <Card.Text>
                                <span id="headings">Note:</span> {chilling.note}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </div>
              </Container>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
