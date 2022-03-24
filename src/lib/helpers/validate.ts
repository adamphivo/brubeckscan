const validate = () => { };

validate.ethAddress = (address: string): boolean => {
    const regex = /0x[a-fA-F0-9]{40}/g;
    return regex.test(address);
};

export { validate };