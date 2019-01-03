/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-03 01:59:09
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-03 02:51:50
 */

import { Box2AppService } from "./services/Box2AppService";
import { GraphicOptions } from "./interfaces/IGraphic";
import { Graphics } from "./entities/Graphics";

export class GraphicFactory extends Graphics {

private box2App: Box2AppService;

    constructor(box2App: Box2AppService) {
        super();
        this.box2App = box2App;
    }

    public newPlatform (options: GraphicOptions) {
        return Graphics.createPlatform(options, this.box2App);
    }

    public newPlayer(options: GraphicOptions) {
        return Graphics.createPlayer(options, this.box2App);
    }
}
