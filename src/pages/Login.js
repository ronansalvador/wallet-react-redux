import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserAction } from '../actions';
import './Login.css';
import imgwallet from '../image/carteira.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      checkbutton: true,
    };
  }

  handleLogin = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validatePassword = 6;

      this.setState({
        checkbutton: !(validateEmail.test(email) && password.length >= validatePassword),
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, addUser } = this.props;
    const { email } = this.state;
    addUser(email);
    history.push('/carteira');
  }

  render() {
    const { checkbutton, email, password } = this.state;

    return (
      <div className="container">
        <form>
          <img src={ imgwallet } alt="Carteira" />
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            placeholder="E-mail"
            onChange={ this.handleLogin }
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            placeholder="Senha"
            onChange={ this.handleLogin }
          />
          <button
            type="submit"
            disabled={ checkbutton }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addUser: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addUser: (email) => dispatch(addUserAction(email)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
