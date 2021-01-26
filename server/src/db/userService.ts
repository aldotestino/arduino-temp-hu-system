import { users } from './connections';
import userSchema from './schemas/userSchema';
import bcrypt from 'bcrypt';
import User from '../User';

async function register(newUser: User) {
  try {
    const validatedUser = await userSchema.validateAsync(newUser);
    const userToCheck = await users.findOne({ username: validatedUser.username });
    if (userToCheck) {
      throw new Error('Utente già esistente!');
    }
    await bcrypt.hash(validatedUser.password, 10).then(hashedPassword => validatedUser.password = hashedPassword);
    const insertedUser = await users.insert(validatedUser);
    return { id: insertedUser._id };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function login(user: User) {
  try {
    const validatedUser = await userSchema.validateAsync(user);
    const userToCheck = await users.findOne({ username: validatedUser.username });
    if (!userToCheck) {
      throw new Error('Utente inesistente!');
    }
    const match = await bcrypt.compare(user.password, userToCheck.password);
    if (match) {
      return { id: userToCheck._id };
    } else {
      throw new Error('Password errata!');
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

async function idExists(id: string) {
  try {
    const user = await users.findOne({ _id: id });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export {
  register,
  login,
  idExists
};