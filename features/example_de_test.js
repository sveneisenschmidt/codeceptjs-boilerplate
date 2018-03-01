
Feature('Example German');

Scenario('Test German Site', (I) => {
    I.amOnPage('/?hl=de');
    I.see('Anmelden');
});
