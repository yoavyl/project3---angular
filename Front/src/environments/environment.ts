// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    productsUrl: "http://localhost:3030/api/products/",
    categoriesUrl: "http://localhost:3030/api/categories/",
    cartsUrl: "http://localhost:3030/api/carts/",
    itemsUrl: "http://localhost:3030/api/items/",
    citiesUrl: "http://localhost:3030/api/cities/",
    ordersUrl: "http://localhost:3030/api/orders/",
    ordersPDFUrl: "http://localhost:3030/api/orders/pdf/",
    productsUrlDelayed: "http://localhost:3030/api/products/delayed/",
    productImagesUrl: "http://localhost:3030/api/products/images/",
    employeesUrl: "http://localhost:3030/api/employees/",
    employeeImagesUrl: "http://localhost:3030/api/employees/images/",
    registerUrl: "http://localhost:3030/api/auth/register",
    loginUrl: "http://localhost:3030/api/auth/login",
    validUrl: "http://localhost:3030/api/auth/valid",
    usersUrl: "http://localhost:3030/api/users/",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
