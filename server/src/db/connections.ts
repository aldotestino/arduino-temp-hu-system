import monk from 'monk';
import User from '../User';
import connectionString from './connectionString';

const db = monk(connectionString);

const users = db.get<User>('users');

export { users }
