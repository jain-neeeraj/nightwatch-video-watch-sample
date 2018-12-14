const appLibrary = require('../hookbase/applicationLibrary');
const genLibrary = require('../hookbase/genericLibrary');
const config = require('../config/testConfig.js');
const locators = require('../objectRepository/or.json');
const {
    client
} = require('nightwatch-cucumber');
const chai = require('chai');
const expect = chai.expect;

const methods = {

    doLogin: (username, pwd, userType) => {
        try {
                    genLibrary.setText(locators.loginPage.inputUsername, username);
                    genLibrary.setText(locators.loginPage.inputPassword, pwd);
                    genLibrary.doClick(locators.loginPage.btnSignIn);
                    client.pause(60000);
                    // switch (userType) {
                    //     case "CR":
                    //         genLibrary.waitForElementVisible(locators.loginPage.imageDownArrow);
                    //         break;
                    //     default:
                    //         genLibrary.waitForElementPresent(locators.loginPage.imageDownArrow);
                    //         break;
                    // }
                    return this;                
                        

        } catch (err) {
            console.log(err)
            expect.fail(err, "", "Exception occured");
            client.verify.equal(true,false);
        }
    },

    waitForPageLoad: () =>{
        genLibrary.waitForElementVisible(locators.loginPage.inputUsername);
        client.pause(10000);
        return this;
    },

    openVideo: (url) =>{
        client.url(url);
        //client.pause(60000);
        return this;

    },

    playVideo : () =>{
        genLibrary.waitForElementVisible(locators.videoPage.playButton);
        client.pause(10000);
        genLibrary.doClick(locators.videoPage.playButton);               
        client.pause(1500000);
        return true;
    },

    wait : () => {
        client.pause(300000);
        return true;
    }
}

module.exports = {
    commands: [methods],
    url: "https://bit.tube/login",
    elements: {}

};
