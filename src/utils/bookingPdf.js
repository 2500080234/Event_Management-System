import { formatDate, formatRupees } from "./storage.js";

function wrap(context, value, width) {
  const lines = [];
  let line = "";
  for (const word of String(value ?? "").trim().split(/\s+/)) {
    const combined = line ? line + " " + word : word;
    if (context.measureText(combined).width <= width) {
      line = combined;
      continue;
    }
    if (line) lines.push(line);
    line = "";
    for (const character of word) {
      if (context.measureText(line + character).width > width) {
        lines.push(line);
        line = "";
      }
      line += character;
    }
  }
  lines.push(line || "—");
  return lines;
}

export async function downloadBookingPdf(booking) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ compress: true });
  pdf.setProperties({ title: "EventHub booking " + booking.bookingId });
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1414;
  const context = canvas.getContext("2d");
  let y;

  function startPage() {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#2b1055";
    context.fillRect(0, 0, canvas.width, 175);
    context.fillStyle = "#ffffff";
    context.font = "bold 46px sans-serif";
    context.fillText("EventHub", 65, 78);
    context.font = "29px sans-serif";
    context.fillText("Booking Confirmation", 65, 132);
    y = 245;
  }

  function savePage() {
    pdf.addImage(canvas, "PNG", 0, 0, 210, 297);
  }

  function addRow(label, value) {
    context.font = "30px sans-serif";
    const lines = wrap(context, value, 870);
    for (const [index, line] of lines.entries()) {
      if (y + 104 > 1345) {
        savePage();
        pdf.addPage();
        startPage();
      }
      if (index === 0) {
        context.fillStyle = "#b81a63";
        context.font = "bold 24px sans-serif";
        context.fillText(label, 65, y);
        y += 41;
      }
      context.font = "30px sans-serif";
      context.fillStyle = "#18162b";
      context.fillText(line, 65, y);
      y += 40;
    }
    y += 21;
  }

  startPage();
  const rows = [
    ["Booking ID", booking.bookingId],
    ["Customer", booking.customerName],
    ["Event package", booking.eventName],
    ["Date", formatDate(booking.eventDate)],
    ["Venue", booking.location],
    ["Guests", booking.guests],
    ["Add-ons", booking.addons?.length ? booking.addons.join(", ") : "None"],
    ["Total amount", formatRupees(booking.totalPrice)],
    ["Booking status", booking.status || "Pending"],
  ];
  rows.forEach(([label, value]) => addRow(label, value));
  savePage();
  pdf.save("EventHub-" + booking.bookingId + ".pdf");
}
