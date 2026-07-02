// =============================================================================
//  A local "knowledge base" of common dinner dishes — powers the Dinner Night
//  Ideas autocomplete: type a dish name, pick the match, and its cuisine,
//  emoji, a short note, and (when we have one) a real photo all fill in for
//  you. Entirely client-side data, no network calls.
// =============================================================================

export interface DinnerKnowledge {
  dish: string
  cuisine: string
  emoji: string
  notes: string
  /** Path under public/, e.g. "photos/dinner/pho.jpg" — not every dish has one. */
  photo?: string
}

export const DINNER_KNOWLEDGE: DinnerKnowledge[] = [
  { dish: 'Butter Chicken', cuisine: 'Indian', emoji: '🍛', notes: 'Creamy tomato curry, best with garlic naan.', photo: 'photos/dinner/butter-chicken.jpg' },
  { dish: 'Chicken Tikka Masala', cuisine: 'Indian', emoji: '🍛', notes: 'Grilled marinated chicken in a spiced tomato-cream sauce.', photo: 'photos/dinner/chicken-tikka-masala.jpg' },
  { dish: 'Biryani', cuisine: 'Indian', emoji: '🍚', notes: 'Layered spiced rice with chicken or lamb.', photo: 'photos/dinner/biryani.jpg' },
  { dish: 'Samosas', cuisine: 'Indian', emoji: '🥟', notes: 'Crispy pastry, spiced potato and pea filling.', photo: 'photos/dinner/samosas.jpg' },

  { dish: 'Hot Dogs & Burgers', cuisine: 'American', emoji: '🍔', notes: 'Backyard cookout classic.', photo: 'photos/dinner/hot-dogs-burgers.jpg' },
  { dish: 'Ribs', cuisine: 'American', emoji: '🍖', notes: 'Slow-cooked, fall-off-the-bone.', photo: 'photos/dinner/ribs.jpg' },
  { dish: 'Steaks', cuisine: 'American', emoji: '🥩', notes: 'Grilled to order.', photo: 'photos/dinner/steaks.jpg' },
  { dish: 'Mac and Cheese', cuisine: 'American', emoji: '🧀', notes: 'Creamy baked classic.', photo: 'photos/dinner/mac-and-cheese.jpg' },
  { dish: 'BBQ Pulled Pork', cuisine: 'American', emoji: '🍖', notes: 'Slow-smoked, piled onto a bun.', photo: 'photos/dinner/bbq-pulled-pork.jpg' },

  { dish: 'Mongolian Beef', cuisine: 'Chinese', emoji: '🥘', notes: 'Sweet-savory beef and scallions over rice.', photo: 'photos/dinner/mongolian-beef.jpg' },
  { dish: 'Manchurian Chicken', cuisine: 'Chinese', emoji: '🍗', notes: 'Crispy chicken in a tangy garlic-chili sauce.', photo: 'photos/dinner/manchurian-chicken.jpg' },
  { dish: 'Fresh Spring Rolls', cuisine: 'Chinese', emoji: '🥢', notes: '', photo: 'photos/dinner/fresh-spring-rolls.jpg' },
  { dish: 'Kung Pao Chicken', cuisine: 'Chinese', emoji: '🥜', notes: 'Spicy stir-fry with peanuts and chilies.', photo: 'photos/dinner/kung-pao-chicken.jpg' },
  { dish: 'Fried Rice', cuisine: 'Chinese', emoji: '🍚', notes: '', photo: 'photos/dinner/fried-rice.jpg' },
  { dish: 'Dumplings', cuisine: 'Chinese', emoji: '🥟', notes: 'Pan-fried or steamed, pork or vegetable.', photo: 'photos/dinner/dumplings.jpg' },

  { dish: 'Bulgogi Beef', cuisine: 'Korean', emoji: '🥩', notes: 'Marinated grilled beef, lettuce wraps.', photo: 'photos/dinner/bulgogi-beef.jpg' },
  { dish: 'Korean Hot Pot', cuisine: 'Korean', emoji: '🍲', notes: 'Everyone cooks at the table together.', photo: 'photos/dinner/korean-hot-pot.jpg' },
  { dish: 'Japchae', cuisine: 'Korean', emoji: '🍜', notes: 'Stir-fried glass noodles with vegetables.', photo: 'photos/dinner/japchae.jpg' },
  { dish: 'Kimchi Jjigae', cuisine: 'Korean', emoji: '🍲', notes: 'Spicy kimchi and pork stew.', photo: 'photos/dinner/kimchi-jjigae.jpg' },
  { dish: 'Korean Fried Chicken', cuisine: 'Korean', emoji: '🍗', notes: 'Extra crispy, sweet-spicy glaze.', photo: 'photos/dinner/korean-fried-chicken.jpg' },

  { dish: 'Mloukhiyeh', cuisine: 'Arabic', emoji: '🍲', notes: 'Jute-leaf stew over rice, with chicken.', photo: 'photos/dinner/mloukhiyeh.jpg' },
  { dish: 'Msakhan', cuisine: 'Arabic', emoji: '🍗', notes: 'Sumac chicken over taboon bread and onions.', photo: 'photos/dinner/msakhan.jpg' },
  { dish: 'Shawarma', cuisine: 'Arabic', emoji: '🌯', notes: '', photo: 'photos/dinner/shawarma.jpg' },
  { dish: 'Warak Enab bi Zeit', cuisine: 'Arabic', emoji: '🍃', notes: 'Grape leaves stuffed with rice, served cold, olive oil.', photo: 'photos/dinner/warak-enab.jpg' },
  { dish: 'Warak Enab b’Hamid', cuisine: 'Arabic', emoji: '🍋', notes: 'Grape leaves stuffed with rice and meat, lemony broth.', photo: 'photos/dinner/warak-enab.jpg' },
  { dish: 'Hummus', cuisine: 'Arabic', emoji: '🧆', notes: 'Chickpea dip with olive oil and pita.', photo: 'photos/dinner/hummus.jpg' },
  { dish: 'Falafel', cuisine: 'Arabic', emoji: '🧆', notes: 'Crispy fried chickpea patties.', photo: 'photos/dinner/falafel.jpg' },
  { dish: 'Kibbeh', cuisine: 'Arabic', emoji: '🥘', notes: 'Bulgur and spiced meat, fried or baked.', photo: 'photos/dinner/kibbeh.jpg' },
  { dish: 'Tabbouleh', cuisine: 'Arabic', emoji: '🥗', notes: 'Parsley, tomato, and bulgur salad.', photo: 'photos/dinner/tabbouleh.jpg' },
  { dish: 'Maqluba', cuisine: 'Arabic', emoji: '🍚', notes: 'Upside-down rice, meat, and fried vegetables.', photo: 'photos/dinner/maqluba.jpg' },

  { dish: 'Sushi', cuisine: 'Japanese', emoji: '🍣', notes: '', photo: 'photos/dinner/sushi.jpg' },
  { dish: 'Ramen', cuisine: 'Japanese', emoji: '🍜', notes: 'Rich broth, noodles, soft egg.', photo: 'photos/dinner/ramen.jpg' },
  { dish: 'Teriyaki Chicken', cuisine: 'Japanese', emoji: '🍗', notes: 'Sweet soy glaze, grilled or pan-seared.', photo: 'photos/dinner/teriyaki-chicken.jpg' },
  { dish: 'Tempura', cuisine: 'Japanese', emoji: '🍤', notes: 'Light-battered fried shrimp and vegetables.', photo: 'photos/dinner/tempura.jpg' },

  { dish: 'Taco Salad Bowl', cuisine: 'Mexican', emoji: '🥗', notes: '', photo: 'photos/dinner/taco-salad-bowl.jpg' },
  { dish: 'Tacos', cuisine: 'Mexican', emoji: '🌮', notes: '', photo: 'photos/dinner/tacos.jpg' },
  { dish: 'Loaded Nachos', cuisine: 'Mexican', emoji: '🧀', notes: '', photo: 'photos/dinner/loaded-nachos.jpg' },
  { dish: 'Enchiladas', cuisine: 'Mexican', emoji: '🌯', notes: 'Rolled tortillas, sauce, baked with cheese.', photo: 'photos/dinner/enchiladas.jpg' },
  { dish: 'Quesadillas', cuisine: 'Mexican', emoji: '🧀', notes: '', photo: 'photos/dinner/quesadillas.jpg' },
  { dish: 'Fajitas', cuisine: 'Mexican', emoji: '🌶️', notes: 'Sizzling grilled meat and peppers, build-your-own.', photo: 'photos/dinner/fajitas.jpg' },

  { dish: 'Pho', cuisine: 'Vietnamese', emoji: '🍜', notes: '', photo: 'photos/dinner/pho.jpg' },
  { dish: 'Vietnamese Spring Rolls', cuisine: 'Vietnamese', emoji: '🥬', notes: 'Fresh rice-paper rolls, herbs and shrimp.', photo: 'photos/dinner/vietnamese-spring-rolls.jpg' },

  { dish: 'Pad Thai', cuisine: 'Thai', emoji: '🍜', notes: 'A starter idea — add your own favorites!', photo: 'photos/dinner/pad-thai.jpg' },
  { dish: 'Thai Green Curry', cuisine: 'Thai', emoji: '🍛', notes: '', photo: 'photos/dinner/thai-green-curry.jpg' },
  { dish: 'Tom Yum Soup', cuisine: 'Thai', emoji: '🍲', notes: 'Hot and sour, lemongrass and shrimp.', photo: 'photos/dinner/tom-yum-soup.jpg' },
  { dish: 'Massaman Curry', cuisine: 'Thai', emoji: '🍛', notes: 'Mild, rich curry with potatoes and peanuts.', photo: 'photos/dinner/massaman-curry.jpg' },

  { dish: 'Brazilian Churrasco', cuisine: 'Brazilian', emoji: '🍢', notes: 'Texas de Brazil–style grilled meats at home.', photo: 'photos/dinner/brazilian-churrasco.jpg' },
  { dish: 'Feijoada', cuisine: 'Brazilian', emoji: '🍲', notes: 'Black bean and pork stew, served with rice.', photo: 'photos/dinner/feijoada.jpg' },
  { dish: 'Pão de Queijo', cuisine: 'Brazilian', emoji: '🧀', notes: 'Cheesy baked bread bites.', photo: 'photos/dinner/pao-de-queijo.jpg' },
]
