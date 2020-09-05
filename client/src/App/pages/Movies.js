import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Form, Row, Card, Button } from "react-bootstrap";
const Movies = ({ Movies }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("/api/getMoviesList", config)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("data ---> ", response);
        if (response.status) {
          let result = response.model;
          
          setMovies(result);
          console.log(result);
          //debugger;
        } else {
          console.log("Error in getting Movies List");
        }
      });
  }, []);
const searchData = (e) => {

  let val = e.target.value
  let single_crd = document.querySelectorAll(".singleCard");

  Array.prototype.forEach.call(single_crd, function(el) {
    if (el.textContent.trim().indexOf(val) > -1)
      el.style.display = 'block';
    else el.style.display = 'none';
  });
}
  return (
    <Container className="App mt-4">
      <Form inline className="mb-4">
        <Form.Group className="mx-auto">
          <Form.Label htmlFor="inputSearch">Search</Form.Label>
          <Form.Control
            type="text"
            className="mx-sm-3 searchInput"
            id="inputSearch"
            aria-describedby="passwordHelpInline"
            placeholder="Movie name,genre,release,year"
            onKeyUp={searchData}
          />
        </Form.Group>
      </Form>
      <div id="mainWrap">
      {movies &&
        movies.map((item, idx) => (
          
            <Card className="mb-3 singleCard" >
              <Card.Body>
                <Row>
                  <Col sm="2">
                    <div className="">
                      <img src={item.poster?item.poster:"1.jpg"} width={80}/>
                    </div>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Card.Text className="text-left crd-plot">
                        {item.plot}
                      </Card.Text>
                    </div>
                        <Row className="gen_Rel_Div">
                            <Col sm="4">
                              <ul className="genreUl list-inline">
                                {item.genres && item.genres.map(i => (
                                      <li className="list-inline-item ">{i}</li>
                                )
                                )}
                              </ul>
                            </Col>
                            <Col sm="4">
                            </Col>
                            <Col sm="4">
                              <Card.Text className="relDateP">
                              Realeased: {new Intl.DateTimeFormat("en-GB", {
                                            month: "long",
                                            year: "numeric",
                                            day: "2-digit"
                                          }).format(item.released? new Date(item.released): new Date())}
                              </Card.Text>
                            </Col>
                        </Row>
                  </Col>
                  <Col sm="2" className="imbdCol">
                    <div>
                        <Card.Text Class="imbdText">
                          IMBD: <b>{item.imbd && item.imbd.rating? item.imbd.rating : "Nil"}</b>
                        </Card.Text>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
        ))}
        </div>
    </Container>
  );
};
// class Movies extends Component {
//   render() {
//     return (
//     <div className="App">
//       <h1>Movies</h1>
//       {/* Link to List.js */}
//       {/* <Link to={'./list'}>
//         <button variant="raised">
//             My List
//         </button>
//       </Link> */}
//     </div>
//     );
//   }
// }

export default Movies;