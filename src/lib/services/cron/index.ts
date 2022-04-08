import { run } from "./run";
import { cleanup } from "./cleanup";

const CronService = () => {};

CronService.run = run;
CronService.cleanUp = cleanup;

export default CronService;