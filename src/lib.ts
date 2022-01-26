import { request } from 'https';

export async function filesTree(address: string, chainId: number) {
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
          resolve(JSON.parse(body.toString()))
        } catch (e) {
          reject()
        }
      });

      res.on("error", function (error) {
        reject()
      });
    });

    req.end();
  })
}
