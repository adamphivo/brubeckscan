import { login } from "./login";
import { upsert } from "./upsert";
import { processNodes } from "./processNodes";

const UserService = () => {};

UserService.login = login;
UserService.upsert = upsert;
UserService.processNodes = processNodes;

export default UserService;