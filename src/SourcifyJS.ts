import axios, { AxiosRequestConfig } from 'axios'
import * as FormData from 'form-data'

interface Contract {
  meta: string,
  address: string,
  chainId: string
}

export default class SourcifyJS {
  url: string
  cookies: string[]
  constructor(environment: string) {
    this.url = environment
    this.cookies = []
  }
  public async filesTree(address: string, chainId: number) {
    var config: AxiosRequestConfig = {
      method: 'get',
      url: `${this.url}/server/files/tree/any/${chainId}/${address}`
    };
    let response = await axios(config)
    return response.data
  }
  verify(contracts: Contract[]) {
    //contracts
  }
  public async inputFiles(file: Buffer) {
    const data = new FormData();
    data.append('files', file);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://staging.sourcify.dev/server/input-files',
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
    var config: AxiosRequestConfig = {
      method: 'get',
      url: 'https://staging.sourcify.dev/server/session-data',
      headers: {
        'Cookie': this.cookies.join(';')
      }
    };

    let result = await axios(config)
    return result.data

  }
}