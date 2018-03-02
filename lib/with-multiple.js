const createMultiple = require('./create-multiple.js');

module.exports = (size, config, helper) => {
    config.multiple = createMultiple(
        size,
        config.tests,  
        { 'browsers': [config.helpers[helper]] }
    );
    
    return config;
};