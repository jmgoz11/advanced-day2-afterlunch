import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromCustomers from './reducers/customers.reducer';
import * as fromModels from '../models';
export const featureName = 'data-stuff';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DataStuffState {
  customers: fromCustomers.CustomersState;
}

export const reducers: ActionReducerMap<DataStuffState> = {
  customers: fromCustomers.reducer,
};

// 1. Feature Selector
const selectFeature = createFeatureSelector<DataStuffState>(featureName);

// 2. A Selector Per Branch of the Feature

const selectCustomersBranch = createSelector(selectFeature, (f) => f.customers);

// 3. Helpers (optional)
const { selectAll: selectAllCustomerEntityArray } =
  fromCustomers.adapter.getSelectors(selectCustomersBranch);

// 4. What your Components Need

// TODO: We need one that returns a CustomerSummaryList

export const selectCustomerListModel = createSelector(
  selectAllCustomerEntityArray,
  (customers) => {
    const result: fromModels.CustomerSummaryList = {
      data: customers.map(
        (cust) =>
          ({
            id: cust.id,
            firstName: cust.firstName,
            lastName: cust.lastName,
            company: cust.company,
          } as fromModels.CustomerSummaryListItem),
      ),
    };
    return result;
  },
);
