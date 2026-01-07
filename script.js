const card = document.getElementById("weddingCard");
const scrollContent = document.getElementById("scrollContent");
const video = document.getElementById("openVideo");

let opened = false;

// Click anywhere to start experience
document.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  // Play video
  video.play();

  // ⏱️ Let video play for 6 seconds (change to 5–10 as needed)
  setTimeout(() => {
    video.classList.add("fade-out");
  }, 6000);

  // 💌 Open card AFTER fade
//   setTimeout(() => {
//     card.classList.add("open");
//   }, 7200);

  // ⬇️ Enable scroll & move to content
  setTimeout(() => {
    document.body.style.overflow = "auto";
    scrollContent.classList.add("show");
    scrollContent.scrollIntoView({ behavior: "smooth" });
  }, 8200);
});


// =========================
// COUNTDOWN TIMER
// =========================

const weddingDate = new Date("December 15, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
