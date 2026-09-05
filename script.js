document.addEventListener("DOMContentLoaded", () => {
  const navLinks = [...document.querySelectorAll(".nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Smooth navigation
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Highlight the section currently visible on screen.
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));

  // Small reveal animation for cards.
  const cards = document.querySelectorAll(
    ".summary-card, .skill, .project-card, .simple-card"
  );

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(8px)";
    card.style.transition = "opacity .45s ease, transform .45s ease";
  });

  const cardObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        cardObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  cards.forEach(card => cardObserver.observe(card));
});
