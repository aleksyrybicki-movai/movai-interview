import { LoremIpsum } from 'lorem-ipsum';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

import { itemRepository } from '../data-source';
import { Item } from '../entities';

const ITEM_COUNT = 1000;

export const generateItems = async () => {
  const lorem = new LoremIpsum();

  let i = 0;
  while (i < ITEM_COUNT) {
    const item = new Item();
    item.name = uniqueNamesGenerator({
      separator: ' ',
      dictionaries: [adjectives, colors, animals],
    });
    item.title = lorem.generateSentences(2);
    item.description = lorem.generateParagraphs(2);
    try {
      await itemRepository.save(item);
      i++;
    } catch (e) {
      console.log(e);
    }
  }
};
