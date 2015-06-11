angular.module("productCategoryModule")
.controller("editProductCategoryController", editProductCategoryController);


editProductCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService', 'requiredFieldValidationService', 'validationErrorMessageId'];


function editProductCategoryController($scope, $timeout, productCategoryService, requiredFieldValidationService, validationErrorMessageId) {
    
    $scope.productCategory = {
        
        categoryName : "",
        categoryDetails : ""
    
    };
    
    getProductCategoryById();
    
    
    $scope.validationResult = {
        
        containsValidationError : false,
        validationSummary : ""

    }
    
    $scope.message = {
        
        containsSuccessfulMessage : false,
        successfulMessage : ""
    };
    
    
    function displayMessage() {
        
        $scope.message.containsSuccessfulMessage = true;
        $scope.message.successfulMessage = "A Record updated successfully";
    }
    
    function bindView(productCategory) {
        
        
        $scope.productCategory.categoryName = productCategory.CategoryName;
        $scope.productCategory.categoryDetails = productCategory.Details;
    }
    
    function getProductCategoryById() {
        productCategoryService.getProductCategoryById(productCategoryService.getIdFromEndPoint()).
            success(function (data) {
            
            
            if (data 
                    && data.productCategories 
                    && data.productCategories.length > 0) {
                
                
                bindView(data.productCategories [0]);

            }
        })
    }
    
    $scope.editProductCategory = function () {
        
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage(
            [
                { name : $scope.productCategory.categoryName || "", errorMessage : 'please enter  product category\n' }, 
                { name : $scope.productCategory.categoryDetails || "", errorMessage : 'please enter  product category Details.\n' }
            ]);
        
        
        if (validationMessages.length > 0) {
            
            
            $scope.validationResult.containsValidationError = true;
            
            alert(validationErrorMessageId);
            
            angular.element(validationErrorMessageId).empty();
            validationMessages.forEach(function (errorMessage) {
                
                angular.element("<li></li>")
                                .html(errorMessage)
                                .appendTo(validationErrorMessageId)
            
            });
       
        }
        else {
            
            productCategoryService.updateProductCategory($scope.productCategory, productCategoryService.getIdFromEndPoint())
            .success(function (data) {
            
                if (data 
                    && data.status 
                    && data.status == 'successful') {
                
                    displayMessage();

                }
            
            })
           
        }
    }
}