angular.module("productModule")
.controller("viewProductController", viewProductController);


viewProductController.$inject = ['$scope', '$timeout', 'productService'];


function viewProductController($scope, $timeout, productService) {
    
    
    
    
    $scope.products = [];
    
    getAllProducts();
    
    function getAllProducts() {
        productService.getAllProducts().
            success(function (data) {
            
            console.log(data);
            if (data 
                    && data.products 
                    && data.products.length > 0) {
                
                
                
                $scope.products = data.products;

            }
        })
    }
    
    
    $scope.onHeaderClick = function ($event)
    {
        
        var nodeValue = $($event.target)[0].attributes['data-order'].nodeValue;
        
        
       
        
    }
    
    
    $scope.productDetailsView = {
    
    
            productCategoryName : "",
            productName : "",
            productDescription : "",
            productPrice : "",
            productSellingPrice : "",
            productReleaseDate : ""
    
    }

   

    $scope.showProductDetailsInformation = function (product) {
        $scope.productDetailsView.productCategoryName = product.CategoryName;
        $scope.productDetailsView.productName = product.Name;
        $scope.productDetailsView.productDescription = product.Description;
        $scope.productDetailsView.productPrice = product.ProductCost;
        $scope.productDetailsView.productSellingPrice = product.ProductPrice;
        $scope.productDetailsView.productReleaseDate = product.CreatedDt;
    }
    
    
}