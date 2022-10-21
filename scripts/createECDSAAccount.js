"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable no-console */
var sdk_1 = require("@hashgraph/sdk");
var axios_1 = __importDefault(require("axios"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
// eslint-disable-next-line
var delay = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
var cliArguments = process.argv;
if (!['local', 'testnet', 'mainnet'].includes(cliArguments[2]))
    throw new Error("Please provide either 'local', 'testnet' or 'mainnet' as an argument.");
var env = cliArguments[2];
var operatorId = sdk_1.AccountId.fromString(process.env.OPERATOR_ID);
var operatorKey = sdk_1.PrivateKey.fromString(process.env.OPERATOR_PVKEY);
var client;
switch (env) {
    case 'local':
        {
            var node = { '127.0.0.1:50211': new sdk_1.AccountId(3) };
            client = sdk_1.Client.forNetwork(node).setMirrorNetwork('127.0.0.1:5600');
        }
        client.setOperator(operatorId, operatorKey);
        break;
    case 'testnet':
        client = sdk_1.Client.forTestnet().setOperator(operatorId, operatorKey);
        break;
    case 'mainnet':
        client = sdk_1.Client.forMainnet().setOperator(operatorId, operatorKey);
        break;
    default:
        throw new Error('Environment not specified.');
}
function autoCreateAccountFcn(senderAccountId, receiverAccountId, hbarAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var transferToAliasTx, transferToAliasSign, transferToAliasSubmit, transferToAliasRx, transferToAliasRec, txRecordQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transferToAliasTx = new sdk_1.TransferTransaction()
                        .addHbarTransfer(senderAccountId, new sdk_1.Hbar(-hbarAmount))
                        .addHbarTransfer(receiverAccountId, new sdk_1.Hbar(hbarAmount))
                        .freezeWith(client);
                    return [4 /*yield*/, transferToAliasTx.sign(operatorKey)];
                case 1:
                    transferToAliasSign = _a.sent();
                    return [4 /*yield*/, transferToAliasSign.execute(client)];
                case 2:
                    transferToAliasSubmit = _a.sent();
                    return [4 /*yield*/, transferToAliasSubmit.getReceipt(client)];
                case 3:
                    transferToAliasRx = _a.sent();
                    return [4 /*yield*/, transferToAliasSubmit.getRecord(client)];
                case 4:
                    transferToAliasRec = _a.sent();
                    return [4 /*yield*/, new sdk_1.TransactionRecordQuery()
                            .setTransactionId(transferToAliasRec.transactionId)
                            .setIncludeChildren(true)
                            .execute(client)];
                case 5:
                    txRecordQuery = _a.sent();
                    return [2 /*return*/, [transferToAliasRx, txRecordQuery]];
            }
        });
    });
}
function mirrorQueryFcn(publicKey) {
    return __awaiter(this, void 0, void 0, function () {
        var mirrorNodeUrl, mQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Query a mirror node for information about the account creation
                return [4 /*yield*/, delay(10000)];
                case 1:
                    // Query a mirror node for information about the account creation
                    _a.sent(); // Wait for 10 seconds before querying account id
                    mirrorNodeUrl = process.env.MIRROR_NODE_URL;
                    return [4 /*yield*/, axios_1["default"].get("".concat(mirrorNodeUrl, "accounts?account.publickey=").concat(publicKey.toStringRaw()))];
                case 2:
                    mQuery = _a.sent();
                    return [2 /*return*/, mQuery];
            }
        });
    });
}
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var newPrivateKey, newPublicKey, newAliasAccountId, _b, txReceipt, txRecQuery, mirrorQueryResult;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Generating a new key-pair for ".concat(env, "..."));
                    newPrivateKey = sdk_1.PrivateKey.generateECDSA();
                    newPublicKey = newPrivateKey.publicKey;
                    newAliasAccountId = newPublicKey.toAccountId(0, 0);
                    console.log("- New account alias ID: ".concat(newAliasAccountId, " \n"));
                    console.log("- New private key (Hedera): ".concat(newPrivateKey, " \n"));
                    console.log("- New public key (Hedera): ".concat(newPublicKey, " \n"));
                    console.log("- New private key (RAW EVM): 0x".concat(newPrivateKey.toStringRaw(), " \n"));
                    console.log("- New public key (RAW): 0x".concat(newPublicKey.toStringRaw(), " \n"));
                    console.log("- New public key (EVM): 0x".concat(newPublicKey.toEthereumAddress(), " \n\n"));
                    return [4 /*yield*/, autoCreateAccountFcn(operatorId, newAliasAccountId, 100)];
                case 1:
                    _b = _c.sent(), txReceipt = _b[0], txRecQuery = _b[1];
                    console.log("- HBAR Transfer to new account: ".concat(txReceipt.status, " \n\n"));
                    console.log("- Parent transaction ID: ".concat(txRecQuery.transactionId, " \n"));
                    console.log("- Child transaction ID: ".concat(txRecQuery.children[0].transactionId.toString(), " \n"));
                    console.log("- New account ID (from RECORD query): ".concat(txRecQuery.children[0].receipt.accountId.toString(), " \n"));
                    return [4 /*yield*/, mirrorQueryFcn(newPublicKey)];
                case 2:
                    mirrorQueryResult = _c.sent();
                    console.log("- New account ID (from MIRROR query): ".concat((_a = mirrorQueryResult.data) === null || _a === void 0 ? void 0 : _a.accounts[0].account, "\n"));
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { })["catch"](function (err) { return console.log(err); });
