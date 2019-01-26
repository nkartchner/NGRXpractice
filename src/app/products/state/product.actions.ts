import { Action } from '@ngrx/store';
import { Product } from '../product';
import { __importDefault } from 'tslib';
import { ImplicitReceiver } from '@angular/compiler';
import { setInjectImplementation } from '@angular/core/src/di/injector_compatibility';

export enum ProductActionTypes {

    // The string will apear in the dev tools!
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
    CreateProduct = '[Product] Create Product',
    CreateProductSuccess = '[Product] Create Product Success',
    CreateProductFail = '[Product] Create Product Fail',
    Load = '[Product] Load Product',
    LoadFail = '[Product] Load Failed',
    LoadSuccess = '[Product] Load Success',
    UpdateProduct = '[Product] Update Product',
    UpdateProductSuccess = '[Product] Update Product Success',
    UpdateProductFail = '[Product] Update Fail',
    DeleteProduct = '[Product] Delete Product',
    DeleteProductSuccess = '[Product] Delete Product Success',
    DeleteProductFail = '[Product] Delete Product Fail'

}


////////////////////////////////////////////////////////// MISC //////////////////////////////////////////////////////////
export class ToggleProduct implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public payload: boolean) { }
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;
    constructor(public payload: Product) { }
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}

////////////////////////////////////////////////////////// LOAD //////////////////////////////////////////////////////////
export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public payload: Product[]) { }
}

export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;
    constructor(public payload: string) { }
}

////////////////////////////////////////////////////////// CREATE //////////////////////////////////////////////////////////
export class CreateProduct implements Action {
    readonly type = ProductActionTypes.CreateProduct;
    constructor(public payload: Product) { }
}

export class CreateProductSuccess implements Action {
    readonly type = ProductActionTypes.CreateProductSuccess;
    constructor(public payload: Product) { }
}

export class CreateProductFail implements Action {
    readonly type = ProductActionTypes.CreateProductFail;
    constructor(public payload: string) { }
}

////////////////////////////////////////////////////////// UPDATE //////////////////////////////////////////////////////////
export class UpdateProduct implements Action {
    readonly type = ProductActionTypes.UpdateProduct;
    constructor(public payload: Product) { }
}

export class UpdateProductSuccess implements Action {
    readonly type = ProductActionTypes.UpdateProductSuccess;
    constructor(public payload: Product) { }
}

export class UpdateProductFail implements Action {
    readonly type = ProductActionTypes.UpdateProductFail;
    constructor(public payload: string) { }
}
////////////////////////////////////////////////////////// DELETE //////////////////////////////////////////////////////////
export class DeleteProduct implements Action {
    readonly type = ProductActionTypes.DeleteProduct;
    constructor(public payload: number) { }
}

export class DeleteProductSuccess implements Action {
    readonly type = ProductActionTypes.DeleteProductSuccess;
    constructor(public payload: number) { }
}

export class DeleteProductFail implements Action {
    readonly type = ProductActionTypes.DeleteProductFail;
    constructor(public payload: string) { }
}


// The union will restric any product actions we DO NOT want to expose to the rest of the app
export type ProductActions = ToggleProduct
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct
    | Load
    | LoadSuccess
    | LoadFail
    | CreateProduct
    | CreateProductSuccess
    | CreateProductFail
    | UpdateProduct
    | UpdateProductSuccess
    | UpdateProductFail
    | DeleteProduct
    | DeleteProductSuccess
    | DeleteProductFail;
