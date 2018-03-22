'use strict';

module.exports.calculator = (event, context, callback) =>
{
    console.info("AWS Lambda calculator start!");

    var operand1 = event.operand1;
    var operand2 = event.operand2;
    var operator = event.operator;

    console.debug("a: " + operand1 + ", b: " + operand2 + ", op: " + operator);

    if (operand1 === undefined || operand2 === undefined || operator === undefined) {
        var errorMsg = "Invalid input!";
        console.error(errorMsg);

        return callback(errorMsg, null);
    }

    var response = {
        'a': Number(operand1),
        'b': Number(operand2),
        'op': operator
    };

    if(isNaN(response.a) || isNaN(response.b)){
        var errorMsg = "Invalid numbers!";
        console.error(errorMsg);

        return callback(errorMsg, null);
    }

    switch(operator) {
        case "add":
        case "+":
            response.c = response.a + response.b;
            break;

        case "sub":
        case "-":
            response.c = response.a - response.b;
            break;

        case "mul":
        case "*":
            response.c = response.a * response.b;
            break;

        case "div":
        case "/":
            if(response.b === 0){
                var errorMsg = "Divider can not be 0!";
                console.error(errorMsg);

                return callback(errorMsg, null);
            }

            response.c = response.a / response.b;
            break;
        default:
            var errorMsg = "Invalid operator!";
            console.error(errorMsg);

            return callback(errorMsg, null);
    }

    callback(null, response);

    console.info("AWS Lambda calculator end!");
}