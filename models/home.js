const utils = require("../utils/utils")

module.exports = class Home {
    constructor(id, userId, street, city, country) {
        this.id = Number.isInteger(id) ? id : -1
        this.userId = Number.isInteger(userId) ? userId : null
        this.street = utils.isString(street) ? street : null
        this.city = utils.isString(city) ? city : null
        this.country = utils.isString(country) ? country : null
    }
}