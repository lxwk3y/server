import express from 'express';
import * as computerPartsController from "../controllers/computerPartsController.js";

const router = express.Router();

router.get('/parts', computerPartsController.getAllParts);
router.get('/parts/:id', computerPartsController.getPartById);
router.post('/parts', computerPartsController.addPart);
router.put('/parts/:id', computerPartsController.updatePart);
router.delete('/parts/:id', computerPartsController.deletePart);

export default router;
