const assert = require('assert');
const assignments = require('../src/assignments');

describe('assignments', function () {
    it('should find manchester', function () {
        assert.ok(assignments['MANCHESTER'])
    });

    it('should not find jamaca', function () {
        assert.ifError(assignments['JAMACA'])
    });
    
    it('should all be uppercase', function () {
        Object.keys(assignments).forEach(function (key) {
            assert.equal(key.toUpperCase(), key);
        })
    });
});