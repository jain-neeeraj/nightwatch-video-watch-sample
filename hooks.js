const {defineSupportCode} = require('cucumber');

defineSupportCode(({Before, After}) => {
  Before(() => new Promise(resolve => {
    console.log('Before start');
    setTimeout(() => {
      console.log('Before end');
      resolve();
    }, 1000);
  }));

  After(() => new Promise(resolve => {
    console.log('After start');
  
    setTimeout(() => {
      console.log('After end');
      return this.driver.quit();
      resolve();
    }, 1000);
  }));
})