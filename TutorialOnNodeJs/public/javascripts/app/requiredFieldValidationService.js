angular.module("productCategoryModule")
.factory("requiredFieldValidationService", requiredFieldValidationService);




function requiredFieldValidationService() {
    
    function _getRequiredValidationMesssage(requiredInfos) {
        var errorMessages = [];
        if (requiredInfos.length > 0) {
            angular.forEach(requiredInfos, function (requiredInfo) {
                
                if (
                        requiredInfo.name !== 'undefined' 

                        && 

                        (
                          requiredInfo.name === null 
                            || requiredInfo.name == '' 
                            || requiredInfo.name.length == 0)
                    ) {
                    errorMessages.push(requiredInfo.errorMessage);
                }
            });
        }
        return errorMessages;
    }
    

    return {
    
        getRequiredFieldValidationErrorMessage : _getRequiredValidationMesssage
    
    };
}