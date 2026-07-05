window.addEventListener("load", () => {

  const tl = gsap.timeline();

  tl.to(".website-content", {
    opacity: 1,
    duration: 0.2
  });

  tl.to(".curtain-left", {
    x: "-100%",
    duration: 2,
    ease: "power4.inOut"
  }, 0);

  tl.to(".curtain-right", {
    x: "100%",
    duration: 2,
    ease: "power4.inOut"
  }, 0);

  tl.to(".curtain-shadow", {
    opacity: 0,
    duration: 1
  }, 0);

  tl.to(".curtain-wrapper", {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.5
  });

  gsap.to(".curtain-left", {
  skewY: 1,
  repeat: -1,
  yoyo: true,
  duration: 2
});

gsap.to(".curtain-right", {
  skewY: -1,
  repeat: -1,
  yoyo: true,
  duration: 2
});



});