require('@babel/register')();

global.inject = global.provides = function () {
    return klass => klass;
};
