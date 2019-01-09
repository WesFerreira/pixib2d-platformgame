/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-04 06:03:52
 * @Last Modified by:   WesFerreira
 * @Last Modified time: 2019-01-04 06:03:52
 */

import { Box2AppService } from "../services/Box2AppService";
import { GraphicOptions } from "../interfaces/IGraphic";
import { Graphics } from "./Graphics";

// tslint:disable:object-literal-sort-keys
let playerSharedProps = {
    grounded: false,
    canAirJump: false,
    jumpCount: 2,
};
export default playerSharedProps;

export class Player {
    public body: Box2D.Dynamics.b2Body;

    public canWalk = true;

    public walkRightKeyPressed: boolean;
    public walkLeftKeyPressed: boolean;

    public maxVelocity = 3;
    private velocity: Box2D.Common.Math.b2Vec2;

    private jumpImpulse = 2;
    private onceSpaceFire = false;


    constructor(options: GraphicOptions, private box2App: Box2AppService) {
        this.body = Graphics.createPlayer(options, this.box2App);
    }

    public updateMovements() {
        this.velocity = this.body.GetLinearVelocity();
        this.constantWalk();

        this.walkRight(); // Continuous
        this.walkLeft();  // Continuous
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                 HANDLERS                                   //
    ////////////////////////////////////////////////////////////////////////////////
    public keyDown(e: KeyboardEvent) {
        if (e.keyCode === 32) {
            if (this.onceSpaceFire) { return; }
            this.onceSpaceFire = true;

            this.jump();      // Single
            this.multiJump(); // Single
        }
        if (e.keyCode === 39 && this.velocity.x < this.maxVelocity) {
            this.walkRightKeyPressed = true;
        }
        if (e.keyCode === 37 && this.velocity.x > -this.maxVelocity) {
            this.walkLeftKeyPressed = true;
        }
    }
    public keyUp(e: KeyboardEvent) {
        if (e.keyCode === 32) {
            this.onceSpaceFire = false;
        }
        if (e.keyCode === 39) {
            this.walkRightKeyPressed = false;
        }
        if (e.keyCode === 37) {
            this.walkLeftKeyPressed = false;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                 MOVEMENTS                                  //
    ////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////   Single Movement   //////////////////////////////
    private jump() {
        if (playerSharedProps.grounded) {
            this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0,
                -55 / this.box2App.scale * this.jumpImpulse), this.body.GetWorldCenter());
        }
    }
    private multiJump() {
        playerSharedProps.jumpCount--;
        if (playerSharedProps.canAirJump) {

            if (playerSharedProps.jumpCount-- <= 0) {
                playerSharedProps.canAirJump = false;
            }

            this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
            this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -100 / this.box2App.scale), this.body.GetWorldCenter());
        }
    }

    ///////////////////////////// Continuous Movement //////////////////////////////
    private walkRight() {
        if (this.walkRightKeyPressed) {
            this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(10 / this.box2App.scale, 0), this.body.GetWorldCenter());
        }
    }
    private walkLeft() {
        if (this.walkLeftKeyPressed) {
            this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(-10 / this.box2App.scale, 0), this.body.GetWorldCenter());
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                   MISC                                     //
    ////////////////////////////////////////////////////////////////////////////////
    private constantWalk() {
        if (Math.abs(this.velocity.x) > this.maxVelocity) {
            this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(
                Math.sign(this.body.GetLinearVelocity().x) * this.maxVelocity, this.body.GetLinearVelocity().y));
        }
    }
}
