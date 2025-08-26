let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];
const favIcon = document.getElementById("favIcon");
const coinCountElement = document.getElementById("coinCount");
const copyElement = document.getElementById("copy");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

function init() {
  updateCounts();
  attachEventListeners();
  updateHistoryList();
}

function updateCounts() {
  favIcon.textContent = heartCount;
  coinCountElement.textContent = coinCount;
  copyElement.textContent = copyCount;
}

function attachEventListeners() {
  const heartButtons = document.querySelectorAll(".heart-btn");
  heartButtons.forEach((button) => {
    button.addEventListener("click", handleHeartClick);
  });

  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((button) => {
    button.addEventListener("click", handleCopyClick);
  });

  const callButtons = document.querySelectorAll(".call-btn");
  callButtons.forEach((button) => {
    button.addEventListener("click", handleCallClick);
  });

  clearHistoryBtn.addEventListener("click", clearHistory);
}

function handleHeartClick(event) {
  const heartButton = event.currentTarget;

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

function handleCopyClick(event) {
  const card = event.currentTarget.closest(".card");
  const number = card.querySelector("p.text-2xl").textContent;
  const serviceName = card.querySelector("h2").textContent;

  navigator.clipboard
    .writeText(number)
    .then(() => {
      alert(`Copied ${serviceName} number: ${number}`);
      copyCount++;
      updateCounts();
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);

      const textArea = document.createElement("textarea");
      textArea.value = number;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert(`Copied ${serviceName} number: ${number}`);
        copyCount++;
        updateCounts();
      } catch (err) {
        alert("Failed to copy number. Please try again.");
      }
      document.body.removeChild(textArea);
    });
}

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

  coinCount -= 20;

  const now = new Date();
  const callTime = now.toLocaleTimeString();
  callHistory.push({
    service: serviceName,
    number: number,
    time: callTime,
  });

  updateCounts();
  updateHistoryList();

  alert(`Calling ${serviceName} at ${number}`);
}

function updateHistoryList() {
  historyList.innerHTML = "";

  if (callHistory.length === 0) {
    historyList.innerHTML =
      '<li class="text-gray-500 text-center py-4">No call history yet</li>';
    return;
  }

  callHistory.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "border-b border-gray-200 py-2";
    listItem.innerHTML = `
            <div class="font-medium">${item.service}</div>
            <div class="text-green-600">${item.number}</div>
            <div class="text-xs text-gray-500">${item.time}</div>
        `;
    historyList.appendChild(listItem);
  });
}

function clearHistory() {
  callHistory = [];
  updateHistoryList();
}

document.addEventListener("DOMContentLoaded", init);
