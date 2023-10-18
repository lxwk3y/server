import express from 'express';
import * as auctionsController from '../controllers/auctionController.js'
import {requireAdmin, requireAuth} from "../models/users.js";

const router = express.Router();

router.get('/auctions', auctionsController.getAuctions);
router.get('/auctions/:id', auctionsController.getAuctionById);
router.post('/auctions', auctionsController.addAuction);
router.post('/create-auction', requireAdmin, auctionsController.addAuction);
router.post('/auctions/:id/bids', requireAuth, auctionsController.addBid);
router.get('/auctions/:id/bids', auctionsController.getAuctionById)
export default router;
