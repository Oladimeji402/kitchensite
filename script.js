let expenses = [];
let totalAmount = 0;

const nameSelect = document.getElementById('Name-select');
const locationSelect = document.getElementById('location-select');
const amountInput = document.getElementById('amount-input');
const addBtn = document.getElementById('add-btn');
const totalAmountCell = document.getElementById('total-amount');
const expensesTableBody = document.getElementById('expenses-table-body');

addBtn.addEventListener('click', function() {
    const name = nameSelect.value;
    const place = locationSelect.value;
    const amount = Number(amountInput.value);

    if (name === '') {
        alert('Please select a name');
        return;
    }
    if (place === '') {
        alert('Please select a location');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const expense = { name, place, amount, count: 1 };
    expenses.push(expense);
    totalAmount += amount;
    totalAmountCell.value = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const nameCell = newRow.insertCell();
    const placeCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const countCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    nameCell.textContent = name;
    placeCell.textContent = place;
    amountCell.textContent = amount;

    const countElement = document.createElement('span');
    const plusButton = document.createElement('button');
    const minusButton = document.createElement('button');
    let count = 1;

    countElement.textContent = count;
    plusButton.textContent = '+';
    minusButton.textContent = '-';

    countCell.appendChild(minusButton);
    countCell.appendChild(countElement);
    countCell.appendChild(plusButton);

    function updateTotalAmount() {
        totalAmount = expenses.reduce((sum, exp) => sum + exp.amount * exp.count, 0);
        totalAmountCell.value = totalAmount;
    }

    function increaseCount() {
        count++;
        countElement.textContent = count;
        expense.count = count;
        updateTotalAmount();
    }

    function decreaseCount() {
        if (count > 1) {
            count--;
            countElement.textContent = count;
            expense.count = count;
            updateTotalAmount();
        }
    }

    plusButton.addEventListener('click', increaseCount);
    minusButton.addEventListener('click', decreaseCount);

    deleteBtn.textContent = 'Delete';
    deleteCell.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function() {
        const index = expenses.findIndex(expense => expense.name === name && expense.place === place && expense.amount === amount);
        if (index !== -1) {
            expenses.splice(index, 1);
            totalAmount -= amount;
            totalAmountCell.textContent = totalAmount;
             updateTotalAmount();
            expensesTableBody.deleteRow(newRow.rowIndex - 1);
        }
    });

    // Clear input fields
    nameSelect.value = '';
    locationSelect.value = '';
    amountInput.value = '';
});
