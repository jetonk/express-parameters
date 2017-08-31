## Install
``
    npm install express-parameters
``

## Usage
1) Call express-parameters in your controller or route.
    
    ``
    var ExpressParameters = require('express-parameters');
    ``
2) Specify required fields in a array, in this case we assume that we are using the Validator for any auth route.

    ``
        var required = ['username', 'password'];
    ``
    
3) In ExpressJS we have the req.body object, which contain our parameters sent from the client, and we pass req.body object to the validator together with our array with our required fields.
    
    ``
            ExpressParameters.request(req.body, null, required);
    ``
4)  Using Scenario.

    ````javascript
        if (ExpressParameters.passed()) {
            // If Validation Passed
            var parameters = ExpressParameters.get(); // We get the parameters
            // Do something
            res.send('Successfully loggedin');
        } else {
            // If Validation Failed return error message
            res.send('Missing parameters: ' + ExpressParameters.failed.join(', '));
        }
    ````
    