export async function getDataStaked(address: string) {
  return await fetch(
    "https://api.thegraph.com/subgraphs/name/streamr-dev/data-on-polygon",
    {
      method: "POST",
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Accept: "application/json",
        Connection: "keep-alive",
        DNT: "1",
        Origin: "file://",
      },
      body: `{"query":"{\\n  erc20Balances(where: {account: \\"${address}\\", contract:\\"0x3a9a81d576d83ff21f26f325066054540720fc34\\"}) {\\n    value \\n  }\\n}"}`,
    }
  );
}
