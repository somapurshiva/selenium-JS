const http = require('http');
const https = require('https');

function httpPromise(url) {
    let httpClient;

    if (url.startsWith('https:')) {
        httpClient = https;
    } else {
        httpClient = http;
    }

    return new Promise((resolve, reject) => {
        httpClient.get(url, (res) => {
            let chunksOfData = [];
            let statusCode = res.statusCode;
            let respHeaders = res.headers;

            res.on('data', fragments => chunksOfData.push(fragments));

            res.on('end', () => {
                let respBody = Buffer.concat(chunksOfData).toString();
                resolve({
                    statusCode,
                    respHeaders,
                    respBody
                });
            });

            res.on('error', error => {
                reject({
                    statusCode,
                    respHeaders,
                    error
                });
            });
        });
    });
}

module.exports = httpPromise;