// script.js
function updateCountdown() {
  const timeZone = "Asia/Hong_Kong";

  // Set the start and end dates
  const startDate = new Date("2024-08-10T00:00:00").toLocaleString("en-US", {
    timeZone,
  });
  const endDate = new Date("2024-08-17T00:00:00").toLocaleString("en-US", {
    timeZone,
  });

  // Convert them to Date objects in the specified timezone
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date().toLocaleString("en-US", { timeZone });
  const currentTime = new Date(now);

  // Only update the countdown if the current time is between the start and end dates
  if (currentTime >= start && currentTime <= end) {
    const timeDiff = end - currentTime;

    // Calculate days, hours, minutes, and seconds remaining
    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesRemaining = Math.floor(
      (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById("days").textContent = daysRemaining;
    document.getElementById("hours").textContent = hoursRemaining;
    document.getElementById("minutes").textContent = minutesRemaining;
    document.getElementById("seconds").textContent = secondsRemaining;
  } else if (currentTime > end) {
    // If the countdown has ended, show 0:0:0:0
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    clearInterval(interval); // Stop the timer
  } else {
    // Before the start date, show the initial time (or you could show something else)
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
  }
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);

// script.js
function checkNomination() {
  // Nomination start and end dates
  const startDate = new Date("2024-08-26T00:00:00");
  const endDate = new Date("2024-09-05T23:59:59");

  // Current date
  const currentDate = new Date();

  // Check if nomination has not started
  if (currentDate < startDate) {
    alert("Nomination has not been started.");
  }
  // Check if nomination has ended
  else if (currentDate > endDate) {
    alert("Nomination has ended.");
  }
  // Nomination is active
  else {
    // Redirect to the desired URL
    window.location.href = "https://www.youtube.com/watch?v=qiX_zSzjaTE";
  }
}
