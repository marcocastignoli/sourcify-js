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
interface IGetABIReturn {
    name: string;
    abi: object[];
}
export default class SourcifyJS {
    serverUrl: string;
    repositoryUrl: string;
    cookies: string[];
    constructor(serverUrl?: string, repositoryUrl?: string);
    filesTree(address: string, chainId: number): Promise<any>;
    metadata(address: string, chainId: number): Promise<any>;
    getABI(address: string, chainId: number): Promise<IGetABIReturn>;
    inputFiles(file: Buffer): Promise<any>;
    sessionData(): Promise<any>;
    restartSession(): Promise<void>;
    verifyValidated(contracts: ValidatedContract[]): Promise<any>;
    verify(chainId: number, contracts: Contract[], metafile: Buffer): Promise<any>;
}
export {};
