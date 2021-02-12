document.querySelector('#novaTransacao').addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector('.modal-overlay').classList.add('active')
});

function modalClose(){
    event.preventDefault();
    document.querySelector('.modal-overlay').classList.remove('active');
    document.querySelector('.error').style.display = 'none';
    Form.clearFields();

}


const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []

    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}


const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1);

        App.reload();
    },

    incomes() {
        let income = 0;

        Transaction.all.forEach((transaction) => {
            if( transaction.amount > 0 ) {
                income += transaction.amount
            }
        })
        return income
    },
    expenses() {
        let expense = 0;

        Transaction.all.forEach((transaction) => {
            if( transaction.amount < 0 ) {
                expense += transaction.amount
            }
        })
        return expense

    },
    total() {
        total = Transaction.incomes() + Transaction.expenses()
        if(total < 0) {
            document.querySelector('.total').classList.add('negativo')
        }else{
            document.querySelector('.total').classList.remove('negativo')

        }
        return  total
    }   
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction,index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction,index);
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr);

    },

    innerHTMLTransaction(transaction, index) {

        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td class="minus"> <a href="#">
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt=""></a>
        </td>
        `

        return html
    },

    updateBalance() {
        const income = document.getElementById('incomeDisplay').innerHTML = 
            Utils.formatCurrency(Transaction.incomes());
        const expense = document.getElementById('expenseDisplay').innerHTML = 
            Utils.formatCurrency(Transaction.expenses());
        const total = document.getElementById('totalDisplay').innerHTML = 
            Utils.formatCurrency(Transaction.total()); 

    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value) * 100
        return value
    },

    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date:Form.date.value
        }
    },

    validadeFields(){
        const { description, amount, date } = Form.getValues()

        if( description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === ""){
                document.querySelector('.error').style.display = 'inline-block';

        }else{
            const transaction = Form.formatValues();
            Form.saveTransaction(transaction);
            modalClose();
            Form.clearFields();

         }
    },

    formatValues(){
        let  { description,amount, date } = Form.getValues()
        amount  = Utils.formatAmount(amount);

        date = Utils.formatDate(date);

        return{
            description,
            amount,
            date
        }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""

    },

    submit(event) {
            event.preventDefault();
            Form.formatValues();
            Form.validadeFields();
    }
}


const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)
        document.querySelector('.error').style.display = 'none';


        DOM.updateBalance();

        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransactions();
        App.init();

    },
}

App.init()

