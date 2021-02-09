document.querySelector('#novaTransacao').addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector('.modal-overlay').classList.add('active')
});


document.querySelector("#cancelar").addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector('.modal-overlay').classList.remove('active')
});

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 50000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
]

const Transaction = {
    incomes() {

    },
    expenses() {

    },
    total() {

    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction,index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);

        console.log(tr);
    },

    innerHTMLTransaction(transaction) {
        
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="expense">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td class="minus"> <a href="#">
            <img src="./assets/minus.svg" alt=""></a>
        </td>
        `

        return html
    }
}

DOM.addTransaction(transactions[0]);