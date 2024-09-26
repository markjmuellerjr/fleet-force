// redux/slices/serviceOrdersSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IServiceOrder } from '../../types/serviceOrder';
import { ServiceOrdersState } from '../../types/serviceOrdersState';
import { RootState } from '../store';

// Define the initial state using the ServiceOrdersState interface
const initialState: ServiceOrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to fetch service orders
export const fetchServiceOrders = createAsyncThunk<
  IServiceOrder[], // Return type of the payload creator
  void,            // First argument to the payload creator
  { state: RootState } // Optional fields for defining thunkAPI field types
>(
  'serviceOrders/fetchServiceOrders',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/serviceOrders');
      return response.data as IServiceOrder[];
    } catch (error: any) {
      // Handle errors appropriately
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch service orders');
    }
  }
);

// Async thunk to add a new service order
export const addServiceOrder = createAsyncThunk<
  IServiceOrder, // Return type
  { machineryBrand: string; machineryModel: string; appointmentDate: string }, // Argument type
  { state: RootState }
>(
  'serviceOrders/addServiceOrder',
  async (newOrderData, thunkAPI) => {
    try {
      const response = await axios.post('/api/serviceOrders', newOrderData);
      return response.data as IServiceOrder;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add service order');
    }
  }
);

// Async thunk to update a service order
export const updateServiceOrder = createAsyncThunk<
  IServiceOrder, // Return type
  { id: string; updates: Partial<IServiceOrder> }, // Argument type
  { state: RootState }
>(
  'serviceOrders/updateServiceOrder',
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/serviceOrders/${id}`, updates);
      return response.data as IServiceOrder;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update service order');
    }
  }
);

// Async thunk to delete a service order
export const deleteServiceOrder = createAsyncThunk<
  string, // Return type (id of deleted order)
  string, // Argument type (id)
  { state: RootState }
>(
  'serviceOrders/deleteServiceOrder',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/serviceOrders/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete service order');
    }
  }
);

// Create the slice
const serviceOrdersSlice = createSlice({
  name: 'serviceOrders',
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
    clearServiceOrders(state) {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Handle fetchServiceOrders
    builder.addCase(fetchServiceOrders.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchServiceOrders.fulfilled, (state, action: PayloadAction<IServiceOrder[]>) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchServiceOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle addServiceOrder
    builder.addCase(addServiceOrder.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addServiceOrder.fulfilled, (state, action: PayloadAction<IServiceOrder>) => {
      state.loading = false;
      state.orders.push(action.payload);
    });
    builder.addCase(addServiceOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle updateServiceOrder
    builder.addCase(updateServiceOrder.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateServiceOrder.fulfilled, (state, action: PayloadAction<IServiceOrder>) => {
      state.loading = false;
      const index = state.orders.findIndex(order => order._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(updateServiceOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle deleteServiceOrder
    builder.addCase(deleteServiceOrder.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteServiceOrder.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.orders = state.orders.filter(order => order._id !== action.payload);
    });
    builder.addCase(deleteServiceOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions
export const { clearServiceOrders } = serviceOrdersSlice.actions;

// Export selectors
export const selectServiceOrders = (state: RootState) => state.serviceOrders.orders;
export const selectServiceOrdersLoading = (state: RootState) => state.serviceOrders.loading;
export const selectServiceOrdersError = (state: RootState) => state.serviceOrders.error;

// Export the reducer
export default serviceOrdersSlice.reducer;