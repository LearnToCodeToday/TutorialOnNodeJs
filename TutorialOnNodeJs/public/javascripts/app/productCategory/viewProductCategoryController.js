angular.module("productCategoryModule")
.controller("viewProductCategoryController", viewProductCategoryController);


viewProductCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService'];


function viewProductCategoryController($scope, $timeout, productCategoryService) {
    
    $scope.productCategories = [];
    
    getAllProductCategories();
    
    function getAllProductCategories() { 
        productCategoryService.getAllProductCategories().
            success(function (data) {

            if (data 
                    && data.productCategories 
                    && data.productCategories.length > 0) {
            
                $scope.productCategories = data.productCategories;

                //alert($scope.productCategories[0].Id);
            }
        })
    }
    
    $scope.currentProductCategoryId = 0;
    
    $scope.setCurrentProductCategoryId = function (productCategoryId) {
    
        $scope.currentProductCategoryId = productCategoryId;
    }

    $scope.deleteProductCategory = function () {
        
        if ($scope.currentProductCategoryId > 0) { 
            productCategoryService.deleteProductCategoryById($scope.currentProductCategoryId)
            .success(function (data){
                if (data 
                    && data.status 
                    && data.status == 'successful') {
                    window.location.href = '/viewProductCategory';
                }
            })
        }
    }
}