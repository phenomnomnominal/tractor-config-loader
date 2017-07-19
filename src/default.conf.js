export const DEFAULT_CONFIG = {
    directory: './tractor',
    port: 4000,
    environments: [
        'http://localhost:8080'
    ],
    tags: [],
    beforeProtractor: () => {},
    afterProtractor: () => {}
};

export const DEFAULT_FEATURES_CONFIG = {
    directory: './tractor/features'
};

export const DEFAULT_PAGE_OBJECTS_CONFIG = {
    directory: './tractor/page-objects'
};

export const DEFAULT_STEP_DEFINITIONS_CONFIG = {
    directory: './tractor/step-definitions'
};
