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

    fetch(process.env.REACT_APP_API_URL + 'books', { header: header })
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
      return (
        <li>
          <ul className="linha-dados">
            <li style={{ width: `1080px` }}>SEM DADOS ENCONTRADOS</li>
          </ul>
        </li>);
    }
    else {
      return this.state.books.map((val, key) => {
        /* return <div key={key}>{val.title} | {val.productionYear} | {val.author} | {val.description} | {val.active}</div> */
        return (
          <li>
            <ul className="linha-dados">
              <li style={{ width: `70px` }}>0000001</li>
              <li style={{ width: `340px` }}>{val.title}</li>
              <li style={{ width: `150px` }}>{val.author}</li>
              <li style={{ width: `150px` }}>Ciranda Cultural</li>
              <li style={{ width: `150px` }}>Geografia</li>
              <li style={{ width: `140px`, textAlign: `center` }}>2014</li>
              <li style={{ width: `80px` }}>Disponivel</li>
            </ul>
          </li>
        );
      });
    }
  }

  renderBooksPage() {
    return (
      <div>
        <div className="titulos-listagem">
          <h3>Livros Cadastrados</h3>
        </div>
        <div className="etiquetas-listagem">
          <ul>
            <li style={{ width: `70px` }}>Código</li>
            <li style={{ width: `340px` }}>Título</li>
            <li style={{ width: `150px` }}>Autor</li>
            <li style={{ width: `150px` }}>Editora</li>
            <li style={{ width: `150px` }}>Categoria</li>
            <li style={{ width: `140px`, textAlign: `center` }}>Ano Publicação</li>
            <li style={{ width: `80px` }}>Status</li>
          </ul>
        </div>

        <div className="listagem-livros">
          <ul className="quadro-dados">
            {
              this.renderBooks()
            }
          </ul>
        </div>
      </div>);
  }

  renderUsers() {
    if (this.state.users.length <= 0) {
      return <div>Loading..</div>
    }
    else {
      return this.state.users.map((val, key) => {
        return <div key={key}>{val.name} | {val.age}</div>
      })
    }
  }

  render() {
    return (
      <div className='App'>
        <header>
          <ul className="opcoes-cabecalho">
            <li><a href="https://github.com/sw-book-library/telas-html">Cadastrar Livro</a></li>
            <li><a href="https://github.com/sw-book-library/telas-html">Cadastrar Usuário</a></li>
            <li><a href="https://github.com/sw-book-library/telas-html">Listar Livros</a></li>
            <li><a href="https://github.com/sw-book-library/telas-html">Emprestar Livro</a></li>
            <li><a href="https://github.com/sw-book-library/telas-html">Consultar Empréstimos</a></li>
            <li><a href="https://github.com/sw-book-library/telas-html">Solicitar Reserva</a></li>
          </ul>
        </header>
        <main>
          {
            this.renderBooksPage()
          }

        </main >
      </div>
    );
  }
}

export default App;
