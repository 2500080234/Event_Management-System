import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

const CARDS = [
  ["🎯 Our Mission", "To make event planning simple, transparent and stress-free by offering complete, customizable packages with upfront pricing — so anyone can plan a memorable celebration without the usual hassle of coordinating multiple vendors."],
  ["📦 What We Provide", "Ready-made packages for birthdays, weddings, engagements, anniversaries, college fests, corporate events, house parties, retirements and festivals — each with decoration, catering essentials, sound, photography and more."],
  ["⭐ Why Choose EventHub", "Transparent, all-inclusive pricing with live cost updates as you customize, a wide range of event categories, a simple booking flow, and packages designed by people who understand what makes an event special."],
  ["🔄 How It Works", "Choose your event type, review what's included in the package, customize it with optional add-ons, watch the total price update automatically, then enter your event details and confirm your booking — all in a few minutes."],
];

export default function About() {
  return (
    <>
      <PageHero title="About EventHub">Getting to know the platform that plans your celebrations, end to end.</PageHero>
      <section>
        <div className="container">
          <div className="section-heading" style={{ textAlign: "left", margin: "0 0 24px", maxWidth: "none" }}>
            <span className="section-tag">What Is EventHub?</span>
            <h2>An Event Planning &amp; Booking Platform</h2>
            <p style={{ maxWidth: 760 }}>EventHub is an event planning and booking platform that helps customers choose complete event packages and customize them according to their requirements. Instead of arranging decorators, caterers and photographers separately, customers pick a ready-made package, add the extra services they want, see the final price instantly, and book everything in one place.</p>
          </div>
          <div className="about-grid">
            {CARDS.map(([title, text]) => (
              <div className="about-card" key={title}><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="cta-band">
          <h2>Ready to Start Planning?</h2>
          <p>Explore our event packages and find the perfect fit for your celebration.</p>
          <Link to="/#events" className="btn btn-outline">Explore Event Packages</Link>
        </div>
      </section>
    </>
  );
}
