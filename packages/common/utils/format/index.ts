import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const format = () => { };

format.cleanInput = (input: string) => {
    return input.trim().toLowerCase();
}

format.ethAddress = (address: string) => {
    const start = address.slice(0, 5);
    const end = address.slice(-5);
    return `${start} ... ${end}`;
};

format.dataTokenAmount = (amount: string | number) => {
    return Math.round(+amount);
};

format.percentage = (percentage: string | number) => {
    const round = Math.round(+percentage * 100);
    return `${round} %`;
};

format.getFromNow = (date: string) => {
    dayjs.extend(relativeTime);
    const fromNow = dayjs(date).fromNow();
    return fromNow;
}

format.numberWithSpaces = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export { format };