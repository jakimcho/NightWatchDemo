const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

require('nightwatch-cucumber')({
  cucumberArgs: [
    '--require-module', 'babel-core/register',
    '--require', 'lib/step_definitions',
    '--format', 'json:reports/cucumber.json',
    //'--format', 'node_modules/cucumber-pretty',
    'features']
});

module.exports = {
  output_folder: 'reports',
  custom_assertions_path: '',
  live_output: false,
  disable_colors: false,
  page_objects_path: 'lib/page_objects',
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:8087',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['incognito', 'no-sandbox']
          //args: ['incognito', 'headless', 'no-sandbox', 'disable-gpu']
        }
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        }
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      chromeOptions: {
        args: ['incognito', 'no-sandbox']
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
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
        }
      }
    }
  }

};
