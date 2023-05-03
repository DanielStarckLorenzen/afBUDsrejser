async function postAuction(url, data) {
    const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

function createAuction() {
    const createAuctionForm = document.getElementById("createAuctionForm");
    const auction = {};
    for (let i = 0; i < 2; i++) {
        const element = createAuctionForm[i];
        auction[element.name] = element.value;
    }
    const auctionJson = JSON.stringify(auction);
    postAuction("http://localhost:8080/auction", auctionJson).then(r => console.log(r));

    createTrip(createAuctionForm);

}