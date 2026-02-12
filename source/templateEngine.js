'use strict';

/**
 * Регулярное выражение для поиска переменных в шаблоне.
 * @type {RegExp}
 */
const REGULAR_TEMPLATE = /{{\s*([^}]+)\s*}}/g;

/**
 * Возвращает значение из объекта по строковому пути.
 *
 * @param {Object} data - объект с данными
 * @param {String} path - путь к свойству
 * @returns {*} значение по указанному пути или undefined, если путь не существует
 */
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

/**
 * Создаёт функцию-обработчик для метода replace,
 * которая подставляет значение переменной из объекта данных.
 *
 * @param {Object} data - объект с данными
 * @returns {Function} - функция для замены найденной переменной
 */
const replaceTemplateVariable = (data) => (_, path) => {
    const result = resolvePath(data, path);
    return String(result ?? '');
};

/**
 * Подставляет значения из объекта данных в строковый шаблон.
 *
 * @param {String} template - строка шаблона
 * @param {Object} data - объект с данными
 * @returns {String}
 */
const templateEngine = (template, data) => {
    return template.replace(
        REGULAR_TEMPLATE,
        replaceTemplateVariable(data)
    );
};
