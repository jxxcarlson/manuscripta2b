import { browser, element, by } from 'protractor';

export class Manuscripta2bPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
