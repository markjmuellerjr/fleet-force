// types/serviceOrdersState.ts

import { IServiceOrder } from './serviceOrder';

export interface ServiceOrdersState {
  orders: IServiceOrder[];
  loading: boolean;
  error: string | null;
}