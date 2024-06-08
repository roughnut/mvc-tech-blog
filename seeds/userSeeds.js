const { User } = require('../models');

const userData = [
  {
    username: 'djFrank',
    password: 'turntableMaster123'
  },
  {
    username: 'codingNinja',
    password: 'javascriptRules456'
  },
  {
    username: 'travelBug',
    password: 'wanderlust789'
  },
  {
    username: 'bookWorm',
    password: 'literatureLover012'
  },
  {
    username: 'fitnessFreak',
    password: 'gymRat345'
  },
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  // hooks: true,
});

module.exports = seedUsers;