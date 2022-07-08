import * as companyRepository from "../repositories/companyRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"

async function validateKey(keyCompany){
    const ans = await companyRepository.findByApiKey(keyCompany)

    if(!ans) throw {
        status: 422,
        message: "this key is not register"
    }
}

async function validateEmployee(employeeId){
    const ans =  await employeeRepository.findById(employeeId)

    if(!ans) throw {
        status: 422,
        message: "this employee is not register"
    }
}

async function validateUniqueCard(typeCard, employeeId){
    const ans = await cardRepository.findByTypeAndEmployeeId(typeCard, employeeId)
    
    if (ans !== undefined) throw {
        status: 422,
        message: "this employee already has this type of card"
    }
}

export {
    validateKey,
    validateEmployee,
    validateUniqueCard
}