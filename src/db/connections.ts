import monk from 'monk';
import connectionString from './connectionString';

const db = monk(connectionString);

const users = db.get('users');

export { users }
