import { upsertByAddress } from "./upsertByAddress";
import { getAllUsers } from "./getAllUsers";
import { updateWatchlist } from "./updateWatchlist";
import { count } from "./count";

const UserDAO = () => { };

UserDAO.upsertByAddress = upsertByAddress;
UserDAO.getAllUsers = getAllUsers;
UserDAO.updateWatchlist = updateWatchlist;
UserDAO.count = count;

export default UserDAO;