import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const currentCurrencie = Object.entries(expense.exchangeRates)
        .find((currency) => currency[0] === expense.currency);
      return acc + (expense.value * currentCurrencie[1].ask);
    }, 0);
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{ total.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>

        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,

  };
}

export default connect(mapStateToProps)(Header);
