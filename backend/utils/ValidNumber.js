
const ValuidNumber = (value) => {
    const regex = /^[0-9]\d*$/;
    return regex.test(value);

}

module.exports = ValuidNumber;