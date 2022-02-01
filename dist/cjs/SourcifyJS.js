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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const FormData = require("form-data");
class SourcifyJS {
    constructor(environment = 'https://sourcify.dev') {
        this.url = environment;
        this.cookies = [];
    }
    filesTree(address, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'get',
                url: `${this.url}/server/files/tree/any/${chainId}/${address}`
            };
            let response = yield (0, axios_1.default)(config);
            return response.data;
        });
    }
    getABI(address, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.filesTree(address, chainId);
            const config = {
                method: 'get',
                url: data.files[0]
            };
            let response = yield (0, axios_1.default)(config);
            return response.data.output.abi;
        });
    }
    inputFiles(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new FormData();
            data.append('files', file);
            const config = {
                method: 'POST',
                url: `${this.url}/server/input-files`,
                headers: Object.assign({}, data.getHeaders()),
                data: data
            };
            let result = yield (0, axios_1.default)(config);
            this.cookies = result.headers['set-cookie'];
            return result.data;
        });
    }
    sessionData() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'get',
                url: `${this.url}/server/session-data`,
                headers: {
                    'Cookie': this.cookies.join(';')
                }
            };
            let result = yield (0, axios_1.default)(config);
            return result.data;
        });
    }
    restartSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'post',
                url: `${this.url}/restart-session`,
                headers: {
                    'Cookie': this.cookies.join(';')
                }
            };
            yield (0, axios_1.default)(config);
            this.cookies = [];
        });
    }
    verifyValidated(contracts) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify({
                contracts
            });
            const config = {
                method: 'post',
                url: `${this.url}/server/verify-validated`,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': this.cookies.join(';')
                },
                data: data
            };
            const result = yield (0, axios_1.default)(config);
            return result.data;
        });
    }
    verify(chainId, contracts, metafile) {
        return __awaiter(this, void 0, void 0, function* () {
            let contractsNames = contracts.map(c => c.name);
            const result = yield this.inputFiles(metafile);
            let contractsToVerify = result.contracts
                .filter(c => {
                var _a, _b;
                const missing = ((_a = c === null || c === void 0 ? void 0 : c.files) === null || _a === void 0 ? void 0 : _a.missing) || {};
                const invalid = ((_b = c === null || c === void 0 ? void 0 : c.files) === null || _b === void 0 ? void 0 : _b.invalid) || {};
                return true
                    && contractsNames.includes(c.name)
                    && Object.keys(missing).length === 0
                    && Object.keys(invalid).length === 0;
            })
                .map(c => {
                return {
                    verificationId: c.verificationId,
                    address: contracts.find(c1 => c1.name === c.name).address,
                    chainId: `${chainId}`
                };
            });
            const resultVerification = yield this.verifyValidated(contractsToVerify);
            return resultVerification;
        });
    }
}
exports.default = SourcifyJS;
