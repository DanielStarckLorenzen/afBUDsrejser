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

function createTrip(createAuctionForm, auction) {
    const trip = {};
    for (let i = 2; i < 9; i++) {
        console.log(createAuctionForm[i])
        const element = createAuctionForm[i];
        trip[element.name] = element.value;
    }
    const tripJson = JSON.stringify(trip);
    postTrip("http://localhost:8080/trip", tripJson);

    const auctionJson = JSON.stringify(auction);
    postAuction("http://localhost:8080/auction", auctionJson);
}
