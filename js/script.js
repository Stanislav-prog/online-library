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
const tableBody = document.querySelector('.table-container__body');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

function refreshTable() {
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
    })
}

window.addEventListener('load', () => {
    console.log('Table loaded!');
    refreshTable();
})

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

    if (formEditionYear.value >= 2010 && formEditionYear.value <= 2030 && formCost.value >= 1 && formCost.value <= 1000) {
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
    }
    refreshTable();

    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000)
}

function resetFiltering(){
    document.getElementById('idFilter').value = '';
    document.getElementById('titleFilter').value = '';
    document.getElementById('yearDropdownFilter').value = '';
    document.getElementById('authorFilter').value = '';
    document.getElementById('costFilterMin').value = '';
    document.getElementById('costFilterMax').value = '';
    document.getElementById('copiesFilter').value = '';
    refreshTable();
}

const filters = {
    id: '',
    title: '',
    year: '',
    author: '',
    costMin: null,
    costMax: null,
    copies: '',
};

document.getElementById('idFilter').addEventListener('input', (e) => {
    filters.id = e.target.value.toLowerCase();
    applyFilters();
});
document.getElementById('titleFilter').addEventListener('input', (e) => {
    filters.title = e.target.value.toLowerCase();
    applyFilters();
});
document.getElementById('yearDropdownFilter').addEventListener('change', (e) => {
    filters.year = e.target.value;
    applyFilters();
});
document.getElementById('authorFilter').addEventListener('input', (e) => {
    filters.author = e.target.value.toLowerCase();
    applyFilters();
});
document.getElementById('costFilterMin').addEventListener('input', (e) => {
    filters.costMin = parseFloat(e.target.value) || null;
    applyFilters();
});
document.getElementById('costFilterMax').addEventListener('input', (e) => {
    filters.costMax = parseFloat(e.target.value) || null;
    applyFilters();
});
document.getElementById('copiesFilter').addEventListener('input', (e) => {
    filters.copies = e.target.value.toLowerCase();
    applyFilters();
});

function applyFilters() {
    tableBody.innerHTML = ''; // Clear the table
    books.forEach((book) => {
        const matchesId = !filters.id || book.id_number.toLowerCase().includes(filters.id);
        const matchesTitle = !filters.title || book.title.toLowerCase().includes(filters.title);
        const matchesYear = !filters.year || book.edition_year === filters.year;
        const matchesAuthor = !filters.author || book.author.toLowerCase().includes(filters.author);
        const matchesCost = (filters.costMin === null || parseFloat(book.cost) >= filters.costMin) &&
            (filters.costMax === null || parseFloat(book.cost) <= filters.costMax);
        const matchesCopies = !filters.copies || book.numberOfCopies.toLowerCase().includes(filters.copies);

        if (matchesId && matchesTitle && matchesYear && matchesAuthor && matchesCost && matchesCopies) {
            const row = document.createElement('tr');
            for (let key in book) {
                const td = document.createElement('td');
                td.textContent = key === 'cost' ? book[key] + '$' : book[key];
                row.appendChild(td);
            }
            tableBody.appendChild(row);
        }
    });
}

document.getElementById('removeIdFilter').addEventListener('click', () => {
    filters.id = '';
    document.getElementById('idFilter').value = '';
    applyFilters();
});
document.getElementById('removeTitleFilter').addEventListener('click', () => {
    filters.title = '';
    document.getElementById('titleFilter').value = '';
    applyFilters();
});
document.getElementById('removeYearFilter').addEventListener('click', () => {
    filters.year = '';
    document.getElementById('yearDropdownFilter').value = '';
    applyFilters();
});
document.getElementById('removeAuthorFilter').addEventListener('click', () => {
    filters.author = '';
    document.getElementById('authorFilter').value = '';
    applyFilters();
});
document.getElementById('removeCostFilter').addEventListener('click', () => {
    filters.costMin = null;
    filters.costMax = null;
    document.getElementById('costFilterMin').value = '';
    document.getElementById('costFilterMax').value = '';
    applyFilters();
});
document.getElementById('removeCopiesFilter').addEventListener('click', () => {
    filters.copies = '';
    document.getElementById('copiesFilter').value = '';
    applyFilters();
});
