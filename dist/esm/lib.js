var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { request } from 'https';
export function filesTree(address, chainId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var options = {
                'method': 'GET',
                'hostname': 'staging.sourcify.dev',
                'path': `/server/files/tree/any/${chainId}/${address}`
            };
            var req = request(options, function (res) {
                var chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("end", function () {
                    try {
                        var body = Buffer.concat(chunks);
                        resolve(JSON.parse(body.toString()));
                    }
                    catch (e) {
                        reject();
                    }
                });
                res.on("error", function (error) {
                    reject();
                });
            });
            req.end();
        });
    });
}
