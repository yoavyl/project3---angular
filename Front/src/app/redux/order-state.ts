import OrderModel from "../models/order.model";

// orders State: 
export class orderState {
    public orders: OrderModel[] = [];
}

// order Action Types:
export enum OrderActionType {
    ordersDownloaded = "ordersDownloaded",
    orderAdded = "orderAdded",
    orderUpdated = "orderUpdated",
    orderDeleted = "orderDeleted"
}

// order Action: 
export interface OrderAction {
    type: OrderActionType;
    payload: any;
    // More specific type list:
    // payload: OrderModel[] | OrderModel | number;
}

// order Action Creators: 
export function ordersDownloadedAction(orders: OrderModel[]): OrderAction {
    return { type: OrderActionType.ordersDownloaded, payload: orders };
}
export function orderAddedAction(order: OrderModel): OrderAction {
    return { type: OrderActionType.orderAdded, payload: order };
}
export function orderUpdatedAction(order: OrderModel): OrderAction {
    return { type: OrderActionType.orderUpdated, payload: order };
}
export function orderDeletedAction(id: number): OrderAction {
    return { type: OrderActionType.orderDeleted, payload: id };
}

// orders Reducer:
export function orderReducer(currentState: orderState = new orderState(), action: OrderAction): orderState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case OrderActionType.ordersDownloaded: // Here payload is all orders (OrderModel[])
            newState.orders = action.payload;
            break;
        case OrderActionType.orderAdded: // Here payload is the added order (OrderModel)
            newState.orders.push(action.payload);
            break;
        case OrderActionType.orderUpdated: { // Here payload is the updated order (OrderModel)
            const index = newState.orders.findIndex(p => p.OrderID === action.payload.id);
            newState.orders[index] = action.payload;
            break;
        }
        case OrderActionType.orderDeleted: { // Here payload is the deleted order's id (number)
            const index = newState.orders.findIndex(p => p.OrderID === action.payload);
            newState.orders.splice(index, 1);
            break;
        }
    }

    return newState;
}