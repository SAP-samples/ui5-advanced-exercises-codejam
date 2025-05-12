# Chapter 04 - Adding OData V4 Actions and Debugging

By the end of this chapter we will have added and invoked an OData V4 action binding to our UI5 application, so users submit a rating. We will also have talked about debugging strategies.

## Steps

- [1. Add a rating indicator to the XML view](#1-add-a-rating-indicator-to-the-xml-view)<br>
- [2. Implement the controller](#2-implement-the-controller)<br>

- [4. Test the application](#4-test-the-application)<br>

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

The rating indicator calls the `onCreateRating()` method on the change event, which we will implement in the next step. This is where the OData action will actually be invoked.

<details>
<summary>A few more thoughts on accessing and updating data with OData V4 ... 💬</summary>

<br>

> The [OData V4 model](https://ui5.sap.com/#/api/sap.ui.model.odata.v4.ODataModel) in UI5 does ***not*** allow for direct (or "manual") data model access or manipulation via the `getProperty()` or `setProperty()` methods - unlike the [OData V2 model](https://ui5.sap.com/#/api/sap.ui.model.odata.v2.ODataModel%23methods/Summary) or [JSON model](https://ui5.sap.com/#/api/sap.ui.model.json.JSONModel). Instead, the context API ([ODataContextBinding](https://ui5.sap.com/#/api/sap.ui.model.odata.v4.ODataContextBinding)) plays the most central role and is used to access and manipulate data. It is therefore considered a best practice to use bindings whenever possible. Data model properties (a path in the model) are bound to control properties, which means that changes to the control and therefore the data model (two-way binding) then also automatically update the backend. Simple function bindings or deferred operation bindings like shown above are used to manipulate data (never do "manual" calculations on the client side). This approach requires the backend to be closely aligned with what the client (the UI5 app) wants to do and provide the corresponding actions and functions.
>
> You can read more about the differences between OData V2 and OData V4 in the [UI5 documentation](https://ui5.sap.com/#/topic/abd4d7c7548d4c29ab8364d3904a6d74).

</details>

### 2. Implement the controller

The OData action and its parameters are now bound to the rating indicator, but still needs to be manually invoked via the controller.

➡️ Add the following method to the `codejam.supermarket/uimodule/webapp/ext/main/Main.controller.ts` file:

```typescript
public async onCreateRating(event: RatingIndicator$ChangeEvent) {
    const ratingIndicator = event.getSource();
    const operation = ratingIndicator.getObjectBinding() as ODataContextBinding;
    operation.invoke().then(function() {
        console.log("logging the result...", operation.getBoundContext().getObject());
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

This `onCreateRating()` method is called on the change event of the rating indicator (see XML view above) and invokes the `/createRating(...)` action. It's an asynchronous process, which is why use the `promise.then().catch()` syntax to handle the success and error cases. In the success case, we log the result (for demo purposes), show a message toast, refresh the model (to instantly update the average rating via `/getAvgRating()`), and disable the rating indicator. In the error case, we show the error message in a message toast.

⚠️ In this step we deliberately introduced two issues that your TypeScript language server should catch and complain about. Your task is to inspect these issues and fix them in place. We will not give you any more hints than that for now, but we will talk about during the discussion at the end of this chapter. Don't worry too much if you can't fix those issues - your app will still run fine.

### 3. Debugging

Speaking of issues, debugging is an important part of any development process.

### 4. Test the application

➡️ Refresh your browser window at `http://localhost:4004/` and test the application. In case you closed your server, restart it with the following command from the project root:

```bash
npm run dev:server
```

The application now includes a rating indicator. Feel free to test it and see the value of the average rating change.

![application](./application.png)

## Further question to discuss

<details>
<summary>Where you able to fix the issues in the `onCreateRating()` method that we introduced in step 2?</summary>

<br>

> The TS language server complained that the `execute()` method of the `ODataBindingContext` is deprecated. Replace it with `invoke()` to fix this. This is a great example of how TS provides a comprehensive experience that feels like the documentation is built into your IDE.
>
> The TS language server also complained that the return value of `operation.getModel()` might possibly be null - potentially resulting in an ugly error when calling `refresh()` on it. You can fix this by using the optional chaining operator `?.`: `operation.getModel()?.refresh()`. This way, `refresh()` will only be called if `getModel()` returns a non-null value. This is a great example of how TS helps you to write more robust code and avoid runtime errors.

</details>
<details>
<summary>Some other question?</summary>

<br>

> 

</details>

<br>

Continue to [Chapter 05 - ](/chapters/05-/)
