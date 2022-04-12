import { getOrCreate } from "./getOrCreate";
import { getAllUsers } from "./getAllUsers";
import { updateWatchlist } from "./updateWatchlist";
import { count } from "./count";

const UserDAO = () => { };

UserDAO.getOrCreate = getOrCreate;
UserDAO.getAllUsers = getAllUsers;
UserDAO.updateWatchlist = updateWatchlist;
UserDAO.count = count;

export default UserDAO;