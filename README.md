## Usage
```javascript
var Input = require('express-parameters');

app.post('/', function (req, res) {
  var required = ['username', 'password'];
  Input.request(req.body, null, required);
  if (Input.passed()) {
        var params = Input.get();
        loginService(params.username, params.password);
        res.send('Successfully loggedin');
  } else {
        res.send('Missing parameters: ' + Input.failed.join(', '));
  }
});
```
