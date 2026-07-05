// AOS
AOS.init({
  duration: 600,
  once: true
});

// OPENING VIDEO
const opening = document.getElementById("opening");
const music = document.getElementById("bgMusic");
const btn = document.querySelector(".enter-btn");
const toggleBtn = document.getElementById("musicToggle");


btn.addEventListener("click", () => {
  music?.play();

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => opening.remove()
  });

  // fade ENTER
  tl.to(btn, {
    opacity: 0,
    duration: 0.3
  });

  // subtle fabric ripple before opening
  tl.to(".curtain", {
    skewX: 1.5,
    duration: 0.25,
    yoyo: true,
    repeat: 1
  }, "<");

  // open curtains
  tl.to(".curtain.left", {
    x: "-112%",
    duration: 1.7
  }, "<");

  tl.to(".curtain.right", {
    x: "112%",
    duration: 1.7
  }, "<");

  // soft white light bleed
  tl.to(opening, {
    backgroundColor: "#fff",
    duration: 0.6
  }, "-=0.6");
});
let opened = false;

function openCurtains() {
  if (opened) return;
  opened = true;

  music?.play(); // music play

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => opening.remove()
  });

  tl.to(".enter-btn", { opacity: 0, duration: 0.3 });
  tl.to(".curtain", { skewX: 1.5, duration: 0.25, yoyo: true, repeat: 1 }, "<");
  tl.to(".curtain.left", { x: "-112%", duration: 1.7 }, "<");
  tl.to(".curtain.right", { x: "112%", duration: 1.7 }, "<");
  tl.to("#opening", { backgroundColor: "#fff", duration: 0.6 }, "-=0.6");
}

document.getElementById("openCurtains").onclick = openCurtains;
setTimeout(openCurtains, 1500);

// mobile
let startX = null;

opening.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

opening.addEventListener("touchend", e => {
  if (!startX) return;
  const endX = e.changedTouches[0].clientX;
  if (Math.abs(endX - startX) > 60) openCurtains();
  startX = null;
});

let isPlaying = false;

toggleBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    toggleBtn.innerText = "🔇";
  } else {
    music.play();
    toggleBtn.innerText = "🔊";
  }
  isPlaying = !isPlaying;
});



// COUNTDOWN
const weddingDate = new Date("May 8, 2027 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  document.getElementById("days").innerHTML = Math.floor(diff / (1000 * 60 * 60 * 24)) + "<br>Days";
  document.getElementById("hours").innerHTML = Math.floor((diff / (1000 * 60 * 60)) % 24) + "<br>Hours";
  document.getElementById("minutes").innerHTML = Math.floor((diff / (1000 * 60)) % 60) + "<br>Minutes";
  document.getElementById("seconds").innerHTML = Math.floor((diff / 1000) % 60) + "<br>Seconds";
}, 1000);

// GSAP SECTION ANIMATIONS
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: section
  });
});



// RSVP
document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("response").innerText = result.message;

  if (result.success) form.reset();
});


