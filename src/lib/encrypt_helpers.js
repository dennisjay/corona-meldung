function arrayBufferToB64(arrayBuffer)
{
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}

function b64ToArrayBuffer(base64_string)
{
  return Uint8Array.from(atob(base64_string), c => c.charCodeAt(0));
}


export async function encrypt(jwk_key, plain_text) {
  const data = new TextEncoder().encode(plain_text);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const key = await window.crypto.subtle.importKey(
    "jwk", //can be "jwk" or "raw"
    jwk_key,
    {   //this is the algorithm options
      name: "AES-CBC",
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  );

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      //Don't re-use initialization vectors!
      //Always generate a new iv every time your encrypt!
      iv: iv,
    },
    key, //from generateKey or importKey above
    data //ArrayBuffer of data you want to encrypt
  );

  return {
    encrypted: arrayBufferToB64(encryptedBuffer),
    iv: arrayBufferToB64(iv)
  };
}


export async function decrypt(jwk_key, encrypted) {

  const key = await window.crypto.subtle.importKey(
    "jwk", //can be "jwk" or "raw"
    jwk_key,
    {   //this is the algorithm options
      name: "AES-CBC",
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  );

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: b64ToArrayBuffer(encrypted.iv), //The initialization vector you used to encrypt
    },
    key, //from generateKey or importKey above
    b64ToArrayBuffer(encrypted.encrypted) //ArrayBuffer of the data
  );

  return new TextDecoder().decode(decryptedBuffer);
}
