import { Component } from "react";
import { Form } from "react-bootstrap";

class MovieSelect extends Component {
  //   state = {
  //     movieTitle: 'Iron Man',
  //   }

  render() {
    return (
      <Form.Select
        aria-label="Default select example"
        value={this.props.movieTitleFromApp}
        onChange={(e) => this.props.changeAppState(e.target.value)}>
        <option>Iron Man</option>
        <option>Black Widow</option>
        <option>Avengers</option>
        <option>Captain America</option>
        <option>Wolverine</option>
      </Form.Select>
    );
  }
}

export default MovieSelect;
