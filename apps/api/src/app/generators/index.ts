import { generateItems } from './items';

export const generate = () => Promise.all([generateItems()]);
