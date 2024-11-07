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

    const tableBody = document.querySelector('.table-container__body');

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

    tableBody.appendChild(row);
}

document.getElementById('idFilter').addEventListener('input', filterTable);
document.getElementById('titleFilter').addEventListener('input', filterTable);
document.getElementById('editionYearFilter').addEventListener('input', filterTable);
document.getElementById('authorFilter').addEventListener('input', filterTable);
document.getElementById('costFilter').addEventListener('input', filterTable);
document.getElementById('copiesFilter').addEventListener('input', filterTable);

function filterTable(){

    const idFilterValue = document.getElementById('idFilter').value.toLowerCase();
    const titleFilterValue = document.getElementById('titleFilter').value.toLowerCase();
    const editionYearFilterValue = document.getElementById('editionYearFilter').value.toLowerCase();
    const authorFilterValue = document.getElementById('authorFilter').value.toLowerCase();
    const costFilterValue = document.getElementById('costFilter').value.toLowerCase();
    const copiesFilterValue = document.getElementById('copiesFilter').value.toLowerCase();

    const table = document.querySelector('.table-container__table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (const row of rows) {
        const id = row.cells[0].textContent.toLowerCase();
        const title = row.cells[1].textContent.toLowerCase();
        const editionYear = row.cells[2].textContent.toLowerCase();
        const author = row.cells[3].textContent.toLowerCase();
        const cost = row.cells[4].textContent.toLowerCase();
        const copies = row.cells[5].textContent.toLowerCase();

        const idMatch = id.includes(idFilterValue);
        const titleMatch = title.includes(titleFilterValue);
        const editionYearMatch = editionYear.includes(editionYearFilterValue);
        const authorMatch = author.includes(authorFilterValue);
        const costMatch = cost.includes(costFilterValue);
        const copiesMatch = copies.includes(copiesFilterValue);

        if (idMatch && titleMatch && editionYearMatch && authorMatch && costMatch && copiesMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

function resetSorting(){
    document.getElementById('idFilter').value = '';
    document.getElementById('titleFilter').value = '';
    document.getElementById('editionYearFilter').value = '';
    document.getElementById('authorFilter').value = '';
    document.getElementById('costFilter').value = '';
    document.getElementById('copiesFilter').value = '';
}