namespace supermarket;

using { cuid, managed } from '@sap/cds/common';

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

entity Ratings: cuid, managed {
	rating: Integer @assert.range: [1,5];
}
