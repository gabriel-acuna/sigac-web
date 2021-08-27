let isValid = (jwt) => {
    return Date.now < jwt.expires
}

export default isValid;