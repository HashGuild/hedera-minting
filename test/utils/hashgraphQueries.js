"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNftInfo = exports.createTokenAndMintMultipleNfts = exports.mintMultipleNfts = exports.mintNft = exports.createToken = exports.getTokenInformation = exports.getContractIdFromAddress = void 0;
var sdk_1 = require("@hashgraph/sdk");
var axios_1 = __importDefault(require("axios"));
function getContractIdFromAddress(address) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("http://127.0.0.1:5551/api/v1/contracts/".concat(address))];
                case 1:
                    res = _a.sent();
                    if (res.status !== 200) {
                        throw Error("Something went wrong while fetching the contract's ID.");
                    }
                    return [2 /*return*/, res.data.contract_id];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof axios_1.default.AxiosError) {
                        throw new Error("Something went wrong while fetching the contract's ID: ".concat(error_1.message));
                    }
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getContractIdFromAddress = getContractIdFromAddress;
function getTokenInformation(tokenId, client) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new sdk_1.TokenInfoQuery().setTokenId(tokenId);
                    return [4 /*yield*/, query.execute(client)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getTokenInformation = getTokenInformation;
function createToken(contractId, data, client) {
    return __awaiter(this, void 0, void 0, function () {
        var createTokenRequest, createTokenTx, createTokenRx, tokenSolidityAddr, tokenIdSolidityAddr, tokenId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createTokenRequest = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractId)
                        .setGas(2500000)
                        .setPayableAmount(500)
                        .setFunction('createNft', new sdk_1.ContractFunctionParameters()
                        .addString(data.name)
                        .addString(data.symbol)
                        // .addString(data.memo)
                        // @ts-ignore
                        .addInt64(data.maxSupply)
                        .addUint32(7000000));
                    return [4 /*yield*/, createTokenRequest.execute(client)];
                case 1:
                    createTokenTx = _a.sent();
                    return [4 /*yield*/, createTokenTx.getRecord(client)];
                case 2:
                    createTokenRx = _a.sent();
                    tokenSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
                    tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
                    tokenId = sdk_1.AccountId.fromSolidityAddress(tokenIdSolidityAddr);
                    return [2 /*return*/, [tokenId.toString(), tokenSolidityAddr]];
            }
        });
    });
}
exports.createToken = createToken;
function mintNft(contractId, data, client) {
    return __awaiter(this, void 0, void 0, function () {
        var mintNftRequest, mintNftTx, mintNftRx, serial;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mintNftRequest = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractId)
                        .setGas(2500000)
                        .setFunction('mintNft', new sdk_1.ContractFunctionParameters()
                        .addAddress(data.tokenSolidityAddr)
                        .addBytesArray(data.metadata));
                    return [4 /*yield*/, mintNftRequest.execute(client)];
                case 1:
                    mintNftTx = _a.sent();
                    return [4 /*yield*/, mintNftTx.getRecord(client)];
                case 2:
                    mintNftRx = _a.sent();
                    serial = mintNftRx.contractFunctionResult.getInt64(0);
                    return [2 /*return*/, serial];
            }
        });
    });
}
exports.mintNft = mintNft;
function mintMultipleNfts(contractId, data, client) {
    return __awaiter(this, void 0, void 0, function () {
        var mintNftRequest, mintNftTx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mintNftRequest = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractId)
                        .setGas(data.metadata.length * 2500000)
                        .setFunction('mintMultipleNfts', new sdk_1.ContractFunctionParameters()
                        .addAddress(data.tokenSolidityAddr)
                        .addBytesArray(data.metadata));
                    return [4 /*yield*/, mintNftRequest.execute(client)];
                case 1:
                    mintNftTx = _a.sent();
                    return [4 /*yield*/, mintNftTx.getRecord(client)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mintMultipleNfts = mintMultipleNfts;
function createTokenAndMintMultipleNfts(contractId, data, client) {
    return __awaiter(this, void 0, void 0, function () {
        var mintNftRequest, mintMultipleNftsTx, mintMultipleNftsRx, tokenSolidityAddr, tokenId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mintNftRequest = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractId)
                        .setGas(data.metadata.length * 2500000)
                        .setPayableAmount(500)
                        .setFunction('createTokenAndMintMultipleNfts', new sdk_1.ContractFunctionParameters()
                        .addString(data.name)
                        .addString(data.symbol)
                        // .addString(data.memo)
                        // @ts-ignore
                        .addInt64(data.maxSupply)
                        .addUint32(7000000)
                        .addBytesArray(data.metadata));
                    return [4 /*yield*/, mintNftRequest.execute(client)];
                case 1:
                    mintMultipleNftsTx = _a.sent();
                    return [4 /*yield*/, mintMultipleNftsTx.getRecord(client)];
                case 2:
                    mintMultipleNftsRx = _a.sent();
                    tokenSolidityAddr = mintMultipleNftsRx.contractFunctionResult.getAddress(0);
                    tokenId = sdk_1.AccountId.fromSolidityAddress(tokenSolidityAddr);
                    return [2 /*return*/, [tokenId.toString(), tokenSolidityAddr]];
            }
        });
    });
}
exports.createTokenAndMintMultipleNfts = createTokenAndMintMultipleNfts;
function getNftInfo(nftId, client) {
    return __awaiter(this, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new sdk_1.TokenNftInfoQuery().setNftId(nftId).execute(client)];
                case 1:
                    info = _a.sent();
                    if (!info.length)
                        throw new Error('No info on NFT available.');
                    return [2 /*return*/, info[0]];
            }
        });
    });
}
exports.getNftInfo = getNftInfo;
