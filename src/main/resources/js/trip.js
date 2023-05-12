function postTrip(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error posting trip:', error);
            throw error;
        });
}

function showCreateTripForm() {
    const createTripDiv = document.getElementById("createTrip");
    createTripDiv.style.display = "block";
}

function createTrip() {
    const createTripForm = document.getElementById("createTripForm").elements;
    const trip = {};
    for (let i = 0; i < createTripForm.length; i++) {
        console.log(createTripForm[i])
        const element = createTripForm[i];
        trip[element.name] = element.value;
    }
    const tripJson = JSON.stringify(trip);

    postTrip("http://localhost:8080/trip", tripJson)

}

async function onLoad() {
    let allTrips = await loadTrips();
    const url = window.location.href;
    let params = url.split("=");
    if (params.length > 1) {
        let country = params[1];
        if (url.includes(country)) {
            allTrips = allTrips.filter(trip => trip.destinationCountry === country);
            console.log(country);
        }
    }
    console.log(allTrips);
    /*
    const cardTest = document.getElementById("cf0");
    cardTest.style.backgroundImage = "url('https://www.tutorialspoint.com/computer_fundamentals/images/rom.jpg')";

     */
    const items = document.querySelectorAll(".nav-item");
    handleIndicator(items[1]);

    printTripCards(allTrips);

    const countryFilterInput = document.getElementById("country-filter");
    countryFilterInput.addEventListener("change", function() {
        const selectedOption = this.options[this.selectedIndex];
        countryFilter(selectedOption, allTrips);
    });

    const typeFilterInput = document.getElementById("type-filter");
    typeFilterInput.addEventListener("change", function() {
        const selectedOption = this.options[this.selectedIndex];
        typeFilter(selectedOption, allTrips);
    });

    const deadlineFilterInput = document.getElementById("deadline-filter");
    deadlineFilterInput.addEventListener("change", function() {
        console.log(this.value);
        const selectedDate = this.value;
        deadlineFilter(selectedDate, allTrips);
    });

    const sortInput = document.getElementById("sort-filter");
    sortInput.addEventListener("change", function() {
        console.log(this.options[this.selectedIndex].value)
        const selectedOption = this.options[this.selectedIndex].value;
        switch (selectedOption) {
            case "price-high":
                sortByPriceHigh(allTrips);
                break;
            case "price-low":
                sortByPriceLow(allTrips);
                break;
            case "deadline":
                sortByDeadline(allTrips);
                break;

                case "alphabetical":
                    console.log(allTrips);
                    sortByName(allTrips);
                    break;
            default:
                console.log("No sort selected");
                hideTripCards();
                printTripCards(allTrips);
                break;
        }
    })
}

function printTripCards(allTrips) {
    const allTripCardsDiv = document.getElementById("tripCards");

    for (let trip of allTrips) {
        let percentageRisen = Math.round((trip.highestBid / trip.startingBid) * 100 - 100);
        let percentageRisenString;
        let percentageColor = "green";
        if (percentageRisen > 0) {
            percentageRisenString = "⬆" + percentageRisen.toString() + "%";
        } else {
            percentageRisenString = "Ny!";
            percentageColor = "orange";
        }
        allTripCardsDiv.innerHTML += `
      <div class="flip-card">
        <div class="flip-card-inner" id="cardInner${trip.tripId}">
          <div class="flip-card-front" id="cardFront${trip.tripId}">
            <p class="flip-card-destination">${trip.destinationCity}</p>
            <p class="flip-card-highestBid">${trip.highestBid}</p>
            <h5 class="flip-card-startBid">(${trip.startingBid})</h5>
            <div class="percentage" style="background-color: ${percentageColor}">
                <span class="percentage-text">${percentageRisenString}</span>
            </div>
          </div>
          <div class="flip-card-back" id="cardBack${trip.tripId}">
            <p class="flip-card-country">Land: ${trip.destinationCountry}</p>
            <p class="flip-card-city">By: ${trip.destinationCity}</p>
            <p class="flip-card-airline">Flyselskab: ${trip.airline}</p>
            <p class="flip-card-departure">Afgang: ${trip.departureDate}</p>
            <p class="flip-card-return">Retur: ${trip.returnDate}</p>
            <p class="flip-card-deadline">Deadline: ${trip.deadline}</p>
          </div>
        </div>
      </div>
    `;
        const highestBid = document.getElementById(`cardInner${trip.tripId}`).querySelector(".flip-card-highestBid");
        const startBid = document.getElementById(`cardInner${trip.tripId}`).querySelector(".flip-card-startBid");
        if (trip.highestBid < trip.startingBid) {
            startBid.style.display = "none";
            highestBid.textContent = trip.startingBid;
        }

        const picture = document.getElementById(`cardFront${trip.tripId}`);
        picture.style.backgroundImage = `url('${trip.pictureUrl}')`;
    }

    // Attach the event listener to the parent element
    allTripCardsDiv.addEventListener("click", function(event) {
        // Check if the clicked element has the flip-card-back class
        if (event.target.closest(".flip-card-inner")) {
            const tripId = event.target.closest(".flip-card-inner").id.slice(2);
            window.location.href = `tripDetails.html?id=${tripId}`;
        }
    });
}

async function clickedTrip() {
    const items = document.querySelectorAll(".nav-item");
    handleIndicator(items[1]);

    let tripId = window.location.href.split("=")[1];
    console.log(tripId);
    let trip = await getTrip(tripId);

    const tripImage = document.getElementById("tripImage");
    tripImage.src = trip.pictureUrl;

    const tripTitle = document.getElementById("tripTitle");
    tripTitle.textContent = trip.destinationCity + ", " + trip.destinationCountry;

    const airline = document.getElementById("airline");
    airline.textContent = trip.airline;

    const flightNo = document.getElementById("flightNo");
    flightNo.textContent = trip.flightNo;

    const departure = document.getElementById("departure");
    departure.textContent = trip.departureDate;

    const returnDate = document.getElementById("return");
    returnDate.textContent = trip.returnDate;

    const hotelLink = document.getElementById("hotel");
    hotelLink.href = trip.hotel;
    hotelLink.textContent = trip.hotel;

    const startingBid = document.getElementById("startingBid");
    startingBid.textContent = trip.startingBid;

    const deadline = document.getElementById("auctionDeadline");
    deadline.textContent = trip.deadline;

    let allBids = await getBids(tripId);
    console.log(allBids);
    const bidHistory = document.getElementById("bidHistory");
    allBids.sort((a, b) => (a.bid > b.bid) ? 1 : -1);
    for (let bid of allBids) {
        bidHistory.innerHTML += `
        <li class="list-group-item">${bid.bidAmount} DKK af ${bid.user.name} - ${bid.bidDate}</li>
        `;
    }

    const highestBid = document.getElementById("highestBid");
    if (trip.highestBid) {
        let highestBidder = trip.user.name;
        highestBid.textContent = trip.highestBid + " DKK af " + highestBidder;
    } else {
        highestBid.textContent = trip.startingBid + " DKK. Ingen bud endnu. Dette er start-budet";
    }

    let user = sessionStorage.getItem("user");
    if (user) {
        console.log(user)
        user = JSON.parse(user);
        const userName = document.getElementById("userName");
        userName.textContent = user.name;

        const userInformation = document.getElementById("userInformation");
        userInformation.style.display = "block";

        const registerLoginBtn = document.getElementById("registerLoginBtn");
        registerLoginBtn.style.display = "none";
    } else {
        console.log("no user");
    }

    const bid = document.getElementById("bid");
    bid.min = trip.highestBid ? trip.highestBid + 0 : trip.startingBid;
    bid.value = bid.min;

    const bidForm = document.getElementById("bidForm");
    bidForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (user === null) {
            alert("Du skal være logget ind for at byde på en rejse");
        } else {
            const bidAmount = document.getElementById("bid").value;
            console.log(bidAmount);
            if (bidAmount > trip.highestBid) {
                console.log("bid accepted");
                const user = JSON.parse(sessionStorage.getItem("user"));
                bidOnTrip(bidAmount, user, trip);
            } else {
                console.log("bid too low");
            }
        }
    });
}

function bidOnTrip(bidAmount, user, trip) {
    const bid = {
        bidAmount: bidAmount,
        bidDate: new Date(),
        user: user,
        trip: trip
    }
    trip = {
        tripId: trip.tripId,
        destinationCity: trip.destinationCity,
        destinationCountry: trip.destinationCountry,
        airline: trip.airline,
        flightNo: trip.flightNo,
        departureDate: trip.departureDate,
        returnDate: trip.returnDate,
        hotel: trip.hotel,
        pictureUrl: trip.pictureUrl,
        startingBid: trip.startingBid,
        deadline: trip.deadline,
        highestBid: bidAmount,
        user: user
    }

    fetch("http://localhost:8080/updateTrip", {
        method: "POST",
        body: JSON.stringify(trip),
        headers: {
            "Content-Type": "application/json"
        }
    });
    fetch("http://localhost:8080/bid", {
        method: "POST",
        body: JSON.stringify(bid),
        headers: {
            "Content-Type": "application/json"
        }
    });
    location.reload();
}

async function seePopularTrips() {
    const allTrips = await loadTrips();
    const fourRandomTrips = [];
    for (let i = 0; i < 4; i++) {
        const randomTrip = allTrips[Math.floor(Math.random() * allTrips.length)];
        if (!fourRandomTrips.includes(randomTrip)) {
            fourRandomTrips.push(randomTrip);
        } else {
            i--;
        }
    }
    console.log(fourRandomTrips);
    const popularTrips = document.getElementById("popularTrips");
    for (let trip of fourRandomTrips) {
        let percentageRisen = Math.floor((trip.highestBid / trip.startingBid) * 100);
        let percentageRisenString;
        let percentageColor = "green";
        if (percentageRisen > 0) {
            percentageRisenString = percentageRisen.toString() + "%";
        } else {
            percentageRisenString = "New!";
            percentageColor = "orange";
        }
        popularTrips.innerHTML += `
        <div class="flip-card">
        <div class="flip-card-inner" id="fi${trip.tripId}">
          <div class="flip-card-front" id="cf${trip.tripId}">
            <p class="flip-card-destination">${trip.destinationCity}</p>
            <p class="flip-card-bid">${trip.startingBid}</p>
            <div class="percentage" style="background-color: ${percentageColor}">
                <span class="percentage-text">${percentageRisenString}</span>
            </div>
          </div>
          <div class="flip-card-back" id="fc${trip.tripId}">
            <p class="flip-card-country">Land: ${trip.destinationCountry}</p>
            <p class="flip-card-city">By: ${trip.destinationCity}</p>
            <p class="flip-card-airline">Flyselskab: ${trip.airline}</p>
            <p class="flip-card-departure">Afgang: ${trip.departureDate}</p>
            <p class="flip-card-return">Retur: ${trip.returnDate}</p>
            <p class="flip-card-deadline">Deadline: ${trip.deadline}</p>
          </div>
        </div>
      </div>
        `;

        const picture = document.getElementById(`cf${trip.tripId}`);
        picture.style.backgroundImage = `url('${trip.pictureUrl}')`;
    }

    // Attach the event listener to the parent element
    popularTrips.addEventListener("click", function(event) {
        // Check if the clicked element has the flip-card-back class
        if (event.target.closest(".flip-card-inner")) {
            const tripId = event.target.closest(".flip-card-inner").id.slice(2);
            window.location.href = `tripDetails.html?id=${tripId}`;
        }
    });

}

function hideTripCards() {
    const flipCards = document.querySelectorAll(".flip-card");
    for (let flipCard of flipCards) {
        flipCard.remove();
    }
}

async function getTrip(id) {
    const response = await fetch("http://localhost:8080/trip/" + id);
    const trip = await response.json();
    console.log(trip);
    return trip;
}


async function loadTrips() {
    const response = await fetch("http://localhost:8080/trips");
    const trips = await response.json();
    console.log(trips);
    return trips;
}

async function getBids(id) {
    console.log(id);
    const response = await fetch("http://localhost:8080/bids/" + id);
    const bids = await response.json();
    console.log(bids);
    return bids;
}
