const { When, Then} = require('cucumber');
const assert = require('assert');

const {getApproximationToMaxDigits} = require('../script/mathHelper.js');

Then('in the display screen should be show a 0', async function ()
{
    assert.equal(getApproximationToMaxDigits(99.999, 4), '100.0');
});