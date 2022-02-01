import axios, { AxiosRequestConfig } from 'axios'
import * as FormData from 'form-data'

interface ValidatedContract {
  verificationId: string,
  address: string,
  chainId: string
}

interface Contract {
  address: string,
  name: string
}

export default class SourcifyJS {
  url: string
  cookies: string[]
  constructor(environment: string = 'https://sourcify.dev') {
    this.url = environment
    this.cookies = []
  }
  public async filesTree(address: string, chainId: number) {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${this.url}/server/files/tree/any/${chainId}/${address}`
    };
    let response = await axios(config)
    return response.data
  }
  public async inputFiles(file: Buffer) {
    const data = new FormData();
    data.append('files', file);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${this.url}/server/input-files`,
      headers: {
        ...data.getHeaders()
      },
      data: data
    };

    let result = await axios(config)
    this.cookies = result.headers['set-cookie']
    return result.data
  }

  public async sessionData() {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${this.url}/server/session-data`,
      headers: {
        'Cookie': this.cookies.join(';')
      }
    };

    let result = await axios(config)
    return result.data

  }

  public async restartSession() {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${this.url}/restart-session`,
      headers: {
        'Cookie': this.cookies.join(';')
      }
    };
    await axios(config)
    this.cookies = []
  }

  public async verifyValidated(contracts: ValidatedContract[]) {
    const data = JSON.stringify({
      contracts
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${this.url}/server/verify-validated`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': this.cookies.join(';')
      },
      data: data
    };

    const result = await axios(config)
    return result.data
  }

  public async verify(chainId: number, contracts: Contract[], metafile: Buffer) {
    let contractsNames = contracts.map(c => c.name)
    const result = await this.inputFiles(metafile)
    let contractsToVerify: ValidatedContract[] = result.contracts
      .filter(c => {
        const missing = c?.files?.missing || {}
        const invalid = c?.files?.invalid || {}
        return true
          && contractsNames.includes(c.name)
          && Object.keys(missing).length === 0
          && Object.keys(invalid).length === 0
      })
      .map(c => {
        return {
          verificationId: c.verificationId,
          address: contracts.find(c1 => c1.name === c.name).address,
          chainId: `${chainId}`
        }
      })
    const resultVerification = await this.verifyValidated(contractsToVerify)
    return resultVerification
  }
}