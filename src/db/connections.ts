const db = require('monk')('localhost/home-stats');

const users = db.get('users');

export { users }
