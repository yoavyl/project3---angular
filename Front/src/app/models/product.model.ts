class ProductModel {

    public ProductID: number;
    public ProductName: string;
    public UnitPrice: number;
    public CategoryID: number;
    public imageName: string;
    public image: FileList;

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("ProductName", product.ProductName);
        myFormData.append("UnitPrice", product.UnitPrice.toString());
        myFormData.append("CategoryID", product.CategoryID.toString());
        if(product.image) myFormData.append("image", product.image.item(0));
        return myFormData;
    }

}

export default ProductModel;