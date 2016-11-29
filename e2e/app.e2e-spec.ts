import { Manuscripta2bPage } from './app.po';

describe('manuscripta2b App', function() {
  let page: Manuscripta2bPage;

  beforeEach(() => {
    page = new Manuscripta2bPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
