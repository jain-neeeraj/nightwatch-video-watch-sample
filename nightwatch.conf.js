// require('env2')('.env');
const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
const PKG = require('./package.json'); // so we can get the version of the project
const BINPATH = './node_modules/nightwatch/bin/'; // change if required.
const SCREENSHOT_PATH = "./screenshots/";


require('nightwatch-cucumber')({
  cucumberArgs: ['--require', 'stepDefinitions/',
    '--format', 'json:reports/cucumber.json', 'features'],
  nightwatchOutput: true
});

module.exports = {
  page_objects_path: "pages",
  output_folder: 'reports',
  custom_assertions_path: '',
  live_output: true,
  detailed_output: false,
  disable_colors: false,
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444
  },
  // perform tests in parallel where possible
  test_workers: false,
  test_settings: {
    default: {
      launch_url: 'http://localhost:8080',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      screenshots: {
        enabled: true, // save screenshots to this directory (excluded by .gitignore)
        on_failure: true,        
        on_error : true,
        path: SCREENSHOT_PATH
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        elementScrollBehavior: 1,
        acceptSslCerts: true,
        "chromeOptions": {
          "args": ['disable-gpu','window-size=1480,1080','--no-sandbox','--lang=en-GB','--log-path=C:\\git\\ac3-e2e-tests\\chromedriver.log'],
          perfLoggingPrefs: {
            traceCategories: 'v8,blink.console,disabled-by-default-devtools.timeline'
        }
        },
        loggingPrefs: {
          'browser':     'ALL',
          'driver':      'ALL',
          'performance': 'ALL'},
      },
      screenshots: {
        enabled: true, // save screenshots to this directory (excluded by .gitignore)
        on_failure: true,
        full_Page:true,        
        on_error : true,
        path: SCREENSHOT_PATH
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        }

      }
    },
    chromeheadless: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['headless',  'disable-gpu','window-size=1480,1080','--no-sandbox','--lang=en-GB']
        },
        loggingPrefs: {'performance': 'INFO'},
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      screenshots: {
        enabled: true, // save screenshots to this directory (excluded by .gitignore)
        on_failure: true,        
        on_error : true,
        fullPage:true,
        path: SCREENSHOT_PATH
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        },
        request_timeout_options: {
          timeout: 15000,
          retry_attempts: 5
        }
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        marionette: true
      },
      selenium: {
        cli_args: {
          'webdriver.gecko.driver': geckodriver.path
        },
        request_timeout_options: {
          timeout: 15000,
          retry_attempts: 5
        }
      },
      screenshots: {
        enabled: true, // save screenshots to this directory (excluded by .gitignore)
        on_failure: true,        
        on_error : true,
        path: SCREENSHOT_PATH,
      }

    },
    chromemobile: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        "chromeOptions": {
          //"args" : ["window-size=780,800"],
          mobileEmulation: {
            deviceName: 'iPhone 6'
          },

        }
      },
      screenshots: {
        enabled: true, // save screenshots to this directory (excluded by .gitignore)
        on_failure: true,        
        on_error : true,
        path: SCREENSHOT_PATH
      },
      selenium: {
        start_process:true,
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        },
        request_timeout_options: {
          timeout: 15000,
          retry_attempts: 5
        }
      }
    },
    chromemobileheadless: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        "chromeOptions": {
          args: ['headless', 'no-sandbox', 'disable-gpu'],
          mobileEmulation: {
            deviceName: 'iPhone 6'
          },

        }
      },
      screenshots: {
        enabled: true, // save screenshots to this directory (excluded by .gitignore)
        on_failure: true,        
        on_error : true,
        path: SCREENSHOT_PATH
      },
      selenium: {
        start_process:true,
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        },
        request_timeout_options: {
          timeout: 15000,
          retry_attempts: 5
        }
      }
    }

  }

};
