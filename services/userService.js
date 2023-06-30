import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

   getAllUsers() {
    const item = userRepository.getAll();
    try {
      return item;
    } catch (error) {
      throw new Error('Error retrieving users');
    }
  }

  authSearch(search) {
    const item = userRepository.search(search);
    if (!item) {
      return null;
    }
    return item;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createUser(data) {
    const item = userRepository.create(data);
    try {
      return item;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  updateUser(id, data) {
    const item = userRepository.update(id, data);
    try {
      return item;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  deleteteUser(id) {
    const item = userRepository.delete(id);
    try {
      return item;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }
}

const userService = new UserService();

export { userService };
