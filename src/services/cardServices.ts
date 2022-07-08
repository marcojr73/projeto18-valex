import * as repository from "../repositories/companyRepository.js"

async function validateKey(keyCompany){
    const ans = await repository.findByApiKey(keyCompany)

    if(!ans) throw {
        status: 422,
        message: "this key is not register"
    }
}

export {
    validateKey
}