// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import productsData from './data/productsData.json';
import singleProduct from './data/singleProduct.json';
import { environment } from '../environments/environment';
export const handlers = [
  // Get all products
  http.get('http://localhost:8000/api/products', () => {
    return HttpResponse.json(productsData);
    
  }),
  http.get('http://localhost:8000/product/search', () => {
    // const {searchInput} = params;
    // console.log(searchInput);
    return HttpResponse.json(productsData);
    
  }),
  http.post('http://localhost:8000/product/update/:id', () => {
    // const {searchInput} = params;
    // console.log(searchInput);
    return HttpResponse.json(productsData);
    
  }),
  http.get('http://localhost:8000/product/:id', () => {
    return HttpResponse.json(singleProduct);
    //  return new HttpResponse(null, {
    //   status: 404,
    //   statusText: 'Product Not Found',
    // });
  }),
  http.post('http://localhost:8000/login', (params) => {
    return HttpResponse.json("Success");
    
  }),
  // Add other handlers for POST, PUT, DELETE etc.
];
