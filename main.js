/* ================= BASIC ELEMENTS ================= */

const whatsappFloat = document.getElementById("whatsappFloat");
const academyNumber = whatsappFloat.dataset.number;

const form = document.getElementById("leadForm");

const nameInput = document.getElementById("name");
const classInput = document.getElementById("class");
const subjectInput = document.getElementById("subject");
const phoneInput = document.getElementById("phone");

const citySelect = document.getElementById("city");
const schoolSelect = document.getElementById("school");
const cityOther = document.getElementById("cityOther");
const schoolOther = document.getElementById("schoolOther");

/* ================= STATIC DATA ================= */

const citySchoolMap = {
  Meerut: ["Meerut Public School", "Delhi Public School Meerut"],
  Modinagar: ["Dewan Public School", "St. Mary's Academy"],
  Ghaziabad: ["Ryan International School", "DPS Ghaziabad"]
};

/* ================= STORAGE HELPERS ================= */

function getStore(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}

function setStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ================= LOAD CITIES ================= */

function loadCities() {
  const stored = getStore("cities");
  const cities = new Set([
    ...Object.keys(citySchoolMap),
    ...Object.keys(stored)
  ]);

  cities.forEach(city => {
    if (![...citySelect.options].some(o => o.value === city)) {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    }
  });

  if (![...citySelect.options].some(o => o.value === "Other")) {
    const other = document.createElement("option");
    other.value = "Other";
    other.textContent = "Other";
    citySelect.appendChild(other);
  }
}

/* ================= LOAD SCHOOLS ================= */

function loadSchools(city) {
  schoolSelect.length = 1; // keep placeholder

  const stored = getStore("schools");
  const schools = [
    ...(citySchoolMap[city] || []),
    ...(stored[city] || [])
  ];

  schools.forEach(school => {
    const opt = document.createElement("option");
    opt.value = school;
    opt.textContent = school;
    schoolSelect.appendChild(opt);
  });

  const other = document.createElement("option");
  other.value = "Other";
  other.textContent = "Other";
  schoolSelect.appendChild(other);
}

/* ================= INIT ================= */

loadCities();

/* ================= EVENTS ================= */

citySelect.addEventListener("change", () => {
  cityOther.style.display = citySelect.value === "Other" ? "block" : "none";
  schoolOther.style.display = "none";

  if (citySelect.value && citySelect.value !== "Other") {
    loadSchools(citySelect.value);
  }
});

schoolSelect.addEventListener("change", () => {
  schoolOther.style.display = schoolSelect.value === "Other" ? "block" : "none";
});

/* ================= FLOATING WHATSAPP ================= */

const baseMessage = encodeURIComponent(
  "Hello Concept Academy. I want academic guidance."
);

whatsappFloat.href = `https://wa.me/${academyNumber}?text=${baseMessage}`;

/* ================= FORM SUBMIT ================= */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let city = citySelect.value;
  let school = schoolSelect.value;

  if (city === "Other" && cityOther.value.trim()) {
    city = cityOther.value.trim();
    const cities = getStore("cities");
    cities[city] = true;
    setStore("cities", cities);
  }

  if (school === "Other" && schoolOther.value.trim()) {
    school = schoolOther.value.trim();
    const schools = getStore("schools");
    if (!schools[city]) schools[city] = [];
    schools[city].push(school);
    setStore("schools", schools);
  }

  const message = encodeURIComponent(
    `Hello Concept Academy. 
Student Name: ${nameInput.value}. 
Class: ${classInput.value}. 
City: ${city}. 
School: ${school}. 
Subject: ${subjectInput.value}. 
Contact: ${phoneInput.value}.`
  );

  window.open(`https://wa.me/${academyNumber}?text=${message}`, "_blank");
  form.reset();
});

/* ================= SCROLL REVEAL ================= */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => revealObserver.observe(el));
