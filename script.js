const bmiForm = document.getElementById("bmi-form");
const bmiValue = document.getElementById("bmi-value");
const bmiStatus = document.getElementById("bmi-status");

const progressForm = document.getElementById("progress-form");
const workouts = document.getElementById("workouts");
const water = document.getElementById("water");
const sleep = document.getElementById("sleep");
const workoutsOutput = document.getElementById("workouts-output");
const waterOutput = document.getElementById("water-output");
const sleepOutput = document.getElementById("sleep-output");
const consistencyScore = document.getElementById("consistency-score");
const progressNote = document.getElementById("progress-note");

function getBmiCategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function updateBmi(event) {
  event.preventDefault();

  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);

  if (!height || !weight) {
    bmiValue.textContent = "--";
    bmiStatus.textContent = "Please enter valid values.";
    return;
  }

  const bmi = weight / ((height / 100) * (height / 100));
  const roundedBmi = bmi.toFixed(1);
  const category = getBmiCategory(bmi);

  bmiValue.textContent = roundedBmi;
  bmiStatus.textContent = `Category: ${category}`;
}

function getProgressMessage(score) {
  if (score >= 85) return "Excellent consistency. You're in a strong groove.";
  if (score >= 65) return "Solid rhythm. Keep going.";
  if (score >= 40) return "You're building momentum. Stay steady this week.";
  return "A fresh start works too. Focus on one habit today.";
}

function updateProgress(save = true) {
  const workoutValue = Number(workouts.value);
  const waterValue = Number(water.value);
  const sleepValue = Number(sleep.value);

  workoutsOutput.textContent = `${workoutValue} / 7`;
  waterOutput.textContent = `${waterValue} / 12`;
  sleepOutput.textContent = `${sleepValue} / 10`;

  const score = Math.round(
    ((workoutValue / 7) * 45) +
    ((waterValue / 12) * 25) +
    ((sleepValue / 10) * 30)
  );

  consistencyScore.textContent = `${score}%`;
  progressNote.textContent = getProgressMessage(score);

  if (save) {
    localStorage.setItem(
      "pulsefit-progress",
      JSON.stringify({
        workouts: workoutValue,
        water: waterValue,
        sleep: sleepValue
      })
    );
  }
}

function loadProgress() {
  const saved = localStorage.getItem("pulsefit-progress");
  if (!saved) {
    updateProgress(false);
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    workouts.value = parsed.workouts ?? 4;
    water.value = parsed.water ?? 8;
    sleep.value = parsed.sleep ?? 7;
  } catch {
    workouts.value = 4;
    water.value = 8;
    sleep.value = 7;
  }

  updateProgress(false);
}

bmiForm.addEventListener("submit", updateBmi);
progressForm.addEventListener("input", () => updateProgress(true));

loadProgress();
