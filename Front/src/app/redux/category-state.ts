import CategoryModel from "../models/category.model";

// categorys State: 
export class CategoryState {
    public categories: CategoryModel[] = [];
}

// category Action Types:
export enum CategoryActionType {
    categorysDownloaded = "categorysDownloaded",
    categoryAdded = "categoryAdded",
    categoryUpdated = "categoryUpdated",
    categoryDeleted = "categoryDeleted"
}

// category Action: 
export interface CategoryAction {
    type: CategoryActionType;
    payload: any;
    // More specific type list:
    // payload: categoryModel[] | categoryModel | number;
}

// category Action Creators: 
export function categorysDownloadedAction(categories: CategoryModel[]): CategoryAction {
    return { type: CategoryActionType.categorysDownloaded, payload: categories };
}
export function categoryAddedAction(category: CategoryModel): CategoryAction {
    return { type: CategoryActionType.categoryAdded, payload: category };
}
export function categoryUpdatedAction(category: CategoryModel): CategoryAction {
    return { type: CategoryActionType.categoryUpdated, payload: category };
}
export function categoryDeletedAction(id: number): CategoryAction {
    return { type: CategoryActionType.categoryDeleted, payload: id };
}

// categorys Reducer:
export function categoryReducer(currentState: CategoryState = new CategoryState(), action: CategoryAction): CategoryState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CategoryActionType.categorysDownloaded: // Here payload is all categorys (categoryModel[])
            newState.categories = action.payload;
            break;
        case CategoryActionType.categoryAdded: // Here payload is the added category (categoryModel)
            newState.categories.push(action.payload);
            break;
        case CategoryActionType.categoryUpdated: { // Here payload is the updated category (categoryModel)
            const index = newState.categories.findIndex(p => p.CategoryID === action.payload.id);  // TO FIX!!!!!!!!!!!!!!!!!! this is not for update, but for filtering
            newState.categories[index] = action.payload;
            break;
        }
        case CategoryActionType.categoryDeleted: { // Here payload is the deleted category's id (number)
            const index = newState.categories.findIndex(p => p.CategoryID === action.payload);
            newState.categories.splice(index, 1);
            break;
        }
    }

    return newState;
}