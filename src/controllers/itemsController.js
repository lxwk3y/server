import items from '../models/items.js'
const getItems = (req, res) => {
    const { itemType } = req.params;
    const itemTypeData = items[itemType];

    if (!itemTypeData) {
        return res.status(404).json({ message: 'Item type not found' });
    }

    res.json(itemTypeData);
};
const getItemById = (req, res) => {
    const { itemType, itemId } = req.params;

    // Check if the item type exists
    if (!items[itemType]) {
        return res.status(404).json({ message: `Item type ${itemType} not found` });
    }

    // Find the item by ID
    const item = items[itemType].find(i => i.id === parseInt(itemId));

    // Check if the item was found
    if (!item) {
        return res.status(404).json({ message: `Item with id ${itemId} not found` });
    }

    // Send the item as a response
    res.json(item);
};


const addItem = (req, res) => {
    const { itemType } = req.params;
    const itemData = req.body;

    if (!items[itemType]) {
        return res.status(404).json({ message: 'Item type not found' });
    }

    const maxId = items[itemType].length > 0
        ? Math.max(...items[itemType].map(item => item.id))
        : 0;

    items[itemType].push({ ...itemData, id: maxId + 1 });
    res.status(201).json({ message: 'Item added successfully' });
};

const updateItem = (req, res) => {
    const { itemType, itemId } = req.params;
    const itemData = req.body;

    const itemArray = items[itemType];
    if (!itemArray) {
        return res.status(404).json({ message: 'Item type not found' });
    }

    const itemIndex = itemArray.findIndex(item => item.id === parseInt(itemId));
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    itemArray[itemIndex] = { ...itemData, id: itemArray[itemIndex].id };
    res.json({ message: 'Item updated successfully', item: itemArray[itemIndex] });
};

const deleteItem = (req, res) => {
    const { itemType, itemId } = req.params;

    const itemArray = items[itemType];
    if (!itemArray) {
        return res.status(404).json({ message: 'Item type not found' });
    }

    const itemIndex = itemArray.findIndex(item => item.id === parseInt(itemId));
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    itemArray.splice(itemIndex, 1);
    res.json({ message: 'Item deleted successfully' });
};

export {
    getItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};
