const fetch = require('node-fetch');
const assignments = require('./assignments');

const pipedriveKey = process.env.PIPEDRIVE_KEY;
const pipedriveBaseUrl = 'https://api.pipedrive.com/v1/';
const personCity = '34621972a532f75f010b784dc6b7ac1d8c0ef72a';

fetch(pipedriveBaseUrl + '/persons?start=700&api_token=' + pipedriveKey)
    .then(body => body.json())
    .then(response => response.data || [])
    .then(function (persons) {
        persons
            .filter(person=>person[personCity])
            .filter(person=>assignments[(person[personCity]).toUpperCase()] == null)
            .forEach(function (person) {
                console.log(person[personCity], person.id)
            })
    });