var books = [];

const form = document.querySelector('.book-form');
const formId = document.querySelector('.book-form__input--id');
const formTitle = document.querySelector('.book-form__input--title');
const formEditionYear = document.querySelector('.book-form__input--year');
const formAuthor = document.querySelector('.book-form__input--author');
const formCost = document.querySelector('.book-form__input--cost');
const formNumberOfCopies = document.querySelector('.book-form__input--copies');

form.addEventListener('submit', (e) => {
    e.preventDefault()

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
                td.textContent = book[key];
                row.appendChild(td);
            }

            table.appendChild(row);
        });

        tableContainer.appendChild(table);
    }

    createTable(books);
});