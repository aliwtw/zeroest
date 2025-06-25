// Load the local JSON file asynchronously
async function loadJSON() {
    const response = await fetch('/data/data.json');

    // If file fails to load, throw an error for the catch block to handle
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Return parsed JSON
}

// Get query parameters from the URL (e.g. ?id=math,cs&category=STEM)
function getQueryFilters() {
    const params = new URLSearchParams(window.location.search);

    // Data as base64
    let data = params.get('data')

    if (data) {
        //console.log(data)
        data = atob(data); // Decode Base64
        data = JSON.parse(data)
        //console.log(data)
        return (data)
    }


    // Convert comma-separated values to arrays
    const ids = params.get('id')?.split(',').map(s => s.trim()) || null;
    const categories = params.get('category')?.split(',').map(s => s.trim()) || null;

    return { ids, categories }; // Return filters as an object
}

// Recursively filter topics and their subtopics based on `id` or `category` filters
function filterTopics(topics, filters) {


    return topics
        .filter(topic => {
            // Return the topic as it is. If topic is marked hidden
            if (topic.hidden) return false;

            // Check if the topic's ID matches the filter (or false)
            const matchId = filters.ids ?
                filters.ids.some(search =>
                    topic.id.toLowerCase() === search.toLowerCase()
                )
                : false

            // Check if at least one category matches (or false)
            const matchCategory = filters.categories ?
                topic.categories.some(cat =>
                    filters.categories.some(search =>
                        cat.toLowerCase() === search.toLowerCase()
                    )
                )
                : false

            // Recursive subtopics check
            topic.subtopics = filterTopics(topic.subtopics, filters)

            // Keep the topic if either ID or category matches or has subtopics
            return matchId || matchCategory || topic.subtopics.length > 0;


        })

    // The code below only displays if it's parents are provided in the parms ids and categories
    /*
    return topics
        .filter(topic => {
            // Skip if topic is marked hidden
            if (topic.hidden) return false;

            // Check if the topic's ID matches the filter (or false)
            const matchId = filters.ids ? filters.ids.includes(topic.id) : false

            // Check if at least one category matches (or false)
            const matchCategory = filters.categories ?
                topic.categories.some(cat =>
                    filters.categories.includes(cat)
                )
                : false

            // Keep the topic if either ID or category matches
            return matchId || matchCategory;
        })
        .map(topic => {
            // Recursively filter subtopics using the same rules
            const filteredSubtopics = topic.subtopics
                ? filterTopics(topic.subtopics, filters)
                : [];

            // Return a new topic object with filtered subtopics
            return {
                ...topic,
                subtopics: filteredSubtopics
            };
        });
    */
}

// Create a DOM tree node for each topic
function createNode(topic) {
    // Skip rendering if hidden (safety check, though already filtered)
    if (topic.hidden) return null;

    // Create container for this topic
    const container = document.createElement('div');
    container.className = 'tree-node';

    // Topic title
    const title = document.createElement('div');
    title.className = 'topic-title';
    title.textContent = topic.title;
    container.appendChild(title);

    // Topic description
    const description = document.createElement('div');
    description.className = 'topic-description';
    description.textContent = topic.description;
    container.appendChild(description);

    // Link to topic's page
    if (topic.link) {
        const link = document.createElement('a');
        link.className = 'hover-dark topic-link';
        link.href = topic.link;
        link.textContent = 'Open>';
        link.target = '_blank';
        container.appendChild(link);
    }

    // Recursively add child subtopics if any
    if (topic.subtopics && topic.subtopics.length > 0) {
        topic.subtopics.forEach(sub => {
            const childNode = createNode(sub);
            if (childNode) container.appendChild(childNode);
        });
    }

    return container; // Return the complete tree node
}

// Convert from tree to list and in decending order by date updated
// <3 Recursion 
function treeTolist(tree){

    let newList = [];

    tree.forEach(topic => {
        const subtopics = topic.subtopics;
        topic.subtopics = []
        newList.push(topic, ...treeTolist(subtopics));
    })

    return newList;

}

// Initialize page: load data, apply filters, build the tree
async function init() {
    const container = document.getElementById('tree-container'); // Get the tree container
    const listContainer = document.getElementById('list-container'); // Get the list container

    const filters = getQueryFilters(); // Parse filters from URL

    try {
        const data = await loadJSON(); // Load the full dataset

        const hasActiveFilters = filters.ids !== null || filters.categories !== null;

        const filtered = hasActiveFilters ?
            filterTopics(data, filters) // Apply recursive filtering if there are any filters
            : data; // Normal data if no filters provided

        // If nothing matches, show a fallback message
        if (filtered.length === 0) {
            container.textContent = '⚠️ No topics found.';
            return;
        }

        // Render the tree
        filtered?.forEach(topic => {
            const node = createNode(topic);
            if (node) container.appendChild(node);
        });

        // Render the list for latest topics
        const list = treeTolist(filtered);

        // Decending order by last Updated date
        list.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

        //console.log(list)

        list.forEach(topic => {
            const node = createNode(topic);
            if (node) listContainer.appendChild(node);
        });

    } catch (error) {
        // Handle load errors gracefully
        console.error('Failed to load JSON:', error);

        const errorMessage = document.createElement('div');
        errorMessage.textContent = '⚠️ Unable to load topics. Please check if "data.json" exists and is valid.';
        errorMessage.style.color = 'red';
        errorMessage.style.fontStyle = 'italic';
        container.appendChild(errorMessage);
    }
}

// Start the application once script loads
init();


// Add search functionality to filter rendered topics
document.getElementById('search-box').addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const container = document.getElementById('tree-container');

    // Hide/show tree nodes based on search match
    const nodes = document.querySelectorAll('.tree-node');
    nodes.forEach(node => {
        const text = node.textContent.toLowerCase();
        node.style.display = text.includes(query) ? '' : 'none';
    });
});

// Add listeners for info of About and Contact section
document.getElementById('about').addEventListener('click', () => {
    const info = document.querySelector('#about-info');
    
    if (info.style.height === '0px' || info.style.height === ''){
        info.style.height = '100px';
        info.style.borderBottom = '1px grey solid';
    }
    else {
        info.style.height = '0';
        info.style.border = 'none';
    }
})

document.getElementById('contact').addEventListener('click', () => {
    const info = document.querySelector('#contact-info');
    info.style.height = (info.style.height === '0px' || info.style.height === '') ? '100px' : '0';
})

// Add listener to switch between tree and list view
document.getElementById('tree-or-list').addEventListener('click', (e)=>{
    if(e.target.innerHTML == 'Σ'){
        e.target.innerHTML = '⊥'
        e.target.title="Latest Additions"

        document.getElementById('tree-container').style.display = 'block';
        document.getElementById('list-container').style.display = 'none';
    } else if (e.target.innerHTML == '⊥') {
        e.target.innerHTML = 'Σ'
        e.target.title="Tree View"

        document.getElementById('tree-container').style.display = 'none';
        document.getElementById('list-container').style.display = 'block';
    }
})