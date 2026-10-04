```javascript
/* =========================================
   QUICKNOTES
   Task 4: Validation, delete and count
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
   3. UPDATE NOTE COUNT
   ========================================= */

function updateNoteCount() {

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }

}


/* =========================================
   4. RENDER NOTES
   ========================================= */

function render(notesToRender = notes) {

    notesList.replaceChildren();


    // Show an empty-search message
    if (
        notesToRender.length === 0 &&
        notes.length > 0 &&
        searchInput.value.trim() !== ""
    ) {

        const emptyMessage = document.createElement("li");

        emptyMessage.classList.add("empty-state");

        emptyMessage.textContent = "No notes match your search.";

        notesList.appendChild(emptyMessage);

        updateNoteCount();

        return;
    }


    // Show normal notes
    notesToRender.forEach(function (note) {

        const listItem = document.createElement("li");

        listItem.classList.add("note-card");


        // Category class
        const categoryClass =
            `category-${note.category.toLowerCase()}`;

        listItem.classList.add(categoryClass);


        // Category label
        const categoryLabel = document.createElement("span");

        categoryLabel.classList.add("category-label");

        categoryLabel.textContent = note.category;


        // Note text
        const noteText = document.createElement("p");

        noteText.classList.add("note-text");

        noteText.textContent = note.text;


        // Footer
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


        // Build card
        listItem.appendChild(categoryLabel);
        listItem.appendChild(noteText);
        listItem.appendChild(noteFooter);


        // Add card to list
        notesList.appendChild(listItem);

    });


    updateNoteCount();

}


/* =========================================
   5. VALIDATE NOTE
   ========================================= */

function validateNote(text) {

    if (text.length === 0) {

        errorMessage.textContent =
            "Please type a note first.";

        return false;
    }


    if (text.length > 200) {

        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";

        return false;
    }


    errorMessage.textContent = "";

    return true;

}


/* =========================================
   6. ADD A NOTE
   ========================================= */

noteForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const text = noteInput.value.trim();

    const category = noteCategory.value;


    // Validate before creating the note
    if (!validateNote(text)) {
        return;
    }


    // Create note object
    const newNote = {

        id: Date.now().toString(),

        text: text,

        category: category,

        createdAt: new Date().toLocaleString()

    };


    // Add newest note to the beginning
    notes.unshift(newNote);


    // Clear the form
    noteInput.value = "";

    characterCount.textContent = "0 / 200";

    errorMessage.textContent = "";


    // Render
    render();

});


/* =========================================
   7. CHARACTER COUNTER
   ========================================= */

noteInput.addEventListener("input", function () {

    const currentLength = noteInput.value.length;

    characterCount.textContent =
        `${currentLength} / 200`;


    // Clear an old error while typing
    if (currentLength > 0) {
        errorMessage.textContent = "";
    }

});


/* =========================================
   8. DELETE A NOTE
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
   9. SEARCH
   ========================================= */

searchInput.addEventListener("input", function () {

    const searchTerm =
        searchInput.value.trim().toLowerCase();


    const filteredNotes = notes.filter(function (note) {

        return note.text
            .toLowerCase()
            .includes(searchTerm);

    });


    render(filteredNotes);

});


/* =========================================
   10. CLEAR ALL
   ========================================= */

clearAllButton.addEventListener("click", function () {

    if (notes.length === 0) {
        return;
    }


    const confirmed =
        confirm("Delete all notes?");


    if (confirmed) {

        notes = [];

        render();

    }

});


/* =========================================
   11. INITIAL RENDER
   ========================================= */

render();
```

