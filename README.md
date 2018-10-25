# CYFAutoAssign
[![Build Status](https://travis-ci.org/HarryEMartland/CYFAutoAssign.svg?branch=master)](https://travis-ci.org/HarryEMartland/CYFAutoAssign)

Assigns deals to the user configured in assignments.js based on the deals, persons city. If no mapping is found the deal is left alone

#### Package the app ready for upload to aws
`npm run zip`

#### Run the app locally
You will need to set the environment variables `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `PIPEDRIVE_KEY`  
`npm start`