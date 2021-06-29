const inquirer = require('inquirer');

const fuzzy = require('fuzzy');
const _ = require('lodash');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

/**
 *
 * @return any
 * @description Creates a new prompt to select a tribe given an array
 * @param tribes
 */
const autocomplete = (tribes) => {
    return inquirer.prompt([
        {
            type: 'autocomplete',
            name: 'tribe',
            suggestOnly: true,
            message: 'What is your Tribe?',
            searchText: 'We are searching the internet for you!',
            emptyText: 'Nothing found!',
            source: function searchTribes(answers, input) {
                input = input || '';
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        var fuzzyResult = fuzzy.filter(input, tribes);
                        resolve(
                            fuzzyResult.map(function (el) {
                                return el.original;
                            })
                        );
                    }, _.random(30, 500));
                });
            },
            pageSize: 4,
            validate: function (val) {
                let valid;

                const msg = 'You must type a valid Tribe!';

                valid = val && tribes.includes(val)

                return valid ? true : msg;
            },
        },
    ]).then(function (answers) {
        return answers
    })
}

module.exports = autocomplete
