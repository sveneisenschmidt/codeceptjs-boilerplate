
Feature('Example English');

Scenario('Test English Site', (I) => {
    I.amOnPage('/?hl=en');
    I.see('Sign in');
});
