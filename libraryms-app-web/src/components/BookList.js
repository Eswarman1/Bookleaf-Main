import React, { Component } from "react";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faEdit,
  faTrash,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import { Link } from "react-router-dom";

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        books: [],
        newBook: {
            title: "",
            author: "",
            rating: "",
            isbn: ""
        }
    };
}

  

  componentDidMount() {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => this.setState({ books: data }));
  }

  deleteBook = (bookId) => {
    axios.delete("http://localhost:8080/book/" + bookId).then((response) => {
      if (response.data != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.setState({
          books: this.state.books.filter((book) => book.id !== bookId),
        });
      } else {
        this.setState({ show: false });
      }
    });
  };
  // Handle input changes for the form
handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
        newBook: {
            ...prevState.newBook,
            [name]: value
        }
    }));
};

// Handle form submit to POST a new book
handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.newBook)
    })
        .then(response => response.json())
        .then(savedBook => {
            this.setState(prevState => ({
                books: [...prevState.books, savedBook],
                newBook: { title: "", author: "", rating: "", isbn: "" } // reset form
            }));
        })
        .catch(error => console.error("Error adding book:", error));
};


  render() {
    
    return (

      
      <div>
        {/* Form to add a new book */}
      <form onSubmit={this.handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="title"
          placeholder="Title"
          value={this.state.newBook.title}
          onChange={this.handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={this.state.newBook.author}
          onChange={this.handleChange}
          required
        />
        <input
          name="rating"
          placeholder="Rating"
          value={this.state.newBook.rating}
          onChange={this.handleChange}
          required
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={this.state.newBook.isbn}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Book was deleted successfully."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            {" "}
            <FontAwesomeIcon icon={faList} /> {"  "}
            Book List
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN Number</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">{this.state.books.length}</td>
                  </tr>
                ) : (
                  this.state.books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title} </td>
                      <td>{book.author} </td>
                      <td>{book.isbn} </td>
                      <td>{book.rating} </td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + book.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          {"  "}
                          {"  "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteBook.bind(this, book.id)}
                          >
                            Delete <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
