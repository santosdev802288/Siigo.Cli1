const inquirer = require('inquirer');

const fuzzy = require('fuzzy');
//// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable '_'.
const _ = require('lodash');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

/**
 *
 * @return any
 * @description Creates a new prompt to select a tribe given an array
 * @param tribes
 */
export function autocomplete (tribes: any) {
    return inquirer.prompt([
        {
            type: 'autocomplete',
            name: 'tribe',
            suggestOnly: false,
            message: 'Write your Tribe?',
            searchText: 'We are searching the internet for you!',
            emptyText: 'Nothing found!',
            source: function searchTribes(answers: any, input: any) {
                input = input || '';
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        var fuzzyResult = fuzzy.filter(input, tribes);
                        resolve(
                            fuzzyResult.map(function (el: any) {
                                return el.original;
                            })
                        );
                    }, _.random(30, 500));
                });
            },
            pageSize: 4,
            validate: function (choice: any) {
                let valid;

                const msg = 'You must type a valid Tribe!';

                valid = choice && tribes.includes(choice.value)

                return valid ? true : msg;
            },
        },
    ]).then(function (answers: any) {
        return answers
    });
}
