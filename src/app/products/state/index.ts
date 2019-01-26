import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as productState from './product.reducer';

// Putting this here instead of in the APP.STATE.TS allows the lazy loading feature to function correctly.
export interface State extends fromRoot.State {
    products: productState.ProductState;
}

// Selector Functions
const getProductFeatureState = createFeatureSelector<productState.ProductState>('products');

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

export const getShowProductCode = createSelector(
    // The selector thats required to get the state is first
    getProductFeatureState,
    // Then returns the current request state
    state => state.showProductCode
);
