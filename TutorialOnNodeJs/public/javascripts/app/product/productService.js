angular.module("productModule")
.factory("productService", productService);


productService.$inject = ['$http', '$location', 'productCategoryService' ];


function productService($http, $location, productCategoryService) {
    
    return {
        
        createProduct : function (product) {
            return $http.post('/api/createProduct', 
                            {
                                productCategoryId : product.productCategoryId,
                                productCost : product.productCost,
                                name : product.name,
                                description : product.description,
                                productPrice : product.productPrice,
                                productImage : product.productImage

                        }
            );
        
        },
        
        
        getAllProductCategories : function () {
        
            return productCategoryService.getAllProductCategories();
        
        },
        
        getAllProducts : function () {
            
            return $http.get('/api/getAllProducts');
        },
        
        
        getIdFromEndPoint : function () {
            
            var absoluteUrl = $location.absUrl();
            var segments = absoluteUrl.split("/");
            var productCategoryId = segments[segments.length - 1];
            return productCategoryId
        
       
        }
    }

}