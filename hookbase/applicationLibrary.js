const {
    client
} = require('nightwatch-cucumber');
const util = require('util');
const enviornmentDetails = require('../config/environmentVariables');
const config = require('../config/testConfig.js')
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
let enviornmentValue, elementCount;


module.exports = {


    /** 
     * Function to get dynamic page element
      @param:pageName: Name of page,elementName: Name of Elementfrom page,date: value to be changed
      @return:New element with changed value
     */
    getDynamicElement: function (pagename, elementName, data, callback) {
        var self = this;
        try {
            var page_obj = client.page[pagename]();
            var element = page_obj.elements[elementName.slice(1)];
            return util.format(element.selector, data);

        } catch (err) {
            console.log(err.line);
            throw "Unable to find dynamic element: " + elementName + "in Page: " + pagename;
            console.log("Exception has occured at line no " + err.line + " complete log is:" + err);
        }

        return this;
    },


    /** 
     * Function to change element Value
      @param:
          @pageName: Name of page
          @elementName: Name of Elementfrom page
          @replaceValue: Value that needs to be replaced
          @replaceWithValue:value to which needs to be replaced
      @return:New element with changed value
     */
    updateLocator: function (pagename, elementName, replaceValue, replaceWithValue, callback) {
        var self = this;
        try {
            var page_obj = client.page[pagename]();
            console.log(page_obj)
            var element = page_obj.elements[elementName.slice(1)];
            console.log(element.selector)
            element = element.selector.toString()
            console.log(element)
            //return util.format(element.selector, data);
            return element.replace(replaceValue, replaceWithValue)

        } catch (err) {
            console.log(err);
            throw "Unable to find dynamic element: " + elementName + "in Page: " + pagename;
        }

        return this;
    },
    updateLocatorDetails: function (elementLocator, valueToReplace, replacedValue, callback) {
        try {
            if (elementLocator !== undefined) {

            }
        } catch (err) {
            console.log("Exception has occured at line no " + err.line + " complete log is:" + err);
        }

    },

    /** 
     * Function to wait for page load
      @param:NA
      @return:
     */
    waitForPageLoad: function () {
        client.execute('window.onload = function(){ return; };');
        return this;
    },


    /** 
     * Function to get enviornment values predefined
      @param:
          @enviornmentName:(Expected Values:url,username,password)
      @returns: enviornmentValue
     */
    getEnviornmentDetails: function (enviornmentName) {
        switch (enviornmentName) {

            case "url":
                let envName = enviornmentDetails.testEnv;

                if (envName == "QA") {
                    enviornmentValue = config.testURLQA;
                    global.config = require('../testData/qaData.json');
                } else if (envName == "INT") {
                    enviornmentValue = config.testURLINT;
                    global.config = require('../testData/intData.json');
                } else if (envName == "UAT") {
                    enviornmentValue = config.testURLUAT;
                    global.config = require('../testData/uatData.json');
                } else if (envName == "PROD") {
                    enviornmentValue = config.testURLPROD;
                    global.config = require('../testData/prodData.json');
                } else {
                    enviornmentValue = config.testURLQA;
                    global.config = require('../testData/qaData.json');
                }
                console.log("enviornmentValue : " + enviornmentValue);
                break;

            case "username":
                enviornmentValue = enviornmentDetails.userNameLogin;
                break;
            case "password":
                enviornmentValue = enviornmentDetails.passwordLogin;
                break;
            default:
                console.log("..........Please provide valid enviornment value");
        }
        return {
            enviornmentValue: enviornmentValue
        }

    },

    /** 
    * Function to get elements count
     @param:
         pagename: Name of page,
         elementName: Name of locator from page that needs to be evaluated
     @returns: elementCount
    */
    verifyElementsCount: function (pagename, elementName, expectedElementCount) {
        var page_obj = client.page[pagename]();
        console.log(page_obj)
        var element = page_obj.elements[elementName.slice(1)].selector;
        var selectorType = page_obj.elements[elementName.slice(1)].locateStrategy;
        console.log("element name" + element)
        flag = false;
        client.elements(selectorType, element, function (result) {
            console.log(result)
            elementCount = result.value.length
            console.log('no of element:' + elementCount)
            expect(elementCount).to.equal(expectedElementCount)
            flag = true;
        })
        return flag

    }


};