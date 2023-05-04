function postTrip(url, data) {
    const postRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: data
    }
    fetch(url, postRequest).catch((error) => console.log(error));
}

async function createTrip(createAuctionForm, auction) {
    /*const trip = {};
    for (let i = 2; i < 9; i++) {
        const element = createAuctionForm[i];
        trip[element.name] = element.value;
    }
    auction["trip"] = trip;

    const tripJson = JSON.stringify(trip);
    postTrip("http://localhost:8080/trip", tripJson);

    const auctionJson = JSON.stringify(auction);
    postAuction("http://localhost:8080/auction", auctionJson);

     */

    const trip = {};
    for (let i = 2; i < 9; i++) {
        const element = createAuctionForm[i];
        trip[element.name] = element.value;
    }
    const tripJson = JSON.stringify(trip);

    // Send the POST request to create the trip
    const tripResponse = await fetch("http://localhost:8080/trip", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: tripJson
    });
    const tripData = await tripResponse.json();
    debugger;
    console.log(tripData.trip_id);

    // Set the trip_id property on the auction object
    auction.trip_id = tripData.trip_id;

    const auctionJson = JSON.stringify(auction);

    // Send the POST request to create the auction
    const auctionResponse = await fetch("http://localhost:8080/auction", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: auctionJson
    });
    const auctionData = await auctionResponse.json();

    console.log(auctionData);
}