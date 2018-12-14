const {
  client
} = require('nightwatch-cucumber');
const {
  defineSupportCode
} = require('cucumber');

const genLibrary = require('../hookbase/genericLibrary');
const apiConnect = require('../hookbase/apiRequests.js');
const config = require('../config/testConfig.js');
const appLibrary = require('../hookbase/applicationLibrary');
let assert = require('chai').assert;
let expect = require('chai').expect;
var data = require('../testData/globalData.json');
const locators = require('../objectRepository/or.json');

data = Object.assign(data, global.config);

const bittube = client.page.bittube();


defineSupportCode(({
  Given,
  Then,
  When
}) => {
  Given(/^Launch Video Site$/, () => {

    bittube.navigate();
    bittube.waitForPageLoad();
    return bittube; 

  });

  When(/^User "([^"]*)" performes login$/, (userType) => {

    var userName, password;

    switch (userType) {
      case "User1":
        userName = data.userCredentials.User1UserName;
        password = data.userCredentials.User1Password;
        break;
    }
    bittube.doLogin(userName, password, userType);
    return bittube;

  });


  When(/^User Opens and play the video$/, () => {

    
    bittube.openVideo(data.video_url_1);
    bittube.playVideo();
    bittube.wait();
    
    return bittube;

  });
  
  When(/^User waits for video to get completed$/, () => {

    
    bittube.wait();
    
    return bittube;

  });

   



});