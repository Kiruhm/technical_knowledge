module.exports = {
    isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
}