async function postTrip(url, data) {
    const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

function createTrip(createAuctionForm) {
    const trip = {};
    for (let i = 2; i < 9; i++) {
        const element = createAuctionForm[i];
        trip[element.name] = element.value;
    }
    const tripJson = JSON.stringify(trip);
    postTrip("http://localhost:8080/trip", tripJson).then(r => console.log(r));

}