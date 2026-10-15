import { rest } from 'msw';
import {
  getMockItems,
  addMockItem,
  deleteMockItem,
} from './data';
import { components } from '@rs/api-interfaces';

type ItemWithId = components['schemas']['ItemWithId'];
type Item = components['schemas']['Item'];
type ItemFilter = components['schemas']['ItemFilter'];
type PaginationRequest = components['schemas']['PaginationRequest'];
type PaginationResponse = components['schemas']['PaginationResponse'];

const filterItems = (
  items: ItemWithId[],
  filter?: ItemFilter
): ItemWithId[] => {
  if (!filter) {
    return items;
  }

  return items.filter(item => {
    if (filter.id !== undefined && item.id !== filter.id) {
      return false;
    }
    if (filter.name && !item.name.toLowerCase().includes(filter.name.toLowerCase())) {
      return false;
    }
    if (filter.title && !item.title?.toLowerCase().includes(filter.title.toLowerCase())) {
      return false;
    }
    if (filter.description && !item.description?.toLowerCase().includes(filter.description.toLowerCase())) {
      return false;
    }
    return true;
  });
};

export const handlers = [
  // GET /api/items - List items with pagination and filtering
  rest.get('/api/items', (req, res, ctx) => {
    // Parse query parameters - MSW receives them as URLSearchParams
    const filterParam = req.url.searchParams.get('filter');
    const paginationParam = req.url.searchParams.get('pagination');

    let filter: ItemFilter | undefined;
    let pagination: PaginationRequest | undefined;

    // Try to parse filter if provided
    if (filterParam) {
      filter = JSON.parse(decodeURIComponent(filterParam));
    } else {
      // If not JSON, try parsing individual filter params
      const name = req.url.searchParams.get('filter[name]');
      const title = req.url.searchParams.get('filter[title]');
      const description = req.url.searchParams.get('filter[description]');
      const id = req.url.searchParams.get('filter[id]');
      
      if (name || title || description || id) {
        filter = {};
        if (name) filter.name = name;
        if (title) filter.title = title;
        if (description) filter.description = description;
        if (id) filter.id = parseInt(id, 10);
      }
    }

    // Try to parse pagination if provided
    if (paginationParam) {
      pagination = JSON.parse(decodeURIComponent(paginationParam));
    } else {
      // If not JSON, try parsing individual pagination params
      const page = req.url.searchParams.get('pagination[page]');
      const per = req.url.searchParams.get('pagination[per]');
      
      if (page || per) {
        pagination = {};
        if (page) pagination.page = parseInt(page, 10);
        if (per) pagination.per = parseInt(per, 10);
      }
    }

    let filteredItems = filterItems(getMockItems(), filter);

    // Apply pagination if provided
    if (pagination && pagination.per && pagination.per > 0) {
      const page = pagination.page ?? 0;
      const per = pagination.per;
      const start = page * per;
      const end = start + per;
      const paginatedItems = filteredItems.slice(start, end);

      const paginationResponse: PaginationResponse = {
        page,
        per,
        total: filteredItems.length,
      };

      return res(
        ctx.status(200),
        ctx.json({
          items: paginatedItems,
          pagination: paginationResponse,
        })
      );
    }

    // Return all items if no pagination
    return res(
      ctx.status(200),
      ctx.json({
        items: filteredItems,
      })
    );
  }),

  // POST /api/items - Create item
  rest.post<Item>('/api/items', (req, res, ctx) => {
    const { name, title, description } = req.body;

    // Validate required field
    if (!name || name.trim() === '') {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Validation failed',
          errors: [
            {
              path: 'name',
              message: 'name is required',
              errorCode: 'required',
            },
          ],
        })
      );
    }

    const newItem = addMockItem({ name, title, description });

    return res(
      ctx.status(201),
      ctx.json(newItem)
    );
  }),

  // DELETE /api/items/:itemId - Delete item
  rest.delete('/api/items/:itemId', (req, res, ctx) => {
    const itemId = parseInt(req.params['itemId'] as string, 10);

    if (isNaN(itemId)) {
      return res(ctx.status(400));
    }

    const deleted = deleteMockItem(itemId);

    if (deleted) {
      return res(ctx.status(204));
    }

    return res(ctx.status(404));
  }),
];

