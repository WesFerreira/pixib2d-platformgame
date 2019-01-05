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

    public movingRight: boolean;
    public movingLeft: boolean;
    public isJumping: boolean;

    public maxVelocity = 3;
    private velocity: Box2D.Common.Math.b2Vec2;

    constructor(options: GraphicOptions, private box2App: Box2AppService) {
        this.body = Graphics.createPlayer(options, this.box2App);
    }

    public updateMovements() {
        this.velocity = this.body.GetLinearVelocity();
        this.constantWalk();

        this.jump();
        this.walkRight();
        this.walkLeft();
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                 HANDLERS                                   //
    ////////////////////////////////////////////////////////////////////////////////
    public keyDown(e: KeyboardEvent) {
        if (e.keyCode === 32) {
            this.isJumping = true;
            this.multiJump();
        }
        if (e.keyCode === 39 && this.velocity.x < this.maxVelocity) {
            this.movingRight = true;
        }
        if (e.keyCode === 37 && this.velocity.x > -this.maxVelocity) {
            this.movingLeft = true;
        }
    }
    public keyUp(e: KeyboardEvent) {
        if (e.keyCode === 32) {
            this.isJumping = false;
        }
        if (e.keyCode === 39) {
            this.movingRight = false;
        }
        if (e.keyCode === 37) {
            this.movingLeft = false;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                 MOVEMENT                                   //
    ////////////////////////////////////////////////////////////////////////////////
    private jump() {
        if (this.isJumping && playerSharedProps.grounded) {
            this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -26 / this.box2App.scale), this.body.GetWorldCenter());
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
    private walkRight() {
        if (this.movingRight) {
            this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(10 / this.box2App.scale, 0), this.body.GetWorldCenter());
        }
    }
    private walkLeft() {
        if (this.movingLeft) {
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
