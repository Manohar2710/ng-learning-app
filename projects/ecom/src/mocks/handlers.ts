// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import productsData from './data/productsData.json';
import singleProduct from './data/singleProduct.json';
export const handlers = [
  // Get all products
  http.get('http://localhost:8080/api/products', () => {
    return HttpResponse.json(productsData);
    
  }),

  http.get('http://localhost:8080/api/product/1', () => {
    return HttpResponse.json(singleProduct);
    //  return new HttpResponse(null, {
    //   status: 404,
    //   statusText: 'Product Not Found',
    // });
  }),
  // Add other handlers for POST, PUT, DELETE etc.
];
