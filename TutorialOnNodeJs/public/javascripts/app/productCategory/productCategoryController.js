angular.module("productCategoryModule")
.controller("productCategoryController", productCategoryController)


productCategoryController.$inject = ['$scope', '$timeout', 'productCategoryService', 'requiredFieldValidationService', 'validationErrorMessageId'];


function productCategoryController($scope, $timeout,  productCategoryService, requiredFieldValidationService, validationErrorMessageId) {
    

    $scope.productCategory = {
    
        categoryName : "",
        categoryDetails : ""
    
    };
     
    
    $scope.message = {
    
        containsSuccessfulMessage : false,
        successfulMessage : ""
    };
    
    
    $scope.validationResult = {
        
        containsValidationError : false,
        validationSummary : ""

    };

    
    
    function clearProductCategory() {
        $scope.productCategory.categoryName = "";
        $scope.productCategory.categoryDetails = "";
    }
    
    function ClearMessage() { 
    
        $scope.message.containsSuccessfulMessage = false;
        $scope.message.successfulMessage = "";
    }
    function displayMessage() {
    
        $scope.message.containsSuccessfulMessage = true;
        $scope.message.successfulMessage = "A Record added successfully";
    }
    
    
    

    $scope.createProductCategory = function (productCategory) {
        
        
        var validationMessages = requiredFieldValidationService. getRequiredFieldValidationErrorMessage(
            [
                { name : $scope.productCategory.categoryName || "", errorMessage : 'please enter  product category\n' }, 
                { name : $scope.productCategory.categoryDetails || "", errorMessage : 'please enter  product category Details.\n' }
            ]);
        
        
        if (validationMessages .length > 0) {
            
           
            $scope.validationResult.containsValidationError = true;
            
            
            angular.element(validationErrorMessageId).empty();
            validationMessages.forEach(function (errorMessage) {
                
                angular.element("<li></li>")
                                .html(errorMessage)
                                .appendTo(validationErrorMessageId)
            
            });

        }
        else {
            
            $scope.validationResult.containsValidationError = false;
            productCategoryService.createProductCategory(productCategory)
            .success(function (data) {
                
                    if (data.status 
                        && data.status == 'successful')
                        displayMessage();
                    $timeout(function afterTimeOut() {
                        ClearMessage();
                        clearProductCategory();
            
                    }, 5000);
        
                });
        }
        
    }
}