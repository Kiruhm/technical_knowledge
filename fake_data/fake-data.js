const User = require('../models/user.js')
const Home = require('../models/home.js')

let fakeUsers = [
    new User(1, 'Juan', 'Martín'),
    new User(2, 'María', 'López'),
    new User(3, 'Paco', 'Fernández')
]

let fakeHomes = [
    new Home(1, 2, 'Calle A', 'Ciudad A', 'Pais A'),
    new Home(2, 1, 'Calle B', 'Ciudad B', 'Pais B'),
    new Home(3, null, 'Calle C', 'Ciudad C', 'Pais C'),
    new Home(4, 2, 'Calle D', 'Ciudad D', 'Pais D')
]

exports.fakeUsers = fakeUsers
exports.fakeHomes = fakeHomes