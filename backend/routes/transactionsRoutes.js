const express=require('express')
const{
    addTransaction,
    getTransaction,
    deleteTransaction
}=require('../controllers/transactionsController.js')
const protect = require('../middleware/authMiddleware.js')

const router = express.Router()

router.post('/', protect, addTransaction)
router.get('/', protect, getTransaction)
router.delete('/:id', protect, deleteTransaction)

module.exports = router