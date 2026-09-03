import { generateItems } from './generateItems';

export { generateItems };

// Generate mock items data
let mockItems = generateItems();

export const getMockItems = () => mockItems;

export const setMockItems = (items: typeof mockItems) => {
  mockItems = items;
};

export const addMockItem = (item: Omit<typeof mockItems[0], 'id'>) => {
  const newId = Math.max(...mockItems.map(i => i.id), 0) + 1;
  const newItem = { ...item, id: newId };
  mockItems.push(newItem);
  return newItem;
};

export const deleteMockItem = (id: number) => {
  const index = mockItems.findIndex(item => item.id === id);
  if (index !== -1) {
    mockItems.splice(index, 1);
    return true;
  }
  return false;
};


