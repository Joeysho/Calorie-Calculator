//const age = document.getElementById("age").value;
"use strict";
const btnCalculate = document.getElementById("btn-calculate");
const btnClear = document.getElementById("btn-clear");
const btnGoBack = document.getElementById("btn-goback");

const ageError = document.querySelector(".age-error");
const genderError = document.querySelector(".gender-error");
const feetError = document.querySelector(".feet-error");
const inchesError = document.querySelector(".inches-error");
const inchesError2 = document.querySelector(".inches-error2");
const weightError = document.querySelector(".weight-error");

const validateNumber = (numValue, minNum, maxNum) => {
  if (!Number(numValue.value)) {
    document.querySelector(`.${numValue.id}-error`).classList.remove("hidden");
    return;
  } else if (
    Number(numValue.value) < minNum ||
    Number(numValue.value) > maxNum
  ) {
    document.querySelector(`.${numValue.id}-error`).classList.remove("hidden");
    return;
  }
  document.querySelector(`.${numValue.id}-error`).classList.add("hidden");
};
const validateInches = (numValue, minNum, maxNum) => {
  // CHECK IF CONTAINS HIDDEN THIS IS USEFUL TO USE INCHES 2 WHEN BOTH FEET AND INCHES ARE ERROR

  if (!numValue.value) {
    if (!feetError.classList.contains("hidden")) {
      inchesError2.classList.remove("hidden");
      inchesError.classList.add("hidden");
      return;
    } else {
      inchesError2.classList.add("hidden");
      inchesError.classList.remove("hidden");
      return;
    }
  }
  if (Number(numValue.value) < minNum || Number(numValue.value) > maxNum) {
    if (!feetError.classList.contains("hidden")) {
      inchesError2.classList.remove("hidden");
      inchesError.classList.add("hidden");
      return;
    } else {
      inchesError.classList.remove("hidden");
      inchesError2.classList.add("hidden");
      return;
    }
  }
  inchesError.classList.add("hidden");
  inchesError2.classList.add("hidden");
};
// Set all variables
const age = document.getElementById("age");
const genderMale = document.getElementById("male");
const genderFemale = document.getElementById("female");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");

btnCalculate.addEventListener("click", () => {
  // Validate age input
  validateNumber(age, 15, 80);

  // Check if male ore female is selected
  if (genderMale.checked) {
    genderError.classList.add("hidden");
  } else if (genderFemale.checked) {
    genderError.classList.add("hidden");
  } else {
    genderError.classList.remove("hidden");
  }

  // Validate height variables
  validateNumber(feet, 2, 9);
  validateInches(inches, 0, 11);

  // Validate weight
  validateNumber(weight, 30, 1500);

  // Pass through if there are no errors
  if (
    ageError.classList.contains("hidden") &&
    genderError.classList.contains("hidden") &&
    feetError.classList.contains("hidden") &&
    inchesError.classList.contains("hidden") &&
    weightError.classList.contains("hidden")
  ) {
    // Convert string values to number variables
    const ageNum = Number(age.value);
    const feetNum = Number(feet.value);
    const inchesNum = Number(inches.value);
    const weightNum = Number(weight.value);
    // Convert weight feet, and inches to kg and cm
    let weightKg = (weightNum / 2.205).toFixed(2);
    let heightCm = feetNum * 12 + inchesNum;
    heightCm *= 2.54;
    // Set BMR variable
    let BMR = 0;
    // Return BMR depending on male or female
    if (genderMale.checked) {
      BMR = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else if (genderFemale.checked) {
      BMR = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }
    // CHeck activity level and multiply by 1.2-1.8 depending on the level
    const activityValue = document.getElementById("dropdown").value;
    console.log(activityValue);
    let maintenance;
    switch (Number(activityValue)) {
      case 1:
        maintenance = Math.round(BMR * 1.2);
        break;
      case 2:
        maintenance = Math.round(BMR * 1.36);
        break;
      case 3:
        maintenance = Math.round(BMR * 1.48);
        break;
      case 4:
        maintenance = Math.round(BMR * 1.59);
        break;
      case 5:
        maintenance = Math.round(BMR * 1.72);
        break;
      default:
        break;
    }

    console.log(maintenance);

    // Declare levels of weight loss
    let mildWeightLoss = Math.round(maintenance * 0.88);
    let weightLoss = Math.round(maintenance * 0.76);
    let extremeWeightLoss = Math.round(maintenance * 0.62);

    document.querySelector(".s1").textContent = `${maintenance} cals/day`;
    document.querySelector(".s2").textContent = `${mildWeightLoss} cals/day`;
    document.querySelector(".s3").textContent = `${weightLoss} cals/day`;
    document.querySelector(".s4").textContent = `${extremeWeightLoss} cals/day`;

    //Show results screen
    document.getElementById("results").classList.remove("hidden-deeper");
    document.getElementById("results-head").classList.remove("hidden-deeper");

    //Hide calculator screen
    document.getElementById("head").classList.add("hidden-deeper");
    document.getElementById("calculator").classList.add("hidden-deeper");
  }

  //remember to add .value to the variables created since they are just the objects
  // 1.2-1.95 is the activity rate
  // Sedentary 1 = 1.2
  // light 2 = 1.37
  // moderate 3 = 1.46
  // active 4 = 1.55
  // very active 5 = 1.72

  // W in kg  |  H in cm
  // For men: BMR = 10W + 6.25H - 5A + 5
  // For women: BMR = 10W + 6.25H - 5A - 161
});

btnClear.addEventListener("click", () => {
  age.value = "";
  feet.value = "";
  inches.value = "";
  weight.value = "";
});

btnGoBack.addEventListener("click", () => {
  //Hide results screen
  document.getElementById("results").classList.add("hidden-deeper");
  document.getElementById("results-head").classList.add("hidden-deeper");

  //Show calculator screen
  document.getElementById("head").classList.remove("hidden-deeper");
  document.getElementById("calculator").classList.remove("hidden-deeper");
});
