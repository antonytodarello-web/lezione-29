import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import MovieSelect from "./components/MouvieSelect";
import MovieCard from "./components/MouvieCard";

class App extends Component {
  // la soluzione per condividere l'informazione tra MovieSelect e MovieCard
  // di QUALE sia il film attualmente selezionato nella tendina è memorizzare
  // questa informazione nel componente PADRE di entrambi!
  // ELEVIAMO lo stato contenente "movieTitle" nel componente App!

  state = {
    movieTitle: "Iron Man", // questo valore deve poter CAMBIARE
    // alla selezione di un nuovo film dalla tendina
  };

  changeAppState = (value) => {
    this.setState({
      movieTitle: value,
    });
  };

  render() {
    return (
      <>
        <MyNavbar />
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <h1 className="text-center my-3">EpiMovie</h1>
              <MovieSelect
                movieTitleFromApp={this.state.movieTitle} // "leggere"
                changeAppState={this.changeAppState} // "scrivere"
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={8} lg={6}>
              <MovieCard
                movieTitleFromApp={this.state.movieTitle} // "leggere"
                // il valore iniziale di movieTitle è "Iron Man"
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
