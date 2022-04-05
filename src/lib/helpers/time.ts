const time = () => { };

time.since = function (date: any, format: any): string {
    const now = new Date();
    const diff = Math.round(Math.abs(now as any - date as any) / 1000 / 60 * -1);
    const rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
    const timeSinceLastClaim = rtf.format(diff, format);
    return timeSinceLastClaim;
}

export { time };