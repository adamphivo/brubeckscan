const Format = () => { };

Format.tokenValue = (value: any) => {
    function round(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    function numberWithSpaces(x) {
        var parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    }

    value = parseInt(value);

    value = round(value);
    value = numberWithSpaces(value);

    return value;
}


export default Format;