import { updateMarketPrices } from "./updateMarketPrices";
import { updateBrubeckStats } from "./updateBrubeckStats";
import { clearAuthSession } from "./clearAuthSession";
import { isUserConnected } from "./isUserConnected";
import { setBrubeckHistory } from "./setBrubeckHistory";
import { syncUser } from "./syncUser";

const StateService = () => {};

StateService.updateMarketPrices = updateMarketPrices;
StateService.updateBrubeckStats = updateBrubeckStats;
StateService.clearAuthSession = clearAuthSession;
StateService.isUserConnected = isUserConnected;
StateService.setBrubeckHistory = setBrubeckHistory;
StateService.syncUser = syncUser;

export default StateService;
