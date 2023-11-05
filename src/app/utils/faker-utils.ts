import { faker } from '@faker-js/faker';

import { Cafe } from 'src/models/Cafe';

export const generarCafes = (cantidad: number): Cafe[] => {
  const cafes: Cafe[] = [];
  for (let i = 0; i < cantidad; i++) {
    cafes.push(
      Cafe.fromJson({
        id: faker.number.int(),
        nombre: faker.commerce.productName(),
        tipo: faker.helpers.arrayElement(['Blend', 'Café de Origen']),
        region: faker.lorem.words({ min: 1, max: 5 }),
        sabor: faker.lorem.words({ min: 1, max: 5 }),
        altura: faker.number.int({ min: 1000, max: 10000 }),
        imagen: faker.image.url(),
      })
    );
  }
  return cafes;
};
