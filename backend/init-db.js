// backend/init-db.js
require('dotenv').config();
const db = require('./db');

const messages = [
  { name: 'Matt Juan', message: 'Happy birthday mama Liam 🥳🥳🎂🍰, May you have many many more!🥳🥳💯' },
  { name: 'Yvonne Gikundi', message: 'Happy birthday mama Liam. To many more years! 🥳🥰.' },
  { name: 'Velle', message: 'Happy birthday Mama Liam🥳❤️' },
  { name: 'Ndaisi', message: 'Happy birthday mama Liam 🥳!' },
  { name: 'Braxie', message: 'Happy birthday mama Liam!! May God\'s countenance keep on shining upon you! :)' },
  { name: 'Bey Glenn', message: 'Happiest Birthday to Liam\'s Mum!!💕 Have a Great One !' },
  { name: 'Stacy Waithera', message: 'Happy birthday mama Liam🥳❤️May this new chapter open many doors for you! Wishing you a very very happy birthday 🥳🥳💋' },
  { name: 'Rooney', message: 'Happiest Birthday mama Liam!🥳' },
  { name: 'Ariel', message: 'Happy birthday Mama Liam 🎉🎉🎉💐. Wishing you God\'s blessings 🙏' },
  { name: 'Stevo', message: 'Happy birthday mama Liam🥳' },
  { name: 'Kahara', message: 'Happiest birthday Mama Liam!!💐🎉🎉' },
  { name: 'SASHA\'G MUMBUA', message: 'Happiest birthday Mama Liam🎉 🥰 Have it Major whilst you clock a new year filled with overflowing blessings ☺️.Cheers Hot Girl 💋🥳🥳🎂' },
  { name: 'Wanjiku', message: 'Happy birthday Liam\'s mum 🌸' },
  { name: 'Wanjiku', message: 'Happy birthday Liam\'s mum 🌸' },
  { name: 'Michael Musyoki', message: 'Happy birthday Liam\'s Mum 🥳🙌🏾!' },
  { name: 'Joy🌼', message: 'Happy birthday mama Liam!🎉✨' },
  { name: 'Kirima', message: 'Happy birthday mama Liam, wish you happy turnings and a lot of blessings in the upcoming chapters of your life, but I guess your best blessing is Liam of course such a gem 😅 happy turnings' },
  { name: 'Issah', message: 'Happy birthday mama hashim/ liam old primary school friend. Hope you had a great day❤️' },
  { name: 'Penthouse Owner', message: 'Happy Birthday Mama Liam!! May the Lord guide you, keep you and fulfil the purest desires of your heart.' },
  { name: 'Ria', message: 'Happy birthday beautiful 🥰❤️' },
  { name: 'Ian Sila', message: 'Happy birthday to Mama Liam. Liam is blessed to have a mum as strong, caring, and inspiring as you. May this new year bring you joy, peace, and everything you\'ve been praying for. Keep shining and keep being the incredible person you are. Enjoy your day fully.' },
  { name: 'Larissa', message: 'Happy birthday 🎊' },
  { name: 'Korio', message: 'Happy Birthday Mama Liam!🥳' },
  { name: 'Sammy Bett', message: 'Happy Birthday Mama Liam, you have an amazing son and he is so blessed to have you as his mum. To many more years🥳' },
  { name: 'Florence', message: 'Happy birthday Dear Mama Liam🥰you\'re so beautiful and you\'ve raised Liam so well He\'s a good gentleman Hope you enjoyed your day and God bless you with more life,health,wealth and happiness☺️' },
  { name: 'Nesh', message: 'Happy birthday Mam Liam!😊 May God give you many many more years ❤️' },
  { name: 'Junior', message: 'Happy birthday mummzy🥳' },
  { name: 'Annahh', message: 'Happy Birthdayyyy🥳❤️' },
  { name: 'Stephen', message: 'May this birthday be a new chapter filled with prosperity, growth, and happiness. Happy birthday mama liam 🎊✨' },
  { name: 'Grace', message: 'Happy Birthday mama Liam youve raised Liam to be an amazing young man !Hope you enjoy your day' },
  { name: 'Vicky', message: 'Happy Birthday Mama Liam🥳🥳' },
  { name: 'Bellamy Memba', message: 'Happy birthday mama liam thank you for raising such a wonderful son .we all love you' },
  { name: 'Kaylee', message: 'Happy birthday Mama Liam🤍. I pray this new chapter brings more blessings and peace. Enjoy and have a good one.😊' },
  { name: 'Liam', message: 'Happiest birthday mum !❤️' },
  { name: 'Keziah Gitile', message: 'Hi mama Liam, I\'m grateful for you. I appreciate you as a beautiful woman, role model and a mother. You\'ve raised such an amazing man. He\'s a gentleman and a friend. I cherish you and Girl!!! I want to look like you when I age 😝😍. Happy birthday beautiful!' },
  { name: 'Anita', message: 'Happy birthday mama Liam 🎉🎉🎉.May you enjoy thus day to the fullest and Mat the Lords favour follow you everywhere that you go and may he add more day to your life' },
  { name: 'essy', message: 'happy blessed birthday mama Liam🎊🎊' },
  { name: 'Sora', message: 'Happy birthday Liam\'s mum and I wish many more!' },
  { name: 'Ragz', message: 'Belated Happy birthday🥳🥰' },
  { name: 'Tracy Gitahi', message: 'Happy birthday mama Liam❤️may you continue to age like fine wine 😍😍And stay blessed💖' },
  { name: 'Ian Musk', message: 'Happy birthday to you mama Naule. Liam is blessed to have a mum as strong, caring, and inspiring as you. May this new year bring you joy, peace, and everything you\'ve been praying for. Keep shining and keep being the incredible person you are. Enjoy your day fully' },
  { name: 'Shem', message: 'Happy Birthday Mama Liam!' },
  { name: 'Faiza', message: 'Happy birthday mama Liam I wish you a happy birthday 🎉🎈 Sending you warm wishes and lots of love today. You raised an amazing son intelligent, kind, and hardworking and that speaks so highly of you May this new year bring you peace, laughter, and endless love💗' },
  { name: 'Jedi', message: 'Happy Birthday Mama Liam 🥳\nPraying that God continues to bless you\nand your family ❤️' },
  { name: 'Caleb', message: 'Happy birthday 🥳\nWishing you much much more happy healthy strong a wealthy years .' },
  { name: 'Janto', message: 'Happy birthday my sister.\nI hope you had a blast!' }
];

// Initialize database with messages if empty
function initDatabase() {
  try {
    const count = db.prepare('SELECT COUNT(*) as count FROM messages').get();
    
    if (count.count === 0) {
      console.log('🔄 Database is empty. Seeding with messages...');
      const stmt = db.prepare('INSERT INTO messages (name, message) VALUES (?, ?)');
      
      messages.forEach((msg) => {
        stmt.run(msg.name, msg.message);
      });
      
      console.log(`✅ Database seeded with ${messages.length} messages!`);
    } else {
      console.log(`✅ Database already has ${count.count} messages.`);
    }
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
}

module.exports = { initDatabase };