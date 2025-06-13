using supermarket from '../db/schema';

service CatalogService {
    @readonly
    entity Products as projection on supermarket.Products;

    @readonly
    entity Ratings  as projection on supermarket.Ratings;

	action createRating(rating : Integer) returns Ratings;
    function getAvgRating() returns Decimal;
}
