var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
function validateEmployee(employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var ans;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employeeRepository.findById(employeeId)];
                case 1:
                    ans = _a.sent();
                    if (!ans)
                        throw {
                            status: 422,
                            message: "this employee is not register"
                        };
                    return [2 /*return*/, ans.fullName];
            }
        });
    });
}
function validateUniqueCard(typeCard, employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var ans;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByTypeAndEmployeeId(typeCard, employeeId)];
                case 1:
                    ans = _a.sent();
                    if (ans !== undefined)
                        throw {
                            status: 422,
                            message: "this employee already has this type of card"
                        };
                    return [2 /*return*/];
            }
        });
    });
}
function generateNumberCard() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, faker.finance.creditCardNumber()];
        });
    });
}
function formatNameCard(fullName) {
    return __awaiter(this, void 0, void 0, function () {
        var ans, i;
        return __generator(this, function (_a) {
            fullName = fullName.split(" ");
            ans = [fullName[0]];
            for (i = 0; i < fullName.length; i++) {
                if (fullName[i].length > 3 && i !== 0 && i !== fullName.length - 1) {
                    ans.push(fullName[i][0]);
                }
            }
            ans.push(fullName[fullName.length - 1]);
            return [2 /*return*/, ans.join(" ").toUpperCase()];
        });
    });
}
function generatecardExpiration() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, dayjs().add(5, 'years').format('MM/YY')];
        });
    });
}
function generateSecurityCode() {
    return __awaiter(this, void 0, void 0, function () {
        var cryptr, cvc;
        return __generator(this, function (_a) {
            cryptr = new Cryptr('myTotallySecretKey');
            cvc = faker.finance.creditCardCVV();
            console.log(cvc);
            return [2 /*return*/, cryptr.encrypt(cvc)];
        });
    });
}
function insertCardData(employeeId, number, cardholderName, securityCode, expirationDate, type) {
    return __awaiter(this, void 0, void 0, function () {
        var password, isVirtual, isBlocked, originalCardId, cardData, ans;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = null;
                    isVirtual = false;
                    isBlocked = true;
                    originalCardId = null;
                    cardData = {
                        employeeId: employeeId,
                        number: number,
                        cardholderName: cardholderName,
                        securityCode: securityCode,
                        expirationDate: expirationDate,
                        type: type,
                        password: password,
                        isVirtual: isVirtual,
                        isBlocked: isBlocked,
                        originalCardId: originalCardId
                    };
                    return [4 /*yield*/, cardRepository.insert(cardData)];
                case 1:
                    ans = _a.sent();
                    if (ans.rowCount !== 1)
                        throw {
                            status: 400,
                            message: "There was an error insert the data"
                        };
                    return [2 /*return*/];
            }
        });
    });
}
export { validateEmployee, validateUniqueCard, generateNumberCard, formatNameCard, generatecardExpiration, generateSecurityCode, insertCardData };
