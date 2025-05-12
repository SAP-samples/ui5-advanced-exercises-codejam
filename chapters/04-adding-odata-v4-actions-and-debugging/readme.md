# Chapter 04 - Adding OData V4 Actions and Debugging

By the end of this chapter we will have added and invoked an OData V4 action binding to our UI5 application, so users submit a rating. We will also have talked about debugging strategies.

## Steps

- [1. Add a rating indicator to the XML view](#1-add-a-rating-indicator-to-the-xml-view)<br>


### 1. Add a rating indicator to the XML view

We want to add a rating indicator to our XML view, that allows user to rate the application.

➡️ Add the following code to the end of the outer `<VBox />` element in the `codejam.supermarket/uimodule/webapp/ext/main/Main.view.xml` file:

```xml
<VBox alignItems="Center">
    <Title text="Do you enjoy this application?" />
    <RatingIndicator
        binding="{/createRating(...)}"
        change=".onCreateRating"
        maxValue="5"
        value="{$Parameter/rating}"
        class="sapUiSmallMarginBottom" />
    <Label text="({ path: '/getAvgRating()', type: 'sap.ui.model.odata.type.Decimal' } average rating)" />
</VBox>	
```

We added a `<RatingIndicator />` control that uses a [deferred operation binding](https://ui5.sap.com/#/topic/b54f7895b7594c61a83fa7257fa9d13f) for the Odata V4 action `/createRating(...)`, more specifically a deferred *action* binding (action/function depending on the type of OData operation). A deferred operation binding is defined via the `(...)` syntax. It is "deferred", because it is not called immediately - unlike the simple function binding `/getAvgRating()` that is used to get the average rating from the backend. Deferred operation bindings are often called with parameters, which can be set via the `setParameter("rating", "<value>")` method or more declaratively via the `{$Parameter/rating}` syntax, which we did here.

The rating indicator calls the `onCreateRating` method on the change event, which we will implement in the next step. This is were we OData action will actually be invoked.

### 2. Implement the controller

The OData action and its parameters are now bound to the rating indicator, but still needs to be manually invoked via the controller.

➡️ Add the following method to the `codejam.supermarket/uimodule/webapp/ext/main/Main.controller.ts` file:

```typescript
public async onCreateRating(event: RatingIndicator$ChangeEvent) {
    const ratingIndicator = event.getSource();
    const operation = ratingIndicator.getObjectBinding() as ODataContextBinding;
    operation.invoke().then(function() {
        console.log(operation.getBoundContext().getObject());
        MessageToast.show("Rating submitted.");
        operation.getModel()?.refresh();
        ratingIndicator.setEnabled(false);

    }).catch(function(error: Error) {
        MessageToast.show(error.message);
    });
}
```

➡️ Also make sure to add the following import statements:

```typescript
import { RatingIndicator$ChangeEvent } from "sap/m/RatingIndicator";
import MessageToast from "sap/m/MessageToast";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
```


