var options; // Declare options in the outer scope

// Function to gather user options
function getPasswordOptions() {

  // Get password length
  var length = parseInt(
    prompt("How many characters do you wish your password to be?")
  );

  // Check to see if the value that was inputted was a number
  if (Number.isNaN(length)) {
    alert("Password length must be of numerical value");
    return null;
  }

  // Check if the value is minimum 8 characters long
  if (length < 8) {
    alert("Password length must be at least 8 characters long");
    return null;
  }

  // The value must be less than 31 characters long
  if (length > 31) {
    alert("Password length must be less than 31 characters long");
    return null;
  }

  // Ask the user for their options
  var hasSpecialCharacters = confirm(
    "Click OK to confirm inclusion of special characters"
  );

  var hasNumericCharacters = confirm(
    "Click OK to confirm inclusion of numerical characters"
  );

  var hasLowerCaseCharacters = confirm(
    "Click OK to confirm inclusion of lowercase characters"
  );

  var hasUpperCaseCharacters = confirm(
    "Click OK to confirm inclusion of uppercase characters"
  );

  // Ensure that the user chooses something
  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowerCaseCharacters === false &&
    hasUpperCaseCharacters === false
  ) {
    alert("You must choose at least one character type");
    return null;
  }

  // Store user selections in an object and return it
  options = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCaseCharacters: hasLowerCaseCharacters,
    hasUpperCaseCharacters: hasUpperCaseCharacters,
  };

  return options;
}

// Function to generate password
function generatePassword() {
  // Grab the user options
  getPasswordOptions();

  if (!options) {
    return "";
  }

  var specialCharacters = ['~', '!', '@', '#', '$', '%', '^', '<', '>', '&', '*', '(', ')', '-', '_', '=', '+', "'", ',', '.', '{', '}', '[', ']', ':', ';', '|', '\\', '"', '?'];
  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var lowerCaseCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var upperCaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var possibleCharacters = [];
  var guaranteedCharacters = [];
  var result = [];

  // Check if options exist
  if (!options) return null;

  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.hasLowerCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCaseCharacters);
    guaranteedCharacters.push(getRandom(lowerCaseCharacters));
  }

  if (options.hasUpperCaseCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCaseCharacters);
    guaranteedCharacters.push(getRandom(upperCaseCharacters));
  }

  // Loop over the passwords length, selecting random indices from the possible characters & adding them to the result array.
  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);
    result.push(possibleCharacter);
  }

  // Mix in at least one of the guaranteed characters in the result
  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  // Transform the result into a string and pass it into WritePassword
  return result.join("");
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];
  return randElement;
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
