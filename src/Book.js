import React from 'react';

const Book =(props) => {

  const setImage = () =>{
    if (props.book.imageLinks !== undefined){
      return props.book.imageLinks.thumbnail
    }
    else{
      return "https://image.shutterstock.com/image-vector/no-image-available-sign-internet-260nw-261719003.jpg"
    }
  }

  const setAuthor = () =>{
    if(props.book.authors !== undefined){
      return props.book.authors.join(", ")
    }
    else{
      return "N/A"
    }
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${setImage()})` }}></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={(event) => props.updateAppState(event.target.value,props.book)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{setAuthor()}</div>
      </div>
    </li>
  );

}

export default Book
