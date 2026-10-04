```javascript
/* =========================================
   QUICKNOTES
   Task 3: Add and display notes
   ========================================= */


/* =========================================
   1. SELECT ELEMENTS
   ========================================= */

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const characterCount = document.querySelector("#character-count");
const clearAllButton = document.querySelector("#clear-all-button");


/* =========================================
   2. NOTES ARRAY
   ========================================= */

let notes = [];


/* =========================================
   3. RENDER NOTES
   ========================================= */

function render(notesToRender = notes) {
    notesList.replaceChildren();

    notesToRender.forEach(function (note) {

        // Create the main list item
        const listItem = document.createElement("li");

        listItem.classList.add("note-card");

        // Add the category class
        const categoryClass = `category-${note.category.toLowerCase()}`;
        listItem.classList.add(categoryClass);


        // Category label
        const categoryLabel = document.createElement("span");

        categoryLabel.classList.add("category-label");
        categoryLabel.textContent = note.category;


        // Note text
        const noteText = document.createElement("p");

        noteText.classList.add("note-text");
        noteText.textContent = note.text;


        // Note footer
        const noteFooter = document.createElement("div");

        noteFooter.classList.add("note-footer");


        // Date
        const noteDate = document.createElement("small");

        noteDate.classList.add("note-date");
        noteDate.textContent = note.createdAt;


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";

        deleteButton.dataset.id = note.id;


        // Build footer
        noteFooter.appendChild(noteDate);
        noteFooter.appendChild(deleteButton);


        // Build note card
        listItem.appendChild(categoryLabel);
        listItem.appendChild(noteText);
        listItem.appendChild(noteFooter);


        // Add note card to list
        notesList.appendChild(listItem);
    });
}


/* =========================================
   4. ADD A NOTE
   ========================================= */

noteForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get and clean the note text
    const text = noteInput.value.trim();


    // Get selected category
    const category = noteCategory.value;


    // Create a new note object
    const newNote = {
        id: Date.now().toString(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };


    // Add the note to the array
    notes.unshift(newNote);


    // Render the updated list
    render();


    // Clear the input
    noteInput.value = "";


    // Reset character counter
    characterCount.textContent = "0 / 200";

});


/* =========================================
   5. CHARACTER COUNTER
   ========================================= */

noteInput.addEventListener("input", function () {

    const currentLength = noteInput.value.length;

    characterCount.textContent = `${currentLength} / 200`;

});


/* =========================================
   6. DELETE A NOTE
   ========================================= */

notesList.addEventListener("click", function (event) {

    if (!event.target.classList.contains("delete-button")) {
        return;
    }

    const noteId = event.target.dataset.id;

    notes = notes.filter(function (note) {
        return note.id !== noteId;
    });

    render();

});


/* =========================================
   7. SEARCH
   ========================================= */

searchInput.addEventListener("input", function () {

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter(function (note) {

        return note.text.toLowerCase().includes(searchTerm);

    });

    render(filteredNotes);

});


/* =========================================
   8. CLEAR ALL
   ========================================= */

clearAllButton.addEventListener("click", function () {

    if (notes.length === 0) {
        return;
    }

    const confirmed = confirm("Delete all notes?");

    if (confirmed) {
        notes = [];
        render();
    }

});


/* =========================================
   9. INITIAL RENDER
   ========================================= */

render();
```
