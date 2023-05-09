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
    printTripCards(allTrips);
}

function printTripCards(allTrips) {
    const allTripCardsDiv = document.getElementById("tripCards");

    for (let trip of allTrips) {
        allTripCardsDiv.innerHTML += `
      <div class="flip-card">
        <div class="flip-card-inner">
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
        // Check if the clicked element has the flip-card class
        if (event.target.classList.contains("flip-card-back")) {
            const tripId = event.target.id.slice(2);
            window.location.href = `tripDetails.html?id=${tripId}`;
        }
    });
}




async function loadTrips() {
    const response = await fetch("http://localhost:8080/trips");
    const trips = await response.json();
    console.log(trips);
    return trips;
}
