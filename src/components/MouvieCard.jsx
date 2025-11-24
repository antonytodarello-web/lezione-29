import { Component } from "react";
import { Alert, Card, Spinner } from "react-bootstrap";

// http://www.omdbapi.com/?apikey=24ad60e9&s=Iron Man

class MovieCard extends Component {
  // lo stato di MovieCard ci servirà come al solito per "parcheggiare"
  // i dati ottenuti da una chiamata API al fine di renderli disponibili
  // al JSX per costruire l'interfaccia dinamica

  state = {
    movieObject: null, // io metto null come valore iniziale perchè voglio
    // una netta distinzione tra valore che c'è e valore che ancora non c'è
    // gianluca tip: && non funzionerebbe a dover con { }
    // diventerà poi un oggetto con proprietà Poster, Title, Year, imdbID, Type
    loading: true,
    error: "",
  };

  getMovieData = () => {
    fetch(
      "http://www.omdbapi.com/?apikey=24ad60e9&s=" +
        this.props.movieTitleFromApp // all'inizio è "Iron Man"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Errore nel recupero dati dal server: " + response.status
          );
        }
      })
      .then((searchResults) => {
        console.log("RISULTATI RICERCA", searchResults);
        // il film che voglio mostrare sarà in searchResults.Search[0]
        console.log("SETTO LO STATO, UPDATE IN ARRIVO");
        this.setState({
          loading: false,
          movieObject: searchResults.Search[0],
        });
      })
      .catch((error) => {
        console.log("ERRORE", error);
        this.setState({
          loading: false,
          error: error,
        });
      });
  };

  // dobbiamo arrivati a questo punto fare una chiamata API all'avvio del componente
  // in modo da recuperare i dati necessari a riempire movieObject. Una volta
  // che movieObject NON sarà più "null" la Card si mostrerà con i dati recuperati
  componentDidMount() {
    console.log("COMPONENTDIDMOUNT");
    // componentDidMount è un metodo di lifecycle di React che fa parte della
    // fase di "montaggio" del componente.
    // questo metodo è GARANTITO venire eseguito UNA VOLTA SOLA all'avvio del
    // componente, per la precisione DOPO la prima invocazione di render()
    // invoco la funzione per inizializzare la fetch
    this.getMovieData();
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdate è un metodo che viene invocato automaticamente
    // SUBITO DOPO che il componente ha ricevuto un aggiornamento (a: un cambio di stato
    // b: un cambio di prop).
    // la nostra situazione di porta a voler RI-ESEGUIRE la fetch se sono cambiate
    // le PROPS (perchè significa che abbiamo scelto un nuovo film!), mentre
    // NON vogliamo ri-eseguire la fetch a seguito di un cambio di STATO
    console.log("COMPONENTDIDUPDATE");
    // la differenza tra render e componentDidUpdate sta nel fatto che quest'ultimo
    // accetta fino a 2 parametri, mentre render non ne ha
    // PRIMO PARAMETRO: "prevProps" -> l'oggetto delle prop PRECEDENTI l'update
    // SECONDO PARAMETRO: "prevState" -> l'oggetto dello stato PRECEDENTE l'update

    // noi vogliamo ri-eseguire la fetch SOLO quando cambia la prop "movieTitleFromApp"
    // quando la fetch finisce e viene settato lo stato con i nuovi dati del film,
    // entrerete in componentDidUpdate una seconda volta, e questa volta voi
    // NON volete ri-eseguire la fetch (altrimenti: ciclo infinito)
    if (prevProps.movieTitleFromApp !== this.props.movieTitleFromApp) {
      // intercetto il cambio della prop "movieTitleFromApp"
      console.log("CAMBIATO TITOLO! RI-ESEGUO FETCH");
      this.getMovieData();
    } else {
      console.log("NON FACCIO FETCH, È CAMBIATO LO STATO");
    }
  }

  // per "aggiornamento" di un componente intendiamo il momento in cui
  // un componente riceve un nuovo STATO o riceve una nuova PROP

  render() {
    console.log("RENDER");
    // render si invoca automaticamente OGNI VOLTA che cambia lo STATE
    // e OGNI VOLTA che cambiano le PROPS

    // visto che al cambiamento del valore della tendina il metodo "render"
    // si richiama in automatico, uno potrebbe pensare di inserire la chiamata
    // API anche nel metodo render, in modo da ri-fetchare i dati quando il film
    // selezionato cambia...
    // this.getMovieData()
    // ...però questo è un errore! ciclo infinito! perchè?
    // perchè getMovieData() alla fine del recupero info esegue un SETSTATE
    // ...e cambiare lo stato è un'altra condizione per re-invocare render!

    // render non è il metodo corretto dove re-invocare getMovieData :(
    // perchè render() viene chiamato ad OGNI cambio di props e ad OGNI cambio
    // di stato, indiscriminatamente
    // per questo motivo, abbiamo bisogno di un ALTRO metodo di lifecycle
    // meno indiscriminato, che ci permetta di distinguere se l'update è avvenuto
    // per una PROP che è cambiata o se è avvenuto per un cambio di stato!

    // il metodo che ci permetterà di distinguere gli aggiornamenti dovuti
    // da un cambio di prop O da un cambio di stato si chiama "componentDidUpdate"
    return (
      <>
        {this.state.loading && (
          <div className="text-center">
            <Spinner animation="border" variant="info" />
          </div>
        )}
        {this.state.error && (
          <Alert variant="danger">Errore nel caricamente del film</Alert>
        )}
        {this.state.movieObject !== null && (
          <Card>
            <Card.Img variant="top" src={this.state.movieObject.Poster} />
            <Card.Body className="text-center">
              <Card.Title>{this.state.movieObject.Title}</Card.Title>
              <Card.Text>
                {this.state.movieObject.Year} - {this.state.movieObject.imdbID}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}

export default MovieCard;
