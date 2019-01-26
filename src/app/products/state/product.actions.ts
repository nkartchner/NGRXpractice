import { Action } from '@ngrx/store'
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
    Create = '[Product] Create Product',
    CreateSuccess = '[Product] Create Product Success',
    CreateFail = '[Product] Create Product Fail',
    Load = '[Product] Load Product',
    LoadFail = '[Product] Load Failed',
    LoadSuccess = '[Product] Load Success',
    Update = '[Product] Update Product',
    UpdateSuccess = '[Product] Update Product Success',
    UpdateFail = '[Product] Update Fail',
    Delete = '[Product] Delete Product',
    DeleteSuccess = '[Product] Delete Product Success',
    DeleteFail = '[Product] Delete Product Fail'

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
export class Create implements Action {
    readonly type = ProductActionTypes.Create;
}

export class CreateSuccess implements Action {
    readonly type = ProductActionTypes.CreateSuccess;
    constructor(public payload: Product) { }
}

export class CreateFail implements Action {
    readonly type = ProductActionTypes.CreateFail;
    constructor(public payload: string) { }
}

////////////////////////////////////////////////////////// UPDATE //////////////////////////////////////////////////////////
export class Update implements Action {
    readonly type = ProductActionTypes.Update;
    constructor(public payload: Product) { }
}

export class UpdateSuccess implements Action {
    readonly type = ProductActionTypes.UpdateSuccess;
    constructor(public payload: Product) { }
}

export class UpdateFail implements Action {
    readonly type = ProductActionTypes.UpdateFail;
    constructor(public payload: string) { }
}
////////////////////////////////////////////////////////// DELETE //////////////////////////////////////////////////////////
export class Delete implements Action {
    readonly type = ProductActionTypes.Delete;
    constructor(public payload: Product) { }
}

export class DeleteSuccess implements Action {
    readonly type = ProductActionTypes.DeleteSuccess;
    constructor(public payload: string) { }
}

export class DeleteFail implements Action {
    readonly type = ProductActionTypes.DeleteFail;
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
    | Create
    | CreateSuccess
    | CreateFail
    | Update
    | UpdateSuccess
    | UpdateFail
    | Delete
    | DeleteSuccess
    | DeleteFail