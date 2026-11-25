import photo0 from "../assets/birthday.jpg";
import photo1 from "../assets/wedding.jpg";
import photo2 from "../assets/engagement.jpg";
import photo3 from "../assets/anniversary.jpg";
import photo4 from "../assets/college-event.jpg";
import photo5 from "../assets/corporate.jpg";
import photo6 from "../assets/house-party.jpg";
import photo7 from "../assets/retirement.jpg";
import photo8 from "../assets/festival.jpg";

// Event packages: base price, included items and optional add-ons.
// To change a price or add an event, edit this file only.
export const EVENTS = [
  {
    "key": "birthday",
    "title": "🎂 Birthday Party",
    "name": "Birthday Celebration Package",
    "short": "Complete birthday setup with cake, balloons, decorations and party supplies.",
    "desc": "Perfect for a memorable birthday celebration for up to 20 guests.",
    "basePrice": 5849,
    "card": photo0,
    "banner": photo0,
    "included": [
      "1 kg Birthday Cake",
      "50 Balloons",
      "Birthday Candles",
      "20 Party Caps",
      "Birthday Banner",
      "Table Decoration",
      "Room Decoration",
      "Music & Speaker",
      "20 Return Gifts",
      "Basic Photography"
    ],
    "addons": [
      {
        "id": "birthday-1",
        "label": "Premium 2 kg Cake",
        "price": 800
      },
      {
        "id": "birthday-2",
        "label": "Extra 25 Balloons",
        "price": 500
      },
      {
        "id": "birthday-3",
        "label": "Photographer – 2 Hours",
        "price": 1500
      },
      {
        "id": "birthday-4",
        "label": "Premium Decoration",
        "price": 1000
      },
      {
        "id": "birthday-5",
        "label": "Extra 10 Return Gifts",
        "price": 600
      }
    ]
  },
  {
    "key": "wedding",
    "title": "💍 Wedding",
    "name": "Wedding Package",
    "short": "Complete wedding decoration, stage, seating and hospitality.",
    "desc": "A complete wedding setup covering stage, seating, décor and dining for your special day.",
    "basePrice": 32499,
    "card": photo1,
    "banner": photo1,
    "included": [
      "Wedding Stage Decoration",
      "Floral Backdrop",
      "Bride & Groom Seating",
      "200 Guest Chairs",
      "Dining Tables",
      "Welcome Board",
      "Basic Sound System",
      "Entrance Decoration",
      "Wedding Cake",
      "Basic Photography"
    ],
    "addons": [
      {
        "id": "wedding-1",
        "label": "Premium Floral Decoration",
        "price": 8000
      },
      {
        "id": "wedding-2",
        "label": "DJ & Sound Upgrade",
        "price": 5000
      },
      {
        "id": "wedding-3",
        "label": "Professional Photography",
        "price": 7000
      },
      {
        "id": "wedding-4",
        "label": "LED Stage Upgrade",
        "price": 6000
      },
      {
        "id": "wedding-5",
        "label": "Extra Catering",
        "price": 7500
      }
    ]
  },
  {
    "key": "engagement",
    "title": "💐 Engagement",
    "name": "Engagement Package",
    "short": "Elegant ring ceremony setup with floral décor and seating for guests.",
    "desc": "A beautifully decorated ring ceremony setup for you and your loved ones.",
    "basePrice": 12999,
    "card": photo2,
    "banner": photo2,
    "included": [
      "Stage & Ring Backdrop",
      "Fresh Flower Decoration",
      "Bride & Groom Chairs",
      "100 Guest Chairs",
      "Welcome Board",
      "Ring Ceremony Table",
      "Basic Sound System",
      "Cake",
      "Bouquet Set",
      "Basic Photography"
    ],
    "addons": [
      {
        "id": "engagement-1",
        "label": "Premium Floral Theme",
        "price": 3000
      },
      {
        "id": "engagement-2",
        "label": "Professional Photography",
        "price": 4000
      },
      {
        "id": "engagement-3",
        "label": "DJ Setup",
        "price": 2500
      },
      {
        "id": "engagement-4",
        "label": "LED Backdrop",
        "price": 2500
      }
    ]
  },
  {
    "key": "anniversary",
    "title": "💑 Anniversary",
    "name": "Anniversary Celebration Package",
    "short": "Romantic anniversary celebration with cake, décor and photography.",
    "desc": "A romantic setup to celebrate another wonderful year together.",
    "basePrice": 6499,
    "card": photo3,
    "banner": photo3,
    "included": [
      "1 kg Anniversary Cake",
      "Rose Flower Decoration",
      "50 Balloons",
      "Candle Setup",
      "Couple Table Decoration",
      "Romantic Backdrop",
      "Music Speaker",
      "Table Candles",
      "Bouquet",
      "Basic Photography"
    ],
    "addons": [
      {
        "id": "anniversary-1",
        "label": "Premium Cake",
        "price": 700
      },
      {
        "id": "anniversary-2",
        "label": "Extra Flower Decoration",
        "price": 1200
      },
      {
        "id": "anniversary-3",
        "label": "Photographer",
        "price": 1500
      },
      {
        "id": "anniversary-4",
        "label": "Dinner Setup",
        "price": 2000
      },
      {
        "id": "anniversary-5",
        "label": "Premium Backdrop",
        "price": 1000
      }
    ]
  },
  {
    "key": "college-event",
    "title": "🎓 College Event",
    "name": "College Event Package",
    "short": "Complete stage, sound and seating setup for fests and college functions.",
    "desc": "Complete stage, sound and seating setup for college fests and functions, for up to 300 attendees.",
    "basePrice": 16249,
    "card": photo4,
    "banner": photo4,
    "included": [
      "Main Stage Setup",
      "Stage Backdrop",
      "Sound System",
      "Basic Lighting",
      "300 Chairs",
      "Event Banner",
      "Registration Desk",
      "2 Microphones",
      "Green Room Setup",
      "Event Support Staff"
    ],
    "addons": [
      {
        "id": "college-event-1",
        "label": "DJ Setup",
        "price": 5000
      },
      {
        "id": "college-event-2",
        "label": "LED Wall",
        "price": 7000
      },
      {
        "id": "college-event-3",
        "label": "Professional Photography",
        "price": 3000
      },
      {
        "id": "college-event-4",
        "label": "Extra 100 Chairs",
        "price": 2500
      },
      {
        "id": "college-event-5",
        "label": "Live Streaming",
        "price": 4000
      }
    ]
  },
  {
    "key": "corporate",
    "title": "💼 Corporate Event",
    "name": "Corporate Event Package",
    "short": "Professional stage, AV setup and hospitality for business events.",
    "desc": "A professional setup for conferences, product launches and business gatherings, for up to 100 guests.",
    "basePrice": 22749,
    "card": photo5,
    "banner": photo5,
    "included": [
      "Stage & Podium",
      "Corporate Backdrop",
      "Projector & Screen",
      "100 Guest Chairs",
      "Registration Desk",
      "PA Sound System",
      "Name Badges",
      "Welcome Signage",
      "Tea & Snacks for 50",
      "Event Coordinator"
    ],
    "addons": [
      {
        "id": "corporate-1",
        "label": "LED Wall",
        "price": 7000
      },
      {
        "id": "corporate-2",
        "label": "Extra 50 Guests",
        "price": 6000
      },
      {
        "id": "corporate-3",
        "label": "Professional Photography",
        "price": 3500
      },
      {
        "id": "corporate-4",
        "label": "Lunch Catering",
        "price": 7500
      },
      {
        "id": "corporate-5",
        "label": "Live Streaming",
        "price": 5000
      }
    ]
  },
  {
    "key": "house-party",
    "title": "🏠 House Party",
    "name": "House Party Package",
    "short": "Fun, cozy home celebration setup with music, snacks and décor.",
    "desc": "A fun, cozy celebration setup for your home, for up to 20 guests.",
    "basePrice": 5199,
    "card": photo6,
    "banner": photo6,
    "included": [
      "Balloon Decoration",
      "Party Banner",
      "LED String Lights",
      "Music Speaker",
      "Party Caps",
      "Disposable Plates & Cups",
      "Party Games",
      "Snacks for 20",
      "Cake",
      "Photo Booth Props"
    ],
    "addons": [
      {
        "id": "house-party-1",
        "label": "Extra 25 Guests",
        "price": 1800
      },
      {
        "id": "house-party-2",
        "label": "Premium Cake",
        "price": 700
      },
      {
        "id": "house-party-3",
        "label": "DJ Setup",
        "price": 2500
      },
      {
        "id": "house-party-4",
        "label": "Extra Decoration",
        "price": 1000
      },
      {
        "id": "house-party-5",
        "label": "Photographer",
        "price": 1200
      }
    ]
  },
  {
    "key": "retirement",
    "title": "🎗️ Retirement Party",
    "name": "Retirement Party Package",
    "short": "A warm farewell celebration with tribute display and refreshments.",
    "desc": "A warm farewell celebration with a tribute display, for up to 100 guests.",
    "basePrice": 9749,
    "card": photo7,
    "banner": photo7,
    "included": [
      "Stage Decoration",
      "Retirement Banner",
      "Welcome Board",
      "100 Chairs",
      "Cake",
      "Tribute Photo Display",
      "Sound System",
      "Bouquet",
      "Snacks for 50",
      "Basic Photography"
    ],
    "addons": [
      {
        "id": "retirement-1",
        "label": "Premium Stage",
        "price": 2500
      },
      {
        "id": "retirement-2",
        "label": "Professional Photography",
        "price": 2000
      },
      {
        "id": "retirement-3",
        "label": "Lunch Catering",
        "price": 4000
      },
      {
        "id": "retirement-4",
        "label": "LED Photo Wall",
        "price": 2500
      },
      {
        "id": "retirement-5",
        "label": "Extra 50 Chairs",
        "price": 1500
      }
    ]
  },
  {
    "key": "festival",
    "title": "🎇 Festival Celebration",
    "name": "Festival Celebration Package",
    "short": "Vibrant festival-themed setup with lighting, stage and food counters.",
    "desc": "A vibrant, festive setup with lighting, stage and food counters, for up to 100 guests.",
    "basePrice": 11699,
    "card": photo8,
    "banner": photo8,
    "included": [
      "Festival Theme Decoration",
      "Lighting Setup",
      "Stage Setup",
      "Sound System",
      "100 Chairs",
      "Entrance Decoration",
      "Food Counter Setup",
      "Welcome Banner",
      "Cultural Props",
      "Event Support Staff"
    ],
    "addons": [
      {
        "id": "festival-1",
        "label": "DJ Setup",
        "price": 3000
      },
      {
        "id": "festival-2",
        "label": "LED Wall",
        "price": 5000
      },
      {
        "id": "festival-3",
        "label": "Extra 100 Chairs",
        "price": 2500
      },
      {
        "id": "festival-4",
        "label": "Food Catering for 50",
        "price": 6000
      },
      {
        "id": "festival-5",
        "label": "Premium Lighting",
        "price": 2500
      }
    ]
  }
];

export const getEvent = (key) => EVENTS.find((e) => e.key === key);
