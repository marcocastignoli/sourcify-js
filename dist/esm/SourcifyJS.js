var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import * as FormData from 'form-data';
export default class SourcifyJS {
    constructor(serverUrl = 'https://sourcify.dev/server', repositoryUrl = 'https://repo.sourcify.dev') {
        this.serverUrl = serverUrl;
        this.repositoryUrl = repositoryUrl;
        this.cookies = [];
    }
    filesTree(address, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'get',
                url: `${this.serverUrl}/files/tree/any/${chainId}/${address}`
            };
            let response = yield axios(config);
            return response.data;
        });
    }
    metadata(address, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${this.repositoryUrl}/contracts/full_match/${chainId}/${address}/metadata.json`);
            const config = {
                method: 'get',
                url: `${this.repositoryUrl}/contracts/full_match/${chainId}/${address}/metadata.json`
            };
            let response = yield axios(config);
            return response.data;
        });
    }
    getABI(address, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.metadata(address, chainId);
            return { abi: response.output.abi, name: Object.values(response.settings.compilationTarget)[0] };
        });
    }
    inputFiles(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new FormData();
            data.append('files', file);
            const config = {
                method: 'POST',
                url: `${this.serverUrl}/input-files`,
                headers: Object.assign({}, data.getHeaders()),
                data: data
            };
            let result = yield axios(config);
            this.cookies = result.headers['set-cookie'];
            return result.data;
        });
    }
    sessionData() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'get',
                url: `${this.serverUrl}/session-data`,
                headers: {
                    'Cookie': this.cookies.join(';')
                }
            };
            let result = yield axios(config);
            return result.data;
        });
    }
    restartSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'post',
                url: `${this.serverUrl}/restart-session`,
                headers: {
                    'Cookie': this.cookies.join(';')
                }
            };
            yield axios(config);
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
                url: `${this.serverUrl}/verify-validated`,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': this.cookies.join(';')
                },
                data: data
            };
            const result = yield axios(config);
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
