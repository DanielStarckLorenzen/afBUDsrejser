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
    for (let i = 0; i < 9; i++) {
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
            allAuctions = allAuctions.filter(auction => auction.trip.destinationCountry === country);
            console.log(country);
        }
    }
    console.log(allTrips);
}

async function loadTrips() {
    const response = await fetch("http://localhost:8080/trips");
    const trips = await response.json();
    console.log(trips);
    return trips;
}
