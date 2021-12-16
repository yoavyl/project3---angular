import CartModel from "../models/cart.model";

// // carts State: 
export class CartState {
    public carts: CartModel[] = [];
}

// // cart Action Types:
export enum CartActionType {
    cartsDownloaded = "cartsDownloaded",
    cartAdded = "cartAdded",
//     cartUpdated = "cartUpdated",
    cartDeleted = "cartDeleted"
}

// // cart Action: 
export interface CartAction {
    type: CartActionType;
    payload: any;
    // More specific type list:
    // payload: CartModel[] | CartModel | number;
}

// // cart Action Creators: 
export function cartsDownloadedAction(carts: CartModel[]): CartAction {
    return { type: CartActionType.cartsDownloaded, payload: carts };
}
export function cartAddedAction(cart: CartModel[]): CartAction {
    return { type: CartActionType.cartAdded, payload: cart };
}
// export function cartUpdatedAction(cart: CartModel): CartAction {
//     return { type: CartActionType.cartUpdated, payload: cart };
// }
export function cartDeletedAction(id: number): CartAction {
    return { type: CartActionType.cartDeleted, payload: id };
}

// // carts Reducer:
export function cartReducer(currentState: CartState = new CartState(), action: CartAction): CartState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CartActionType.cartsDownloaded: // Here payload is all carts (CartModel[])
            newState.carts = action.payload;
            break;
        case CartActionType.cartAdded: // Here payload is the added cart (CartModel)
            // newState.carts.push(action.payload); // the old command, in a world you would push a new cart to the database, but i'm interested in REPLACING the redux's database
            newState.carts = action.payload;
            break;
//         case CartActionType.cartUpdated: { // Here payload is the updated cart (CartModel)
//             const index = newState.carts.findIndex(p => p.cartID === action.payload.id);  
//             newState.carts[index] = action.payload;
//             break;
//         }
        case CartActionType.cartDeleted: { // Here payload is the deleted cart's id (number)
            const index = newState.carts.findIndex(p => p.CartID === action.payload);
            newState.carts.splice(index, 1);
            break;
        }
    }

    return newState;
}