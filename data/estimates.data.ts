import {faker} from '@faker-js/faker';

export interface EstimateItemData {
    description: string;
    quantity: string;
    rate: string;
}

export function buildEstimateItemData(overrides: Partial<EstimateItemData> = {}): EstimateItemData {
  return {
    description: `AT ${faker.commerce.productName()}`,
    quantity: '2',
    rate: '100',
    ...overrides,
  };
}