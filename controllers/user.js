const User = require('../models/user.js')
const Home = require('../models/home.js')
const utils = require("../utils/utils.js")
const fakeData = require("../fake_data/fake-data.js") 

class UserController {

    static getAllUsers(req, res) {
        // Get users from DB  
        res.status(200).json(fakeData.fakeUsers);
    }

    static getUser(req, res) {
        const userId = parseInt(req.params.userId)

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }

        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        } 

        let foundUser = fakeData.fakeUsers.find((user) => user.id == userId)
        if (foundUser == null) {
            res.status(404).json({ msg: "User not found" })
            return
        }
        
        res.status(200).json(foundUser)
    }
    
    static createUser(req, res){
        const name = req.body.name
        const surname = req.body.surname

        if (!utils.isString(name) || !utils.isString(surname)) {
            res.status(400).json({ msg: "Invalid body parametters" })
            return
        }
        
        // Since we do not have a real DB this is needed to maintain user order
        const newUserId = Math.max(...fakeData.fakeUsers.map((user) => user.id)) + 1
        const newUser = new User(newUserId, name, surname)

        fakeData.fakeUsers.push(newUser)

        res.status(201).json({})
    }

    static patchUser(req, res){
        const userId = parseInt(req.params.userId)
        const name = req.body.name
        const surname = req.body.surname

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }

        if ((!utils.isString(name) && name !== undefined) || (!utils.isString(surname) && surname !== undefined)) {
            res.status(400).json({ msg: "Invalid body parametters" })
            return
        }
        
        const foundUser = fakeData.fakeUsers.find((user) => user.id == userId)
        if (foundUser == null) {
            res.status(404).json({ msg: "User not found" })
            return
        }

        const newUser = new User(foundUser.id, name || foundUser.name, surname || foundUser.surname)

        // Replace old user with new one
        const oldUserDataIndex = fakeData.fakeUsers.indexOf(foundUser)
        fakeData.fakeUsers[oldUserDataIndex] = newUser

        res.status(200).json({})
    }

    static putUser(req, res){
        const userId = parseInt(req.params.userId)
        const name = req.body.name
        const surname = req.body.surname

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }

        if (!utils.isString(name) || !utils.isString(surname)) {
            res.status(400).json({ msg: "Invalid body parametters" })
            return
        }
        
        const foundUser = fakeData.fakeUsers.find((user) => user.id == userId)
        if (foundUser == null) {
            res.status(404).json({ msg: "User not found" })
            return
        }

        const newUser = new User(foundUser.id, name, surname)

        // Replace old user with new one
        const oldUserDataIndex = fakeData.fakeUsers.indexOf(foundUser)
        fakeData.fakeUsers[oldUserDataIndex] = newUser

        res.status(200).json({})
    }

    static deleteUser(req, res){
        const userId = parseInt(req.params.userId)

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }

        const foundUser = fakeData.fakeUsers.find((user) => user.id == userId)
        if (foundUser == null) {
            res.status(404).json({ msg: "User not found" })
            return
        }

        const userCurrentHomes = fakeData.fakeHomes.filter((home) => home.userId == foundUser.id)
        if (userCurrentHomes.length != 0){
            res.status(409).json({ msg: "User has remaining homes" })
            return
        }

        // Delete user
        const oldUserDataIndex = fakeData.fakeUsers.indexOf(foundUser)
        fakeData.fakeUsers.splice(oldUserDataIndex, 1)

        res.status(200).json({})
    }

    static getUserHomes(req, res) {
        const userId = parseInt(req.params.userId)

        const street = req.query.street
        const city = req.query.city
        const country = req.query.country

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }
    
        const foundUser = fakeData.fakeUsers.find((user) => user.id == userId)
        if (foundUser == null) {
            res.status(404).json({ msg: "User not found" })
            return
        }

        // Apply query params to homes filter
        const userHomes = fakeData.fakeHomes.filter((home) => 
            home.userId == foundUser.id 
            && (street != undefined ? (home.street == street) : true)
            && (country != undefined ? (home.country == country) : true)
            && (city != undefined ? (home.city == city) : true) 
        )

        res.status(200).json(userHomes)
    }

    static createUserHome(req, res) {
        const userId = parseInt(req.params.userId)

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }

        const street = req.body.street
        const city = req.body.city
        const country = req.body.country

        if (!utils.isString(street) || !utils.isString(city) || !utils.isString(country)) {
            res.status(400).json({ msg: "Invalid body parametters" })
            return
        }
        
        // Since we do not have a real DB this is needed to maintain home order
        const newHomeId = Math.max(...fakeData.fakeHomes.map((home) => home.id)) + 1
        const newHome = new Home(newHomeId, userId, street, city, country)

        fakeData.fakeHomes.push(newHome)

        res.status(201).json({})
    }

    static patchUserHome(req, res) {
        const userId = parseInt(req.params.userId)
        const homeId = parseInt(req.params.homeId)

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }

        if (!Number.isInteger(homeId)) { 
            res.status(400).json({ msg : "Invalid home id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }

        if (homeId < 0){
            res.status(400).json({ msg : "Invalid home id. Must be greater than 0." })
            return
        }

        const street = req.body.street
        const city = req.body.city
        const country = req.body.country

        if ((!utils.isString(street) && street !== undefined) || (!utils.isString(city) && city !== undefined) || (!utils.isString(country) && country !== undefined)) {
            res.status(400).json({ msg: "Invalid body parametters" })
            return
        }

        const foundHome = fakeData.fakeHomes.find((home) => home.id == homeId && home.userId == userId)
        if (foundHome == null) {
            res.status(404).json({ msg: "Home not found" })
            return
        }

        const newHome = new Home(
            foundHome.id,
            userId, 
            street || foundHome.street,
            city || foundHome.city, 
            country || foundHome.country
        )

        // Update old home with new one
        const oldHomeDataIndex = fakeData.fakeHomes.indexOf(foundHome)
        fakeData.fakeHomes[oldHomeDataIndex] = newHome

        res.status(200).json({})
    }

    static putUserHome(req, res) {
        const userId = parseInt(req.params.userId)
        const homeId = parseInt(req.params.homeId)

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }

        if (!Number.isInteger(homeId)) { 
            res.status(400).json({ msg : "Invalid home id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }

        if (homeId < 0){
            res.status(400).json({ msg : "Invalid home id. Must be greater than 0." })
            return
        }

        const street = req.body.street
        const city = req.body.city
        const country = req.body.country

        if (!utils.isString(street) || !utils.isString(city) || !utils.isString(country)) {
            res.status(400).json({ msg: "Invalid body parametters" })
            return
        }

        const foundHome = fakeData.fakeHomes.find((home) => home.id == homeId && home.userId == userId)
        if (foundHome == null) {
            res.status(404).json({ msg: "Home not found" })
            return
        }

        const newHome = new Home(
            foundHome.id,
            userId, 
            street,
            city, 
            country
        )

        // Update old home with new one
        const oldHomeDataIndex = fakeData.fakeHomes.indexOf(foundHome)
        fakeData.fakeHomes[oldHomeDataIndex] = newHome

        res.status(200).json({})
    }

    static deleteUserHome(req, res){
        const userId = parseInt(req.params.userId)
        const homeId = parseInt(req.params.homeId)

        if (!Number.isInteger(userId)) { 
            res.status(400).json({ msg : "Invalid user id. Must be an integer." });
            return
        }

        if (!Number.isInteger(homeId)) { 
            res.status(400).json({ msg : "Invalid home id. Must be an integer." });
            return
        }
    
        if (userId < 0){
            res.status(400).json({ msg : "Invalid user id. Must be greater than 0." })
            return
        }

        if (homeId < 0){
            res.status(400).json({ msg : "Invalid home id. Must be greater than 0." })
            return
        }

        const foundHome = fakeData.fakeHomes.find((home) => home.id == homeId && home.userId == userId)
        if (foundHome == null) {
            res.status(404).json({ msg: "User home not found" })
            return
        }

        // Delete user home
        const oldUserDataIndex = fakeData.fakeHomes.indexOf(foundHome)
        fakeData.fakeHomes.splice(oldUserDataIndex, 1)

        res.status(200).json({})
    }
}
  
module.exports = UserController;