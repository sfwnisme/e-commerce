# NOTES

## Conclusion

in this project, I'm trying to challenge my adaptability and resilience by facing new frameworks and libraries for the first time and depending on the authorized documentation, Thus you will notice some bad practices in some components It's intentional because I'm trying to simulate the real world project process approach then I'll enhance the components and the code on the final stage.

**BIG NOTE**: this project needs more refactoring after finishing its development

- [ ] react query in a single file (get data, post data, update data, delete data).
  - [ ] register
  - [ ] login
  - [ ] user
  - [ ] categories
  - [ ] products
- [ ] rewrite the custom react hooks in the common way that devs write.
- [ ] use shared components for duplicated components and features.

---

## daily tasks

### Sprints

#### #001 06/02/2024 - 09/02/2024

- [x] user profile
- [x] users & categories pagination
- [x] get categories: get(categories)
- [x] get single category: get(categoy/:id)
- [x] update category: post(category/edit/:id)
- [x] delete category: post(category/:id)
- [x] add category: post(category/add)

#### #002 09/02/2024 - 14/04/2024

- [x] save pagination data on reload using cookies: maybe I can shorten the code using react custom hooks and send the cookies name and value as hook arguments
- [x] skeleton effect for loading elements
- [x] get products : get(products)
- [x] add product: post(product/add)
- [x] create dummy data to send for the database onChange the inputs
- [x] create an image post request to send the images to the API
- [x] handle the loading progress bar of the image keeping in mind the loading process works normally with any network speed
- [x] get single product: get(product/:id)
- [x] update product: post(product/edit/:id)
- [x] remove product: post(product/:id)
- [x] set up react form hooks
- [x] bring the product data
- [x] setup the images uploading progress bar

#### #003 14/04/2024 - 28/04/2024

- [x] forms skeleton
- [x] refine (AddProduct.tsx, UpdateProduct.tsx) components
- [x] create a reusable function for product images uploading

#### #004 28/04/2024 - 04/05/2024

NOTE: I encountered some bugs, if I added the `useGetSingleData(id: number)` hook into The Returned DOM it occurs the following error.
`Unexpected Application Error!
Rendered more hooks than during the previous render.
Error: Rendered more hooks than during the previous render.`
so I can't use any function containing a hook even if it doesn't return a hook.
For more information about the above error [read more](https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende)

- [x] search function for users, categories, products
- [x] create a custom search hook

#### #005 05/04/2024

- [x] protected routes
- [x] user-based routes

#### #006 06/04/2024 - present

#### tips

- you can use those libs to handle the file upload progress bar ([link1](https://shorturl.at/PT679), [files-ui](https://www.files-ui.com/usage))
- document the functions with comments
