// Assignment Code
var generateBtn = document.querySelector("#generate");
//Define character sets to be used in the password
var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numberChars = "0123456789";
var specialChars = "!$%&'()*+,-./:;<=>?@[\]^_`{|}~#";

//Initialize variables for password length and character types to include
var passwordLength;
var uppercaseIncluded;
var numbersIncluded;
var specialCharsIncluded;

//This function prompts the user to choose the length of their password
function getPasswordLength() {
    passwordLength = prompt("Choose the length of your password (between 8-128 characters): ");

    if (passwordLength < 8) {
        alert("Password length must be a number between 8-128 characters");
        getPasswordLength();
    } else if (passwordLength > 128) {
        alert("Password length must be a number between 8-128 characters");
        getPasswordLength();
    } else if (isNaN(passwordLength)) {
        alert("Password length must be a number between 8-128 characters");
        getPasswordLength();
    } else {
        alert("The next 3 prompts will ask you what types of characters you want in your password.\nIf you choose 'No' for all, your password will only contain lowercase letters.");
    }
    return passwordLength;
}
//Prompt the user to decide whether to include uppercase characters in the password
function getUppercasePreference() {
    uppercaseIncluded = prompt("Do you want to include uppercase letters in your password? \n(Yes or No)");
    uppercaseIncluded = uppercaseIncluded.toLowerCase();

    if (uppercaseIncluded === null || uppercaseIncluded === "") {
        alert("Please answer Yes or No");
        getUppercasePreference();

    } else if (uppercaseIncluded === "yes" || uppercaseIncluded === "y") {
        uppercaseIncluded = true;
        return uppercaseIncluded;

    } else if (uppercaseIncluded === "no" || uppercaseIncluded === "n") {
        uppercaseIncluded = false;
        return uppercaseIncluded;

    } else {
        alert("Please answer Yes or No");
        getUppercasePreference();
    }
    return uppercaseIncluded;
}
//Prompt the user to decide whether to include numbers in the password
function getNumberPreference() {
    numbersIncluded = prompt("Do you want to include numbers in your password? \n(Yes or No)");
    numbersIncluded = numbersIncluded.toLowerCase();
    if (numbersIncluded === null || numbersIncluded === "") {
        alert("Please answer Yes or No");
        getNumberPreference();

    } else if (numbersIncluded === "yes" || numbersIncluded === "y") {
        numbersIncluded = true;
        return numbersIncluded;

    } else if (numbersIncluded === "no" || numbersIncluded === "n") {
        numbersIncluded = false;
        return numbersIncluded;

    } else {
        alert("Please answer Yes or No");
        getNumberPreference();
    }
    return numbersIncluded;
}
//Prompt the user to decide whether to include special characters in the password
function getSpecialCharacterPreference() {
    specialCharsIncluded = prompt("Do you want to include special characters in your password? \n(Yes or No)");
    specialCharsIncluded = specialCharsIncluded.toLowerCase();
    if (specialCharsIncluded === null || specialCharsIncluded === "") {
        alert("Please answer Yes or No");
        getSpecialCharacterPreference();

    } else if (specialCharsIncluded === "yes" || specialCharsIncluded === "y") {
        specialCharsIncluded = true;
        return specialCharsIncluded;

    } else if (specialCharsIncluded === "no" || specialCharsIncluded === "n") {
        specialCharsIncluded = false;
        return specialCharsIncluded;

    } else {
        alert("Please answer Yes or No");
        getSpecialCharacterPreference();
    }
    return specialCharsIncluded;
}
//This function generates a random password based on the user's input
function generatePassword() {
    getPasswordLength()
    getUppercasePreference()
    getNumberPreference()
    getSpecialCharacterPreference()
    var generatedPassword = "";
    var characterSet = lowercaseChars;
    if (uppercaseIncluded) {
        characterSet += uppercaseChars;
    }
    if (numbersIncluded) {
        characterSet += numberChars;
    }
    if (specialCharsIncluded) {
        characterSet += specialChars;
    }
    for (var i = 0; i < passwordLength; i++) {
        generatedPassword += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    return generatedPassword
}
// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);