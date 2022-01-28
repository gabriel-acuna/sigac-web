function isValid(jwt) { return Date.now() < jwt.expires * 1000 }

function isAdmin(roles) {
    let resp = false
    for (let rol of roles) {
        if (rol.toLowerCase().includes('admin'))
            resp = true
    }
    return resp
}

function isQA(roles) {
    let resp = false
    for (let rol of roles) {
        if (rol.toLowerCase().includes('calidad'))
            resp = true
    }
    return resp
}

function isHR(roles) {
    let resp = false
    for (let rol of roles) {
        if (rol.toLowerCase().includes('humano'))
            resp = true
    }
    return resp
}

export { isValid, isAdmin, isQA, isHR }