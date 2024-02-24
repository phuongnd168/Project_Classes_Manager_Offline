module.exports =  (number) => {
    if (typeof number === "string") return false // we only process strings!  
    return !isNaN(number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(number)) // ...and ensure strings of whitespace fail
}