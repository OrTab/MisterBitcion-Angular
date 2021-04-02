const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getContacts, getContact } = require('./contact.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getContacts)
router.get('/:id', getContact)
// router.put('/:id', updateContact)
// router.post('/', addContact)
// router.delete('/:id', requireAuth, requireAdmin, deleteContact)

module.exports = router