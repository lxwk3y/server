import express from 'express';
import * as itemsController from '../controllers/itemsController.js';

const router = express.Router();

router.get('/:itemType', itemsController.getItems);
router.get('/:itemType/:itemId', itemsController.getItemById);
router.post('/:itemType', itemsController.addItem);
router.put('/:itemType/:itemId', itemsController.updateItem);
router.delete('/:itemType/:itemId', itemsController.deleteItem);

export default router;
