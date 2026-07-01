// =============================================================================
//  Trip content — everything here is data, not logic.
//  To add a new idea, copy an entry in SEED_ACTIVITIES. To change the starting
//  calendar, edit SEED_ENTRIES (activityId must match an id in SEED_ACTIVITIES).
// =============================================================================

import type { ActivityIdea, CalendarEntry } from './types'

export const TRIP_START = '2026-07-04'
export const TRIP_END = '2026-08-13'

export const WELCOME_NAMES = { dad: 'Naser', mom: 'Reem' }

// Alaa is away in Jordan and his brothers host Naser & Reem during this window.
export const JORDAN_TRIP_START = '2026-07-23'
export const JORDAN_TRIP_END = '2026-08-03'

// -----------------------------------------------------------------------------
//  Activity library — the "short list" of things to do.
// -----------------------------------------------------------------------------

export const SEED_ACTIVITIES: ActivityIdea[] = [
  // ----- This trip -----
  {
    id: 'arrival-welcome',
    title: 'Arrival Day & Welcome Dinner',
    emoji: '🏠',
    category: 'home',
    description: "Naser & Reem land in Richmond! Keep it soft — get settled, shower, rest, and share a relaxed welcome dinner at home.",
  },
  {
    id: 'farewell-dinner',
    title: 'Farewell Dinner',
    emoji: '🥲',
    category: 'home',
    description: 'One last meal together before the goodbyes — a favorite restaurant repeat, or a home-cooked classic.',
  },

  // ----- Big trips & weekend getaways -----
  {
    id: 'williamsburg',
    title: 'Colonial Williamsburg, Jamestown & Yorktown',
    emoji: '🏛️',
    category: 'big-trip',
    description: "Step into \"old America\" — colonial trades, tall ships, and the spot where the nation began. A great overnight for Naser's first taste of US history.",
    tags: ['overnight'],
    firstVisitHighlight: true,
  },
  {
    id: 'virginia-beach-norfolk',
    title: 'Virginia Beach & Norfolk',
    emoji: '🏖️',
    category: 'big-trip',
    description: 'Boardwalk mornings, fresh seafood, and the Battleship Wisconsin at Nauticus — an easy, beautiful overnight by the water.',
    tags: ['overnight'],
  },
  {
    id: 'charlottesville-monticello',
    title: 'Charlottesville, UVA & Monticello',
    emoji: '🍇',
    category: 'big-trip',
    description: "Jefferson's mountaintop home, a historic university, and a charming Downtown Mall — a relaxed, scenic day.",
  },
  {
    id: 'shenandoah-skyline',
    title: 'Shenandoah National Park & Skyline Drive',
    emoji: '🏞️',
    category: 'big-trip',
    description: 'Mountain overlooks, wildflowers, and easy scenic stops along a 105-mile ridge-top drive — no real hiking required.',
    easyPace: true,
  },
  {
    id: 'longwood-gardens',
    title: 'Longwood Gardens (Pennsylvania)',
    emoji: '⛲',
    category: 'big-trip',
    description: 'The most spectacular botanical garden within reach — grand conservatories, fountains, and an evening illuminated fountain show. Worth a comfortable overnight.',
    tags: ['overnight'],
  },
  {
    id: 'dc-alexandria',
    title: 'Washington, D.C. & Old Town Alexandria',
    emoji: '🏙️',
    category: 'big-trip',
    description: 'The National Mall, the monuments, and a free Smithsonian museum, then a stroll through historic Alexandria.',
    firstVisitHighlight: true,
  },
  {
    id: 'annapolis',
    title: 'Annapolis, Maryland',
    emoji: '⛵',
    category: 'big-trip',
    description: 'A pretty waterfront city with historic streets and boats — a gentler alternative to a full D.C. day.',
    easyPace: true,
  },
  {
    id: 'natural-bridge-lexington',
    title: 'Natural Bridge & Lexington',
    emoji: '🌉',
    category: 'big-trip',
    description: 'Dramatic natural scenery and a classic small Virginia town, with a scenic Blue Ridge drive.',
  },

  // ----- Gardens -----
  {
    id: 'lewis-ginter',
    title: 'Lewis Ginter Botanical Garden',
    emoji: '🌺',
    category: 'garden',
    description: "Richmond's own garden, recently doubled in size — a domed conservatory, butterflies, and (on select Thursdays) evening hours with live music.",
    easyPace: true,
  },
  {
    id: 'maymont',
    title: 'Maymont',
    emoji: '🦢',
    category: 'garden',
    description: 'A free Richmond estate with a Japanese garden, Italian garden, and wildlife — easy, beautiful, and close to home.',
    easyPace: true,
  },
  {
    id: 'norfolk-botanical-garden',
    title: 'Norfolk Botanical Garden',
    emoji: '🌷',
    category: 'garden',
    description: '60+ themed gardens that pair perfectly with a Virginia Beach weekend morning.',
    easyPace: true,
  },
  {
    id: 'us-botanic-garden',
    title: 'U.S. Botanic Garden (Washington, D.C.)',
    emoji: '🌴',
    category: 'garden',
    description: "The free conservatory from your first US trip — worth revisiting and showing Naser, paired with a D.C. day.",
    easyPace: true,
    firstVisitHighlight: true,
  },

  // ----- Food experiences -----
  {
    id: 'hot-pot-757',
    title: 'Hot Pot 757',
    emoji: '🍲',
    category: 'food',
    description: 'An interactive all-you-can-eat hot pot & Korean BBQ night — everyone cooks together at the table.',
  },
  {
    id: 'texas-de-brazil',
    title: 'Texas de Brazil',
    emoji: '🥩',
    category: 'food',
    description: "A Brazilian steakhouse rodízio — tableside carved meats and a big salad bar. A true \"never had this before\" experience.",
    firstVisitHighlight: true,
  },
  {
    id: 'hibachi-night',
    title: 'Hibachi / Teppanyaki Dinner',
    emoji: '🔥',
    category: 'food',
    description: 'A chef cooking tableside with fire, knife tricks, and jokes — pure dinner theater.',
  },
  {
    id: 'prince-tea-house',
    title: 'Prince Tea House',
    emoji: '🍵',
    category: 'food',
    description: 'A pretty Asian-European fusion tea & dessert spot — lovely for a relaxed, photogenic outing.',
    easyPace: true,
  },
  {
    id: 'sweet-treat-dessert',
    title: 'Sweet Treat Dessert Night',
    emoji: '🍨',
    category: 'food',
    description: 'Dinner at home, then out just for ice cream, crepes, and espresso — open late in Carytown.',
  },

  // ----- Home & family -----
  {
    id: 'rest-night',
    title: 'Rest & Home Dinner Night',
    emoji: '🏡',
    category: 'home',
    description: 'No plans — just a relaxed dinner and an early evening at home. After six weeks together, downtime matters too.',
  },
  {
    id: 'movie-theater-night',
    title: 'Movie Night in the Home Theater',
    emoji: '🍿',
    category: 'home',
    description: 'Popcorn, blankets, lights off — pick one American classic and one family favorite.',
  },
  {
    id: 'world-cup-watch-party',
    title: 'World Cup Final Watch Party',
    emoji: '⚽',
    category: 'home',
    description: 'The 2026 World Cup Final, July 19 at 3pm ET — invite friends, make snacks, and watch it together in the theater.',
  },
  {
    id: 'bbq-night',
    title: 'Backyard BBQ Night',
    emoji: '🍔',
    category: 'home',
    description: 'Halal burgers, corn, watermelon, and lemonade — the classic American backyard summer, made at home.',
    firstVisitHighlight: true,
  },
  {
    id: 'friends-potluck',
    title: 'Friends Potluck Night',
    emoji: '🍽️',
    category: 'home',
    description: 'Invite close friends, everyone brings a dish — an easy way for Naser & Reem to meet the community here.',
  },
  {
    id: 'snack-tasting-night',
    title: 'American Snack Tasting Night',
    emoji: '🍬',
    category: 'home',
    description: 'Grab a pile of random American snacks and let everyone rate them — silly, and surprisingly memorable.',
  },
  {
    id: 'cooking-exchange-night',
    title: 'Cooking Exchange Night',
    emoji: '👩‍🍳',
    category: 'home',
    description: 'Reem cooks a dish from home, the family cooks something American, friends bring dessert — and you take pictures.',
  },
  {
    id: 'ping-pong-tournament',
    title: 'Ping Pong Tournament',
    emoji: '🏓',
    category: 'home',
    description: 'A lighthearted family bracket, brunch, and a movie to close the day — bragging rights on the line.',
  },
  {
    id: 'family-photo-night',
    title: 'Family Photo Evening',
    emoji: '📸',
    category: 'home',
    description: 'A relaxed evening set aside just for taking pictures together before the visit wraps up.',
  },

  // ----- Local Richmond -----
  {
    id: 'carytown-walk',
    title: 'Carytown Stroll',
    emoji: '🛍️',
    category: 'local',
    description: "Richmond's favorite walkable shopping strip, full of boutiques, dessert spots, and the Byrd Theatre marquee.",
  },
  {
    id: 'short-pump',
    title: 'Short Pump Town Center',
    emoji: '🛒',
    category: 'local',
    description: "An easy evening of shopping and dinner options, including Texas de Brazil's happy hour.",
  },
  {
    id: 'james-river-belle-isle',
    title: 'Belle Isle & the James River',
    emoji: '🌅',
    category: 'local',
    description: 'A scenic riverside walk with skyline views — lovely at sunset.',
    easyPace: true,
  },
  {
    id: 'hollywood-cemetery',
    title: 'Hollywood Cemetery',
    emoji: '🌳',
    category: 'local',
    description: 'A peaceful, beautiful 135-acre garden cemetery overlooking the James — history and views in one easy walk.',
    easyPace: true,
  },
  {
    id: 'river-city-roll',
    title: 'River City Roll (Bowling)',
    emoji: '🎳',
    category: 'local',
    description: 'Bowling, food, and a social night out with friends.',
  },
  {
    id: 'monster-mini-golf',
    title: 'Monster Mini Golf',
    emoji: '⛳',
    category: 'local',
    description: 'Glow-in-the-dark indoor mini golf — a fun backup for a hot or rainy evening.',
  },
  {
    id: 'american-store-night',
    title: "Costco / Target / Trader Joe's Night",
    emoji: '🛒',
    category: 'local',
    description: 'A browse-everything American grocery-store experience — surprisingly fun for first-time visitors.',
    firstVisitHighlight: true,
  },
  {
    id: 'byrd-theatre',
    title: 'Byrd Theatre, Carytown',
    emoji: '🎬',
    category: 'local',
    description: 'A historic 1928 cinema with its mighty Wurlitzer organ playing before the show — a true Richmond classic.',
    firstVisitHighlight: true,
  },
  {
    id: 'shopping-gifts-night',
    title: 'Shopping & Gifts Night',
    emoji: '🎁',
    category: 'local',
    description: 'Short Pump, outlets, or wherever catches their eye — a relaxed evening picking up gifts to take home.',
  },
  {
    id: 'ashland-fourth-fridays',
    title: 'Ashland Fourth Fridays',
    emoji: '🚂',
    category: 'local',
    description: 'A small-town evening walk with food and music in historic Ashland — easy for the brothers to host.',
  },

  // ----- Dated events -----
  {
    id: 'richmond-night-market',
    title: 'Richmond Night Market',
    emoji: '🎪',
    category: 'event',
    description: 'Vendors, live music, and food at 17th Street Market, every 2nd Saturday — easy and local.',
    easyPace: true,
  },
  {
    id: 'dragon-boat-festival',
    title: 'Richmond Dragon Boat Festival',
    emoji: '🐉',
    category: 'event',
    description: 'Dragon boat races on the river at Robious Landing Park — colorful, unique, and family-friendly.',
  },
  {
    id: 'carytown-watermelon-festival',
    title: 'Carytown Watermelon Festival',
    emoji: '🍉',
    category: 'event',
    description: "Richmond's biggest local festival — music, shopping, food, and free admission, right in Carytown.",
    easyPace: true,
  },
  {
    id: 'lewis-ginter-flowers-after-5',
    title: 'Lewis Ginter: Flowers After 5',
    emoji: '🌙',
    category: 'event',
    description: 'Select Thursday evenings with the garden open until 9pm and live music — the easiest beautiful evening of the trip.',
    easyPace: true,
  },
  {
    id: 'lewis-ginter-concert',
    title: 'Lewis Ginter Garden Concert',
    emoji: '🎸',
    category: 'event',
    description: 'An outdoor evening concert in the garden (doors around 6pm) — bring a blanket and relax under the trees.',
    easyPace: true,
  },
  {
    id: 'richmond-jazz-festival',
    title: 'Richmond Jazz & Music Festival (Maymont)',
    emoji: '🎷',
    category: 'event',
    description: "A premier East Coast jazz, funk, and soul festival in Maymont's historic setting.",
  },
  {
    id: 'festival-of-racing',
    title: 'Festival of Racing, Colonial Downs',
    emoji: '🐎',
    category: 'event',
    description: 'Free general admission horse racing with live entertainment — a different kind of American afternoon.',
  },
]

// -----------------------------------------------------------------------------
//  Starting calendar — the recommended itinerary, fully editable afterward.
// -----------------------------------------------------------------------------

function entry(date: string, activityId: string, note?: string): CalendarEntry {
  return { id: `e-${date}-${activityId}`, activityId, date, note }
}

export const SEED_ENTRIES: CalendarEntry[] = [
  entry('2026-07-04', 'arrival-welcome'),
  entry('2026-07-05', 'lewis-ginter'),
  entry('2026-07-05', 'carytown-walk', 'Evening walk + dessert.'),

  entry('2026-07-06', 'rest-night'),
  entry('2026-07-07', 'hot-pot-757'),
  entry('2026-07-08', 'movie-theater-night'),
  entry('2026-07-09', 'short-pump'),

  entry('2026-07-10', 'rest-night', 'Easy dinner at home, pack lightly for Williamsburg.'),
  entry('2026-07-11', 'williamsburg', 'Day 1: Colonial Williamsburg + Merchant Square.'),
  entry('2026-07-12', 'williamsburg', 'Day 2: Jamestown Settlement + Yorktown waterfront, then home.'),

  entry('2026-07-13', 'rest-night'),
  entry('2026-07-14', 'texas-de-brazil'),
  entry('2026-07-15', 'snack-tasting-night'),
  entry('2026-07-16', 'lewis-ginter-flowers-after-5'),

  entry('2026-07-17', 'rest-night', 'Easy evening before Virginia Beach.'),
  entry('2026-07-18', 'norfolk-botanical-garden', 'Saturday morning, before the beach.'),
  entry('2026-07-18', 'virginia-beach-norfolk', 'Day 1: Virginia Beach boardwalk + beach.'),
  entry('2026-07-19', 'virginia-beach-norfolk', 'Day 2: Norfolk waterfront + Nauticus / Battleship Wisconsin, then home.'),
  entry('2026-07-19', 'world-cup-watch-party', "3pm ET kickoff — catch it live in Norfolk or time the drive home for the theater."),

  entry('2026-07-20', 'rest-night'),
  entry('2026-07-21', 'american-store-night'),
  entry('2026-07-22', 'rest-night', 'Family dinner at home before the Jordan trip.'),

  entry('2026-07-23', 'rest-night', 'Naser & Reem rest with the brothers — simple dinner.'),
  entry('2026-07-24', 'ashland-fourth-fridays'),
  entry('2026-07-25', 'charlottesville-monticello'),
  entry('2026-07-26', 'ping-pong-tournament', 'Home brunch, ping pong, movie night.'),

  entry('2026-07-27', 'rest-night'),
  entry('2026-07-28', 'hibachi-night'),
  entry('2026-07-29', 'movie-theater-night'),
  entry('2026-07-30', 'lewis-ginter-concert', "\"Rumours ATL\" Fleetwood Mac tribute — doors around 6pm."),

  entry('2026-07-31', 'friends-potluck'),
  entry('2026-08-01', 'dragon-boat-festival'),
  entry('2026-08-02', 'rest-night', 'Laundry + home meal.'),
  entry('2026-08-03', 'movie-theater-night'),
  entry('2026-08-04', 'rest-night', 'Welcome home from Jordan — quiet family dinner, stories from the trip.'),
  entry('2026-08-05', 'carytown-walk'),

  entry('2026-08-06', 'lewis-ginter-flowers-after-5', 'Welcome-back evening — garden, music, then dinner out.'),
  entry('2026-08-07', 'byrd-theatre'),
  entry('2026-08-08', 'longwood-gardens', 'Day 1: drive up, afternoon in the gardens, evening fountain show.'),
  entry('2026-08-09', 'longwood-gardens', 'Day 2: a relaxed morning before heading home.'),

  entry('2026-08-10', 'rest-night'),
  entry('2026-08-11', 'shopping-gifts-night'),
  entry('2026-08-12', 'family-photo-night'),
  entry('2026-08-13', 'farewell-dinner'),
]
