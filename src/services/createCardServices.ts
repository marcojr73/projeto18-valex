import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';

import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"

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
    return faker.finance.creditCardNumber()
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

async function generatecardExpiration(){
    return dayjs().add(5, 'years').format('MM/YY')
}

async function generateSecurityCode(){
    const cryptr = new Cryptr('myTotallySecretKey');
    const cvc = faker.finance.creditCardCVV();
    console.log(cvc)
    return cryptr.encrypt(cvc);
}

async function insertCardData(employeeId, number, cardholderName, securityCode, expirationDate, type){
    const password: null =  null
    const isVirtual: boolean = false
    const isBlocked: boolean = true
    const originalCardId: null = null
    const cardData = {
        employeeId,
        number,
        cardholderName,
        securityCode, 
        expirationDate,
        type, 
        password,
        isVirtual,
        isBlocked,
        originalCardId
    }
    const ans = await cardRepository.insert(cardData)
    if(ans.rowCount !== 1) throw{
        status: 400,
        message: "There was an error insert the data"
    }
}

export {
    validateEmployee,
    validateUniqueCard,
    generateNumberCard,
    formatNameCard,
    generatecardExpiration,
    generateSecurityCode,
    insertCardData
}