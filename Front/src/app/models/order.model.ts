export class OrderModel {
    public OrderID: number;
    public CartID: number;
    public TotalPrice: number;
    public UserUUID: string;
    public Date: string;
    public City: string;
    public Street: string;
    public Delivery: string;
    public CreditCard: string;

    public static convertToFormData(order: OrderModel): FormData {
        const myFormData = new FormData();
        myFormData.append("CartID", order.CartID.toString());
        myFormData.append("TotalPrice", order.TotalPrice.toString());
        myFormData.append("UserUUID", order.UserUUID);
        myFormData.append("City", order.City);
        myFormData.append("Street", order.Street);
        myFormData.append("Delivery", order.Delivery);
        myFormData.append("CreditCard", order.CreditCard);
        myFormData.append("Date", order.Date);
        return myFormData;
    }

}
export default OrderModel;