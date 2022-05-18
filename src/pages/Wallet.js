import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getcurrenciesThunk } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="despesa">
            Valor
            <input
              data-testid="value-input"
              type="number"
              id="despesa"
              placeholder="despesa"
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select id="currencies">
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
            <select data-testid="method-input" id="metodo-pagamento">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select data-testid="tag-input" id="categoria">
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
              placeholder="despesa"
            />
          </label>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getcurrenciesThunk()),
});

Wallet.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
