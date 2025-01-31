new autoComplete({
    data: {                              // Data source [Array, Function, Async] | (REQUIRED)
        src: filmsArray,                 // Changed from 'films' to 'filmsArray'
    },
    selector: "#autoCompleteInput",      // Input field selector              | (Optional)
    threshold: 2,                        // Minimum character length to start the engine | (Optional)
    debounce: 100,                       // Delay duration for engine to start | (Optional)
    searchEngine: "strict",              // Type/mode of search engine       | (Optional)
    resultsList: {                       // Rendered results list object     | (Optional)
        render: true,
        container: listContainer => {
            listContainer.setAttribute("id", "resultsList");
        },
        destination: document.querySelector("#autoCompleteInput"),
        position: "afterend",
        element: "ul"
    },
    maxResults: 5,                       // Maximum number of rendered results | (Optional)
    highlight: true,                     // Highlight matching results       | (Optional)
    resultItem: {                        // Rendered result item            | (Optional)
        content: (itemData, listItem) => {
            listItem.innerHTML = itemData.match;
        },
        element: "li"
    },
    noResults: () => {                   // Action script for no results     | (Optional)
        const noResultItem = document.createElement("li");
        noResultItem.setAttribute("class", "no-result");
        noResultItem.setAttribute("tabindex", "1");
        noResultItem.innerHTML = "No Results Found";
        document.querySelector("#autoCompleteList").appendChild(noResultItem);
    },
    onSelection: selectionFeedback => {  // Action script on selection event | (Optional)
        document.getElementById('autoCompleteInput').value = selectionFeedback.selection.value;
    }
});
