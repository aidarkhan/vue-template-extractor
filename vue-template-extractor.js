const loaderUtils = require('loader-utils');

module.exports = function (source) {
    const options = loaderUtils.getOptions(this);

    let fileName = '[name].[ext]';
    let ext = 'php';
    let tabSize = 4;

    if (typeof options.fileName !== 'undefined' && options.fileName !== '') {
        fileName = options.fileName;
    }

    if (typeof options.ext !== 'undefined' && options.ext !== '') {
        ext = options.ext;
    }

    if (typeof options.tabSize !== 'undefined' && options.tabSize !== '') {
        tabSize = options.tabSize;
    }
    
    fileName = fileName.replace('[ext]', ext);
    fileName = loaderUtils.interpolateName(this, fileName, options);

    let template = source.match(/\<template\>(.*?)\<\/template\>/s);

    /**
     * Remove template tag
     */
    let html = template[0].replace(/(<template>|<\/template>)/gs, '');
    let htmlRegex = new RegExp('(^\n|\n$|^\s{' + tabSize + '}|^\t)', 'gm');

    /**
     * Remove spaces
     */
        html = html.replace(htmlRegex, '');

    let result = source.replace(template[0], '');

    this.emitFile(fileName, html);

    return result;
};