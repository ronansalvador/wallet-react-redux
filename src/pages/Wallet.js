import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import { getcurrenciesThunk, getExpenses } from '../actions';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { addExpenses, getCurrencies } = this.props;
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
    }));
    event.preventDefault();
    // const objeto = this.state;
    getCurrencies();
    addExpenses(this.state);
    // console.log(objeto);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, tag, method } = this.state;
    return (
      <div>
        <Header />
        <form className={ styles.formExpense }>
          <label htmlFor="despesa">
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="despesa"
              value={ value }
              placeholder="despesa"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              id="currencies"
              name="currency"
              value={ currency }
              onChange={ this.handleInput }
            >
              {currencies.map((currencie) => (
                <option
                  key={ currencie }
                  value={ currencie }
                >
                  {currencie}

                </option>))}
            </select>
          </label>
          <label htmlFor="metodo-pagamento">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="metodo-pagamento"
              name="method"
              value={ method }
              onChange={ this.handleInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select
              data-testid="tag-input"
              id="categoria"
              name="tag"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="descricao">
            Descrição
            <input
              data-testid="description-input"
              type="text"
              id="descricao"
              name="description"
              value={ description }
              placeholder="despesa"
              onChange={ this.handleInput }
            />
          </label>
          <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getcurrenciesThunk()),
  addExpenses: (expense) => dispatch(getExpenses(expense)),
});

Wallet.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
