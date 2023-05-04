function postAuction(url, data) {
    const postRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: data
    }
    fetch(url, postRequest).catch((error) => console.log(error));
}

function createAuction() {
    const createAuctionForm = document.getElementById("createAuctionForm");
    const auction = {};
    for (let i = 0; i < 2; i++) {
        console.log(createAuctionForm[i])
        const element = createAuctionForm[i];
        auction[element.name] = element.value;
    }
    const auctionJson = JSON.stringify(auction);
    //postAuction("http://localhost:8080/auction", auctionJson);

    createTrip(createAuctionForm, auction);
}
