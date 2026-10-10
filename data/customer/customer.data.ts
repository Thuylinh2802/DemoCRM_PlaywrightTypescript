import {faker} from '@faker-js/faker';

export interface CustomerData {
    company: string;
    vatNumber: string;
    phone: string;
    website: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    }

export function buildCustomerData(overrides: Partial<CustomerData> = {}): CustomerData {
  return {
    company: `AT Auto ${faker.person.lastName()} ${faker.number.int({ min: 1000, max: 9999 })}`,
    vatNumber: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
    phone: `0${faker.number.int({ min: 100000000, max: 999999999 })}`,
    website: faker.internet.domainName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('######'),
    country: 'Vietnam',
    ...overrides,
  };
}