import monk from 'monk';
import User from '../User';

const db = monk(process.env.MONGOURI || 'localhost/home-stats');

const users = db.get<User>('users');

export { users }
