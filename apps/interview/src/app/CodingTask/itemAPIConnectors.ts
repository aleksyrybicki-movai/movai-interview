import Route from 'route-parser';
import {
  ItemAPIPaths,
  ListItemsRequest,
  ListItemsResponse,
  CreateItemRequest,
  CreateItemResponse,
  DeleteItemRequest,
} from '@rs/api-interfaces';

export const getItems = async (
  params?: ListItemsRequest
): Promise<ListItemsResponse> => {
  // Implementation
  // Path: ItemAPIPaths.listItems

  return {} as ListItemsResponse;
};

export const createItem = async (
  item: CreateItemRequest
): Promise<CreateItemResponse> => {
  // Implementation
  // Path: ItemAPIPaths.createItem

  return {} as CreateItemResponse;
};

const deleteRoute = new Route(ItemAPIPaths.deleteItem);
export const deleteItem = async (
  itemId: DeleteItemRequest['itemId']
): Promise<undefined> => {
  // Implementation
  // Path: deleteRoute.reverse({ itemId })

  return undefined;
};
