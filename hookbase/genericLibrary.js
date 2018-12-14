const {
    client
} = require('nightwatch-cucumber');
const {
    expect
} = require('chai');
const MAX_WAIT = 60000;


module.exports = {

    /** 
     * title of page
      @param:NA
      @return:title
     */
    getTitle: () => {
        console.log(client.getTitle());
        return {
            title: client.getTitle()
        }
    },

    /** 
     * Changes Each word's first letter to cpaital in a string
      @param:string to change
      @return:True/False
     */
    changeToUpper: function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    /** 
     * Removes white space
      @param:string to change
      @return:True/False
     */
    trimString: function trimString(str) {
        str = str.replace(/\s+$/g, '');
        str = str.replace(/^\s+/g, '');
        return str
    },

    getSelectorStrategy: function (locator) {
        if (locator.startsWith("//")) {
            return "xpath";
        } else {
            return "css selector";
        }

    },

    /**
     * @webEement : locator
     */
    setLocatorStrategy: function (webElement) {
        if (webElement.startsWith("//")) {
            client.useXpath();
        } else {
            client.useCss();
        }
    },

    /**
     * This will click on the given web element locator
     * @param {*} webElement 
     */
    doClick: function (webElement) {


        webElement = webElement.trim();
        this.setLocatorStrategy(webElement);

        client.waitForElementVisible(webElement, MAX_WAIT);
        client.click(webElement);
        return this;
    },

    /**
     * This will set text on the web element provided
     * 
     * @param {*} webElement : Web element locator
     * @param {*} text : Text to be inserted
     * @param {*} bFlag 
     */
    setText: function (webElement, text, bFlag) {
        this.setLocatorStrategy(webElement);
        client.waitForElementVisible(webElement, MAX_WAIT);
        if (bFlag === undefined) {
            client.setValue(webElement, text);
        } else {
            client.setValue(webElement, [text, client.Keys.ENTER]);
            client.pause(1000);
        }

        return this;
    },

    /**
     * It will get text from the given element. It will return an promise which will resolve to the text
     * @param {*} webElement : Web element selector
     * @param {*} presenceFlag : Whether to wait for presence or visibility
     * @param {*} callback 
     */
    getText: function (webElement, presenceFlag, callback) {
        this.setLocatorStrategy(webElement);
        if (presenceFlag) {
            client.waitForElementPresent(webElement, MAX_WAIT)

        } else {
            client.waitForElementVisible(webElement, MAX_WAIT);
        }
        return new Promise((resolve, reject) => {
            client.getText(webElement, function (result) {
                resolve(result.value);
            });
        })
    },

    /**
     * It will fetch data from an element array and return a promise which will resolve to the concatenated string 
     * @param {*} locator 
     */
    getTextFromArray: function (locator) {
        var self = this;
        var fetchText = function (callback) {
            self.getElementCount(locator).then((count) => {
                var textPromises = [];
                for (var i = 1; i <= count; i++) {
                    textPromises.push(self.getText(locator + "[" + i + "]"));
                }
                Promise.all(textPromises).then((texts) => {
                    var textString = '';
                    for (var j = 0; j < texts.length; j++) {
                        textString += texts[j];
                    }
                    callback(new Promise((resolve, reject) => {
                        resolve(textString);
                    }))

                })

            })
        }

        return new Promise((resolve, reject) => {
            fetchText((resultText) => {
                resolve(resultText);
            })
        })

    },

    /**
     * This will validate the number values
     */
    validateNumber: function (actualValue, expectedValue) {
        client.expect(expectedValue).to.be.equal(actualValue);
    },
    /**
     * This will assert the value of web elements with the given value
     * @param {*} webElement 
     * @param {*} expectedValue 
     */
    validateValue: function (webElement, expectedValue) {
        var actualValue;
        this.setLocatorStrategy(webElement);
        client.waitForElementVisible(webElement, MAX_WAIT);
        client.getValue(webElement, function (result) {
            actualValue = result.value;
            client.expect(expectedValue).to.be.equal(actualValue);

        });
    },

    /**
     * This will assert the text of web elements with the given value
     * @param {*} webElement 
     * @param {*} expectedValue 
     */
    validateText: function (webElement, expectedValue) {
        var actualValue;
        this.setLocatorStrategy(webElement);
        client.waitForElementVisible(webElement, MAX_WAIT);
        client.getText(webElement, function (result) {
            actualValue = result.value;
            expect(actualValue).to.be.equal(expectedValue);
        });

    },

    /**
     * This will assert the text of web elements with the given value
     * @param {*} webElement 
     * @param {*} expectedValue 
     */
    validateContainsText: function (webElement, expectedValue) {
        var actualValue;
        this.setLocatorStrategy(webElement);
        client.waitForElementVisible(webElement, MAX_WAIT);
        client.getText(webElement, function (result) {
            actualValue = result.value.toLowerCase();
            expect(actualValue).to.have.string(expectedValue.toLowerCase());
        });

    },

    /**
     * This will move the pointer to element provided
     * @param {*} webElement 
     */
    moveToElement: function (webElement) {
        var xCor, yCor;
        webElement = webElement.trim();
        this.setLocatorStrategy(webElement);
        client.waitForElementVisible(webElement, MAX_WAIT);
        client.getLocation(webElement, function (result) {
            xCor = result.value.x;
            yCor = result.value.y;
            client.moveToElement(webElement, xCor, yCor);
            client.pause(1000);
        })
    },

    /**
     * This will wait till the given element is present in the DOM
     */
    waitForElementPresent: function (webElement) {

        this.setLocatorStrategy(webElement);
        client.waitForElementPresent(webElement, MAX_WAIT);
        return this;
    },

    /**
     * This will wait till the given element is not present in the DOM
     */
    waitForElementNotPresent: function (webElement) {

        this.setLocatorStrategy(webElement);
        client.waitForElementNotPresent(webElement, MAX_WAIT);
        return this;
    },

    /**
     * This will wait till the given element is visible
     */
    waitForElementVisible: function (webElement) {
        this.setLocatorStrategy(webElement);
        client.waitForElementVisible(webElement, MAX_WAIT);
        return this;
    },

    /**
     * This will format the date in the job apply format
     */
    formatDateForJobApply: (date) => {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return monthNames[monthIndex] + '. ' + day;
    },

    /**
     * This will clear previously entered values in any input box
     */
    clearValue: function (webElement) {
        this.setLocatorStrategy(webElement);
        client.waitForElementVisible(webElement, MAX_WAIT);
        client.clearValue(webElement);
        client.setValue(webElement, " ");
        client.setValue(webElement, client.Keys.BACK_SPACE);
        return this;
    },

    /**
     * This check if given element is visible
     */
    isVisible: function (webElement) {
        this.setLocatorStrategy(webElement);
        
        return new Promise((resolve, reject) => {
            client.isVisible(webElement, function (result) {
                resolve(result.value);
            });
        })
    },


    /**
     * This will return the count of given element in DOM
     */
    getElementCount: function (locator) {
        var selectorStrategy = this.getSelectorStrategy(locator);
        return new Promise((resolve, reject) => {
            client.elements(selectorStrategy, locator, function (result) {
                resolve(result.value.length);
            });
        })
    },

    /**
     * This will check if a given element present on DOM
     */
    isPresent: function (webElement) {
        return this.getElementCount(webElement).then((count) => {
            if (count == 0) {
                return false;
            } else {
                return true;
            }
        });

    },


    /**
     * It will return the slector strategy for the given selector string
     */
    getSelectorStrategy: function (locator) {
        if (locator.startsWith("//")) {
            return "xpath";
        } else {
            return "css selector";
        }

    },

    /**
     * This will retrun array of elements for the given selectors
     */
    getElements: function (locator, callback) {
        var selectorStrategy = this.getSelectorStrategy(locator);

        return client.elements(selectorStrategy, locator, function (result) {
            callback(result.value)
        });

    },

    getValue : function(webElement,callback){        
        this.setLocatorStrategy(webElement);
        client.getValue(webElement, function (result) {            
            callback(result.value)
        });
    }


}
