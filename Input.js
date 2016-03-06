/**
 * Created by jeton on 2.2.16.
 * Inputs Lib
 */

module.exports = {
    failed: [],
    validated: {},
    acceptedParams: {},
    request: function(requestBody, requestParams, required){
        var requestParams = Merge(requestBody, requestParams);
        this.reset();
        var i = 0;
        for(i; i < required.length;i++){
            var input = required[i], param = requestParams[input];
            if(param || param === 0){
                this.validate(requestParams, input);
            }else{
                this.failed.push(input);
            }
        }
        return this.validated;
    },
    validate: function (requestParams, input) {
        switch(Object.prototype.toString.call(requestParams[input])){
            case '[object String]':
                this.string(requestParams, input);
                break;
            case '[object Number]':
                this.string(requestParams, input);
                break;
            case '[object Object]':
                this.object(requestParams[input], input);
                break;
            case '[object Array]':
                this.object(requestParams[input], input, 'array');
                break;
            default:
                console.error('Unknown type of parameter received.');
                break;
        }
    },
    string: function(requestParams, input){
        if(input.length === 0 || input === ''){
            this.failed.push(input);
        }else{
            this.validated[input] = requestParams[input];
        }
    },
    object: function(inputsObject, input, type){
        var tmpInputObject = {};
        if(Object.keys(inputsObject).length !== 0){
            for (var tmpInput in inputsObject) {
                var inputValue = inputsObject[tmpInput];
                if (inputValue.length === 0 || inputValue === "" || inputValue === undefined) {
                    this.failed.push(tmpInput);
                } else {
                    if(type == 'array'){
                        tmpInputObject = [];
                        for(var i = 0; i<inputsObject.length; i++) {
                            var _tmpObj = inputsObject[i];
                            for (var key in _tmpObj) {
                                if (_tmpObj[key].length === 0 || _tmpObj[key] === "" || _tmpObj[key] === undefined) {
                                    this.failed.push(key);
                                }
                            }
                            tmpInputObject.push(inputsObject[i]);
                        }
                        this.validated[input] = tmpInputObject;
                    }else{
                        tmpInputObject[tmpInput] = inputValue;
                        this.validated[input] = tmpInputObject;
                    }
                }
            }
        }else {
            this.failed.push(input);
        }
    },
    array: function(inputsArray, input){

    },
    reset : function() {
        this.failed = [];
        this.validated = {};
    },
    passed : function() {
        if(this.failed.length === 0) {
            return true;
        } else {
            return false;
        }
    },
    get: function(){
        return this.validated;
    }
};

function Merge(obj1, obj2){
    for(var key in obj2){
        obj1[key] = obj2[key];
    }
    return obj1;
}
