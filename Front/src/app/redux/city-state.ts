import CityModel from "../models/city.model";

// Employees State: 
export class CityState {
    public cities: CityModel[] = [];
}

// Employee Action Types:
export enum CityActionType {
    citiesDownloaded = "citiesDownloaded",
    // employeeAdded = "employeeAdded",
    // employeeUpdated = "employeeUpdated",
    // employeeDeleted = "employeeDeleted"
}

// Employee Action: 
export interface CityAction {
    type: CityActionType;
    payload: any;
    // More specific type list:
    // payload: EmployeeModel[] | EmployeeModel | number;
}

// Employee Action Creators: 
export function citiesDownloadedAction(cities: CityModel[]): CityAction {
    return { type: CityActionType.citiesDownloaded, payload: cities };
}
// export function employeeAddedAction(employee: EmployeeModel): EmployeeAction {
//     return { type: EmployeeActionType.employeeAdded, payload: employee };
// }
// export function employeeUpdatedAction(employee: EmployeeModel): EmployeeAction {
//     return { type: EmployeeActionType.employeeUpdated, payload: employee };
// }
// export function employeeDeletedAction(id: number): EmployeeAction {
//     return { type: EmployeeActionType.employeeDeleted, payload: id };
// }

// Employees Reducer:
export function cityReducer(currentState: CityState = new CityState(), action: CityAction): CityState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CityActionType.citiesDownloaded: // Here payload is all employees (EmployeeModel[])
            newState.cities = action.payload;
            break;
        // case EmployeeActionType.employeeAdded: // Here payload is the added employee (EmployeeModel)
        //     newState.employees.push(action.payload);
        //     break;
        // case EmployeeActionType.employeeUpdated: { // Here payload is the updated employee (EmployeeModel)
        //     const index = newState.employees.findIndex(p => p.id === action.payload.id);
        //     newState.employees[index] = action.payload;
        //     break;
        // }
        // case EmployeeActionType.employeeDeleted: { // Here payload is the deleted employee's id (number)
        //     const index = newState.employees.findIndex(p => p.id === action.payload);
        //     newState.employees.splice(index, 1);
        //     break;
        // }
    }

    return newState;
}