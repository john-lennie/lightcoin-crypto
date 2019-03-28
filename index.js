class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction;
    }
    return balance;
  }

  get allTransactions() {
    return this.transactions;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    if (!this.check()) {
      return console.log("* unsuccessful transaction, not enough funds *\n");
    }
    console.log("* successful transaction *\n");
    // Add the transaction to the account
    this.account.addTransaction(this.value);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  check() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  check() {
    // if (this.value > this.account.balance) {
    //   return false;
    // }
    if (this.amount > this.account.balance) {
      return false;
    }
    return true;
  }
}

// DRIVER CODE BELOW

const myAccount = new Account("billybob");

console.log("" + JSON.stringify(myAccount) + "\n");

console.log("Starting Balance:", myAccount.balance, "\n");

const t1 = new Deposit(120.0, myAccount);
console.log("Transaction 1:", t1);
t1.commit();

const t2 = new Withdrawal(120.0, myAccount);
console.log("Transaction 2:", t2);
t2.commit();

const t3 = new Deposit(120.0, myAccount);
console.log("Transaction 3:", t3);
t3.commit();

console.log("All Transactions:", myAccount.allTransactions, "\n");

console.log("Ending Balance:", myAccount.balance, "\n");
