// Generate anchor links in the sidebar (Table of contents)
const toc = document.getElementById('toc');

const sections = document.querySelectorAll('main > section'); // Select sections directly under main

if (toc.dataset.numbered != "true") {
    toc.className = "noNumbering";
}

const ol = document.createElement('ol');
toc.appendChild(ol);

sections.forEach(section => {
    ol.appendChild(getNumberedNestedHeadings(section));
});

function getNumberedNestedHeadings(parentSection) {
    const id = parentSection.id;

    // Create the anchor link
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = parentSection.querySelector('.heading')?.textContent || 'Untitled Section';

    // Smooth scroll and highlight on hover
    link.addEventListener("click", e => {
        e.preventDefault();
        parentSection.scrollIntoView({ behavior: "smooth" });
    });

    link.addEventListener("mouseenter", () => {
        parentSection.classList.add("grey-highlight");
    });

    link.addEventListener("mouseleave", () => {
        parentSection.classList.remove("grey-highlight");
    });

    // Create <li> and add the link
    const li = document.createElement('li');
    li.appendChild(link);

    // Process nested <section> elements
    const nestedSections = Array.from(parentSection.children).filter(child => child.tagName === 'SECTION');
    if (nestedSections.length > 0) {
        const nestedOl = document.createElement('ol');
        nestedSections.forEach(section => {
            nestedOl.appendChild(getNumberedNestedHeadings(section));
        });
        li.appendChild(nestedOl); // Nest the sub-list inside the <li>
    }

    return li; // Return the <li> for this section
}

/*
//Toc with nested Div
function getNestedHeadings(parentSection) {
    // Create a div to hold the link to this section
    const div = document.createElement('div');
    const id = parentSection.id;  // Get the section's ID
    const link = document.createElement('a');
    link.href = `#${id}`;  // Set the anchor link to point to the section's ID

    // Smooth scroll to the element on click without modifying browser history
    link.addEventListener("click", e => {
        e.preventDefault();
        parentSection.scrollIntoView({ behavior: "smooth" });
    });

    // Add hover effect using class toggling for pointing out section
    link.addEventListener("mouseenter", () => {
        parentSection.classList.add("grey-highlight");
    });

    link.addEventListener("mouseleave", () => {
        parentSection.classList.remove("grey-highlight");
    });

    // Find the heading inside this section
    const heading = parentSection.querySelector('.heading');
    if (heading) {
        link.textContent = heading.textContent;  // Set link text to the heading text
    } else {
        link.textContent = 'Untitled Section';  // Default text if no heading found
    }


    div.appendChild(link);  // Add the link to the div

    // Manually get the child <section> elements (nested sections) and recurse
    const newSections = Array.from(parentSection.children).filter(child => child.tagName === 'SECTION');

    // Recursively process any child sections (nested sections inside this section)
    const childNodes = document.createElement('div');

    if (newSections.length > 0) {
        newSections.forEach(section => {
            // Recursively call getNestedHeadings for each child section
            childNodes.appendChild(getNestedHeadings(section));
        });
    }

    childNodes.style.marginLeft = '1rem';  // Apply some left margin for nested sections

    div.appendChild(childNodes);  // Append the childNodes (recursive subsections)

    return div;
}
*/


function generateIEEEReference() {
    const websiteName = "Zeroest";
    const author = "A. Husnain";
    const title = document.title || "Untitled";
    const url = window.location.href;

    const dateObj = new Date();
    const day = dateObj.getDate();
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const dateString = `${day} ${month} ${year}`;

    return `${author}, "${title}", ${websiteName}. [Online]. Available: ${url}. Accessed on: ${dateString}.`;
}

// Set footer
document.getElementById("footer").innerHTML += "<b>Citation:</b> " + generateIEEEReference();