import { CSMSDemoPage } from './app.po';

describe('CSMS-demo App', function() {
  let page: CSMSDemoPage;

  beforeEach(() => {
    page = new CSMSDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
