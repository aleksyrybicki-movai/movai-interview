import { DataSource } from 'typeorm';

import entities, { Item } from './entities';

const dataSource = new DataSource({
  type: 'sqljs',
  entities,
  synchronize: true,
});

export const initializeDataSource = () => dataSource.initialize();

export const itemRepository = dataSource.getRepository(Item);

export default dataSource;
