'use strict';

/**
 * Подставляет значения из объекта данных в строковый шаблон.
 *
 * @param {String} template - строка шаблона
 * @param {Object} data - объект с данными
 * @returns {String}
 */

const REGULAR_TEMPLATE = /{{\s*([^}]+)\s*}}/g;

const resolvePath = (data, path) => {
    path = path.trim();
    const keys = path.split('.');
    return keys.reduce((acc, key) => {
    if (acc == null){
        return undefined;
    }
    return acc[key];
}, data);
};

const replaceTemplateVariable = (data) => (_, path) => {
    const result = resolvePath(data, path);
    return String(result ?? '');
};

const templateEngine = (template, data) => {
    return template.replace(
        REGULAR_TEMPLATE,
        replaceTemplateVariable(data)
    );
};
