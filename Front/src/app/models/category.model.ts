class CategoryModel {
    public CategoryID: number;
    public CategoryName: string;
    public Description: string;
    public image: FileList;

    public static convertToFormData(category: CategoryModel): FormData {
        const myFormData = new FormData();
        myFormData.append("CategoryName", category.CategoryName);
        myFormData.append("Description", category.Description);
        if(category.image) myFormData.append("image", category.image.item(0));
        return myFormData;
    }
}

export default CategoryModel;