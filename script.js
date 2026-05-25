const navMenu = document.querySelector("#navMenu");
const menuToggle = document.querySelector(".menu-toggle");
const scrollTopButton = document.querySelector("#scrollTop");
const toast = document.querySelector("#toast");
const estimateForm = document.querySelector("#estimateForm");
const contactForm = document.querySelector("#contactForm");
const formError = document.querySelector("#formError");

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
};

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

window.addEventListener("scroll", () => {
  scrollTopButton.classList.toggle("visible", window.scrollY > 650);
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const validateForm = (form) => {
  const invalidField = [...form.elements].find((field) => {
    return field.willValidate && !field.checkValidity();
  });

  if (invalidField) {
    invalidField.focus();
    return false;
  }

  return true;
};

estimateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  if (!validateForm(estimateForm)) {
    formError.textContent = "Please complete all required fields with valid details.";
    return;
  }

  estimateForm.reset();
  showToast("Booking request submitted. Move It will contact you shortly.");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm(contactForm)) {
    showToast("Please fill the contact form correctly.");
    return;
  }

  contactForm.reset();
  showToast("Message sent. Thanks for contacting Move It.");
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    document.querySelectorAll(".faq-list details").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.removeAttribute("open");
      }
    });
  });
});
