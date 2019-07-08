'use strict';
//Matrics Output
let balance_el = document.querySelector('#balance');
let income_el = document.querySelector('#income');
let expenses_el = document.querySelector('#expenses');
let budget_el = document.querySelector('#budget');

//Matrics Input
let balance_input = document.querySelector('#balance_input');
let income_input = document.querySelector('#income_input');
let expenses_input = document.querySelector('#expenses_input');
let budget_input = document.querySelector('#budget_input');

//Expenses Input
let expense_type_el = document.querySelector('#expense_name');
let expense_value_el = document.querySelector('#expense_value');

//Expenses Table Output
const exp_body = document.querySelector('#exp_body');

//Update Matrics
function updateMatrics() {
  income_el.textContent = account.getIncome();
  balance_el.textContent = account.getBalance();
  expenses_el.textContent = account.getExpenses();
  budget_el.textContent = account.getBudget();
  return true;
}
//Convert to Currency format
function toCurrency(money) {
  return parseFloat(money).toFixed(2);
}
//Budget Account
class Account {
  constructor() {
    this.expenses = 0;
    this.balance = 0;
    this.budget = 0;
    this.income = 0;
    this.expenses_list = [];
  }
  //Expenses
  getExpenses() {
    return toCurrency(this.expenses);
  }
  assignExpenses(expenses) {
    this.expenses = expenses;
    this.balance -= expenses;
    updateMatrics();
  }
  //Balance
  assignBalance(new_balance) {
    this.balance = new_balance;
    updateMatrics();
  }

  getBalance() {
    return toCurrency(this.balance);
  }

  //Budget
  assignBudget(new_budget) {
    this.budget = new_budget;
    updateMatrics();
  }
  getBudget() {
    return toCurrency(this.budget);
  }

  //Income
  assignIncome(new_income) {
    this.income += new_income;
    this.balance += new_income;
    updateMatrics();
  }
  getIncome() {
    return toCurrency(this.income);
  }

  //Expenses List
  addExpense(expense_name, expense_value) {
    let expensesObj = {};
    expensesObj.name = expense_name;
    expensesObj.value = expense_value;

    //Adjust Balance
    this.balance -= expense_value;
    //Adjust Expenses
    this.expenses += expense_value;
    this.expenses_list.push(expensesObj);
    updateMatrics();
    updateExpensesTable();
  }
  getExpensesList() {
    return this.expenses_list;
  }
  deleteExpense(expense) {
    this.expenses_list.pop(expense);
    this.balance += expense.value;
    updateMatrics();
    updateExpensesTable();
  }
}

//Update Expenses Table
function updateExpensesTable() {
  const exp_list = account.getExpensesList();
  const table_list = exp_list.map(exp => {
    return `<tr>
    <td>${exp.name}</td>
    <td>${toCurrency(exp.value)}</td>
    </tr>`;
  });
  exp_body.innerHTML = table_list.join('');
}

//Buttons Click Events
const btn = document.querySelectorAll('input[type="submit"]');
btn.forEach(button => {
  button.addEventListener('click', getValues);
});

//Update Table Data

//Create a Budget Account Instances
const account = new Account();

function getValues(e) {
  e.preventDefault();

  //Event Delagation
  //console.log(this.parentNode.parentNode);
  if (this.parentNode.parentNode.className == 'expenses_details') {
    account.addExpense(
      expense_type_el.value,
      parseFloat(expense_value_el.value)
    );
  } else if (
    this.parentNode.parentNode.className == 'income' ||
    'budget' ||
    'expenses' ||
    'balance'
  ) {
    if (this.parentNode.childNodes[3].id == 'expenses_input') {
      const expenses = parseFloat(expenses_input.value).toFixed(2);
      account.assignExpenses(expenses);
    } else if (this.parentNode.childNodes[3].id == 'income_input') {
      const income = parseFloat(income_input.value).toFixed(2);
      account.assignIncome(income);
    } else if (this.parentNode.childNodes[3].id == 'budget_input') {
      const budget = parseFloat(budget_input.value).toFixed(2);
      account.assignBudget(budget);
    } else if (this.parentNode.childNodes[3].id == 'balance_input') {
      const balance = parseFloat(balance_input.value).toFixed(2);
      account.assignBalance(balance);
    }
  }
}
