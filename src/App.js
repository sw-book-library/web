import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {

    const header = new Headers({ "Access-Control-Allow-Origin": "*" });
    
    fetch(process.env.REACT_APP_API_URL+'books', { header: header })
      .then(response => response.json())
      .then(res => {
        if (res && res.data) {

          console.log(res.data)
          this.setState({ books: [...this.state.books, ...res.data] })
        }
      });

    /*     fetch('http://localhost:3000/books')
          .then(response => response.json())
          .then(res => {
            if (res && res.data) {
              this.setState({ users: [...this.state.books, ...res.data] })
            }
          }); */

  }

  renderBooks() {
    if (this.state.books.length <= 0) {
      return <div>Loading..</div>
    }
    else {
      return this.state.books.map((val, key) => {
        return <div key={key}>{val.title} | {val.productionYear} | {val.author} | {val.description} | {val.active}</div>
      })
    }
  }

  /*    renderUsers() {
      if (this.state.users.length <= 0) {
        return <div>Loading..</div>
      }
      else {
        return this.state.users.map((val, key) => {
          return <div key={key}>{val.name} | {val.age}</div>
        })
      }
    }  */

  render() {
    return (
      <div className='App'>
        {
          this.renderBooks()
        }
      </div>
    )
  }
}

export default App;
