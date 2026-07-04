const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    res.status(200).json([]);
})

router.get('/', async (req, res) => {
    res.status(200).json([]);
})

router.post('/', async (req, res) => {


})

router.put('/:id', async () => {

})

router.delete('/:id', async (req, res) => {

})

module.exports = router;