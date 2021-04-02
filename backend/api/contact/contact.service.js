
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    // remove,
    // update,
    // add
    // getByContactname,
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        let contacts = await collection.find(criteria).toArray()
        contacts = contacts.map(contact =>{
             delete contact.password
             delete contact.username
             delete contact.coins
             delete contact.moves
             return contact
            })
        return contacts
    } catch (err) {
        logger.error('cannot find contacts', err)
        throw err
    }
}

async function getById(contactId) {
    try {
        const collection = await dbService.getCollection('user')
        const contact = await collection.findOne({ '_id': ObjectId(contactId) })
        delete contact.password
        delete contact.username
        delete contact.coins
        delete contact.moves
        return contact
    } catch (err) {
        logger.error(`while finding contact ${contactId}`, err)
        throw err
    }
}

// async function getByContactname(contactname) {
//     try {
//         const collection = await dbService.getCollection('contact')
//         const contact = await collection.findOne({ contactname })
//         return contact
//     } catch (err) {
//         logger.error(`while finding contact ${contactname}`, err)
//         throw err
//     }
// }

// async function remove(contactId) {
//     try {
//         const collection = await dbService.getCollection('contact')
//         await collection.deleteOne({ '_id': ObjectId(contactId) })
//     } catch (err) {
//         logger.error(`cannot remove contact ${contactId}`, err)
//         throw err
//     }
// }

// async function update(contact) {
//     try {
       
//         const contactToSave = {
//             _id: ObjectId(contact._id),
//             fullname: contact.fullname,
//             email: contact.email,
//             phone: contact.phone,
//         }

//         const collection = await dbService.getCollection('contact')
//         await collection.updateOne({ '_id': contactToSave._id }, { $set: contactToSave })
//         return contactToSave;
//     } catch (err) {
//         logger.error(`cannot update contact ${contact._id}`, err)
//         throw err
//     }
// }

// async function add(contact) {
//     try {
//         const contactToAdd = {
//             fullname: contact.fullname,
//             email: contact.email,
//             phone: contact.phone,
//         }

//         const collection = await dbService.getCollection('contact')
//         await collection.insertOne(contactToAdd)
//         return contactToAdd
//     } catch (err) {
//         logger.error('cannot insert contact', err)
//         throw err
//     }
// }

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                contactname: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


