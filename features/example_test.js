
Feature('Example');

Scenario('Test English Site', (I) => {
    I.amOnPage('/?hl=en');
    I.see('Sign in');
});
