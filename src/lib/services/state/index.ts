import { updateMarketPrices } from "./updateMarketPrices";
import { updateBrubeckStats } from "./updateBrubeckStats";
import { clearAuthSession } from "./clearAuthSession";

const StateService = () => {};

StateService.updateMarketPrices = updateMarketPrices;
StateService.updateBrubeckStats = updateBrubeckStats;
StateService.clearAuthSession = clearAuthSession;

export default StateService;