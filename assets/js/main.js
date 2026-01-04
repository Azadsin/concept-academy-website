document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  const name = form.querySelector('input[placeholder="Student Name"]').value;
  const studentClass = form.querySelector('input[placeholder^="Class"]').value;
  const subject = form.querySelector("select").value;
  const otherSubject = form.querySelector('input[placeholder^="If Other"]').value;
  const city = form.querySelector('input[placeholder^="City"]').value;
  const school = form.querySelector('input[placeholder^="School"]').value;
  const whatsapp = form.querySelector('#whatsapp').value;
  const help = form.querySelector("textarea").value;

  const message = `
New Academic Guidance Request

Name: ${name}
Class: ${studentClass}
Subject: ${subject || otherSubject || "Not specified"}
City: ${city || "Not specified"}
School: ${school || "Not specified"}
WhatsApp: ${whatsapp}

Requirement:
${help || "Not specified"}
`;

  const encoded = encodeURIComponent(message.trim());
  const phone = "918449994670"; // ✅ YOUR NUMBER

  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
});
