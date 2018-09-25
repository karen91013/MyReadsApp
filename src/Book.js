import React, { Component } from 'react';
export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  setImage = () =>{
    if (this.props.book.imageLinks !== undefined){
      return this.props.book.imageLinks.thumbnail
    }
    else{
      return "https://image.shutterstock.com/image-vector/no-image-available-sign-internet-260nw-261719003.jpg"
    }
  }

  setAuthor = () =>{
    if(this.props.book.authors !== undefined){
      return this.props.book.authors.join(", ")
    }
    else{
      return "N/A"
    }
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.setImage()})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={(event) => this.props.updateAppState(event.target.value,this.props.book)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.setAuthor()}</div>
        </div>
      </li>
    );
  }
}
