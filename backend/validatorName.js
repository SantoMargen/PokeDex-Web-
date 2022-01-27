const Validator = (string) => {
  let firstName = "";
  let middleName = "";
  let lastName = "";
  let spaceCount = 0;
  let dotCount = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === ".") {
      dotCount += 1;
    }
    if (string[i] === " ") {
      spaceCount += 1;
    }
    if (spaceCount === 0) {
      firstName += string[i];
    } else if (spaceCount === 1) {
      if (string[i] !== " ") {
        middleName += string[i];
      }
    } else if (spaceCount === 2) {
      if (string[i] !== " ") {
        lastName += string[i];
      }
    }
  }

  if (firstName) {
    if (!middleName) {
      return "Must be 2 or 3 words";
    } else if (
      firstName[0] !== firstName[0].toUpperCase() ||
      middleName[0] !== middleName[0].toUpperCase()
    ) {
      return "Incorrect capitalization";
    } else if (middleName) {
      if (firstName.length === 1 && dotCount < 1) {
        return "Missing dot after initial";
      } else if (lastName) {
        if (
          firstName.length === 2 &&
          middleName.length > 2 &&
          lastName.length > 2
        ) {
          return "Cannot have: initial first name + word middle name";
        } else if (
          firstName.length === 2 &&
          middleName.length > 2 &&
          lastName.length === 2
        ) {
          return "Last name cannot be initial";
        } else if (
          firstName.length > 2 &&
          middleName.length > 2 &&
          lastName.length > 2 &&
          dotCount >= 1 &&
          dotCount <= 2
        ) {
          return "Words cannot end with a dot (only initials can)";
        }
      }
    }
  }

  return true;
};

console.log(Validator("A. Kesya")); //true
console.log(Validator("A. K. Putri")); //true
console.log(Validator("Angelina K. Putri")); //true
console.log(Validator("Angelina")); //Must be 2 or 3 words
console.log(Validator("a. Kesya")); //Incorrect capitalization
console.log(Validator("A Kesya")); //Missing dot after initial
console.log(Validator("A. Kesya Putri")); // Cannot have: initial first name + word middle name
console.log(Validator("A. Kesya P.")); //Last name cannot be initial
console.log(Validator("Angelina. Kesya Putri")); //Words cannot end with a dot (only initials can)
