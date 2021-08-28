let isValid = (jwt) => (Date.now() < jwt.expires*1000)


export default isValid;