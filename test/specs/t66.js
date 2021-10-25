'use strict';

require('dotenv').config()  

const {
  ClassicRunner,
  RunnerOptions,
  Eyes,
  Target,
  Configuration,
  RectangleSize,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation,
  multiremote
} = require('@applitools/eyes-webdriverio');

let eyes;
let configuration;
let runner;

describe('start', function () {

  before(async () => {
    // Create a runner with concurrency of 5
    // You can increase this value if your plan supports a higher concurrency

    const runnerOptions = new RunnerOptions().testConcurrency(1);

    runner = new ClassicRunner(runnerOptions);

    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.

    eyes = new Eyes(runner);

    if (browser.config.enableEyesLogs) {
      eyes.setLogHandler(new ConsoleLogHandler(true));
    }

    // Initialize the eyes configuration

    configuration = eyes.getConfiguration();

    // use new Configuration() when not setting eyes setter methods. e.g. eyes.setLogHandler() etc...
    // new Configuration();

    // You can get your api key from the Applitools dashboard

    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)

    // create a new batch info instance and set it to the configuration

    // configuration.setBatch(new BatchInfo('Experiment'))
  });


  beforeEach(async function () {
    const appName = await this.test.parent.title;
    const testName = await this.currentTest.title;

    configuration.setAppName(appName);
    configuration.setTestName(testName);

    // Set the configuration to eyes

    eyes.setConfiguration(configuration);

    browser = await eyes.open(browser);

    // const browser = await multiremote({
    //     myChromeBrowser: {
    //         capabilities: {
    //             browserName: 'chrome'
    //         }
    //     },
    //     myFirefoxBrowser: {
    //         capabilities: {
    //             browserName: 'firefox'
    //         }
    //     }
    // })

  });

  it('T66', async () => {
    await browser.deleteCookies()
    await browser.setWindowSize(1440, 1440) //914

    await browser.url('https://www.coop.se/');
    
    const consentButton = await browser.$('.cmpboxbtn.cmpboxbtnyes');
    await consentButton.click();
    
    await browser.setCookies({
      name: 'abtest',
      value: 'true'
    })

    await browser.url('https://www.coop.se/');
    let searchInput = await browser.$('.Search-input');
    await searchInput.click();
    await searchInput.setValue('test');
    await browser.$('.Search.is-active');
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    await eyes.check('Globala sök-dropdown', Target.window());

    await browser.url('https://www.coop.se/globalt-sok/?query=mor%C3%B6tter');
    await browser.pause(1000);
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    //fastnar här!?
    await eyes.check('Globala söket', Target.window());

    await browser.url('https://www.coop.se/handla/');
    searchInput = await browser.$('.Search-input');
    await searchInput.click();
    await searchInput.setValue('test');
    await browser.$('.Search.is-active');
    await browser.pause(1000);
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    await eyes.check('handla sök-dropdown', Target.window());

    await browser.url('https://www.coop.se/handla/sok/?q=test');
    await browser.pause(3000);
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    await eyes.check('handla sök', Target.window());

    await browser.url('https://www.coop.se/handla/varor/vegetariskt');
    await browser.pause(1000);
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    await eyes.check('kategori', Target.window());

    await browser.url('https://www.coop.se/handla/aktuella-erbjudanden');
    await browser.pause(1000);
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    await eyes.check('aktuella erbjudanden', Target.window());

    await browser.url('https://www.coop.se/handla/anglamark');
    await browser.pause(1000);
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    await eyes.check('Änglamarksbutiken', Target.window());

    await browser.url('https://www.coop.se/handla/xtra');
    await browser.pause(1000);
    await browser.execute(() => {
      document.querySelectorAll('iframe').forEach(iframe => iframe.remove());
    });
    await eyes.check('Xtrabutiken', Target.window());
   
    await eyes.closeAsync();
  });

  afterEach(async () => {
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortAsync();
  });

  after(async () => {
    // const results = await runner.getAllTestResults(false);
    // console.log(results);
  });

});