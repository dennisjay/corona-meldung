import Evaporate from 'evaporate';
import sparkMD5 from 'spark-md5';
import sha256 from 'js-sha256';

const uploader = Evaporate.create({
  signerUrl: '/data-api-v1/sign',
  aws_key: 'AKIAU2CLF3QR6VYOCXMI',
  bucket: 'corona-meldung-incoming',
  cloudfront: false,
  computeContentMd5: true,
  cryptoMd5Method: (d) => btoa(sparkMD5.ArrayBuffer.hash(d, true)),
  cryptoHexEncodedHash256: sha256,
  awsUrl: 'https://s3-eu-central-1.amazonaws.com',
  awsRegion: 'eu-central-1'
});

export const uploadFiles = async (user_pseudonym, files, progress_callback) => {
  const evaporate = await uploader;
  for(let file of files) {
    await evaporate.add({
      file: file,
      name: file.name,
      progress: progress_callback
    })
  }
};

export const postData = (user_pseudonym, data) => {
  const endpoint = '/data-api-v1/' + user_pseudonym + '/';
  let request = new XMLHttpRequest();
  let postString = JSON.stringify(data);
  request.open('POST', endpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  return new Promise((resolve, reject) => {
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
          resolve()
        } else {
          console.error(request.statusText);
          reject()
        }
      }
    };

    request.send(postString);
  });
};
