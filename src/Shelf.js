import React from 'react';
import Book from './Book'

const Shelf = (props) =>{

  const generateBooks =() =>{
    if(props.myBooks.length > 0){
      return props.myBooks.map((book) => (<Book book={book} key={book.id} updateAppState={props.updateAppState} />))
    }
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {generateBooks()}
        </ol>
      </div>
    </div>
  )
}

export default Shelf
