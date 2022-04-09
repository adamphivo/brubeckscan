export async function getDataSent(address: string) {
    const streamrAddress = "0x3979f7d6b5c5bfa4bcd441b4f35bfa0731ccfaef";
    return await fetch("https://api.thegraph.com/subgraphs/name/streamr-dev/data-on-polygon", {
        "method": "POST",
        "headers": {
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Connection": "keep-alive",
            "DNT": "1",
            "Origin": "file://"
        },
        "body": `{"query":"{\\n  erc20Transfers(where: {from: \\"${streamrAddress}\\", to:\\"${address}\\"}) {\\n    value \\n  }\\n}"}`
    });
}