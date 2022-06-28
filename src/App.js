import logo from './LogoDigilibLibrary.png';
import './App.css';
import { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      users: [],
      emprestimos: []
    }
  }
  inserirEditarLivro = (idLivro, inputTitle, inputProductionYear, inputAuthor, inputCategory, inputCode, inputPublishingCompany) => {
    var data = {
      title: inputTitle,
      productionYear: inputProductionYear,
      author: inputAuthor,
      category: inputCategory,
      code: inputCode,
      publishingCompany: inputPublishingCompany
    }
    if (idLivro === null || idLivro === undefined || idLivro === "") {
      axios.post(process.env.REACT_APP_API_URL + 'books', data).then(res => {
        document.getElementById("id").value = null;
        document.getElementById("codigo").value = null;
        document.getElementById("titulo").value = null;
        document.getElementById("autor").value = null;
        document.getElementById("editora").value = null;
        document.getElementById("categoria").value = null;
        document.getElementById("anoPublicacao").value = null;
        alert(`Registro Inserido no banco com sucesso`);
      })
    } else {
      axios.put(process.env.REACT_APP_API_URL + 'books' + idLivro, data).then(res => {
        document.getElementById("id").value = null;
        document.getElementById("codigo").value = null;
        document.getElementById("titulo").value = null;
        document.getElementById("autor").value = null;
        document.getElementById("editora").value = null;
        document.getElementById("categoria").value = null;
        document.getElementById("anoPublicacao").value = null;
        document.getElementById("botao-cadastro-e-editar").textContent = "Cadastrar Livro";
        alert(`Registro alterado com sucesso`);
      })
    }
  }

  deletarLivro = (idLivro) => {
    axios.delete(process.env.REACT_APP_API_URL + 'books' + idLivro).then(res => {
      alert(`Registro deletado com sucesso`);
    })
  }

  editarLivro = (idLivro, inputTitle, inputProductionYear, inputAuthor, inputCategory, inputCode, inputPublishingCompany) => {
    document.getElementById("id").value = idLivro;
    document.getElementById("codigo").value = inputCode;
    document.getElementById("titulo").value = inputTitle;
    document.getElementById("autor").value = inputAuthor;
    document.getElementById("editora").value = inputPublishingCompany;
    document.getElementById("categoria").value = inputCategory;
    document.getElementById("anoPublicacao").value = inputProductionYear;
    document.getElementById("botao-cadastro-e-editar").textContent = "Alterar Livro";
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_URL + 'books')
      .then(res => {
        if (res.data && res.data) {
          this.setState({ books: [...this.state.books, ...res.data] })
        }
      });
  }






  // ---------------------------------------------------------------------------------------------------------- //
  //                                         RENDERIZA A LISTAGEM DE LIVROS                                     //
  // ---------------------------------------------------------------------------------------------------------- //

  renderLivros() {
    if (!Array.isArray(this.state.books) || this.state.books.length <= 0) {
      return (
        <ul className="quadro-dados">
          <li>
            <ul className="linha-dados">
              <li style={{ width: '1080px', textAlign: 'center' }}>SEM DADOS ENCONTRADOS</li>
            </ul>
          </li>
        </ul>);
    }
    else {
      return (<ul className="quadro-dados">{this.state.books.map((val, key) => {
        return (
          <li key={key}>
            <ul className="linha-dados">
              <li style={{ width: '0px' }} id="id-livro">{val.id}</li>
              <li style={{ width: '70px' }}>{val.code}</li>
              <li style={{ width: '340px' }}>{val.title}</li>
              <li style={{ width: '150px' }}>{val.author}</li>
              <li style={{ width: '150px' }}>{val.publishingCompany}</li>
              <li style={{ width: '150px' }}>{val.category}</li>
              <li style={{ width: '140px', textAlign: 'center' }}>{val.productionYear}</li>
              <li style={{ width: '46px' }}>{val.active === true ? "Ativo" : "Inativo"}</li>
              <li style={{ width: '19px', textAlign: 'center' }}><button onClick={() => { this.deletarLivro(val.id) }}>D</button></li>
              <li style={{ width: '19px', textAlign: 'center' }}><button onClick={() => { this.editarLivro(val.id, val.title, val.productionYear, val.author, val.category, val.code, val.publishingCompany) }}>E</button></li>
            </ul>
          </li>
        );
      }
      )
      }
      </ul>);
    };
  }

  renderLivrosPage() {
    return (
      <div>
        <div className="titulos-listagem">
          <h3>Livros Cadastrados</h3>
        </div>
        <div className="etiquetas-listagem">
          <ul>
            <li style={{ width: '70px' }}>Código</li>
            <li style={{ width: '340px' }}>Título</li>
            <li style={{ width: '150px' }}>Autor</li>
            <li style={{ width: '150px' }}>Editora</li>
            <li style={{ width: '150px' }}>Categoria</li>
            <li style={{ width: '140px', textAlign: 'center' }}>Ano Publicação</li>
            <li style={{ width: '46px' }}>Status</li>
            <li style={{ width: '38px', textAlign: 'center' }}>...</li>
          </ul>
        </div>

        <div className="listagem-livros">
          {
            this.renderLivros()
          }
        </div>
      </div>);
  }



  // ---------------------------------------------------------------------------------------------------------- //
  //                               RENDERIZA O CADASTRO DE LIVROS COM A LISTAGEM                                //
  // ---------------------------------------------------------------------------------------------------------- //

  renderCadastroLivroPage() {
    return (
      <div>
        <div className="div-row">

          <div style={{ display: 'none' }}>
            <label>Id</label>
            <input style={{ width: '100px' }} type="number" id="id" disabled />
          </div>

          <div className="quadro-input">
            <label>Codigo</label>
            <input style={{ width: '100px' }} type="number" id="codigo" />
          </div>

          <div className="quadro-input">
            <label>Título</label>
            <input style={{ width: '620px' }} type="text" id="titulo" />
          </div>
        </div>

        <div className="div-row">
          <div className="quadro-input">
            <label>Autor</label>
            <input style={{ width: '200px' }} type="text" id="autor" />
          </div>

          <div className="quadro-input">
            <label>Editora</label>
            <input style={{ width: '200px' }} type="text" id="editora" />
          </div>

          <div className="quadro-input">
            <label>Categoria</label>
            <input style={{ width: '200px' }} type="text" id="categoria" />
          </div>

          <div className="quadro-input">
            <label>Publicação</label>
            <input style={{ width: '200px' }} type="date" id="anoPublicacao" />
          </div>

        </div>

        <br />

        <div className="div-botao-padrao">
          <button id='botao-cadastro-e-editar' onClick={() => { this.inserirEditarLivro(document.getElementById("id").value, document.getElementById("titulo").value, document.getElementById("anoPublicacao").value, document.getElementById("autor").value, document.getElementById("categoria").value, document.getElementById("codigo").value, document.getElementById("editora").value) }} className="botao-padrao">Cadastrar Livro</button>
        </div>

        <br />

        <div className="divisao-cadastro-listagem">
          {
            this.renderLivrosPage()
          }
        </div>
      </div>);
  }


  // ---------------------------------------------------------------------------------------------------------- //
  //                                      RENDERIZA A LISTAGEM DE USUARIOS                                      //
  // ---------------------------------------------------------------------------------------------------------- //



  renderUsuarios() {
    if (this.state.users.length <= 0) {
      return (
        <li>
          <ul className="linha-dados">
            <li style={{ width: '1080px', textAlign: 'center' }}>SEM DADOS ENCONTRADOS</li>
          </ul>
        </li>);
    }
    else {
      return this.state.users.map((val, key) => {
        //<div key={key}>{val.name} | {val.age}</div>
        return (
          <li>
            <ul className="linha-dados">
              <li style={{ width: '100px' }}>202020400</li>
              <li style={{ width: '430px' }}>Joãozinho da Silva</li>
              <li style={{ width: '308px' }}>joaozinhosilva123@gmail.com</li>
              <li style={{ width: '150px' }}>(48) 4002-8922</li>
              <li style={{ width: '100px' }}>Aluno</li>
            </ul>
          </li>
        );
      })
    }
  }


  renderCadastroUsuarioPage() {
    return (
      <div>
        <div className="div-row">
          <div className="quadro-input">
            <label>Matricula</label>
            <input style={{ width: '130px' }} type="number" />
          </div>

          <div className="quadro-input">
            <label>Nome</label>
            <input style={{ width: '500px' }} type="text" />
          </div>
        </div>

        <div className="div-row">
          <div className="quadro-input">
            <label>Grupo Acesso</label>
            <input style={{ width: '130px' }} type="text" />
          </div>

          <div className="quadro-input">
            <label>E-mail</label>
            <input style={{ width: '320px' }} type="text" />
          </div>

          <div className="quadro-input">
            <label>Telefone</label>
            <input style={{ width: '170px' }} type="number" />
          </div>
        </div>

        <br />

        <div className="div-botao-padrao">
          <button className="botao-padrao">Cadastrar Usuário</button>
        </div>

        <br />

        <div>
          <div className="divisao-cadastro-listagem">
            <h3>Usuários Cadastrados</h3>
          </div>
          <div className="etiquetas-listagem">
            <ul>
              <li style={{ width: '100px' }}>Matricula</li>
              <li style={{ width: '425px' }}>Nome</li>
              <li style={{ width: '308px' }}>E-mail</li>
              <li style={{ width: '150px' }}>Telefone</li>
              <li style={{ width: '100px' }}>Grupo Acesso</li>
            </ul>
          </div>
          <div className="listagem-livros">
            <ul className="quadro-dados">
              {
                this.renderUsuarios()
              }
            </ul>
          </div>
        </div>
      </div>);
  }




  // ---------------------------------------------------------------------------------------------------------- //
  //                                     RENDERIZA A LISTAGEM DE EMPRESTIMOS                                    //
  // ---------------------------------------------------------------------------------------------------------- //



  renderEmprestimoLivros() {
    if (this.state.emprestimos.length <= 0) {
      return (
        <li>
          <ul className="linha-dados">
            <li style={{ width: '1080px', textAlign: 'center' }}>SEM DADOS ENCONTRADOS</li>
          </ul>
        </li>);
    }
    else {
      return this.state.emprestimos.map((val, key) => {
        return (
          <li>
            <ul className="linha-dados">
              <li style={{ width: '100px' }}>202020400</li>
              <li style={{ width: '280px' }}>Joãozinho da Silva</li>
              <li style={{ width: '70px' }}>0000001</li>
              <li style={{ width: '350px' }}>Atlas escolar geográfico 1ª edição</li>
              <li style={{ width: '140px', textAlign: 'center' }}>01/02/2023</li>
              <li style={{ width: '140px', textAlign: 'center' }}>31/03/2023</li>
            </ul>
          </li>
        );
      })
    }
  }
  renderEmprestimosLivrosPage() {
    return (
      <div>
        <div className="titulos-listagem">
          <h3>Livros Emprestados</h3>
        </div>
        <div className="etiquetas-listagem">
          <ul>
            <li style={{ width: '100px' }}>Matricula</li>
            <li style={{ width: '280px' }}>Nome</li>
            <li style={{ width: '70px' }}>Livro</li>
            <li style={{ width: '350px' }}>Título</li>
            <li style={{ width: '140px', textAlign: 'center' }}>Data Empréstimo</li>
            <li style={{ width: '140px', textAlign: 'center' }}>Data Devolução</li>
          </ul>
        </div>

        <div className="listagem-livros">
          <ul className="quadro-dados">
            {
              this.renderEmprestimoLivros()
            }
          </ul>
        </div>
      </div>);
  };



  // ---------------------------------------------------------------------------------------------------------- //
  //                           RENDERIZA O CADASTRO DE EMPRESTIMOS COM A LISTAGEM                               //
  // ---------------------------------------------------------------------------------------------------------- //

  renderCadastroEmprestimoLivroPage() {
    return (
      <div>
        <div className="div-row">
          <div className="quadro-input">
            <label>Matricula</label>
            <input style={{ width: '100px' }} type="number" />
          </div>

          <div className="quadro-input">
            <label>Nome Usuário</label>
            <input style={{ width: '425px' }} type="text" disabled />
          </div>
        </div>

        <div className="div-row">
          <div className="quadro-input">
            <label>Código Livro</label>
            <input style={{ width: '100px' }} type="number" />
          </div>

          <div className="quadro-input">
            <label>Nome Livro</label>
            <input style={{ width: '620px' }} type="text" disabled />
          </div>

          <div className="quadro-input">
            <label>Data Devolução</label>
            <input style={{ width: '138px' }} type="date" />
          </div>
        </div>

        <br />

        <div className="div-botao-padrao">
          <button className="botao-padrao">Emprestar Livro</button>
        </div>

        <br />

        <div className="divisao-cadastro-listagem">
          {
            this.renderEmprestimosLivrosPage()
          }
        </div>
      </div>);
  };


  renderTelaInicial() {
    return (
      <div class="tela-inicial">
        <img class="logo" src={logo} alt="" />
        <p>Essa tela devera aparecer quando abrir o sistema e não tiver clicado em nenhum menu.
          Precisa ser definido um desing para essa tela inicial. Foi feito algo simples aqui apenas para representar
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------------------------------------- //
  //                                          RENDERIZA A PAGINA PRINCIPAL                                      //
  // ---------------------------------------------------------------------------------------------------------- //

  renderTelaLogin() {
    return (
      <main className="main-login">
        <div class="quadro-login">
          <img src={logo} alt="" />
          <form action="">
            <input type="email" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Senha" />
            <button type="submit">LOGIN</button>
          </form>
          <a href="https://github.com/sw-book-library">Entrar em modo aluno</a>
        </div>
      </main>
    );
  }



  render() {
    if (1 == 2) {
      return (
        <div className='App'>
          {
            this.renderTelaLogin()
          }
        </div>);
    } else {
      return (
        <div className='App'>
          <header>
            <ul className="opcoes-cabecalho">
              <li><a href="https://github.com/sw-book-library">Cadastrar Livro</a></li>
              <li><a href="https://github.com/sw-book-library">Cadastrar Usuário</a></li>
              <li><a href="https://github.com/sw-book-library">Listar Livros</a></li>
              <li><a href="https://github.com/sw-book-library">Emprestar Livro</a></li>
              <li><a href="https://github.com/sw-book-library">Consultar Empréstimos</a></li>
              {/* <li><a href="https://github.com/sw-book-library">Solicitar Reserva</a></li>  
            Somente sera feito o solicitar Reserva se for feito no back=-end, pois conforme foi conversado
            talvez não de tempo de fazer então ele daria para tirar em ultimos casos*/}
            </ul>
          </header>
          <main >
            {
              //this.renderTelaInicial()
              //this.renderLivrosPage()
              this.renderCadastroLivroPage()

              //this.renderCadastroUsuarioPage()
              //this.renderEmprestimosLivrosPage()
              //this.renderCadastroEmprestimoLivroPage()
            }
          </main >
        </div>
      );
    }
  }
}

export default App;
