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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console, no-restricted-syntax */
var sdk_1 = require("@hashgraph/sdk");
var clientHelper_1 = require("./utils/clientHelper");
var hashgraphQueries_1 = require("./utils/hashgraphQueries");
var Minting = artifacts.require('Minting');
contract('Minting', function () {
    var client;
    before(function () {
        client = (0, clientHelper_1.initClient)();
    });
    after(function () {
        client.close();
    });
    it('creates a valid token with the sender as treasurer and auto-renew-account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenInfo, tokenData, error, contractId, tokenIdString, err_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    (0, clientHelper_1.setClientOperator)('0.0.1022', '0xa608e2130a0a3cb34f86e757303c862bee353d9ab77ba4387ec084f881d420d4', client);
                    return [4 /*yield*/, Minting.deployed()];
                case 1:
                    _d.sent();
                    tokenData = {
                        name: 'Fall Collection',
                        symbol: 'LEAF',
                        maxSupply: 250,
                        memo: 'Just a memo',
                    };
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, (0, hashgraphQueries_1.getContractIdFromAddress)(Minting.address)];
                case 3:
                    contractId = _d.sent();
                    return [4 /*yield*/, (0, hashgraphQueries_1.createToken)(contractId, tokenData, client)];
                case 4:
                    tokenIdString = (_d.sent())[0];
                    return [4 /*yield*/, (0, hashgraphQueries_1.getTokenInformation)(tokenIdString, client)];
                case 5:
                    tokenInfo = _d.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _d.sent();
                    console.log('Cought error: ', err_1);
                    error = err_1;
                    return [3 /*break*/, 7];
                case 7:
                    assert.notExists(error);
                    assert.equal(client.operatorAccountId.toString(), (_a = tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.treasuryAccountId) === null || _a === void 0 ? void 0 : _a.toString());
                    assert.equal(client.operatorAccountId.toString(), (_b = tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.autoRenewAccountId) === null || _b === void 0 ? void 0 : _b.toString());
                    assert.equal(tokenData.name, tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.name);
                    assert.equal(tokenData.symbol, tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.symbol);
                    assert.equal(tokenData.maxSupply.toString(), (_c = tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.maxSupply) === null || _c === void 0 ? void 0 : _c.toString());
                    return [2 /*return*/];
            }
        });
    }); });
    it('mints an nft on the provided token and assigns it to the sender', function () { return __awaiter(void 0, void 0, void 0, function () {
        var operatorId, contractId, tokenData, _a, tokenId, tokenSolidityAddr, mintNftData, error, serial, nftId, info, err_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    operatorId = (0, clientHelper_1.setClientOperator)('0.0.1022', '0xa608e2130a0a3cb34f86e757303c862bee353d9ab77ba4387ec084f881d420d4', client)[0];
                    return [4 /*yield*/, (0, hashgraphQueries_1.getContractIdFromAddress)(Minting.address)];
                case 1:
                    contractId = _c.sent();
                    tokenData = {
                        name: 'Fall Collection',
                        symbol: 'LEAF',
                        maxSupply: 250,
                        memo: 'Just a memo',
                    };
                    return [4 /*yield*/, (0, hashgraphQueries_1.createToken)(contractId, tokenData, client)];
                case 2:
                    _a = _c.sent(), tokenId = _a[0], tokenSolidityAddr = _a[1];
                    mintNftData = {
                        metadata: [
                            Buffer.from('ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'),
                        ],
                        tokenSolidityAddr: tokenSolidityAddr,
                    };
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, (0, hashgraphQueries_1.mintNft)(contractId, mintNftData, client)];
                case 4:
                    serial = _c.sent();
                    nftId = new sdk_1.NftId(sdk_1.TokenId.fromString(tokenId), serial.toNumber());
                    return [4 /*yield*/, (0, hashgraphQueries_1.getNftInfo)(nftId, client)];
                case 5:
                    info = _c.sent();
                    assert.equal(operatorId.toString(), info.accountId.toString());
                    assert.equal(mintNftData.metadata[0].toString(), (_b = info.metadata) === null || _b === void 0 ? void 0 : _b.toString());
                    return [3 /*break*/, 7];
                case 6:
                    err_2 = _c.sent();
                    console.log('Cought error: ', err_2);
                    error = err_2;
                    return [3 /*break*/, 7];
                case 7:
                    assert.notExists(error);
                    return [2 /*return*/];
            }
        });
    }); });
});
