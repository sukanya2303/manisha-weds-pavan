
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
// document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const form = e.target;
//   const data = Object.fromEntries(new FormData(form));

//   const res = await fetch("/api/rsvp", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });

//   const result = await res.json();
//   document.getElementById("response").innerText = result.message;

//   if (result.success) form.reset();
// });


// RSVP form 
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("rsvpForm");
    const response = document.getElementById("response");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const button = form.querySelector("button");
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = "Sending...";

        response.textContent = "";

        try {

            const data = Object.fromEntries(
                new FormData(form).entries()
            );

            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // Check if response is actually JSON
            const contentType = res.headers.get("content-type");

            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(
                    `Server returned ${res.status} instead of JSON`
                );
            }

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.message || "Submission failed"
                );
            }

            response.textContent = result.message;

            form.reset();

        } catch (error) {

            console.error("RSVP ERROR:", error);

            response.textContent =
                error.message || "Something went wrong. Please try again.";

        } finally {

            button.disabled = false;
            button.textContent = originalText;

        }

    });

});

