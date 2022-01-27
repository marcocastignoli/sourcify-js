/// <reference types="node" />
interface ValidatedContract {
    verificationId: string;
    address: string;
    chainId: string;
}
interface Contract {
    address: string;
    name: string;
}
export default class SourcifyJS {
    url: string;
    cookies: string[];
    constructor(environment: string);
    filesTree(address: string, chainId: number): Promise<any>;
    inputFiles(file: Buffer): Promise<any>;
    sessionData(): Promise<any>;
    restartSession(): Promise<void>;
    verifyValidated(contracts: ValidatedContract[]): Promise<any>;
    verify(chainId: number, contracts: Contract[], metafile: Buffer): Promise<any>;
}
export {};
