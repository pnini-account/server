const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = db.user;
// const bcrypt= require('bcrypt');

const login = async (req, res) => {

    const { id, password } = req.body;
    if (!id || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }
    const foundUser = await User.findOne({ where: { id: id } })
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
    res.send("Logged In")

    const userInfo = {
        id: foundUser.id, name: foundUser.name,
        email: foundUser.email, warningsId: foundUser.warningsId,
        filesId: foundUser.filesId, foldersId: foundUser.foldersId,
        categoriesId: foundUser.categoriesId
    }

    //const accessToken = jwt.sign(userInfo,"לערבול סיסמא")
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)

    res.json({ accessToken: accessToken })
}

const register = async (req, res) => {
    const { name, email, password, warningsId, filesId } = req.body
    if (!name || !email || !password || !warningsId || !filesId) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await User.findOne({ where: { name: name } })
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = { name, email, password, warningsId, filesId: hashedPwd }
    const user = await User.create(userObject)
    if (user) { // Created
        return res.status(201).json({
            message: `New user ${user.userName} created`
        })
    } else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }

}

module.exports = { login, register }