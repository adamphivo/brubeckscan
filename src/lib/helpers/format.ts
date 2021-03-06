const Format = () => { };

Format.tokenValue = (value: any) => {
    function round(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    function numberWithSpaces(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    value = parseInt(value);

    value = round(value);
    value = numberWithSpaces(value);

    return value;
};

Format.shortenNodeAddress = (address: string) => {
    const start = address.slice(0, 5);
    const end = address.slice(-5);
    const separator = " ... ";
    return `${start}${separator}${end}`;
};

Format.twoDecimals = (value: any) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
};

Format.timestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default Format;