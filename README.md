# stackoverflow-lite

[![Build Status](https://travis-ci.org/anasey01/stackoverflow-lite.svg?branch=feature)](https://travis-ci.org/anasey01/stackoverflow-lite) [![Coverage Status](https://coveralls.io/repos/github/anasey01/stackoverflow-lite/badge.svg?branch=feature)](https://coveralls.io/github/anasey01/stackoverflow-lite?branch=feature)

# Description
We sometimes are stuck in a dilema as to how somethings work most espectially when it comes to technology. StackOverFlow-Lite is designed to fill the gap by providing people in the technology space the access to ask questions and to share their wealth of knowledge to those in need of it.

## Documentation
You can;
- Ask Questions `POST /api/v1/question`
- Get All Questions `GET /api/v1/questions`
- Get a Specific Question `GET /api/v1/question/<questionId>`
- Provide answers to questions `POST /api/v1/<questionId>/answer`
- Register `POST /api/v1/auth/signup`
- Login `POST /api/v1/auth/login`

## Setup
After cloning this repo by running `git clone https://github.com/anasey01/stackoverflow-lite.git`, `cd` into it and run `npm install` to get all dependencies and dev-dependencies. Then run `npm run production` to have app working.
### Dependencies
- NPM, Node JS,  Express, PostgreSQL (DataBase), Mocha && Chai (Testing), Babel (Transpile to ES5)

## Testing

`npm run test` Loads the tests


App construction still in progress...
