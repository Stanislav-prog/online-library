const books = [];

const form = document.getElementById('form');
const formId = document.getElementById('book-id');
const formTitle = document.getElementById('book-title');
const formEditionYear = document.getElementById('book-edition-year');
const formAuthor = document.getElementById('book-author');
const formCost = document.getElementById('book-cost');
const formNumberOfCopies = document.getElementById('book-copies');

//Recheck info of EventListener
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
//Make it the way so the table is not being rewritten everytime, but only one row adds to present ones
function addBook(){

    // Making a new book appear in a dataset of books
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
    // Pushing new book to the list
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
    // Adding one row with newBook data
    const table = document.querySelector('.table-container__table');

    const row = document.createElement('tr');

    for (let key in newBook){
        const td = document.createElement('td');

        if (key === 'cost'){
            td.textContent = newBook[key] + '$';
            row.appendChild(td);
        } else {
            td.textContent = newBook[key];
            row.appendChild(td);
        }
    }

    table.appendChild(row);
}