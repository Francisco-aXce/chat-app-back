/**
 * Returns a filtered array with unique items.
 * @param {any[]} arr Array to filter.
 * @returns {any[]} Filtered array with unique items.
 */
const arrayUniqueItems = (arr) => {
    return arr.filter((value, index) => arr.indexOf(value) === index);
};

module.exports = {
    arrayUniqueItems,
};
