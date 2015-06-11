angular.module("productCategoryModule")
.factory("productCategoryService", productCategoryService);


productCategoryService.$inject = ['$http', '$location'];


function productCategoryService($http, $location) {
    
    return {
        
        createProductCategory : function (productCategory) {
            return $http.post('/api/createProductCategory', 
                            {
                categoryName : productCategory.categoryName,
                details : productCategory.categoryDetails
            }
            );
        
        },
        
        getAllProductCategories : function () {
            
            return $http.get('/api/getAllProductCategory');
        },
        
        
        getIdFromEndPoint : function () {
            
            var absoluteUrl = $location.absUrl();
            var segments = absoluteUrl.split("/");
            var productCategoryId = segments[segments.length - 1];
            return productCategoryId
        
        },
        
        getProductCategoryById : function (productCategoryId) {
            
            //console.log(productCategoryId);
            return $http.get('/api/getProductCategoryById/' + productCategoryId);
        },
        
        updateProductCategory  : function (productCategory, productCategoryId) {
            
            console.log(productCategory.categoryName);
            console.log(productCategory.categoryDetails);
            
            console.log(productCategoryId);
            
            return $http.post('/api/updateProductCategory', 
                            {
                categoryName : productCategory.categoryName,
                details : productCategory.categoryDetails,
                productCategoryId : productCategoryId
            }
            );

        }

        ,

        deleteProductCategoryById : function (productCategoryId) { 
        
        
          //return  $http.delete('/deleteProductCategoryById/' + productCategoryId);

            return $http['delete']('/api/deleteProductCategoryById/' + productCategoryId);

        }
    }

}