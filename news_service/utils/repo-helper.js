function convertArrayToString(array) {
    let string = '';
    for (const key in array) {
        const element = array[key];
        if (key < array.length - 1) {
            string += `'${element}',`;
        } else string += `'${element}'`;
    }
    return string;
}

module.exports = {
    convertArrayToString
}