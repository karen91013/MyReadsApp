import React, { Component } from 'react';
import Book from './Book'

export default class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  generateBooks =() =>{
    if(this.props.myBooks.length > 0){
      return this.props.myBooks.map((book) => (<Book book={book} key={book.id} updateAppState={this.props.updateAppState} />))
    }
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.generateBooks()}
          </ol>
        </div>
      </div>
    );
  }
}
