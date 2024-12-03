const books = [
    {
        id_number: '1',
        title: 'Something',
        edition_year: '2024',
        author: 'Stanislav',
        cost: '10',
        numberOfCopies: '5',
    },
    {
        id_number: '2',
        title: 'Nothing',
        edition_year: '2010',
        author: 'Ruslan',
        cost: '30',
        numberOfCopies: '100',
    },
    {
        id_number: '3',
        title: 'Anything',
        edition_year: '2030',
        author: 'Igor',
        cost: '100',
        numberOfCopies: '3',
    },
];

const form = document.getElementById('form');
const formId = document.getElementById('book-id');
const formTitle = document.getElementById('book-title');
const formEditionYear = document.getElementById('book-edition-year');
const formAuthor = document.getElementById('book-author');
const formCost = document.getElementById('book-cost');
const formNumberOfCopies = document.getElementById('book-copies');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

function refreshTable() {
    const tableBody = document.querySelector('.table-container__body');
    tableBody.innerHTML = '';

    books.forEach((book) => {
        const row = document.createElement('tr');

        for (let key in book) {
            const td = document.createElement('td');

            if (key === 'cost') {
                td.textContent = book[key] + '$';
                row.appendChild(td);
            } else {
                td.textContent = book[key];
                row.appendChild(td);
            }
        }
        tableBody.appendChild(row);
        filterTable();
    })
}
refreshTable();

function addBook(){

    let newBook = {
        id_number: formId.value,
        title: formTitle.value,
        edition_year: formEditionYear.value,
        author: formAuthor.value,
        cost: formCost.value,
        numberOfCopies: formNumberOfCopies.value,
    }

    const messageElement = document.querySelector('.message');

    if (formId.value !== '' && formTitle.value !== '' && formEditionYear.value !== '' && formAuthor.value !== ''
        && formCost.value !== '' && formNumberOfCopies.value !== '') {
        if (books.some(book => book.id_number === newBook.id_number)) {
            messageElement.textContent = 'The book has already existed.';
            messageElement.style.color = 'red';
        } else {
            books.push(newBook);
            messageElement.textContent = 'The book is saved.';
            messageElement.style.color = 'green';
        }
    }

    refreshTable();

    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000)
}

function filterTable(){

    const idFilterValue = document.getElementById('idFilter').value.toLowerCase();
    const titleFilterValue = document.getElementById('titleFilter').value.toLowerCase();
    const authorFilterValue = document.getElementById('authorFilter').value.toLowerCase();
    const copiesFilterValue = document.getElementById('copiesFilter').value.toLowerCase();

    const table = document.querySelector('.table-container__table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (const row of rows) {
        const id = row.cells[0].textContent.toLowerCase();
        const title = row.cells[1].textContent.toLowerCase();
        const author = row.cells[3].textContent.toLowerCase();
        const copies = row.cells[5].textContent.toLowerCase();

        const idMatch = id.includes(idFilterValue);
        const titleMatch = title.includes(titleFilterValue);
        const authorMatch = author.includes(authorFilterValue);
        const copiesMatch = copies.includes(copiesFilterValue);

        if (idMatch && titleMatch && authorMatch && copiesMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

document.getElementById('idFilter').addEventListener('input', filterTable);
document.getElementById('titleFilter').addEventListener('input', filterTable);
document.getElementById('authorFilter').addEventListener('input', filterTable);
document.getElementById('copiesFilter').addEventListener('input', filterTable);

function filterByCost() {
    const minCost = parseFloat(document.getElementById('costFilterMin').value) || 1;
    const maxCost = parseFloat(document.getElementById('costFilterMax').value) || 1000;

    const table = document.querySelector('.table-container__table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (const row of rows) {
        const costCell = row.cells[4];
        const cost = parseFloat(costCell.textContent);

        if (cost >= minCost && cost <= maxCost) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

document.getElementById('costFilterMin').addEventListener('input', filterByCost);
document.getElementById('costFilterMax').addEventListener('input', filterByCost);

function filterByYear() {
    const selectedYear = document.getElementById('yearDropdownFilter').value;
    const table = document.querySelector('.table-container__table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (const row of rows) {
        const yearCell = row.cells[2];
        const year = yearCell.textContent;

        if (selectedYear === '' || year === selectedYear) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

document.getElementById('yearDropdownFilter').addEventListener('change', filterByYear);

function restoreTable(){
    const table = document.querySelector('.table-container__table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (const row of rows) {
        row.style.display = '';
    }
}

function resetSorting(){
    document.getElementById('idFilter').value = '';
    document.getElementById('titleFilter').value = '';
    document.getElementById('yearDropdownFilter').value = '';
    document.getElementById('authorFilter').value = '';
    document.getElementById('costFilterMin').value = '';
    document.getElementById('costFilterMax').value = '';
    document.getElementById('copiesFilter').value = '';
    restoreTable();
}

document.getElementById('removeIdFilter').addEventListener('click', function(){
    document.getElementById('idFilter').value = '';
    filterTable();
});
document.getElementById('removeTitleFilter').addEventListener('click', function(){
    document.getElementById('titleFilter').value = '';
    filterTable();
});
document.getElementById('removeYearFilter').addEventListener('click', function(){
    document.getElementById('yearDropdownFilter').value = '';
    filterTable();
})
document.getElementById('removeAuthorFilter').addEventListener('click', function(){
    document.getElementById('authorFilter').value = '';
    filterTable();
});
document.getElementById('removeCostFilter').addEventListener('click', function(){
    document.getElementById('costFilterMin').value = '';
    document.getElementById('costFilterMax').value = '';
    filterTable();
});
document.getElementById('removeCopiesFilter').addEventListener('click', function(){
    document.getElementById('copiesFilter').value = '';
    filterTable();
});