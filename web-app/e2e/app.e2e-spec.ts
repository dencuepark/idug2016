import { KrangDemoPage } from './app.po';

describe('krang-demo App', function() {
  let page: KrangDemoPage;

  beforeEach(() => {
    page = new KrangDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
