import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

import auth from './routes/auth.js';
import computerPartsRoutes from "./routes/computerPartsRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";

app.use('/', userRoutes);
app.use('/', auth);
app.use('/', computerPartsRoutes);
app.use('/', auctionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})