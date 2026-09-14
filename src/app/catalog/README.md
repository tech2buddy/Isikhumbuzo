# Adding catalog designs

The catalog is maintained in `Catalog.tsx`; there is no image-upload or image-classification service. Copying an image into a folder alone does not publish it.

For each new image:

1. Confirm the product code and intended category with the supplied product information. Do not infer age suitability from a portrait, inscription, or code prefix alone.
2. Copy the original into `public/images/` using the lowercase product code as the filename.
3. Add a `Design` entry with a unique code, image path, description and required `style` category.
4. Use `Children’s Memorials` for products confirmed to be for children. Use `Modern`, `Classic`, `Heartfelt`, or `Natural` for the appropriate design style of other products. Ask for the intended category if it is unclear.
5. Set `fullImage: true` when the complete photograph should fit without cropping.
6. Verify the category filter, image and enquiry code in the preview.

Filters are generated automatically from the entries and contain no duplicate category buttons. The category type prevents misspelled or unapproved categories. New categories must be added deliberately to `CatalogCategory`, then assigned to the relevant entries. Existing code prefixes are not automatic classification rules.

Confirmed children's designs: image 13 = GCB1, image 14 = GCB3, image 15 = GCB4.
