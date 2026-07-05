// =============================
// AOS
// =============================
AOS.init({
  duration: 600,
  once: true
});

console.log("script loaded");
// =============================
// INTRO VIDEO
// =============================
const intro = document.getElementById("introVideo");
const video = document.getElementById("weddingVideo");
const tapText = document.getElementById("tapText");
const hero = document.querySelector(".hero");

if (intro && video && tapText && hero) {
  let started = false;

  intro.addEventListener("click", () => {
    if (started) return;
    started = true;

    gsap.to(tapText, {
      opacity: 0,
      duration: 0.5
    });

    video.play();
  });

  video.addEventListener("ended", () => {
    gsap.timeline()
      .to("#introVideo", {
        opacity: 0,
        duration: 1
      })
      .set("#introVideo", {
        display: "none"
      })
      .to(".hero", {
        opacity: 1,
        duration: 1.2
      });
  });
}

// =============================
// GSAP SECTION ANIMATIONS
// =============================
if (typeof gsap !== "undefined") {
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%"
      }
    });
  });
}

// =============================
// RSVP FORM
// =============================
const rsvpForm = document.getElementById("rsvpForm");

console.log("Form:", rsvpForm);

if (rsvpForm) {

  console.log("RSVP form found");

  rsvpForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("Submit intercepted");

    const responseText = document.getElementById("response");

    try {

      const formData = Object.fromEntries(new FormData(rsvpForm));

      console.log(formData);

      responseText.innerText = "Sending...";

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      console.log("Status:", res.status);

      const result = await res.json();

      console.log(result);

      responseText.innerText = result.message;

      if (result.success) {
        rsvpForm.reset();
      }

    } catch (err) {
      console.error(err);
      responseText.innerText = "Something went wrong. Please try again.";
    }

  });

}