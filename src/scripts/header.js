const linksInitialText = [
    "Work",
    "Services",
    "Team",
    "Careers",
]

const setLinkText = () => {
    const linkCollection = document.querySelectorAll("nav ul a");
    linkCollection.forEach((item, index) => {
        item.textContent = linksInitialText[index];
    })
}

document.addEventListener("DOMContentLoaded", setLinkText);