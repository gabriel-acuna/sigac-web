function isValid(jwt) { return Date.now() < jwt.expires * 1000 }

function isAdmin(roles) {
    let resp = false
    for (let rol of roles) {
        if (rol.toLowerCase().includes('admin'))
            resp = true
    }
    return resp
}

export { isValid, isAdmin }