using CatalogService from './cat-service';

annotate CatalogService.Products with @(UI.LineItem: [
  {
    $Type: 'UI.DataField',
    Value: title,
    Label: 'Product'
  },
  {
    $Type: 'UI.DataField',
    Value: category_name,
    Label: 'Category'
  },
  {
    $Type: 'UI.DataField',
    Value: stock,
    Label: 'Stock'
  }
]);

annotate CatalogService.Products with {
  title    @title: 'Product';
  category @title: 'Category';
  stock    @title: 'Stock';
}
