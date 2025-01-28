// Step 1: Initialize an array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Step 2: Function to display a random quote
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
}

// Step 3: Function to add a new quote
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

    // Clear the input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";

    // Notify the user
    alert("Quote added successfully!");

    // Update the DOM to reflect the new quote
    displayRandomQuote();
}

// Step 4: Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Show a random quote when the page loads
    displayRandomQuote();

    // Show a new random quote when the button is clicked
    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    }
    
    function createAddQuoteForm() {
        // Create form container
        const formContainer = document.createElement("div");
        formContainer.id = "quoteForm";
    
        // Create input for quote text
        const quoteInput = document.createElement("input");
        quoteInput.type = "text";
        quoteInput.id = "newQuoteText";
        quoteInput.placeholder = "Enter a new quote";
    
        // Create input for quote category
        const categoryInput = document.createElement("input");
        categoryInput.type = "text";
        categoryInput.id = "newQuoteCategory";
        categoryInput.placeholder = "Enter quote category";
    
        // Create button for adding the quote
        const addButton = document.createElement("button");
        addButton.textContent = "Add Quote";
        addButton.addEventListener("click", addQuote);
    
        // Append inputs and button to the form container
        formContainer.appendChild(quoteInput);
        formContainer.appendChild(categoryInput);
        formContainer.appendChild(addButton);
    
        // Append form container to the body or main container
        document.body.appendChild(formContainer);
    } 
});

