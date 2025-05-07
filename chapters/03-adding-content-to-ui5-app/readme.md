# Chapter 03 - Adding Content to the UI5 Application

By the end of this chapter we will have added basic features to our UI5 application, that allow users to browse a list of supermarket products.

## Steps

- [1. Add basic controls to the UI5 application](#1-add-basic-controls-to-the-ui5-application)<br>

### 1. Add basic controls to the UI5 application

We want to build an app that allow users to browse and search a list of products in a supermarket. For that we need some basic UI5 controls, specifically for the title, search field and list of products.

➡️ Replace the current content of the `codejam.supermarket/uimodule/webapp/ext/main/Main.view.xml` file with the following code:

```xml
<mvc:View
	xmlns:core="sap.ui.core"
	xmlns:mvc="sap.ui.core.mvc"
	xmlns="sap.m"
	xmlns:f="sap.f"
	xmlns:macros="sap.fe.macros"
	xmlns:html="http://www.w3.org/1999/xhtml"
	controllerName="uimodule.ext.main.Main"
	<Page id="Main" showHeader="false" class="sapUiContentPadding">
		<VBox alignItems="Center" width="100%">
			<Title
				level="H2"
				titleStyle="H2"
				text="What are you looking for today?"
				class="sapUiMediumMarginTop" />
			<Panel class="sapUiMediumMarginTop">
				<SearchField
					placeholder="Find products"
					liveChange=".onSearchProducts"
					width="480px" />
			</Panel>
			<HBox
				id="products"
				items="{path: '/Products', parameters: { '$select': '*' }}"
				class="sapUiMediumMarginTop"
				wrap="Wrap"
				justifyContent="Center">
				<GenericTile
					header="{title}"
					subheader="{category_name}"
					press=".onFlyToProduct"
					class="sapUiTinyMarginBegin sapUiTinyMarginBottom">
					<TileContent>
						<ImageContent src="{image}" />
					</TileContent>
				</GenericTile>
			</HBox>
		</VBox>
	</Page>
</mvc:View>
```

We added basic UI5 controls to the main view custom page. As we call these exercises "advanced", nothing here should really surprise you.

### 2. Add TypeScript controller code for the search feature

...

Continue to [Chapter 04 - ](/chapters/04-/)
