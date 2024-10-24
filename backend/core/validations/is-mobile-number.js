module.exports = (value) => {
    const pattern = /^(91)[6789]\d{9}$/;
    return pattern.test(value);
};