const PdfReader = require('pdfreader').PdfReader;

const alphabet = 'abcdefghijklmnopqrstuvwxyz'; //Change this to include any other charcters
const maxLength = 10; // Change this to your desired maximum length

function* generateStrings(prefix, length) {
    if (length === 0) {
        yield prefix;
        return;
    }
    for (let i = 0; i < alphabet.length; i++) {
        yield* generateStrings(prefix + alphabet[i], length - 1);
    }
}

function tryPassword(password) {
    return new Promise((resolve) => {
        new PdfReader({ password: password }).parseFileItems(
            "./Tutorial_2_119.pdf",//Change this to any other path to pdf that you want to
            function (err, item) {
                if (err) {
                    resolve(null);
                } else if (!item) {
                    resolve(null);
                } else if (item.text) {
                    resolve(password);
                }
            }
        );
    });
}

async function testPasswords(length) {
    const passwordGenerator = generateStrings('', length);

    for (const password of passwordGenerator) {
        console.log(password);
        const result = await tryPassword(password);
        if (result) {
            console.log(`Password found: ${result}`);
            return;
        }
    }
}

(async function bruteForce() {
    for (let len = 1; len <= maxLength; len++) {
        await testPasswords(len);
    }
})();
