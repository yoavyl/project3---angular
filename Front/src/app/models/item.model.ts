export class ItemModel {
    public CartID: number;
    public TotalPrice: number;
    public ItemID: number;
    public Quantity: number;
    public ProductID: number;
    public ProductName: string;
    public imageName: string;

    public static convertToFormData(item: ItemModel): FormData {
        const myFormData = new FormData();
        myFormData.append("TotalPrice", item.TotalPrice.toString());
        myFormData.append("Quantity", item.Quantity.toString());
        myFormData.append("CartID", item.CartID.toString());
        myFormData.append("ProductID", item.ProductID.toString());
        return myFormData;
    }
}


export default ItemModel;