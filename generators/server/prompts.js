module.exports = {
    promptingMain,
    promptingModules
};

function promptingModules() {
    const modulePrompts = [{
        type: 'input',
        name: 'moduleName',
        validate: input =>
            /^([a-z_][a-z0-9_\-]*)$/.test(input)
                ? true
                : 'The module name you have provided is not valid (only lowercase).',
        message: 'Define your module name?',
        default: 'module'
    }, {
        type: 'confirm',
        name: 'repeat',
        message: 'Do you want to add more modules?',
        default: 'Y'
    }]

    this.configOptions.modules = [];

    const loop = (relevantPrompts) => {
        return this.prompt(relevantPrompts).then(props => {
            this.configOptions.modules.push(props);

            return props.repeat ? loop(modulePrompts) : this.prompt([]);

        })
    }

    return loop([...modulePrompts]);
}

function promptingMain() {

    const done = this.async();

    const prompts = [
        {
            type: 'string',
            name: 'appName',
            validate: input =>
                /^([a-z_][a-z0-9_\-]*)$/.test(input)
                    ? true
                    : 'The application name you have provided is not valid (only lowercase).',
            message: 'What is the application name (only lowercase)?',
            default: 'myservice'
        },
        {
            type: 'string',
            name: 'groupId',
            validate: input =>
                /^([a-z_][a-z0-9_]*(\.[a-z_][a-z0-9_]*)*)$/.test(input)
                    ? true
                    : 'The groupId you have provided is not a valid (only lowercase).',
            message: 'What is the groupId (only lowercase)?',
            default: 'com.mycompany.myservice'
        }
    ];

    this.prompt(prompts).then(answers => {
        Object.assign(this.configOptions, answers);
        this.configOptions.packageFolder = this.configOptions.groupId.replace(/\./g, '/');
        done();
    });
}