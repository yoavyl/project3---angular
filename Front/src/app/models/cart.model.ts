export class CartModel {
    public CartID: number;
    public UserUUID: string;
    public Date: string;

    public static convertToFormData(cart: CartModel): FormData {
        const myFormData = new FormData();
        myFormData.append("UserUUID", cart.UserUUID);
        myFormData.append("Date", cart.Date);
        return myFormData;
    }
}


export default CartModel;