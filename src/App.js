import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading:[],
    wantToRead:[],
    read:[],
    books:null,
    loading:true,
    searchResults:[]
  }

  createLibray =(shelf,book) =>{
    let arrayHolder = null
    if (shelf ==="read"){
      arrayHolder = [...this.state.read, book]
      this.setState({
        read:arrayHolder
      })
    }else if( shelf === "wantToRead"){
      arrayHolder = [...this.state.wantToRead, book]
      this.setState({
        wantToRead:arrayHolder
      })
    }else if (shelf === "currentlyReading") {
      arrayHolder = [...this.state.currentlyReading, book]
      this.setState({
        currentlyReading:arrayHolder
      })
    }
  }

// make code DRY

  updateState = (shelf, book) =>{
    let arrayHolder = null
    book.shelf = shelf
    if(this.state.currentlyReading.includes(book)){
      arrayHolder = [...this.state.currentlyReading]
      arrayHolder = arrayHolder.filter(item => item !== book)
      this.setState({
        currentlyReading:arrayHolder
      })
    }
    else if(this.state.wantToRead.includes(book)){
      arrayHolder = [...this.state.wantToRead]
      arrayHolder = arrayHolder.filter(item => item !== book)
      this.setState({
        wantToRead:arrayHolder
      })
    }
    else if(this.state.read.includes(book)){
      arrayHolder = [...this.state.read]
      arrayHolder = arrayHolder.filter(item => item !== book)
      this.setState({
        read:arrayHolder
      })
    }
    this.createLibray(shelf, book)
    BooksAPI.update(book, shelf);
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => this.shelfBooks(books))
  }

  shelfBooks = (books) =>{
    books.forEach((book) =>{
      this.createLibray(book.shelf, book)
    })
    this.setState({
      loading:false
    })
  }

  handleBookSearch =(e) =>{
    if(e.target.value === ""){
      this.setState({searchResults:[]})
    }
    else{
      BooksAPI.search(e.target.value).then(books => (this.setState({searchResults:books})))
    }
  }

  displaySearchResults = () =>{
    return this.state.searchResults.map((book) => {
      const allBooks = [...this.state.currentlyReading, ...this.state.read, ...this.state.wantToRead]
      let bookInLibrary = allBooks.filter(bookFromLib =>{
        return bookFromLib.id === book.id
      })
      if(bookInLibrary.length >0){
        return <Book book={bookInLibrary[0]} key={book.id} updateAppState={this.updateState} />
      }
      else{
        let tmpBook = {...book}
        tmpBook.shelf = "none"
        return <Book book={tmpBook} key={book.id} updateAppState={this.updateState} />
      }

    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false, searchResults:[] })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={e => this.handleBookSearch(e)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {(this.state.searchResults.length > 0)?(this.displaySearchResults()):null}
              </ol>

            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {this.state.loading ? (<h1>Loading</h1>) :
                  (<div>
                    <Shelf name={"Currently Reading"} updateAppState={this.updateState} myBooks={this.state.currentlyReading}/>
                    <Shelf name={"Want to Read"} updateAppState={this.updateState} myBooks={this.state.wantToRead}/>
                    <Shelf name={"Read"} updateAppState={this.updateState} myBooks={this.state.read}/>
                  </div>)
                }

            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
