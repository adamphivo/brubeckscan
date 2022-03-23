import { upsertByAddress } from "./upsertByAddress";
import { getAllUsers } from "./getAllUsers";

const UserDAO = () => { };

UserDAO.upsertByAddress = upsertByAddress;
UserDAO.getAllUsers = getAllUsers;

export default UserDAO;