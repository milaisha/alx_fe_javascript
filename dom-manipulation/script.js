// Step 1: Initialize an array of quote objects
let quotes = [];

// Step 2: Load quotes and selected filter from local storage when the page loads
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }

    // Load the last selected filter
    const lastFilter = localStorage.getItem('lastFilter') || 'all';
    document.getElementById('categoryFilter').value = lastFilter;

    // Populate categories and filter quotes
    populateCategories();
    filterQuotes();
}

// Step 3: Save quotes and selected filter to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Step 4: Function to display a random quote
function displayRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Check if there are no quotes
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add a new quote!";
        return;
    }

    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote and its category
    quoteDisplay.innerHTML = `
        <p><strong>Quote:</strong> ${randomQuote.text}</p>
        <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;

    // Store the last viewed quote in session storage (optional)
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Step 5: Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Validate input
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category!");
        return;
    }

    // Add the new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Save quotes to local storage
    saveQuotes();

    // Clear the input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";

    // Notify the user
    alert("Quote added successfully!");

    // Update the DOM to reflect the new quote and categories
    populateCategories();
    filterQuotes();
}

// Step 6: Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const existingCategories = new Set();

    // Extract unique categories from quotes
    quotes.forEach(quote => existingCategories.add(quote.category));

    // Clear existing options (except "All Categories")
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add new categories to the dropdown
    existingCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Step 7: Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;

    // Save the selected filter to local storage
    localStorage.setItem('lastFilter', selectedCategory);

    // Filter quotes based on the selected category
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Display the filtered quotes
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
    } else {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `
            <p><strong>Quote:</strong> ${randomQuote.text}</p>
            <p><strong>Category:</strong> ${randomQuote.category}</p>
        `;
    }
}

// Step 8: Function to export quotes as a JSON file
function exportQuotes() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
}

// Step 9: Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes); // Add imported quotes to the array
        saveQuotes(); // Save updated quotes to local storage
        alert('Quotes imported successfully!');
        populateCategories(); // Update the categories dropdown
        filterQuotes(); // Update the DOM
    };
    fileReader.readAsText(file);
}

// Step 10: Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load quotes and selected filter from local storage
    loadQuotes();

    // Show a random quote when the page loads
    displayRandomQuote();

    // Show a new random quote when the button is clicked
    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
});

