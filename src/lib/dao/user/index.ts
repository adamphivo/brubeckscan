import { getAllUsers } from "./getAllUsers";
import { updateWatchlist } from "./updateWatchlist";
import { count } from "./count";
import { getOrCreate } from "./getOrCreate";
import { saveWatchListStats } from "./saveWatchListStats";

const UserDAO = () => { };

UserDAO.getAllUsers = getAllUsers;
UserDAO.updateWatchlist = updateWatchlist;
UserDAO.count = count;
UserDAO.getOrCreate = getOrCreate;
UserDAO.saveWatchListStats = saveWatchListStats;

export default UserDAO;