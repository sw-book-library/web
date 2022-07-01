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
  componentDidMount() {
    axios.get(process.env.REACT_APP_API_URL + 'books')
      .then(res => {
        if (res.data && res.data) {
          this.setState({ books: [...this.state.books, ...res.data] })
        }
      });

    axios.get(process.env.REACT_APP_API_URL + 'users')
      .then(res => {
        if (res.data && res.data) {
          this.setState({ users: [...this.state.users, ...res.data] })
        }
      });

    axios.get(process.env.REACT_APP_API_URL + 'reserves')
      .then(res => {
        if (res.data && res.data) {
          this.setState({ emprestimos: [...this.state.emprestimos, ...res.data] })
        }
      });
  }
  //--------------------------------------------- LIVROS ---------------------------------------------//
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
        document.location.reload(true);
      })
    } else {
      axios.put(process.env.REACT_APP_API_URL + 'books/' + idLivro, data).then(res => {
        document.getElementById("id").value = null;
        document.getElementById("codigo").value = null;
        document.getElementById("titulo").value = null;
        document.getElementById("autor").value = null;
        document.getElementById("editora").value = null;
        document.getElementById("categoria").value = null;
        document.getElementById("anoPublicacao").value = null;
        document.getElementById("botao-cadastro-e-editar-livro").textContent = "Cadastrar Livro";
        alert(`Registro alterado com sucesso`);
        document.location.reload(true);
      })
    }
  }

  deletarLivro = (idLivro) => {
    axios.delete(process.env.REACT_APP_API_URL + 'books/' + idLivro).then(res => {
      alert(`Registro deletado com sucesso`);
      document.location.reload(true);
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
    document.getElementById("botao-cadastro-e-editar-livro").textContent = "Alterar Livro";
  }

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
              <li style={{ width: '22px', textAlign: 'center' }}><button onClick={() => { this.deletarLivro(val.id) }}>D</button></li>
              <li style={{ width: '22px', textAlign: 'center' }}><button onClick={() => { this.editarLivro(val.id, val.title, val.productionYear, val.author, val.category, val.code, val.publishingCompany) }}>E</button></li>
            </ul>
          </li>
        );
      }
      )
      }
      </ul>);
    };
  }

  renderLivrosPage(classePaginaListagem) {
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
            <li style={{ width: '38px', textAlign: 'center' }}></li>
          </ul>
        </div>

        <div className={classePaginaListagem}>
          {
            this.renderLivros()
          }
        </div>
      </div>);
  }

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
          <button id='botao-cadastro-e-editar-livro' onClick={() => { this.inserirEditarLivro(document.getElementById("id").value, document.getElementById("titulo").value, document.getElementById("anoPublicacao").value, document.getElementById("autor").value, document.getElementById("categoria").value, document.getElementById("codigo").value, document.getElementById("editora").value) }} className="botao-padrao">Cadastrar Livro</button>
        </div>

        <br />

        <div className="divisao-cadastro-listagem">
          {
            this.renderLivrosPage("listagem-livros-cadastros")
          }
        </div>
      </div>);
  }
  //----------------------------------------------------------------------------------------------------//




  //--------------------------------------------- USUARIOS ---------------------------------------------//
  inserirEditarUsuario = (idUsuario, inputMatricula, inputNome, inputEmail, inputGrupoAcesso) => {
    var data = {
      name: inputNome,
      registration: inputMatricula,
      email: inputEmail,
      occupation: inputGrupoAcesso,
    }
    if (idUsuario === null || idUsuario === undefined || idUsuario === "") {
      axios.post(process.env.REACT_APP_API_URL + 'users', data).then(res => {
        document.getElementById("id").value = null;
        document.getElementById("matricula").value = null;
        document.getElementById("nome").value = null;
        document.getElementById("email").value = null;
        document.getElementById("grupo-acesso").value = null;
        alert(`Registro Inserido no banco com sucesso`);
        document.location.reload(true);
      })
    } else {
      axios.put(process.env.REACT_APP_API_URL + 'users/' + idUsuario, data).then(res => {
        document.getElementById("id").value = null;
        document.getElementById("matricula").value = null;
        document.getElementById("nome").value = null;
        document.getElementById("email").value = null;
        document.getElementById("grupo-acesso").value = null;
        document.getElementById("botao-cadastro-e-editar-usuario").textContent = "Alterar Usuário";
        alert(`Registro alterado com sucesso`);
        document.location.reload(true);
      })
    }
  }

  deletarUsuario = (idUsuario) => {
    axios.delete(process.env.REACT_APP_API_URL + 'users/' + idUsuario).then(res => {
      alert(`Registro deletado com sucesso`);
      document.location.reload(true);
    })
  }

  editarUsuario = (idUsuario, inputMatricula, inputNome, inputEmail, inputGrupoAcesso) => {
    document.getElementById("id").value = idUsuario;
    document.getElementById("matricula").value = inputMatricula;
    document.getElementById("nome").value = inputNome;
    document.getElementById("email").value = inputEmail;
    document.getElementById("grupo-acesso").value = inputGrupoAcesso;
    document.getElementById("botao-cadastro-e-editar-usuario").textContent = "Alterar Usuário";
  }

  renderUsuarios() {
    if (this.state.users.length <= 0) {
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
      return (<ul className="quadro-dados"> {this.state.users.map((val, key) => {
        return (
          <li key={key}>
            <ul className="linha-dados">
              <li style={{ width: '100px' }}>{val.registration}</li>
              <li style={{ width: '411px' }}>{val.name}</li>
              <li style={{ width: '287px' }}>{val.email}</li>
              <li style={{ width: '150px', textAlign: 'center' }}>{val.createdAt}</li>
              <li style={{ width: '100px' }}>{(val.occupation === "student" ? "Estudante" : (val.occupation === "teacher" ? "Professor" : "Admin"))}</li>
              <li style={{ width: '22px', textAlign: 'center' }}><button onClick={() => { this.deletarUsuario(val.id) }}>D</button></li>
              <li style={{ width: '22px', textAlign: 'center' }}><button onClick={() => { this.editarUsuario(val.id, val.registration, val.name, val.email, val.occupation) }}>E</button></li>
            </ul>
          </li>
        );
      }
      )
      }
      </ul>);
    };
  }

  renderCadastroUsuarioPage(classePaginaListagem) {
    return (
      <div>
        <div className="div-row">

          <div style={{ display: 'none' }}>
            <label>Id</label>
            <input style={{ width: '100px' }} type="number" id="id" disabled />
          </div>

          <div className="quadro-input">
            <label>Matricula</label>
            <input style={{ width: '130px' }} type="number" id='matricula' />
          </div>

          <div className="quadro-input">
            <label>Nome</label>
            <input style={{ width: '500px' }} type="text" id='nome' />
          </div>
        </div>

        <div className="div-row">
          <div className="quadro-input">
            <label>Grupo Acesso</label>
            <select id="grupo-acesso" name="grupo">
              <option value="student">Estudante</option>
              <option value="teacher">Professor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="quadro-input">
            <label>E-mail</label>
            <input style={{ width: '320px' }} type="text" id='email' />
          </div>
        </div>

        <br />

        <div className="div-botao-padrao">
          <button id='botao-cadastro-e-editar-usuario' onClick={() => { this.inserirEditarUsuario(document.getElementById("id").value, document.getElementById("matricula").value, document.getElementById("nome").value, document.getElementById("email").value, document.getElementById("grupo-acesso").value) }} className="botao-padrao">Cadastrar Usuário</button>
        </div>

        <br />

        <div>
          <div className="divisao-cadastro-listagem">
            <h3>Usuários Cadastrados</h3>
          </div>
          <div className="etiquetas-listagem">
            <ul>
              <li style={{ width: '100px' }}>Matricula</li>
              <li style={{ width: '411px' }}>Nome</li>
              <li style={{ width: '287px' }}>E-mail</li>
              <li style={{ width: '150px', textAlign: 'center' }}>Data Inclusão</li>
              <li style={{ width: '100px' }}>Acesso</li>
              <li style={{ width: '34px', textAlign: 'center' }}></li>
            </ul>
          </div>
          <div className="listagem-livros-cadastros">
            {
              this.renderUsuarios()
            }
          </div>
        </div>
      </div >);
  }
  //----------------------------------------------------------------------------------------------------//




  //------------------------------------------- EMPRÉSTIMOS -------------------------------------------//

  buscarNomeUsuario = (matricula) => {
  document.getElementById("nome-usuario").value = ""

    axios.get(process.env.REACT_APP_API_URL + 'users/registration/' + matricula)
      .then(res => {
      if (res.data.name) {
          document.getElementById("nome-usuario").value = res.data.name
        }
    });
  }
           

  buscarNomeLivro = (codigoLivro) => {
      document.getElementById("nome-livro").value = ""

    axios.get(process.env.REACT_APP_API_URL + 'books/code/' + codigoLivro)
      .then(res => {
        if (res.data.title) {
            document.getElementById("nome-livro").value = res.data.title
        }
      });
  }

  inserirEditarEmprestimo = (idReserva, inputMatricula, inputCodigoLivro, inputData) => {
    var data = {
      returnDate: inputData,
      bookId: inputCodigoLivro,
      userId: inputMatricula
    }
    if (idReserva === null || idReserva === undefined || idReserva === "") {
      axios.post(process.env.REACT_APP_API_URL + 'reserves', data).then(res => {
        document.getElementById("id").value = null;
        document.getElementById("matricula").value = null;
        document.getElementById("nome-usuario").value = null;
        document.getElementById("codigo-livro").value = null;
        document.getElementById("nome-livro").value = null;
        document.getElementById("data-devolucao").value = null;
        alert(`Registro Inserido no banco com sucesso`);
        document.location.reload(true);
      })
    } else {
      axios.put(process.env.REACT_APP_API_URL + 'reserves/' + idReserva, data).then(res => {
        document.getElementById("id").value = null;
        document.getElementById("matricula").value = null;
        document.getElementById("nome-usuario").value = null;
        document.getElementById("codigo-livro").value = null;
        document.getElementById("nome-livro").value = null;
        document.getElementById("data-devolucao").value = null;
        document.getElementById("botao-cadastro-e-editar-emprestimo").textContent = "Cadastrar Empréstimo";
        alert(`Registro alterado com sucesso`);
        document.location.reload(true);
      })
    }
  }

  deletarEmprestimo = (idReserva) => {
    axios.delete(process.env.REACT_APP_API_URL + 'reserves/' + idReserva).then(res => {
      alert(`Registro deletado com sucesso`);
      document.location.reload(true);
    })
  }

  editarEmprestimo = (idEmprestimo, inputMatricula, inputCodigoLivro, inputDataDevolucao) => {
    document.getElementById("id").value = idEmprestimo;
    document.getElementById("matricula").value = inputMatricula;
    this.buscarNomeUsuario(inputMatricula);
    document.getElementById("codigo-livro").value = inputCodigoLivro;
    this.buscarNomeLivro(inputCodigoLivro);
    document.getElementById("data-devolucao").value = inputDataDevolucao;
    document.getElementById("botao-cadastro-e-editar-emprestimo").textContent = "Alterar Empréstimo";
  }



  renderEmprestimoLivros() {
    if (this.state.emprestimos.length <= 0) {
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
      return (<ul className="quadro-dados">{this.state.emprestimos.map((val, key) => {
        return (
          <li key={key}>
            <ul className="linha-dados">
              <li style={{ width: '100px' }}>{val.User.registration}</li>
              <li style={{ width: '251px' }}>{val.User.name}</li>
              <li style={{ width: '70px' }}>{val.Book.code}</li>
              <li style={{ width: '331px' }}>{val.Book.title}</li>
              <li style={{ width: '140px', textAlign: 'center' }}>{val.createdAt}</li>
              <li style={{ width: '140px', textAlign: 'center' }}>{ /* new Intl.DateTimeFormat('en-US').format( */val.returnDate/* ) */}</li>
              <li style={{ width: '22px', textAlign: 'center' }}><button onClick={() => { this.deletarEmprestimo(val.id) }}>D</button></li>
              <li style={{ width: '22px', textAlign: 'center' }}><button onClick={() => { this.editarEmprestimo(val.id, val.User.registration, val.Book.code, val.returnDate) }}>E</button></li>
            </ul>
          </li>
        );
      })
      }</ul>);
    }
  }

  renderEmprestimosLivrosPage(classePaginaListagem) {
    return (
      <div>
        <div className="titulos-listagem">
          <h3>Livros Emprestados</h3>
        </div>
        <div className="etiquetas-listagem">
          <ul>
            <li style={{ width: '100px' }}>Matricula</li>
            <li style={{ width: '251px' }}>Nome</li>
            <li style={{ width: '70px' }}>Livro</li>
            <li style={{ width: '331px' }}>Título</li>
            <li style={{ width: '140px', textAlign: 'center' }}>Data Empréstimo</li>
            <li style={{ width: '140px', textAlign: 'center' }}>Data Devolução</li>
            <li style={{ width: '38px', textAlign: 'center' }}></li>
          </ul>
        </div>

        <div className={classePaginaListagem}>
          {
            this.renderEmprestimoLivros()
          }
        </div>
      </div >);
  };

  renderCadastroEmprestimoLivroPage() {
    return (
      <div>
        <div className="div-row">
          <div style={{ display: 'none' }}>
            <label>Id</label>
            <input style={{ width: '100px' }} type="number" id="id" disabled />
          </div>

          <div className="quadro-input">
            <label>Matricula</label>
            <input onChange={() => { this.buscarNomeUsuario(document.getElementById("matricula").value) }} style={{ width: '100px' }} type="number" id='matricula' />
          </div>

          <div className="quadro-input">
            <label>Nome Usuário</label>
            <input  style={{ width: '425px' }} type="text" id='nome-usuario' disabled />
          </div>
        </div>

        <div className="div-row">
          <div className="quadro-input">
            <label>Código Livro</label>
            <input onChange={() => { this.buscarNomeLivro(document.getElementById("codigo-livro").value) }}  style={{ width: '100px' }} type="number" id='codigo-livro' />
          </div>

          <div className="quadro-input">
            <label>Nome Livro</label>
            <input style={{ width: '620px' }} type="text" id='nome-livro' disabled />
          </div>

          <div className="quadro-input">
            <label>Data Devolução</label>
            <input pattern='dd/mm/yyyy' style={{ width: '138px' }} type="date" id='data-devolucao' />
          </div>
        </div>

        <br />

        <div className="div-botao-padrao">
          <button id='botao-cadastro-e-editar-emprestimo' onClick={() => { this.inserirEditarEmprestimo(document.getElementById("id").value, document.getElementById("matricula").value, document.getElementById("codigo-livro").value, document.getElementById("data-devolucao").value) }} className="botao-padrao">Emprestar Livro</button>
        </div>

        <br />

        <div className="divisao-cadastro-listagem">
          {
            this.renderEmprestimosLivrosPage("listagem-livros-cadastros")
          }
        </div>
      </div>);
  };


  //--------------------------------------------------------------------------------------------------//
  renderTelaInicial() {
    return (
      <div className="tela-inicial">
        <img className="logo" src={logo} alt="" />
      </div>
    );
  }

  renderTelaLogin() {
    return (
      <main className="main-login">
        <div className="quadro-login">
          <img src={logo} alt="" />
          <form action="">
            <input type="email" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Senha" />
            <button onClick={window.location.href == "https://book-library-front.herokuapp.com/DigilibLibrary"} type="submit">LOGIN</button>
          </form>
          <a href={"DigilibLibrary"}>Entrar em modo aluno</a>
        </div>
      </main>
    );
  }



  render() {
    if (window.location.href == "https://book-library-front.herokuapp.com/Login") {
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
              <li><a href={"CadastrarLivro"}>Cadastrar Livro</a></li>
              <li><a href={"CadastrarUsuario"}>Cadastrar Usuário</a></li>
              <li><a href={"ListarLivro"}>Listar Livros</a></li>
              <li><a href={"EmprestarLivro"}>Emprestar Livro</a></li>
              <li><a href={"ConsultarEmprestimo"}>Consultar Empréstimos</a></li>
            </ul>
          </header>
          <main >
            {(() => {              
              if (window.location.href == "https://book-library-front.herokuapp.com/CadastrarLivro") {
                return (
                  this.renderCadastroLivroPage()
                )
              } else if (window.location.href == "https://book-library-front.herokuapp.com/CadastrarUsuario") {
                return (
                  this.renderCadastroUsuarioPage()
                )
              } else if (window.location.href == "https://book-library-front.herokuapp.com/ListarLivro") {
                return (
                  this.renderLivrosPage("listagem-livros")
                )
              } else if (window.location.href == "https://book-library-front.herokuapp.com/EmprestarLivro") {
                return (
                  this.renderCadastroEmprestimoLivroPage()
                )
              } else if (window.location.href == "https://book-library-front.herokuapp.com/ConsultarEmprestimo") {
                return (
                  this.renderEmprestimosLivrosPage("listagem-livros")
                )
              } else  {
                return (
                  this.renderTelaInicial()
                )
              }
            })()}
          </main >
        </div >
      );
    }
  }
}

export default App;
