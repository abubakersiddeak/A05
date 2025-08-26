// State variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

// DOM elements
const favIcon = document.getElementById("favIcon");
const coinCountElement = document.getElementById("coinCount");
const copyElement = document.getElementById("copy");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// Initialize the application
function init() {
  updateCounts();
  attachEventListeners();
  updateHistoryList(); // Initialize history list display
}

// Update all counts in the UI
function updateCounts() {
  favIcon.textContent = heartCount;
  coinCountElement.textContent = coinCount;
  copyElement.textContent = copyCount;
}

// Attach event listeners to all interactive elements
function attachEventListeners() {
  // Heart buttons
  const heartButtons = document.querySelectorAll(".heart-btn");
  heartButtons.forEach((button) => {
    button.addEventListener("click", handleHeartClick);
  });

  // Copy buttons
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((button) => {
    button.addEventListener("click", handleCopyClick);
  });

  // Call buttons
  const callButtons = document.querySelectorAll(".call-btn");
  callButtons.forEach((button) => {
    button.addEventListener("click", handleCallClick);
  });

  // Clear history button
  clearHistoryBtn.addEventListener("click", clearHistory);
}

// Handle heart button click
function handleHeartClick(event) {
  const heartButton = event.currentTarget;

  // Toggle heart state
  if (heartButton.textContent === "♡") {
    heartButton.textContent = "♥";
    heartButton.style.color = "red";
    heartCount++;
  } else {
    heartButton.textContent = "♡";
    heartButton.style.color = "gray";
    heartCount--;
  }

  updateCounts();
}

// Handle copy button click
function handleCopyClick(event) {
  const card = event.currentTarget.closest(".card");
  const number = card.querySelector("p.text-2xl").textContent;
  const serviceName = card.querySelector("h2").textContent;
  navigator.clipboard.writeText(number);
  alert(`Copied ${serviceName} number: ${number}`);
  copyCount++;
  document.getElementById("copy").innerText = copyCount;
}

// Handle call button click
function handleCallClick(event) {
  if (coinCount < 20) {
    alert(
      "You don't have enough coins to make a call. You need at least 20 coins."
    );
    return;
  }

  const card = event.currentTarget.closest(".card");
  const number = card.querySelector("p.text-2xl").textContent;
  const serviceName = card.querySelector("h2").textContent;

  // Deduct coins
  coinCount -= 20;

  // Add to call history
  const now = new Date();
  const callTime = now.toLocaleTimeString();
  callHistory.push({
    service: serviceName,
    number: number,
    time: callTime,
  });

  // Update UI
  updateCounts();
  updateHistoryList();

  // Show alert
  alert(`Calling ${serviceName} at ${number}`);
}

// Update the call history list
function updateHistoryList() {
  // Clear the current history list
  historyList.innerHTML = "";

  if (callHistory.length === 0) {
    historyList.innerHTML =
      '<li class="text-gray-500 text-center py-4">No call history yet</li>';
    return;
  }

  // Add each history item to the list
  callHistory.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "border-b border-gray-200 py-2";
    listItem.innerHTML = `
     <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <div class="font-medium">${item.service}</div>
                    <div class="text-xs text-gray-500">${item.time}</div>
                </div>
            </div>
            <div class="">${item.number}</div>
            
        `;
    historyList.appendChild(listItem);
  });
}

// Clear call history
function clearHistory() {
  callHistory = [];
  updateHistoryList();
}

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
