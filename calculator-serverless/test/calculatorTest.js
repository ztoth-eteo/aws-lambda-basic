var expect = require('chai').expect;

var calculatorLambda = require('../handler');
var retError, retValue ;

describe('Calculator lambda test!',function(){

    context('Positive Test Case', function() {
        before('Calling calculatorLambda function', function(done) {
            var event = {
                operand1: 3,
                operand2: 2,
                operator: "+"
            };

            var context= {
                functionName: "calc"
            };

            calculatorLambda.calculator(event, context, function (error, value) {
                retError = error;
                retValue = value;
                done();
            });
        });

        it('Check that error is not returned from calculatorLambda',function(){
            expect(retError).to.be.a('null');
        });

        it('Check value returned from calculatorLambda',function(){
            expect(retValue.c).to.equal(5);

        });

    });

    context('Negative Test Case - Invalid numbers', function() {
        before('Calling calculatorLambda function', function(done) {
            var event = {
                operand1: "drei",
                operand2: 2,
                operator: "+"
            };

            var context= {
                functionName: "calc"
            };

            calculatorLambda.calculator(event, context, function (error, value) {
                retError = error;
                retValue = value;
                done();
            });
        });

        it('Check that error is not returned from calculatorLambda',function(){
            var retErrorString = retError.toString();
            expect(retError).to.equal("Invalid numbers!");
        });

        it('Check value returned from calculatorLambda',function(){
            expect(retValue).to.be.an('null');

        });

    });

});