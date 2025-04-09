using supermarket from '../db/schema';

service CatalogService {
    @readonly entity Products as projection on supermarket.Products;
}
