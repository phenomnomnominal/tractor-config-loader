// Constants:
import { DEFAULT_CONFIG, DEFAULT_FEATURES_CONFIG, DEFAULT_PAGE_OBJECTS_CONFIG, DEFAULT_STEP_DEFINITIONS_CONFIG } from './default.conf.js';
const CONFIG_FILE_NAME = 'tractor.conf.js';
const EMPTY_TAG = '';

// Utilites:
import path from 'path';
import { info } from 'tractor-logger';

// Dependencies:
import defaults from 'lodash.defaults';
import minimist from 'minimist';

let config;
export function getConfig () {
    config = config || loadConfig();
    return config;
}

export function loadConfig () {
    info('Loading config...');
    let args = minimist(process.argv.slice(2));
    let configPath = path.resolve(process.cwd(), args.config || CONFIG_FILE_NAME);

    let config;
    try {
        config = require(configPath);
        config = config.default ? config.default : config;
    } catch (e) {
        config = {};
    }
    config = defaults(config, DEFAULT_CONFIG);
    config.features = defaults(config.features, DEFAULT_FEATURES_CONFIG);
    config.pageObjects = defaults(config.pageObjects, DEFAULT_PAGE_OBJECTS_CONFIG);
    config.stepDefinitions = defaults(config.stepDefinitions, DEFAULT_STEP_DEFINITIONS_CONFIG);

    config.tags = sortTags(config.tags);

    return config;
}

function sortTags (tags) {
    // Remove empty tag
    if (tags.includes(EMPTY_TAG)) {
        let index = tags.indexOf(EMPTY_TAG);
        tags.splice(index, 1);
    }

    // Add @s
    tags = tags.map(tag => tag.startsWith('@') ? tag : `@${tag}`);

    // Add empty tag to start
    tags.unshift(EMPTY_TAG);
    return tags;
}
