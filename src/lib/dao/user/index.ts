import { upsertByAddress } from "./upsertByAddress";
import { getAllUsers } from "./getAllUsers";
import { updateWatchlist } from "./updateWatchlist";

const UserDAO = () => { };

UserDAO.upsertByAddress = upsertByAddress;
UserDAO.getAllUsers = getAllUsers;
UserDAO.updateWatchlist = updateWatchlist;

export default UserDAO;