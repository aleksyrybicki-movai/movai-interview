import { LoremIpsum } from 'lorem-ipsum';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

import { components } from '@rs/api-interfaces';

type ItemWithId = components['schemas']['ItemWithId'];

const ITEM_COUNT = 1000;

export const generateItems = (): ItemWithId[] => {
  const lorem = new LoremIpsum();
  const items: ItemWithId[] = [];

  for (let i = 0; i < ITEM_COUNT; i++) {
    const name = uniqueNamesGenerator({
      separator: ' ',
      dictionaries: [adjectives, colors, animals],
    });

    // Ensure unique names by appending index if needed
    const item: ItemWithId = {
      id: i + 1,
      name: `${name} ${i + 1}`,
      title: lorem.generateSentences(2),
      description: lorem.generateParagraphs(2),
    };

    items.push(item);
  }

  return items;
};

