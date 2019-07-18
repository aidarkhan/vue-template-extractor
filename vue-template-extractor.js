const loaderUtils = require('loader-utils');

module.exports = function (source) {
    const options = loaderUtils.getOptions(this);

    let fileName = '[name].[ext]';
    let ext = 'php';

    if (typeof options.fileName !== 'undefined' && options.fileName !== '') {
        fileName = options.fileName;
    }

    if (typeof options.ext !== 'undefined' && options.ext !== '') {
        ext = options.ext;
    }
    
    fileName = fileName.replace('[ext]', ext);
    fileName = loaderUtils.interpolateName(this, fileName, options);

    let template = source.match(/\<template\>(.*?)\<\/template\>/s);

    /**
     * Remove template tag
     */
    let html = template[0].replace(/(<template>|<\/template>)/gs, '');

    /**
     * Remove spaces
     */
        html = html.replace(/(^\n|\n$|(^\s{4}|^\s{2})|^\t)/gm, '');

    let result = source.replace(template[0], '');

    this.emitFile(fileName, html);

    return result;
};