import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface.js';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 10000000 },
    { id: 2, name: 'Keyboard', price: 500000 },
    { id: 3, name: 'Mouse', price: 150000 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(data: Omit<Product, 'id'>): Product {
    const nextId = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
    const newProduct: Product = { id: nextId, ...data };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, data: Omit<Product, 'id'>): Product {
    const product = this.findOne(id);
    product.name = data.name;
    product.price = data.price;
    return product;
  }

  patch(id: number, data: Partial<Omit<Product, 'id'>>): Product {
    const product = this.findOne(id);
    Object.assign(product, data);
    return product;
  }

  remove(id: number): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    const [removedProduct] = this.products.splice(index, 1);
    return removedProduct;
  }
}