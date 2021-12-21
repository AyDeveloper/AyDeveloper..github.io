/*
=================================================================================================
For this Challange i would be using the subtleCrypto() interface to encrypt and decrypt data.
The encrypt method takes in three argument : algorithm, key, data.
---where the algorithm is an object of name(RSA-OAEP)
---where key is the key to be used for encryption
---where data is the data to be encrypted;
================================================================================================

*/


let cipherText;

// selecting output, encryptionBtn and decrytionBtn elements.
const output = document.querySelector('.output');
const encryptBtn = document.querySelector('.encryptBtn');
const decryptBtn = document.querySelector('.decryptBtn');


const encryptText = async (plainText, key) => {
  // encoding plaintext from the input value into special characters
    const encodedText = new TextEncoder().encode(plainText);
  // this variable stores the results of the encryption using crypto.subtle.encrypt() having passed in the arguments;
    cipherText = await window.crypto.subtle.encrypt(
      {
      
        name: "RSA-OAEP"
      },
      key,
      encodedText
    );

    // this enables us access the ciphered text;
    let buffer = new Uint8Array(cipherText, 0, 5);
    // display result in the DOM
    output.innerHTML = `${buffer}`;
    output.style.display = "block";
    // takes out result after 10secs
      setTimeout(()=> {
          output.style.display = "none";
      },10000);
  }


  
  const decryptText = async (key) => {
      // this variable stores the results of the decryption using crypto.subtle.decrypt() having passed in the arguments;
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      key,
      cipherText
    );

    let dec = new TextDecoder();
    output.style.display = "block";

    // decodes the result into plain text;
    output.innerHTML = dec.decode(decrypted);

    setTimeout(()=> {
      output.style.display = "none";
    },10000);
}



/*
======================================================================================================
Want to generate a key to be passed as an argument in the encryptText() and decryptText() 
to both encrypt and decrypt the data so has to have them display when called upon
======================================================================================================
*/
  
// crypto.subtle.generateKey() returns a promise of two newly generated keys(private key for decrypting and public key for encrypting),
//  that matches the algorithm, the usages.
// also takes in three arguments ( algorithm, extractable, keyUsage );

  window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
   },
    true,
    ["encrypt", "decrypt"]
  ).then((keys) => {
    encryptBtn.addEventListener("click", () => {
      const text = document.getElementById('textInput').value;
      // only encrypts when there is a value in the input field;
      if (text) {
        encryptText(text, keys.publicKey);
      }
    });

    decryptBtn.addEventListener('click', () => {
      decryptText(keys.privateKey);
    })

  });

