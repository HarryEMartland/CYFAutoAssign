const fetch = require('node-fetch');
const assignments = require('./assignments');

const pipedriveKey = process.env.PIPEDRIVE_KEY;
const pipedriveBaseUrl = 'https://api.pipedrive.com/v1/';
const personCity = '34621972a532f75f010b784dc6b7ac1d8c0ef72a';
const generalUserId = '2076983';
const generalApplicationStage = '1';
const dealLimit = 30;//to stop the request limit running out when updating

exports.handler = function (event, context, callback) {

    findNewApplicants()
        .then(function (deals) {
            return Promise.all(deals.map(processDeal));
        })
        .then(function () {
            callback(null, null);
        })
        .catch(function (error) {
            console.error(error);
            callback(error, null);
        })
};

function findNewApplicants() {
    return fetch(pipedriveBaseUrl + '/deals?&limit=' + dealLimit + '&user_id=' + generalUserId + '&stage_id=' + generalApplicationStage + '&status=open&api_token=' + pipedriveKey)
        .then(body => body.json())
        .then(response => response.data || []);
}

function findPersion(id) {
    return fetch(pipedriveBaseUrl + '/persons/' + id + '?api_token=' + pipedriveKey)
        .then(body => body.json())
        .then(response => response.data || {});
}

function moveDeal(dealId, assignment) {
    return fetch(pipedriveBaseUrl + '/deals/' + dealId + '?api_token=' + pipedriveKey, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": assignment
        })
    });
}

function processDeal(deal) {
    return findPersion(deal.person_id.value)
        .then(function (person) {
            const assignment = assignments[person[personCity].trim().toUpperCase()];
            if (assignment) {
                return moveDeal(deal.id, assignment).then(function () {
                    console.log("Moved deal " + deal.id + ' to user ' + assignment)
                });
            }else{
                console.log("Unknown city " + person[personCity])
            }
        })
}
