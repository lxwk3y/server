import auctions from '../models/auctions.js';

const getAuctions = (req, res) => {
    res.json(auctions);
};

const getAuctionById = (req, res) => {
    const { id } = req.params;
    const auction = auctions.find(a => a.id === parseInt(id));
    if (!auction) {
        return res.status(404).json({ message: 'Auction not found' });
    }
    res.json(auction);
};

const addAuction = (req, res) => {
    const { itemType, name, endDate } = req.body;

    // Validate endDate
    const currentDate = new Date();
    const providedEndDate = new Date(endDate);
    const oneHourFuture = new Date(currentDate.getTime() + 60 * 60 * 1000); // 1 hour in the future

    if (providedEndDate <= oneHourFuture) {
        return res.status(400).json({ message: 'End date must be at least 1 hour from now.' });
    }

    const newAuction = {
        id: auctions.length + 1,
        itemType,
        name,
        endDate,
        bids: []
    };

    auctions.push(newAuction);
    res.status(201).json(newAuction);
};


const addBid = (req, res) => {
    const { id } = req.params;
    const { userId, amount } = req.body;
    const auction = auctions.find(a => a.id === parseInt(id));

    // Validate: Auction existence
    if (!auction) {
        return res.status(404).json({ message: 'Auction not found' });
    }

    // Validate: Auction status (assuming you have an 'endDate' property in your auction model)
    const auctionEndDate = new Date(auction.endDate);
    if (auctionEndDate <= new Date()) {
        return res.status(400).json({ message: 'Auction has ended' });
    }

    // Validate: Bid amount
    const highestBid = auction.bids.reduce((max, bid) => bid.amount > max ? bid.amount : max, 0);
    if (amount <= highestBid) {
        return res.status(400).json({ message: 'Bid must be higher than the current highest bid' });
    }

    // Validate: User authentication (this might be handled by middleware in your actual implementation)
    // if (!userId) {
    //     return res.status(401).json({ message: 'User not authenticated' });
    // }

    // Add the new bid
    const newBid = {
        userId,
        amount: parseFloat(amount),
        bidTime: new Date().toISOString()
    };

    auction.bids.push(newBid);
    res.status(201).json(newBid);
};


export {
    getAuctions,
    getAuctionById,
    addAuction,
    addBid
};
