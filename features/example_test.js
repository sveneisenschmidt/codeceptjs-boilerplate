
Feature('Example');

Scenario('test something', (I) => {
  I.amOnPage('/?hl=en');
  I.see('Sign in');
});
