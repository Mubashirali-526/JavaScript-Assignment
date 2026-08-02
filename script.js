// 1. DARK MODE TOGGLE
// Uses: let/const, DOM querySelector, classList, Boolean, event

const darkToggle = document.getElementById("dark-toggle");
const htmlEl = document.documentElement;

// Arrow function
const applyTheme = (isDark) => {
  htmlEl.setAttribute("data-theme", isDark ? "dark" : "light");
};

darkToggle.addEventListener("change", function () {
  applyTheme(this.checked);
});

// 2. COUNTER
// Uses: let, Number, Arithmetic operators, if/else, DOM textContent, classList

let count = 0;

function updateCounterDisplay() {
  const display = document.getElementById("counter-display");
  const msg = document.getElementById("counter-msg");

  display.textContent = count;

  // Bump animation
  display.classList.remove("bump");
  void display.offsetWidth; // reflow trick
  display.classList.add("bump");
  setTimeout(() => display.classList.remove("bump"), 200);

  // Conditional messages using if/else if/else
  if (count > 10) {
    msg.textContent = "🔥 Going strong! Count is above 10.";
  } else if (count > 0) {
    msg.textContent = "👍 Keep going!";
  } else if (count === 0) {
    msg.textContent = "Counter is at zero.";
  } else if (count < -10) {
    msg.textContent = "📉 Way below zero!";
  } else {
    msg.textContent = "⬇️ Going negative...";
  }
}

function changeCounter(amount) {
  count += amount; // arithmetic operator +=
  updateCounterDisplay();
}

function resetCounter() {
  count = 0;
  updateCounterDisplay();
}

updateCounterDisplay(); // initial render

// 3. IMAGE SLIDER
// Uses: const, Array, Object, for loop, querySelector, classList, getElementById

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
let currentSlide = 0;

// Build dots using a for loop
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", "Slide " + (i + 1));
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  dotsContainer.children[currentSlide].classList.remove("active");

  currentSlide = (index + slides.length) % slides.length; // wrap around

  slides[currentSlide].classList.add("active");
  dotsContainer.children[currentSlide].classList.add("active");
}

function moveSlide(direction) {
  goToSlide(currentSlide + direction);
}

// Auto-advance every 5 seconds
setInterval(() => moveSlide(1), 5000);

// 4. FORM VALIDATION
// Uses: const, String, Boolean, functions, if/else, DOM innerHTML, classList

// Email regex validation — returns Boolean
const isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Helper to set field state

const setFieldState = (inputId, msgId, isOk, message) => {
  const input = document.getElementById(inputId);
  const msg = document.getElementById(msgId);
  input.className = isOk ? "valid" : "invalid";
  msg.className = "field-msg " + (isOk ? "ok" : "err");
  msg.textContent = message;
  return isOk;
};

// Live validation on input events

document.getElementById("inp-name").addEventListener("input", function () {
  const name = this.value.trim();
  if (name.length === 0) {
    setFieldState("inp-name", "msg-name", false, "Name cannot be empty.");
  } else if (name.length < 3) {
    setFieldState(
      "inp-name",
      "msg-name",
      false,
      "Name must be at least 3 characters.",
    );
  } else {
    setFieldState("inp-name", "msg-name", true, "✓ Looks good!");
  }
});

document.getElementById("inp-email").addEventListener("input", function () {
  const email = this.value.trim();
  if (email.length === 0) {
    setFieldState("inp-email", "msg-email", false, "Email cannot be empty.");
  } else if (!isValidEmail(email)) {
    setFieldState(
      "inp-email",
      "msg-email",
      false,
      "Enter a valid email (e.g. you@mail.com).",
    );
  } else {
    setFieldState("inp-email", "msg-email", true, "✓ Valid email address!");
  }
});

document.getElementById("inp-age").addEventListener("input", function () {
  const age = Number(this.value);
  if (!this.value) {
    setFieldState("inp-age", "msg-age", false, "Age is required.");
  } else if (age < 10 || age > 100) {
    setFieldState(
      "inp-age",
      "msg-age",
      false,
      "Age must be between 10 and 100.",
    );
  } else {
    setFieldState("inp-age", "msg-age", true, "✓ Valid age.");
  }
});

function submitForm() {
  const name = document.getElementById("inp-name").value.trim();
  const email = document.getElementById("inp-email").value.trim();
  const age = Number(document.getElementById("inp-age").value);
  const course = document.getElementById("inp-course").value;
  const result = document.getElementById("form-result");

  // Validate all fields using logical operators (&&)
  const nameOk = name.length >= 3;
  const emailOk = isValidEmail(email);
  const ageOk = age >= 10 && age <= 100;
  const courseOk = course !== "";

  // Apply visual feedback
  setFieldState(
    "inp-name",
    "msg-name",
    nameOk,
    nameOk ? "✓ Looks good!" : "Min 3 characters required.",
  );
  setFieldState(
    "inp-email",
    "msg-email",
    emailOk,
    emailOk ? "✓ Valid email!" : "Enter a valid email.",
  );
  setFieldState(
    "inp-age",
    "msg-age",
    ageOk,
    ageOk ? "✓ Valid age." : "Age must be 10–100.",
  );
  setFieldState(
    "inp-course",
    "msg-course",
    courseOk,
    courseOk ? "✓ Course selected." : "Please select a course.",
  );

  const allValid = nameOk && emailOk && ageOk && courseOk;

  result.style.display = "block";

  if (allValid) {
    // Object to hold form data
    const userData = {
      name: name,
      email: email,
      age: age,
      course: course,
    };
    result.className = "success";
    result.innerHTML = `✅ <strong>Registered successfully!</strong><br/>
      Welcome, <strong>${userData.name}</strong>! You've enrolled in <strong>${userData.course}</strong>. 
      Confirmation will be sent to <em>${userData.email}</em>.`;
  } else {
    result.className = "error";
    result.innerHTML =
      "❌ <strong>Please fix the errors above</strong> before submitting.";
  }
}

// 5. QUIZ
// Uses: const, Array of Objects, for loop, functions, DOM manipulation, innerHTML

const questions = [
  {
    q: "Which keyword declares a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: 2,
  },
  {
    q: "What does this return?  typeof []",
    options: ['"array"', '"object"', '"list"', '"undefined"'],
    answer: 1,
  },
  {
    q: "Which method adds an item to the END of an array?",
    options: ["unshift()", "push()", "shift()", "splice()"],
    answer: 1,
  },
  {
    q: "What is the output of: Boolean(0)?",
    options: ["true", "null", "undefined", "false"],
    answer: 3,
  },
  {
    q: "Which is the correct arrow function syntax?",
    options: [
      "function = (x) => x * 2",
      "const fn = (x) => x * 2",
      "const fn => (x) { return x * 2 }",
      "arrow fn(x) = x * 2",
    ],
    answer: 1,
  },
];

let qIndex = 0;
let score = 0;
const progress = []; // Array to track results

function startQuiz() {
  qIndex = 0;
  score = 0;
  progress.length = 0;
  document.getElementById("quiz-restart").style.display = "none";
  document.getElementById("quiz-next").style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  const q = questions[qIndex];
  document.getElementById("quiz-question").textContent =
    `Q${qIndex + 1}: ${q.q}`;
  document.getElementById("quiz-feedback").textContent = "";

  const optContainer = document.getElementById("quiz-options");
  optContainer.innerHTML = "";

  // Build option buttons with a for loop

  for (let i = 0; i < q.options.length; i++) {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    btn.textContent = q.options[i];
    btn.addEventListener("click", () => checkAnswer(i));
    optContainer.appendChild(btn);
  }

  renderProgressDots();
  updateScore();
}

function checkAnswer(chosen) {
  const q = questions[qIndex];
  const buttons = document.querySelectorAll(".quiz-opt");
  const feedback = document.getElementById("quiz-feedback");

  // Disable all buttons after answering
  buttons.forEach((btn) => (btn.disabled = true));

  const isCorrect = chosen === q.answer;

  if (isCorrect) {
    buttons[chosen].classList.add("correct");
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "var(--success)";
    score++;
    progress.push("correct");
  } else {
    buttons[chosen].classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    feedback.textContent = "❌ Wrong! The correct answer is highlighted.";
    feedback.style.color = "var(--error)";
    progress.push("wrong");
  }

  updateScore();
  renderProgressDots();

  if (qIndex < questions.length - 1) {
    document.getElementById("quiz-next").style.display = "inline-block";
  } else {
    // Quiz finished

    setTimeout(() => {
      document.getElementById("quiz-feedback").textContent =
        `🎉 Quiz complete! You scored ${score} / ${questions.length}.`;
      document.getElementById("quiz-restart").style.display = "inline-block";
    }, 600);
  }
}

function nextQuestion() {
  qIndex++;
  document.getElementById("quiz-next").style.display = "none";
  renderQuestion();
}

function renderProgressDots() {
  const container = document.getElementById("quiz-progress");
  container.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const dot = document.createElement("span");
    dot.className = "qp-dot";
    if (i < progress.length) {
      dot.classList.add("answered", progress[i]);
    }
    container.appendChild(dot);
  }
}

function updateScore() {
  document.getElementById("quiz-score").textContent =
    `Score: ${score} / ${questions.length}`;
}

// Kick off quiz on load

startQuiz();
