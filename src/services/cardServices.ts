import { faker } from '@faker-js/faker';

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

    return ans.fullName
}

async function validateUniqueCard(typeCard, employeeId){
    const ans = await cardRepository.findByTypeAndEmployeeId(typeCard, employeeId)

    if (ans !== undefined) throw {
        status: 422,
        message: "this employee already has this type of card"
    }
}

async function generateNumberCard(){
    return faker.datatype.number({ min: 1000000000000000, max: 9999999999999999, precision: 1 })
}

async function formatNameCard(fullName){
    fullName = fullName.split(" ")

    let ans = [fullName[0]]

    for (let i = 0; i < fullName.length; i++) {
    if(fullName[i].length > 3 && i !== 0 && i !== fullName.length-1){
        ans.push(fullName[i][0])
    }
    }
    ans.push(fullName[fullName.length-1])
    return ans.join(" ").toUpperCase()
}

export {
    validateKey,
    validateEmployee,
    validateUniqueCard,
    generateNumberCard,
    formatNameCard
}