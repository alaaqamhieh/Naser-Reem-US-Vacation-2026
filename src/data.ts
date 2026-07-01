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
    driveTime: '~1h drive',
    description: "Step into \"old America\" — colonial trades, tall ships, and the spot where the nation began. A great overnight for Naser's first taste of US history.",
    tags: ['overnight'],
    firstVisitHighlight: true,
  },
  {
    id: 'virginia-beach-norfolk',
    title: 'Virginia Beach & Norfolk',
    emoji: '🏖️',
    category: 'big-trip',
    driveTime: '~1.75h drive',
    description: 'Boardwalk mornings, fresh seafood, and the Battleship Wisconsin at Nauticus — an easy, beautiful overnight by the water.',
    tags: ['overnight'],
  },
  {
    id: 'charlottesville-monticello',
    title: 'Charlottesville, UVA & Monticello',
    emoji: '🍇',
    category: 'big-trip',
    driveTime: '~1.25h drive',
    description: "Jefferson's mountaintop home, a historic university, and a charming Downtown Mall — a relaxed, scenic day.",
  },
  {
    id: 'shenandoah-skyline',
    title: 'Shenandoah National Park & Skyline Drive',
    emoji: '🏞️',
    category: 'big-trip',
    driveTime: '~1.5h drive',
    description: 'Mountain overlooks, wildflowers, and easy scenic stops along a 105-mile ridge-top drive — no real hiking required.',
    easyPace: true,
  },
  {
    id: 'longwood-gardens',
    title: 'Longwood Gardens (Pennsylvania)',
    emoji: '⛲',
    category: 'big-trip',
    driveTime: '~4.5h drive',
    description: 'The most spectacular botanical garden within reach — grand conservatories, fountains, and an evening illuminated fountain show. Worth a comfortable overnight.',
    tags: ['overnight'],
  },
  {
    id: 'dc-alexandria',
    title: 'Washington, D.C. & Old Town Alexandria',
    emoji: '🏙️',
    category: 'big-trip',
    driveTime: '~2h drive',
    description: 'The National Mall, the monuments, and a free Smithsonian museum, then a stroll through historic Alexandria.',
    firstVisitHighlight: true,
  },
  {
    id: 'annapolis',
    title: 'Annapolis, Maryland',
    emoji: '⛵',
    category: 'big-trip',
    driveTime: '~2.5h drive',
    description: 'A pretty waterfront city with historic streets and boats — a gentler alternative to a full D.C. day.',
    easyPace: true,
  },
  {
    id: 'natural-bridge-lexington',
    title: 'Natural Bridge & Lexington',
    emoji: '🌉',
    category: 'big-trip',
    driveTime: '~2.5h drive',
    description: 'Dramatic natural scenery and a classic small Virginia town, with a scenic Blue Ridge drive.',
  },


  {
    id: 'outer-banks',
    title: 'Outer Banks, North Carolina',
    emoji: '🌊',
    category: 'big-trip',
    driveTime: '~4.5h drive',
    description: "Wide Atlantic beaches, climbable lighthouses, the Wright Brothers' first-flight memorial, and wild horses roaming the sand at Corolla — a classic American beach escape.",
    tags: ['overnight'],
    firstVisitHighlight: true,
  },
  {
    id: 'busch-gardens',
    title: 'Busch Gardens Williamsburg',
    emoji: '🎢',
    category: 'big-trip',
    driveTime: '~1h drive',
    description: "Often voted America's most beautiful theme park — Europe-themed villages, gardens, shows, and a scenic sky ride. A full day with lots of walking, so pace it gently.",
  },
  {
    id: 'chincoteague-assateague',
    title: 'Chincoteague & Assateague Island',
    emoji: '🐎',
    category: 'big-trip',
    driveTime: '~3.5h drive',
    description: 'Wild ponies on a barrier island, a storybook lighthouse, and quiet beaches — much of it enjoyable right from the car or a gentle boardwalk.',
    easyPace: true,
  },
  {
    id: 'luray-caverns',
    title: 'Luray Caverns',
    emoji: '💎',
    category: 'big-trip',
    driveTime: '~2h drive',
    description: 'A vast underground cathedral of glowing stone columns and mirror pools, seen from paved, well-lit walkways — pairs beautifully with Skyline Drive.',
  },
  {
    id: 'mount-vernon',
    title: "Mount Vernon — Washington's Estate",
    emoji: '🇺🇸',
    category: 'big-trip',
    driveTime: '~2h drive',
    description: "George Washington's riverside home — rolling gardens, the famous back porch view over the Potomac, and living history all around.",
    firstVisitHighlight: true,
  },
  {
    id: 'new-river-gorge',
    title: 'New River Gorge National Park (West Virginia)',
    emoji: '🌁',
    category: 'big-trip',
    driveTime: '~4h drive',
    description: "America's newest national park — the iconic bridge and canyon views from Grandview and the step-free \"Gentle Trail\" overlook. Big scenery, easy on the knees.",
    easyPace: true,
  },
  {
    id: 'harpers-ferry',
    title: 'Harpers Ferry, West Virginia',
    emoji: '⛰️',
    category: 'big-trip',
    driveTime: '~2.5h drive',
    description: 'A beautifully preserved historic town where two rivers and three states meet — cobblestone streets, river views, and a famous overlook.',
  },
  {
    id: 'lancaster-amish',
    title: 'Lancaster Amish Country (Pennsylvania)',
    emoji: '🐴',
    category: 'big-trip',
    driveTime: '~4h drive',
    description: 'Rolling farmland, horse-drawn buggies, covered bridges, and farm markets — a peaceful window into a different America. Pairs well with Longwood or Hershey.',
    easyPace: true,
    firstVisitHighlight: true,
  },
  {
    id: 'hershey-pa',
    title: "Hershey's Chocolate World (Pennsylvania)",
    emoji: '🍫',
    category: 'big-trip',
    driveTime: '~4h drive',
    description: "A free chocolate-factory tour ride in \"the sweetest place on Earth,\" with warehouse-sized candy shopping after — easy fun, pairs with Lancaster.",
  },
  {
    id: 'baltimore-harbor',
    title: 'Baltimore Inner Harbor & National Aquarium',
    emoji: '🐬',
    category: 'big-trip',
    driveTime: '~2.5h drive',
    description: 'A flat waterfront promenade, historic ships, and one of the best aquariums in the country — dolphins, sharks, and a tropical rainforest indoors.',
    easyPace: true,
  },
  {
    id: 'great-falls',
    title: 'Great Falls Park, Virginia',
    emoji: '💦',
    category: 'big-trip',
    driveTime: '~1.75h drive',
    description: 'The Potomac crashing through a rocky gorge, seen from paved overlooks just steps from the parking lot — huge scenery for very little walking.',
    easyPace: true,
  },
  {
    id: 'biltmore-asheville',
    title: 'Biltmore Estate, Asheville (North Carolina)',
    emoji: '🏰',
    category: 'big-trip',
    driveTime: '~5.5h drive',
    description: "America's largest home, with legendary gardens by the designer of Central Park and Blue Ridge mountain views — a garden lover's dream weekend.",
    tags: ['overnight'],
    stretchTrip: true,
  },
  {
    id: 'new-york-city',
    title: 'New York City',
    emoji: '🗽',
    category: 'big-trip',
    driveTime: '~6.5h drive',
    description: 'The big one — Central Park, Times Square at night, and the free Staten Island Ferry gliding past the Statue of Liberty. A once-in-a-trip adventure worth two nights.',
    tags: ['overnight'],
    stretchTrip: true,
    firstVisitHighlight: true,
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


  {
    id: 'duke-gardens',
    title: 'Duke Gardens, Durham (North Carolina)',
    emoji: '🏮',
    category: 'garden',
    driveTime: '~2.5h drive',
    description: 'Sarah P. Duke Gardens — 55 free acres of terraced flowers, an Asian arboretum with a red bridge over the pond, and shaded paths. One of the finest gardens in the South.',
    easyPace: true,
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


  {
    id: 'dessert-crawl',
    title: 'Richmond Dessert Crawl',
    emoji: '🍩',
    category: 'food',
    description: "Sugar Shack's famous fresh doughnuts, then Gelati Celesti ice cream — a silly, delicious evening tour of Richmond's sweetest spots.",
    easyPace: true,
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


  {
    id: 'georgetown-monuments-evening',
    title: 'Georgetown & Monuments by Night (D.C.)',
    emoji: '🌉',
    category: 'big-trip',
    driveTime: '~2h drive',
    description: 'Dinner on the Georgetown waterfront, then a slow evening drive past the lit-up monuments — all the D.C. magic with almost no walking.',
    easyPace: true,
    firstVisitHighlight: true,
  },
  {
    id: 'berry-picking',
    title: 'Berry-Picking Farm Morning',
    emoji: '🫐',
    category: 'local',
    description: 'Pick-your-own berries at a farm just outside Richmond — shaded rows, fresh air, and a pie project for the afternoon.',
    easyPace: true,
  },
  {
    id: 'james-river-cruise',
    title: 'James River Boat Cruise',
    emoji: '🛥️',
    category: 'local',
    description: 'A relaxed narrated cruise on the James — city views, herons, and history, all from a comfortable seat on the water.',
    easyPace: true,
  },
  {
    id: 'farmers-market',
    title: 'South of the James Farmers Market',
    emoji: '🍑',
    category: 'local',
    description: 'Saturday morning in Forest Hill Park — Virginia peaches, fresh bread, flowers, and live music under the trees.',
    easyPace: true,
  },
  {
    id: 'capitol-canal-walk',
    title: 'Virginia State Capitol & Canal Walk',
    emoji: '🌇',
    category: 'local',
    description: "Jefferson's gleaming white Capitol and a gentle stroll along the downtown canal — Richmond's history at an easy pace.",
    easyPace: true,
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

  {
    id: 'drive-in-movie',
    title: 'Goochland Drive-In Movie Night',
    emoji: '🚗',
    category: 'event',
    description: 'A double feature under the stars at a classic American drive-in — watched comfortably from the car with snacks from the retro concession stand.',
    easyPace: true,
    firstVisitHighlight: true,
  }
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
