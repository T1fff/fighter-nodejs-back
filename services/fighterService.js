import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAllFighters() {
    const item = fighterRepository.getAll();
    try {
      return item;
    } catch (error) {
      throw new Error('Error retrieving fighters');
    }
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createFighter(data) {
    const item = fighterRepository.create(data);
    try {
      return item;
    } catch (error) {
      throw new Error('Error creating fighter');
    }
  }

  updateFighter(id, data) {
    const item = fighterRepository.update(id, data);
    try {
      return item;
    } catch (error) {
      throw new Error('Error updating fighter');
    }
  }

  deleteteFighter(id) {
    const item = fighterRepository.delete(id);
    try {
      return item;
    } catch (error) {
      throw new Error('Error deleting fighter');
    }
  }
}

const fighterService = new FighterService();

export { fighterService };
