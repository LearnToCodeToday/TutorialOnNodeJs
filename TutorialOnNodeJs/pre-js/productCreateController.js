angular.module("productModule")
.controller("productCreateController", productCreateController)


productCreateController.$inject = ['$scope', '$timeout',  'validationErrorMessageId', 'requiredFieldValidationService', 'validationErrorMessageId', 'productService'];


function productCreateController($scope, $timeout,  validationErrorMessageId,requiredFieldValidationService, validationErrorMessageId, productService) {
    
    
    $scope.product = {
        productId : 0, 
        productCategoryId : "",
        categoryDetails : "",
        productCost : '',
        name : '',
        description : '',
        createdDt : new Date(),
        productPrice : 0.00,
        productImage : null
    
    };
    
    
    $scope.productCategories = [];
    
    
    getProductCategories();
    function getProductCategories() {
        productService.getAllProductCategories().
            success(function (data) {
            if (data 
                    && data.productCategories 
                    && data.productCategories.length > 0) {
                $scope.productCategories = data.productCategories;

                

            }
        })
    }
    
    
    
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
    
    function clearProduct()
    {
        
        for (var productProperty in $scope.product) {
            
            if ($scope.product.hasOwnProperty(productProperty)) {
            
                if (typeof (productProperty) == 'string') {
                
                    $scope.product[productProperty] = '';
                }
            }
        }
    }
    
    
    
    
    $scope.createProduct = function () {
        
        
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage(
            [
                { name : $scope.product.name || "", errorMessage : 'please enter  name of the product\n' }, 
                { name : $scope.product.productCost || "", errorMessage : 'please enter  product category cost.\n' },

                { name : $scope.product.productCategoryId , errorMessage : "Please select product category.\n" },
                { name : $scope.product.productPrice , errorMessage : "Please enter valid product selling price.\n" },
                { name : $scope.product.description , errorMessage : "Please enter product description.\n" }
            ]);
        
        
        if (validationMessages.length > 0) {
            
            console.log($scope.product.productImage)
            
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
            productService.createProduct($scope.product)
            .success(function (data) {
                
                if (data.status 
                    && data.status == 'successful')
                    displayMessage();
                $timeout(function afterTimeOut() {
                    ClearMessage();
                    clearProduct();
            
                }, 5000);
        
            });
        }
        
    }
}