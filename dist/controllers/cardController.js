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
import * as middlewares from "../middlewares/validationMiddlewares.js";
import * as servicesCreate from "../services/createCardServices.js";
import * as servicesActivate from "../services/activateCardServices.js";
import * as servicesBalance from "../services/balanceCardService.js";
import * as servicesLockUnlock from "../services/lockUnlockServices.js";
import * as utils from "../utils/utils.js";
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, _a, employeeId, type, fullName, number, cardholderName, expirationDate, securityCode;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    apiKey = req.headers.apikey;
                    _a = req.body, employeeId = _a.employeeId, type = _a.type;
                    return [4 /*yield*/, middlewares.validateType(type)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, utils.validateKey(apiKey)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, servicesCreate.validateEmployee(employeeId)];
                case 3:
                    fullName = _b.sent();
                    return [4 /*yield*/, servicesCreate.validateUniqueCard(type, employeeId)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, servicesCreate.generateNumberCard()];
                case 5:
                    number = _b.sent();
                    return [4 /*yield*/, servicesCreate.formatNameCard(fullName)];
                case 6:
                    cardholderName = _b.sent();
                    return [4 /*yield*/, servicesCreate.generatecardExpiration()];
                case 7:
                    expirationDate = _b.sent();
                    return [4 /*yield*/, servicesCreate.generateSecurityCode()];
                case 8:
                    securityCode = _b.sent();
                    return [4 /*yield*/, servicesCreate.insertCardData(employeeId, number, cardholderName, securityCode, expirationDate, type)];
                case 9:
                    _b.sent();
                    res.status(201).send("Card create successful");
                    return [2 /*return*/];
            }
        });
    });
}
function activate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, cvc, password, aux, card, securityCode, passCrypt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, cvc = _a.cvc, password = _a.password;
                    aux = false;
                    return [4 /*yield*/, middlewares.validateDataCard(id, cvc, password)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, utils.verifyCard(id)];
                case 2:
                    card = _b.sent();
                    utils.validateCardExpiration(card.expirationDate);
                    return [4 /*yield*/, utils.validateStatus(card, aux)];
                case 3:
                    securityCode = _b.sent();
                    servicesActivate.validateCvc(securityCode, cvc);
                    passCrypt = servicesActivate.encryptPassword(password);
                    return [4 /*yield*/, servicesActivate.insertData(id, passCrypt)];
                case 4:
                    _b.sent();
                    res.status(200).send("activate card sucessfull");
                    return [2 /*return*/];
            }
        });
    });
}
function card(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cardId, employeeId, aux, card, ans;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, cardId = _a.cardId, employeeId = _a.employeeId;
                    aux = true;
                    return [4 /*yield*/, utils.verifyCard(cardId)];
                case 1:
                    card = _b.sent();
                    return [4 /*yield*/, utils.validateStatus(card, aux)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, servicesBalance.getDataCard(card)];
                case 3:
                    ans = _b.sent();
                    res.status(200).send(ans);
                    return [2 /*return*/];
            }
        });
    });
}
function balance(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = (req.params).id;
                    return [4 /*yield*/, utils.verifyCard(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, servicesBalance.findCards(id)];
                case 2:
                    balance = _a.sent();
                    res.status(200).send(balance);
                    return [2 /*return*/];
            }
        });
    });
}
function block(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, password, aux, card;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, password = _a.password;
                    aux = true;
                    return [4 /*yield*/, utils.verifyCard(id)];
                case 1:
                    card = _b.sent();
                    servicesLockUnlock.validateBlocked(card, aux);
                    utils.validateCardExpiration(card.expirationDate);
                    servicesLockUnlock.validatePass(card.password, password);
                    return [4 /*yield*/, servicesLockUnlock.blockCard(id, aux)];
                case 2:
                    _b.sent();
                    res.status(204).send("card blocked sucessfull");
                    return [2 /*return*/];
            }
        });
    });
}
function unlock(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, password, aux, card;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, password = _a.password;
                    aux = false;
                    return [4 /*yield*/, utils.verifyCard(id)];
                case 1:
                    card = _b.sent();
                    servicesLockUnlock.validateBlocked(card, aux);
                    utils.validateCardExpiration(card.expirationDate);
                    servicesLockUnlock.validatePass(card.password, password);
                    return [4 /*yield*/, servicesLockUnlock.blockCard(id, aux)];
                case 2:
                    _b.sent();
                    res.status(204).send("card unlocked sucessfull");
                    return [2 /*return*/];
            }
        });
    });
}
export { create, activate, card, balance, block, unlock };
