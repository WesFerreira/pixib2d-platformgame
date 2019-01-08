/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-04 06:04:13
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-04 06:04:36
 */

import { GraphicOptions } from "../interfaces/IGraphic";
import { Box2AppService } from "../services/Box2AppService";
import IDENTFIER from "../Identifiers";

export class Graphics {
    public static createPlatform(options: GraphicOptions, box2App: Box2AppService) {
        let bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.x = options.x / box2App.scale;
        bodyDef.position.y = options.y / box2App.scale;

        let rect = new Box2D.Collision.Shapes.b2PolygonShape();
        rect.SetAsBox(options.w / box2App.scale, 2 / box2App.scale);
        let fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.shape = rect;

        let body = box2App.world.CreateBody(bodyDef);
        let fixture = body.CreateFixture(fixtureDef);
        fixture.SetUserData(options.userData);
    }

    public static createPlayer(options: GraphicOptions, box2App: Box2AppService) {
        let bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.position.x = options.x / box2App.scale;
        bodyDef.position.y = options.y / box2App.scale;
        bodyDef.fixedRotation = true;

        let shape = new Box2D.Collision.Shapes.b2PolygonShape();
        shape.SetAsBox(10 / box2App.scale, 10 / box2App.scale);
        let fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.shape = shape;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 5;
        // fixtureDef.restitution = 0.5;

        let body = box2App.world.CreateBody(bodyDef);
        let fixture = body.CreateFixture(fixtureDef);
        body.SetUserData(options.userData);

        shape.SetAsOrientedBox(10 / box2App.scale, 2 / box2App.scale, new Box2D.Common.Math.b2Vec2(0, 12 / box2App.scale));
        fixtureDef.shape = shape;
        fixtureDef.isSensor = true;
        let foot = body.CreateFixture(fixtureDef);

        foot.SetUserData(IDENTFIER.DATA.PLAYER_FOOT);

        return body;

    }

}
