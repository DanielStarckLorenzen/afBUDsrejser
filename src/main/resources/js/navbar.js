const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".nav-item");

function handleIndicator(el) {
    items.forEach((item) => {
        item.classList.remove("is-active");
        item.removeAttribute("style");
    });

    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
    indicator.style.backgroundColor = el.getAttribute("active-color");

    el.classList.add("is-active");
    el.style.color = el.getAttribute("active-color");

    // Store the active tab in session storage
    sessionStorage.setItem("activeTab", el.href);
}

items.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        handleIndicator(e.target);
    });

    // Retrieve the active tab from session storage and set it as active
    const activeTab = sessionStorage.getItem("activeTab");
    if (activeTab && item.href === activeTab) {
        handleIndicator(item);
    }
});
