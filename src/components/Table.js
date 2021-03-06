import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenses, editExpenses } from '../actions';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses, removeExpense, editExpense } = this.props;
    return (
      <div>
        <table className="tabela">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const currentCurrency = Object.entries(expense.exchangeRates)
                .find((currency) => currency[0] === expense.currency);
              const nameCurrency = currentCurrency[1].name.split('/');
              const currencyValue = currentCurrency[1].ask;
              const total = expense.value * currencyValue;
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{nameCurrency[0]}</td>
                  <td>{Number(currencyValue).toFixed(2)}</td>
                  <td>{total.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editExpense(expense) }
                    >
                      Editar
                    </button>
                    /
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => removeExpense(expense.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,

  };
}

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpenses(expense)),
  editExpense: (expenseId) => dispatch(editExpenses(expenseId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
