const books = [];

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

function addBook(){

    const idValue = formId.value;
    const titleValue = formTitle.value;
    const editionYearValue = formEditionYear.value;
    const authorValue = formAuthor.value;
    const costValue = formCost.value;
    const numberOfCopiesValue = formNumberOfCopies.value;

    let newBook = {
        id_number: idValue,
        title: titleValue,
        edition_year: editionYearValue,
        author: authorValue,
        cost: costValue,
        numberOfCopies: numberOfCopiesValue,
    }

    const messageElement = document.querySelector('.message');

    if (books.some(book => book.id_number === newBook.id_number)) {
        messageElement.textContent = 'The book has already existed.';
        messageElement.style.color = 'red';
    } else {
        books.push(newBook);
        messageElement.textContent = 'The book is saved.';
        messageElement.style.color = 'green';
    }
    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000)

    function createTable(books){
        const tableContainer = document.querySelector('.table-container');

        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'books-table';

        const headerRow = document.createElement('tr');
        const headers = ['ID', 'Title', 'Edition Year', 'Author', 'Cost', 'Number of copies'];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        })

        table.appendChild(headerRow);

        books.forEach(book => {
            const row = document.createElement('tr');

            for (let key in book) {
                const td = document.createElement('td');
                if (key === 'cost'){
                    td.textContent = book[key] + '$';
                    row.appendChild(td);
                } else {
                    td.textContent = book[key];
                    row.appendChild(td);
                }
            }

            table.appendChild(row);
        });

        tableContainer.appendChild(table);
    }

    createTable(books);
}