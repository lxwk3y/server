// backend/data/auctionData.js

const auctionData = [
    {
        id: 1,
        name: "NVIDIA GeForce RTX 3080",
        category: "Graphics Card",
        description: "High-end gaming graphics card.",
        price: 699,
        bids: [],
        auctionEnd: new Date("2023-12-31T23:59:59"),
    },
    {
        id: 2,
        name: "AMD Ryzen 9 5900X",
        category: "CPU",
        description: "Powerful desktop CPU for gaming and productivity.",
        price: 549,
        bids: [],
        auctionEnd: new Date("2023-12-31T23:59:59"),
    },
    // Voeg meer veilingitems toe zoals hierboven...
];

module.exports = auctionData;
