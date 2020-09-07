import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Form, Row, Card, Button } from "react-bootstrap";

const List = ({match}) => {
  const history = useHistory();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    let id = match.params.id
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({movie_id:id})
    };
    fetch("/api/getMovieDetails", config)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("data ---> ", response);
        if (response.status) {
          let result = response.model;
          console.log(result);
            setDetail(result)
        } else {
          console.log("Error in getting Movie Details");
        }
      });
    // fetch("/api/getList")
    //   .then((res) => res.json())
    //   .then((list) => setList(list));
  }, []);
  return (

    <Container>
     <div id="detailMainWrap">
     {detail &&
         <Card className="mb-3 detailCrd">        
            <Card.Header className="detailCrdHeader">
            <Button className="btnBg" type="button" onClick={() => history.goBack()}>
              Go back
            </Button>
            </Card.Header>
           <Card.Body>
             <Row>
               <Col sm="3">
                 <div className="">
                   <img
                     src={detail.poster ? detail.poster : "../1.jpg"}
                     width={250}
                   />
                 </div>
               </Col>
               <Col>
                   <Row>
                    <Col>
                    <h4 className="text-left cusH4">
                    {detail.title}
                    </h4> 
                   </Col>
                    <Col>
                    <h4 className="text-right cusH4">
                      IMDB:{detail.imdb && detail.imdb.rating
                         ? detail.imdb.rating
                         : "Nil"}</h4> 
                    
                    </Col>
                   </Row>
                   <Row>
                     <div className="mt-4 mb-3 plotDiv">
                     <Card.Text>
                       {detail.fullplot}
                     </Card.Text>
                     </div>
                     <div className="mb-4 plotDiv">
                     <ul className="genreUl list-inline">
                       {detail.genres &&
                         detail.genres.map((i) => (
                           <li className="list-inline-item text-dark">{i}</li>
                         ))}
                     </ul>
                     </div>
                   </Row>
                   <Row>
                      <Col>
                      <h6 className="sizeH6">Cast</h6>
                      <ul className="list-inline">
                       {detail.cast &&
                         detail.cast.map((i) => (
                           <li className="list-inline-detail liSize">{i}</li>
                         ))}
                     </ul>
                      </Col>
                      <Col>
                      <h6>Directors</h6>
                      <ul className="list-inline">
                       {detail.directors &&
                         detail.directors.map((i) => (
                           <li className="list-inline-detail liSize">{i}</li>
                         ))}
                     </ul>
                      </Col>
                 </Row>
               </Col>
             </Row>
             <div className="pt-3">
             <h4 className="h4Text">Comments</h4>
             <div>
               <ul className="p-0">
                 {detail.comments && detail.comments.length > 0 ? detail.comments.map((i) => (
                   <><li className="list-inline-item">
                     <b class="commentName">@{i.name}</b>
                     
                     <span className="commentDate ml-2 text-secondary">{new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,

                        }).format(
                          i.date ? new Date(i.date) : new Date()
                  )}</span></li>
                  <li className="list-inline-item commentText text-secondary">{i.text}</li></>
                 )) : "No Comments Found" }
               </ul>
             </div>
             </div>
            
           </Card.Body>
         </Card>
       }
   </div>
   </Container>
  );
};

export default List;
