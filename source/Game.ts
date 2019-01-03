/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-03 01:21:58
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-03 01:28:03
 */

import { injectable } from "inversify";
import { B2AppOptions } from "./interfaces/IBox2App";
import dependencyContainer, { initBox2App } from "./config/InversionOfControl";
import { Box2AppService } from "./services/Box2AppService";

@injectable()
export class Game {
    public box2App: Box2AppService;

    constructor (options: B2AppOptions) {
        initBox2App(options);
        this.box2App = dependencyContainer.resolve<Box2AppService>(Box2AppService);
    }
}
