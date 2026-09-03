import { Express } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { mapValues } from 'lodash';
import { Like } from 'typeorm';
import {
  ListItemsRequest,
  ListItemsResponse,
  ItemAPIPaths,
  CreateItemRequest,
  CreateItemResponse,
  DeleteItemRequest,
} from '@rs/api-interfaces';

import { Item } from '../entities';
import { itemRepository } from '../data-source';

export const initializeItemRoutes = (app: Express) => {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: './libs/api-interfaces/openapi/items.yaml',
      validateRequests: true,
    })
  );

  app.get<
    ItemAPIPaths.listItems,
    undefined,
    ListItemsResponse,
    undefined,
    ListItemsRequest
  >(ItemAPIPaths.listItems, async ({ query }, res, next) => {
    try {
      const per = +query?.pagination?.per;
      const page = +query?.pagination?.page;

      if(per && per > 0 || page && page >= 0) {
        const [items, total] = await itemRepository.findAndCount({
          where: mapValues(query.filter, (filterValue) =>
            Like(`%${filterValue}%`)
          ),
          take: per,
          skip: page * per,
        });

        res.send({
          items,
          pagination: {
            page,
            per,
            total,
          },
        });
        return;
      }
      
      const [items] = await itemRepository.findAndCount({
        where: mapValues(query.filter, (filterValue) =>
          Like(`%${filterValue}%`)
        )
      });

      res.send({
        items
      });
      return;

    } catch (error) {
      next(error);
    }
  });

  app.post<
    ItemAPIPaths.createItem,
    undefined,
    CreateItemResponse,
    CreateItemRequest
  >(
    ItemAPIPaths.createItem,
    async ({ body: { name, title, description } }, res, next) => {
      try {
        const item = new Item();
        item.name = name;
        item.title = title;
        item.description = description;

        res.send(await itemRepository.save(item));
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete<ItemAPIPaths.deleteItem, DeleteItemRequest>(
    ItemAPIPaths.deleteItem,
    async ({ params: { itemId } }, res, next) => {
      try {
        await itemRepository.delete(itemId);

        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
  );
};
