
Feature('Example French');

Scenario('Test French Site', (I) => {
    I.amOnPage('/?hl=fr');
    I.see('Connexion');
});
