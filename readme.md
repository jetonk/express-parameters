## Usage
```javascript
var Input = require('input');

app.post('/', function (req, res) {
  var required = ['username', 'password'];
  Input.request(null, req.params, required);
  if (Input.passed()) {
        var params = Input.get();
        loginService(params.username, params.password);
        res.send('Successfully loggedin');
  } else {
        res.send('Missing parameters: ' + Input.failed.join(', '));
  }
});
```