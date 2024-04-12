# NOTES

## Conclusion

in this project, I'm trying to challenge my adaptability and resilience by facing new frameworks and libraries for the first time and depending on the authorized documentation, Thus you will notice some bad practices in some components It's intentional because I'm trying to simulate the real world project process approach then I'll enhance the components and the code on the final stage.

<hr/>

## daily tasks

### #001

#### 06/02/2024 - 09/02/2024

- [x] user profile
- [x] users & categories pagination
- [x] get categories: get(categories)
- [x] get single category: get(categoy/:id)
- [x] update category: post(category/edit/:id)
- [x] delete category: post(category/:id)
- [x] add category: post(category/add)

### #002

#### 09/02/2024 - present

- [x] save pagination data on reload using cookies: maybe I can shorten the code using react custom hooks and send the cookies name and value as hook arguments
- [x] skeleton effect for loading elements
- [x] get products : get(products)
- [x] add product: post(product/add)
  - [x] create dummy data to send for the database onChange the inputs
  - [x] create an image post request to send the images to the API
  - [x] handle the loading progress bar of the image keeping in mind the loading process works normally with any network speed
- [ ] get single product: get(product/:id)
- [ ] update product: post(product/edit/:id)
- [ ] remove product: post(product/:id)
- [ ] set up react form hooks
- [ ] setup skeleton effect for loading elements
- [ ] bring the product data
- [ ] setup the images uploading progress bar

#### tips

- you can use those libs to handle the file upload progress bar (
  <https://shorturl.at/PT679>, <https://www.files-ui.com/usage>
  )
  document the functions with comments

  ##### draft

  ```php

  <?php
  ```

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductImageController extends Controller
{
/\*\*
_ Display a listing of the resource.
_/
public function index()
{
//
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new ProductImage();
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $product->image = url('/') . '/images/' . $filename;
            $path = 'images';
            $file->move($path, $filename);
        }

        $product->product_id = $request->product_id;
        $product->save();
        return $product;
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductImage $productImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductImage $productImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductImage $productImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $image = ProductImage::findOrFail($id);
        $path = public_path() . '/images/' . substr($image['image'], strrpos($image['image'], '/') + 1);

        if (File::exists($path)) {
            File::delete($path);
        }
        DB::table('product_images')->where('id', '=', $id)->delete();
    }

}

```

```
