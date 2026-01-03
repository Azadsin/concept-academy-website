const citySelect = document.getElementById("city");
const schoolSelect = document.getElementById("school");
const cityOther = document.getElementById("cityOther");
const schoolOther = document.getElementById("schoolOther");

const map = {
  Meerut: ["Meerut Public School"],
  Modinagar: ["Dewan Public School"]
};

function get(k){ return JSON.parse(localStorage.getItem(k)) || {}; }
function set(k,v){ localStorage.setItem(k,JSON.stringify(v)); }

function loadCities(){
  const stored = get("cities");
  [...new Set([...Object.keys(map), ...Object.keys(stored)])]
    .forEach(c => citySelect.add(new Option(c,c)));
  citySelect.add(new Option("Other","Other"));
}

function loadSchools(city){
  schoolSelect.length = 1;
  const stored = get("schools");
  [...(map[city]||[]), ...(stored[city]||[])]
    .forEach(s => schoolSelect.add(new Option(s,s)));
  schoolSelect.add(new Option("Other","Other"));
}

loadCities();

citySelect.onchange = () => {
  cityOther.style.display = citySelect.value==="Other"?"block":"none";
  loadSchools(citySelect.value);
};

schoolSelect.onchange = () => {
  schoolOther.style.display = schoolSelect.value==="Other"?"block":"none";
};

document.getElementById("leadForm").onsubmit = e => {
  e.preventDefault();
  if(citySelect.value==="Other") {
    set("cities",{...get("cities"),[cityOther.value]:1});
  }
  if(schoolSelect.value==="Other"){
    const s=get("schools");
    s[cityOther.value||citySelect.value]=[schoolOther.value];
    set("schools",s);
  }
  window.open("https://wa.me/919690862459");
};

/* ================================================= */
/* 📱 MOBILE ONLY: SCROLL-BASED GLOW (NO DESKTOP)   */
/* ================================================= */

if (window.matchMedia("(max-width: 768px)").matches) {

  const glowCards = document.querySelectorAll(".glow-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("glow-active");
        } else {
          entry.target.classList.remove("glow-active");
        }
      });
    },
    { threshold: 0.6 }
  );

  glowCards.forEach(card => observer.observe(card));
}
