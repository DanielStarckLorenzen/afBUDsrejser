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
}

function printTripCards(allTrips) {
    const allTripCardsDiv = document.getElementById("tripCards");

    for (let trip of allTrips) {
        allTripCardsDiv.innerHTML += `
      <div class="flip-card">
        <div class="flip-card-inner" id="fi${trip.tripId}">
          <div class="flip-card-front" id="cf${trip.tripId}">
            <p class="flip-card-destination">${trip.destinationCity}</p>
            <p class="flip-card-bid">${trip.startingBid}</p>
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
