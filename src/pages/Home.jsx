import { useState } from "react";
import heroPhoto from "../assets/hero.jpg";
import { Link } from "react-router-dom";
import { EVENTS } from "../data/events.js";
import { formatRupees } from "../utils/storage.js";

const STEPS = [
  ["Choose Event", "Pick the type of event you're planning from our curated categories."],
  ["View Package", "See everything included in the complete event package."],
  ["Customize & Price", "Add optional services and watch your total update instantly."],
  ["Book Event", "Enter your event details and confirm your booking in seconds."],
];

const WHY = [
  ["✓", "Complete Packages", "No hidden surprises — every package clearly lists what's included, upfront."],
  ["₹", "Transparent Pricing", "See your total update live as you customize, with no last-minute charges."],
  ["⚡", "Fast Booking", "Go from browsing to booked in minutes — no calls, no back-and-forth."],
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("");
  const search = query.trim().toLowerCase();
  const visible = EVENTS.filter((event) =>
    [event.title, event.name, event.short].some((text) => text.toLowerCase().includes(search)) &&
    (!budget || event.basePrice <= Number(budget))
  );
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <span className="hero-tag">Full-Service Event Planning</span>
            <h1>Plan Your Perfect Event.<br /><span className="accent">We Take Care of Everything.</span></h1>
            <p>Choose an event package, customize what you need, see the complete price, and book your celebration in a few simple steps.</p>
            <div className="hero-buttons">
              <Link to="/#events" className="btn btn-primary">Explore Event Packages</Link>
              <Link to="/#events" className="btn btn-outline">Book an Event</Link>
            </div>
            <div className="hero-stats">
              <div><strong>10+</strong><span>Event Categories</span></div>
              <div><strong>2,500+</strong><span>Events Delivered</span></div>
              <div><strong>4.8★</strong><span>Average Rating</span></div>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroPhoto} alt="Elegant outdoor event venue with flowers and warm string lights" />
          </div>
        </div>
      </section>

      <section id="how-it-works">
        <div className="container">
          <div className="section-heading">
            <span className="section-tag">Simple Process</span>
            <h2>How EventHub Works</h2>
            <p>From choosing a package to celebrating your event — here's the journey.</p>
          </div>
          <div className="steps-grid">
            {STEPS.map(([title, text], i) => (
              <div className="step-card" key={title}>
                <div className="step-number">{i + 1}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" style={{ background: "var(--light-gray)" }}>
        <div className="container">
          <div className="section-heading">
            <span className="section-tag">Our Packages</span>
            <h2>Choose Your Event</h2>
            <p>Complete, customizable packages for every kind of celebration.</p>
          </div>
          <div className="row g-3 mb-3 package-filters">
            <div className="col-12 col-sm-7">
              <label htmlFor="event-search" className="form-label">Search packages</label>
              <input id="event-search" type="search" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="col-12 col-sm-5">
              <label htmlFor="event-budget" className="form-label">Maximum base price</label>
              <select id="event-budget" className="form-select" value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Any price</option>
                {[10000, 20000, 30000].map((amount) => <option key={amount} value={amount}>{formatRupees(amount)}</option>)}
              </select>
            </div>
          </div>
          <p className="package-results" role="status">{visible.length ? visible.length + " packages found" : "No packages match your search."}</p>
          <div className="events-grid">
            {visible.map((e) => (
              <div className="event-card" key={e.key}>
                <div className="event-card-img"><img loading="lazy" src={e.card} alt={e.title.replace(/^\S+\s/, "")} /></div>
                <div className="event-card-body">
                  <h3>{e.title}</h3>
                  <p>{e.short}</p>
                  <div className="event-price">Starting from <strong>{formatRupees(e.basePrice)}</strong></div>
                  <Link to={`/events/${e.key}`} className="btn btn-secondary btn-block">View Package</Link>
                </div>
              </div>
            ))}
            <div className="event-card custom-request-card">
              <div className="event-card-body custom-request-body">
                <div className="icon-box">✨</div>
                <h3>Have Something Else in Mind?</h3>
                <p>Don't see your event above? Tell us what you're planning and we'll put together a custom package for you.</p>
                <Link to="/custom-request" className="btn btn-primary btn-block">Describe Your Event</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-heading">
            <span className="section-tag">Why EventHub</span>
            <h2>Why Choose Us</h2>
            <p>Everything you need for a stress-free, beautifully planned event.</p>
          </div>
          <div className="why-grid">
            {WHY.map(([icon, title, text]) => (
              <div className="why-card" key={title}>
                <div className="icon-box">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="cta-band">
          <h2>Ready to Plan Your Event?</h2>
          <p>Browse our packages and book your celebration today.</p>
          <Link to="/#events" className="btn btn-outline">Explore Event Packages</Link>
        </div>
      </section>
    </>
  );
}
