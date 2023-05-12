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

function countryFilter (selectedOption, allTrips) {
    const country = selectedOption.value;
    if (country === "all") {
        hideTripCards();
        printTripCards(allTrips);
    } else {
        const filteredTrips = allTrips.filter(trip => trip.destinationCountry === country);
        console.log(filteredTrips);
        hideTripCards();
        printTripCards(filteredTrips);
    }
}

function typeFilter(selectedOption, allTrips) {
    const type = selectedOption.value;
    if (type === "all") {
        hideTripCards();
        printTripCards(allTrips);
    }
    else if (type === "new") {
        const filteredTrips = allTrips.filter(trip => trip.highestBid === 0);
        console.log(filteredTrips);
        hideTripCards();
        printTripCards(filteredTrips);
    } else {
        const filteredTrips = allTrips.filter(trip => trip.highestBid !== 0);
        console.log(filteredTrips);
        hideTripCards();
        printTripCards(filteredTrips);
    }
}

function deadlineFilter(selectedDate, allTrips) {

    const deadline = new Date(selectedDate);
    const filteredTrips = allTrips.filter(trip => new Date(trip.deadline) <= deadline);
    hideTripCards();
    printTripCards(filteredTrips);
}


function sortByPriceHigh(items) {
    items.sort((a, b) => b.startingBid - a.startingBid);
    hideTripCards();
    printTripCards(items);
}

function sortByPriceLow(items) {
    items.sort((a, b) => a.startingBid - b.startingBid);
    console.log(items);
    hideTripCards();
    printTripCards(items);
}

function sortByDeadline(items) {
    items.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    hideTripCards();
    printTripCards(items);
}

function sortByName(items) {
    items.sort((a, b) => a.destinationCity.localeCompare(b.destinationCity));
    console.log(items);
    hideTripCards();
    printTripCards(items);
}