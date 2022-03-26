import { upsert } from "./upsert";
import { getWatchlist } from "./getWatchlist";
import { login } from "./login";

const UserService = () => {};

UserService.upsert = upsert;
UserService.getWatchlist = getWatchlist;
UserService.login = login;

export default UserService;