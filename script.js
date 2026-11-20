// ==========================================
// 1. Create a movie object & 2. Add getSummary() method
// ==========================================
const movie = {
  title: "Inception",
  director: "Christopher Nolan",
  releaseYear: 2010,
  genre: "Sci-Fi Thriller",
  duration: 148, // in minutes
  rating: 8.8,
  getSummary() {
    return `${this.title} (${this.releaseYear}) is a ${this.genre} directed by ${this.director}, running ${this.duration} minutes with a rating of ${this.rating}/10.`;
  }
};

console.log("--- Task 1 & 2: Movie Object ---");
console.log("Title:", movie.title);
console.log("Director:", movie.director);
console.log("Release Year:", movie.releaseYear);
console.log("Genre:", movie.genre);
console.log("Duration:", movie.duration);
console.log("Rating:", movie.rating);
console.log("Summary:", movie.getSummary());


// ==========================================
// 3. Create character objects & 4. Add shared describe() method
// ==========================================
function Character(name, actor, role) {
  this.name = name;
  this.actor = actor;
  this.role = role;
}

Character.prototype.describe = function () {
  return `${this.name}, played by ${this.actor}, is ${this.role}`;
};

const domCobb = new Character("Dom Cobb", "Leonardo DiCaprio", "a skilled thief who enters dreams.");
const arthur = new Character("Arthur", "Joseph Gordon-Levitt", "Cobb's calm and careful partner.");
const ariadne = new Character("Ariadne", "Elliot Page", "the architect who designs the dream worlds.");

console.log("\n--- Task 3 & 4: Character Constructor & Prototype ---");
console.log(domCobb.describe());
console.log(arthur.describe());
console.log(ariadne.describe());


// ==========================================
// 5. Practice function types
// ==========================================
// Function declaration: format the movie title
function formatMovieTitle(title, year) {
  return `${title.toUpperCase()} (${year})`;
}

// Function expression: convert duration into hours and minutes
const formatDuration = function (totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

// Arrow function: convert a rating (out of 10) into a percentage
const ratingToPercentage = (rating) => `${(rating * 10).toFixed(0)}%`;

console.log("\n--- Task 5: Function Types ---");
console.log("Formatted Title:", formatMovieTitle(movie.title, movie.releaseYear));
console.log("Formatted Duration:", formatDuration(movie.duration));
console.log("Rating Percentage:", ratingToPercentage(movie.rating));


// ==========================================
// 6. Investigate scope
// ==========================================
console.log("\n--- Task 6: Scope Investigation ---");

if (true) {
  var varVariable = "I am declared with var";
  let letVariable = "I am declared with let";
  const constVariable = "I am declared with const";
}

// var is function-scoped (not block-scoped), so it leaks outside the if block:
console.log("Outside if block (var):", varVariable);

// let and const are block-scoped; accessing them outside the if block throws a ReferenceError:
try {
  console.log(letVariable);
} catch (error) {
  console.log("Outside if block (let):", error.name, "-", error.message);
}

try {
  console.log(constVariable);
} catch (error) {
  console.log("Outside if block (const):", error.name, "-", error.message);
}

function scopeTestFunction() {
  var localVar = "Local inside function";
  let localLet = "Also local inside function";
  return localVar + " & " + localLet;
}
scopeTestFunction();

// All variables (var, let, const) declared inside a function are local to that function:
try {
  console.log(localVar);
} catch (error) {
  console.log("Outside function (localVar):", error.name, "-", error.message);
}


// ==========================================
// 7. Write a callback
// ==========================================
function displayMovie(movieObj, callback) {
  console.log("Movie Title:", movieObj.title);
  callback(movieObj);
}

console.log("\n--- Task 7: Callbacks ---");
displayMovie(movie, function (m) {
  console.log("Callback 1 - Rating:", m.rating);
});

displayMovie(movie, (m) => {
  console.log("Callback 2 - Director:", m.director);
});


// ==========================================
// 8. Use map()
// ==========================================
const characters = [domCobb, arthur, ariadne];
const characterNames = characters.map((character) => character.name);

console.log("\n--- Task 8: map() ---");
console.log("Character Names:", characterNames);


// ==========================================
// 9. Use filter()
// ==========================================
const reviews = [
  { reviewer: "Alice", comment: "Mind-blowing concept and execution.", score: 9 },
  { reviewer: "Bob", comment: "A bit confusing on the first watch.", score: 7 },
  { reviewer: "Charlie", comment: "Hans Zimmer's score is unforgettable.", score: 10 },
  { reviewer: "Diana", comment: "Great visuals, solid pacing.", score: 8 },
  { reviewer: "Evan", comment: "Too long for my taste.", score: 6 }
];

const topReviews = reviews.filter((review) => review.score >= 8);

console.log("\n--- Task 9: filter() (Score >= 8) ---");
console.log(topReviews);


// ==========================================
// 10. Use reduce()
// ==========================================
function calculateReviewStats(reviewList) {
  if (!Array.isArray(reviewList) || reviewList.length === 0) {
    return { total: 0, average: 0 };
  }

  const total = reviewList.reduce((sum, review) => sum + review.score, 0);
  const average = total / reviewList.length;
  return { total, average };
}

console.log("\n--- Task 10: reduce() ---");
console.log("All reviews stats:", calculateReviewStats(reviews));
console.log("Empty array stats (safe):", calculateReviewStats([]));


// ==========================================
// 11. Create a closure
// ==========================================
function createLikeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const incrementLikes = createLikeCounter();


// ==========================================
// 12. Display movie details in HTML
// ==========================================
document.getElementById("display-title").textContent = formatMovieTitle(movie.title, movie.releaseYear);
document.getElementById("movie-summary").textContent = movie.getSummary();
document.getElementById("display-director").textContent = movie.director;
document.getElementById("display-year").textContent = movie.releaseYear;
document.getElementById("display-genre").textContent = movie.genre;
document.getElementById("display-duration").textContent = formatDuration(movie.duration);
document.getElementById("display-initial-rating").textContent = `${movie.rating}/10 (${ratingToPercentage(movie.rating)})`;


// ==========================================
// 13. Connect a like button using the closure
// ==========================================
const likeBtn = document.getElementById("like-btn");
const likeCountSpan = document.getElementById("like-count");

likeBtn.addEventListener("click", () => {
  const updatedCount = incrementLikes();
  likeCountSpan.textContent = updatedCount;
});


// ==========================================
// 14. Accept a rating & 15. Update the average
// ==========================================
const userRatings = [];
const userRatingInput = document.getElementById("user-rating-input");
const submitRatingBtn = document.getElementById("submit-rating-btn");
const ratingFeedback = document.getElementById("rating-feedback");
const averageRatingDisplay = document.getElementById("average-rating");
const ratingCountDisplay = document.getElementById("rating-count");

submitRatingBtn.addEventListener("click", () => {
  const rawValue = userRatingInput.value.trim();
  const parsedValue = Number(rawValue);

  // Validate: non-empty, whole number (Number.isInteger), and between 1 and 10 inclusive
  if (
    rawValue === "" ||
    !Number.isInteger(parsedValue) ||
    parsedValue < 1 ||
    parsedValue > 10
  ) {
    ratingFeedback.textContent = "Invalid rating. Please enter a whole number from 1 to 10.";
    ratingFeedback.className = "feedback-msg error";
    return;
  }

  // Store valid rating and compute updated average using reduce()
  userRatings.push(parsedValue);
  const sum = userRatings.reduce((acc, val) => acc + val, 0);
  const average = (sum / userRatings.length).toFixed(1);

  averageRatingDisplay.textContent = average;
  ratingCountDisplay.textContent = userRatings.length;

  ratingFeedback.textContent = `Thank you! Your rating of ${parsedValue}/10 has been recorded.`;
  ratingFeedback.className = "feedback-msg success";
  userRatingInput.value = "";
});


// ==========================================
// Existing Page Controls (Poster Switcher, Background Colour, Currency Converter)
// ==========================================
const posterImage = document.getElementById("myImage");
const switchPosterBtn = document.getElementById("switchPosterBtn");
const switchBackBtn = document.getElementById("switchBackBtn");

if (posterImage && switchPosterBtn && switchBackBtn) {
  switchPosterBtn.addEventListener("click", () => {
    posterImage.src = "images/download2.jpg";
  });

  switchBackBtn.addEventListener("click", () => {
    posterImage.src = "images/download.jpg";
  });
}

const bgColorBtn = document.getElementById("bg-color-btn");
const bgColors = ["#0f172a", "#1e1b4b", "#172554", "#14532d", "#3f1d38"];
let colorIndex = 0;

if (bgColorBtn) {
  bgColorBtn.addEventListener("click", () => {
    colorIndex = (colorIndex + 1) % bgColors.length;
    document.body.style.backgroundColor = bgColors[colorIndex];
  });
}

const ticketAmountInput = document.getElementById("ticket-amount");
const currencySelect = document.getElementById("currency-select");
const convertBtn = document.getElementById("convert-btn");
const convertedResult = document.getElementById("converted-result");

function convertCurrency() {
  const amount = parseFloat(ticketAmountInput.value);
  const currency = currencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    convertedResult.textContent = "Please enter a valid amount.";
    return;
  }

  let rate = 1;
  if (currency === "MUR") {
    rate = 46.0;
  } else if (currency === "EUR") {
    rate = 0.92;
  } else if (currency === "GBP") {
    rate = 0.79;
  }

  const converted = (amount * rate).toFixed(2);
  convertedResult.textContent = `${converted} ${currency}`;
}

if (convertBtn) {
  convertBtn.addEventListener("click", convertCurrency);
}