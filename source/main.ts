/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-03 00:12:27
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-03 05:57:33
 *
 * LET'S GOOO!!
 */

// tslint:disable:object-literal-sort-keys
import { Game } from "./Game";
import { GraphicFactory } from "./GraphicFactory";
import { MonContactListener } from "./handlers/MonContactListener";

// Globals
let pixiApp: PIXI.Application;
let game: Game;

let w = window.innerWidth;
let h = 440;

document.body.onload = function () {
    ////////////////// SETUP //////////////////
    pixiApp = new PIXI.Application({
        width: w,
        height: h,
        antialias: true,
        backgroundColor: 0xcccccc,
    });
    document.body.appendChild(pixiApp.renderer.view);

    game = new Game({
        w: w,
        h: h,
        allowSleep: true,
        debug: true,
        // gravity: new Box2D.Common.Math.b2Vec2(0, 0),
    });
    ///////////////////////////////////////////
    game.box2App.world.SetContactListener(new MonContactListener());
    let gFactory = new GraphicFactory(game.box2App);

    gFactory.newPlatform({
        x: 270,
        y: h - 3,
        w: w,
        userData: "floor1",
    });

    gFactory.newPlatform({
        x: 610,
        y: 380,
        w: 70,
        userData: "floor2",
    });

    let player = gFactory.newPlayer({
        x: 25,
        y: 20,
        userData: "player",
    });

    game.box2App.applyPhysics();

    window.onkeydown = (e) => {
        if (e.keyCode === 32) {
            player.ApplyForce(new Box2D.Common.Math.b2Vec2(0, -300), player.GetWorldCenter());
        }
        if (e.keyCode === 39) {
            player.ApplyForce(new Box2D.Common.Math.b2Vec2(100, 0), player.GetWorldCenter());
            player.ApplyForce(new Box2D.Common.Math.b2Vec2(0, 0), player.GetWorldCenter());
        }
        if (e.keyCode === 37) {
            player.ApplyForce(new Box2D.Common.Math.b2Vec2(-100, 0), player.GetWorldCenter());
            player.ApplyForce(new Box2D.Common.Math.b2Vec2(0, 0), player.GetWorldCenter());
        }
        console.log(e.keyCode);

    };

    // tslint:disable-next-line:no-empty
    pixiApp.ticker.add((delta) => {

    });

};

