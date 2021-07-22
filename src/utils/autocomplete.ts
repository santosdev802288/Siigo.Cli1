import Generator =  require('yeoman-generator');

import * as fuzzy from 'fuzzy';
import _ from 'lodash';
import AutocompletePrompt from 'inquirer-autocomplete-prompt'


export function registerAutocomplete(generator: Generator): void{
    generator.env.adapter.promptModule.registerPrompt('autocomplete', AutocompletePrompt)
}

/**
 *
 * @return any
 * @description Creates a new prompt to select a tribe given an array
 * @param tribes
 */
export function autocompleteTribe(tribes: any) {
    const question = {
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
                    const fuzzyResult = fuzzy.filter(input, tribes);
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
            const msg = 'You must type a valid Tribe!';

            const valid = choice && tribes.includes(choice.value)

            return valid ? true : msg;
        },
    };

    if (process.env.NODE_ENV === 'test') {
        question.type = 'input'
    }

    return question
}
