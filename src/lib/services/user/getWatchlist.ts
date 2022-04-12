import { send } from "$lib/helpers/send";
import { chunk } from "$lib/helpers/chunk";

export async function getWatchlist(nodes: any) {
  try {
    if (!nodes || nodes.length === 0) throw new Error("Empty watchlist");

    const requests = nodes.map((node) => {
      if(node.address){
        return send("GET", `nodes/${node.address}.json`);
      }
    });

    const chunks = chunk(requests, 3);

    let data = [];

    for(const chunk of chunks){
      const responses = await Promise.all(chunk);
  
      const infos = await Promise.all(
        responses.map((response) => {
          if(response.ok){
            return response.json();
          }
        })
      );

      data = [...data, ...infos];
    }


    // Aggregate external data to internal db data about nodes
    const decoratedWatchlist = data.map((item) => {
      const dataDB = nodes.find(
        (node) => node.address.toLowerCase() === item?.address.toLowerCase()
      );
      if(item){
        item.dataDB = dataDB;
      }
      return item;
    });

    if (decoratedWatchlist.length > 1) {
      decoratedWatchlist.sort((a: any, b: any) => {
        const sort =
          (new Date(a.dataDB.createdAt) as any) -
          (new Date(b.dataDB.createdAt) as any);
        return sort;
      });
    }

    return decoratedWatchlist;
  } catch (e) {
    console.log(e);
    return null;
  }
}
