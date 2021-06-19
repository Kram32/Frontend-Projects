'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// DATA
const account1 = {
  owner: 'Mark Anthony Vivar',
  movements: [200.2, 450.9, -400, 4000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Mia Suarez',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// ELEMENTS
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// DISPLAY THE MOVEMENTS IN UI AND SORT IT
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;

  moves.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${movement.toFixed(2)} PHP</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// CREATE USERNAMES
const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(function (firstLetterOfAnElement) {
        return firstLetterOfAnElement[0];
      })
      .join('');
  });
};

createUsername(accounts);

// TO UPDATE UI
const updateUI = function (account) {
  // To show movements
  displayMovements(account.movements);

  // To display balance
  calcPrintBalance(account);

  // To display summary
  calcDisplaySummary(account);
};

// DISPLAY THE CURRENT BALANCE IN UI
const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce(function (acc, movement) {
    return acc + movement;
  }, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)} PHP`;
};

// DISPLAY TOTAL INCOME AND OUTCOME IN UI
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement);

  labelSumIn.textContent = `${incomes.toFixed(2)} PHP`;

  const outcomes = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => Math.abs(acc - movement), 0);

  labelSumOut.textContent = `${outcomes.toFixed(2)} PHP`;

  const interest = account.movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest > 10)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)} PHP`;
};

// TO INITIALIZE THE CURRENT ACCOUNT
let currentAccount;

// TO SEE THE CURRENT DATE
const dateNow = new Date();
const month = `${dateNow.getMonth() + 1}`.padStart(2, 0);
const day = `${dateNow.getDate()}`.padStart(2, 0);
const year = dateNow.getFullYear();

const hours = dateNow.getHours();
const minutes = `${dateNow.getMinutes()}`.padStart(2, 0);
const seconds = dateNow.getSeconds();

labelDate.textContent = ` ${month}/${day}/${year}, ${hours}:${minutes}`;

// TO MAKE LOGIN WITH YOUR ACCOUNT
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  // To take the current account
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}!`;
    containerApp.style.opacity = 100;

    // To clear the input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update the information in current account
    updateUI(currentAccount);
  }
});

// TO TRANSFER THE MONEY INTO THE OTHER ACCOUNT
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    account => inputTransferTo.value === account.username
  );

  // To make your movements current values or just refresh the datas
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
});

// TO MAKE THE REQUEST LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (
    amount > 0 &&
    currentAccount.movements.some(movement => movement >= amount * 0.1)
  ) {
    // To add movement
    currentAccount.movements.push(Math.round(amount));

    // Update the UI
    updateUI(currentAccount);
  }
  // To clear the text from request loan form
  inputLoanAmount.value = '';
});

// TO LOGOUT THE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );
    console.log(index);

    // Hide UI
    containerApp.style.opacity = 0;

    // To change the welcome message into this text
    labelWelcome.textContent = 'Log in to get started';
  }
  // To clear the text from close form account
  inputClosePin.value = inputCloseUsername.value = '';
});

// TO SORT THE MOVEMENTS IN UI
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
