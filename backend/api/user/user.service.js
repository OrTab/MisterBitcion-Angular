const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    updateUsers
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => delete user.password)
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id),
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            phone: user.phone,
            moves: user.moves,
            coins: user.coins,
            imgUrl: user.imgUrl
        };
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}
async function updateUsers(user, move) {
    try {

        move.toId = ObjectId(move.toId)
        const userToSave = {
            _id: ObjectId(user._id),
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            phone: user.phone,
            moves: [...user.moves, move],
            coins: user.coins ? user.coins - move.amount : user.coins,
            imgUrl: user.imgUrl
        };
        const contact = await getById(move.toId)
        const contactToSave = {
            _id: ObjectId(contact._id),
            fullname: contact.fullname,
            username: contact.username,
            email: contact.email,
            phone: contact.phone,
            moves: contact.moves,
            coins: contact.coins + move.amount,
            imgUrl: contact.imgUrl
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        await collection.updateOne({ '_id': contactToSave._id }, { $set: contactToSave })
        return { userToSave, contactToSave };
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            fullname: user.fullname,
            username: user.username,
            password: user.password,
            email: user.email,
            phone: user.phone,
            moves: [],
            coins: 100,
            imgUrl: ''
        }

        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
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


