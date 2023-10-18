let parts = [];

const getAllParts = (req, res) => {
    res.json({ parts });
};

const addPart = (req, res) => {
    const part = req.body;
    parts.push(part);
    res.json({ message: "Part added successfully", part });
};

const getPartById = (req, res) => {
    const { id } = req.params;
    const part = parts.find(p => p.id === parseInt(id));
    if (!part) {
        return res.status(404).json({ message: 'Part not found' });
    }
    res.json(part);
};

const updatePart = (req, res) => {
    const { id } = req.params;
    const updatedPart = req.body;
    const partIndex = parts.findIndex(p => p.id === parseInt(id));
    if (partIndex === -1) {
        return res.status(404).json({ message: 'Part not found' });
    }
    parts[partIndex] = { id: parseInt(id), ...updatedPart };
    res.json({ message: 'Part updated successfully', part: parts[partIndex] });
};

const deletePart = (req, res) => {
    const { id } = req.params;
    const partIndex = parts.findIndex(p => p.id === parseInt(id));
    if (partIndex === -1) {
        return res.status(404).json({ message: 'Part not found' });
    }
    parts.splice(partIndex, 1);
    res.json({ message: 'Part deleted successfully' });
};

export {
    getAllParts,
    addPart,
    getPartById,
    updatePart,
    deletePart
};
