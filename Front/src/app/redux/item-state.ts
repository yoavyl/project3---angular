import ItemModel from "../models/item.model";

// items State: 
export class ItemState {
    public items: ItemModel[] = [];
}

// cart Action Types:
export enum ItemActionType {
    itemsDownloaded = "itemsDownloaded",
    itemAdded = "itemAdded",
    itemUpdated = "itemUpdated",
    itemDeleted = "itemDeleted",
    itemsOfCartDeleted = "itemsOfCartDeleted"       // I added it, hope the logic is OK
}

// cart Action: 
export interface ItemAction {
    type: ItemActionType;
    payload: any;
    // More specific type list:
    // payload: CartModel[] | CartModel | number;
}

// cart Action Creators: 
export function itemsDownloadedAction(items: ItemModel[]): ItemAction {
    return { type: ItemActionType.itemsDownloaded, payload: items };
}
export function itemAddedAction(item: ItemModel): ItemAction {
    return { type: ItemActionType.itemAdded, payload: item };
}
export function itemUpdatedAction(item: ItemModel): ItemAction {
    return { type: ItemActionType.itemUpdated, payload: item };
}
export function itemDeletedAction(id: number): ItemAction {
    return { type: ItemActionType.itemDeleted, payload: id };
}

export function itemsofCartDeletedAction(id: number): ItemAction {         // I really hope that is OK...
    return { type: ItemActionType.itemsOfCartDeleted, payload: id };
}

// items Reducer:
export function itemReducer(currentState: ItemState = new ItemState(), action: ItemAction): ItemState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case ItemActionType.itemsDownloaded: // Here payload is all items (CartModel[])
            newState.items = action.payload;
            break;
        case ItemActionType.itemAdded: // Here payload is the added cart (CartModel)
            newState.items.push(action.payload);
            break;
        case ItemActionType.itemUpdated: { // Here payload is the updated cart (CartModel)
            const index = newState.items.findIndex(p => p.ItemID === action.payload.id);  
            newState.items[index] = action.payload;
            break;
        }
        case ItemActionType.itemDeleted: { // Here payload is the deleted cart's id (number)
            const index = newState.items.findIndex(p => p.ItemID === action.payload);
            newState.items.splice(index, 1);
            break;
        }
        case ItemActionType.itemsOfCartDeleted: {
            const filteredPayload = newState.items.filter(p => p.CartID !== action.payload);
            newState.items = filteredPayload;
        }
    }

    return newState;
}