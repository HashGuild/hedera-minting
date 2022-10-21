"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClientOperator = exports.initClient = void 0;
var cryptography_1 = require("@hashgraph/cryptography");
var sdk_1 = require("@hashgraph/sdk");
function initClient() {
    var node = { '127.0.0.1:50211': new sdk_1.AccountId(3) };
    return sdk_1.Client.forNetwork(node).setMirrorNetwork('127.0.0.1:5600');
}
exports.initClient = initClient;
function setClientOperator(operatorIdString, operatorKeyString, client) {
    client.setOperator(operatorIdString, operatorKeyString);
    var operatorId = sdk_1.AccountId.fromString(operatorIdString);
    var operatorKey = cryptography_1.PrivateKey.fromString(operatorKeyString);
    return [operatorId, operatorKey];
}
exports.setClientOperator = setClientOperator;
