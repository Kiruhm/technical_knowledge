const utils = require("../utils/utils")

module.exports = class User {
    constructor(id, name, surname){
        this.id = Number.isInteger(id) ? id : -1
        this.name = utils.isString(name) ? name : null
        this.surname = utils.isString(surname) ? surname : null
    }
}