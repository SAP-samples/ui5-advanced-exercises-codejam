namespace supermarket;

entity Products {
    key ID       : Integer;
        title    : String;
        category : Association to one Categories;
        stock    : Integer;
        position : String;
        image    : String;
}

entity Categories {
    key name     : String;
        products : Association to many Products;
}
