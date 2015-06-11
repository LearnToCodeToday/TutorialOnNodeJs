


var connectionProvider = require('../mysqlConnectionStringProvider.js');

var productDao = {
    
    

    createProductCategory : function (product, OnSuccessfulCallback) {
        
        var insertStatement = "INSERT INTO product SET?";
        
        var productToBeAdded = {
            
            
            ProductCategory_FK : product.productCategoryId,
            ProductCost: product.productCost,
            Name : product.name,
            Description : product.description,
            IsActive : true,
            CreatedDt : new Date(),
            ProductPrice : product.productPrice
        };
        
        console.log(productToBeAdded);
        
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        
        if (connection) {
            
            connection.query(insertStatement, productToBeAdded, function (err, result) {
                
                if (err) { 
                
                    console.log(err);
                }
                
                OnSuccessfulCallback({ status : 'successful' });
                console.log(result)
            });
            
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }

    ,

    getAllProducts : function (callback) {
        
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "Select pc.CategoryName, pc.Id as ProductCategoryId, p.Id as ProductId, p.Name, p.ProductCost, p.ProductPrice, p.CreatedDt, p.Description, SUBSTRING(p.Description,1,100) as PartialDescription, p.IsActive from product p inner join productCategory pc on p.ProductCategory_Fk = pc.Id ORDER BY p.CreatedDt DESC";
        
        if (connection) {
            
            connection.query(queryStatement, function (err, rows, fields) {
                
                if (err) { throw err; }
                
                
                console.log(rows);
                
                callback(rows);
            });
            
            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection(connection);
        }
    }
    
    
}

module.exports.productDao = productDao;


