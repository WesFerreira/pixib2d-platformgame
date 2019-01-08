/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-03 00:12:27
 * @Last Modified by: WesFerreira
 * @Last Modified time: 2019-01-04 03:09:32
 *
 * LET'S GOOO!!
 */

// tslint:disable:object-literal-sort-keys
import { Game } from "./Game";
import { GraphicFactory } from "./GraphicFactory";
import { MonContactListener } from "./handlers/MonContactListener";
import { Player } from "./entities/Player";

// Globals
let pixiApp: PIXI.Application;
let game: Game;

let w = window.innerWidth;
let h = window.innerHeight;

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
        // gravity: new Box2D.Common.Math.b2Vec2(0, 1),
    });
    ///////////////////////////////////////////

    game.box2App.world.SetContactListener(new MonContactListener());
    let gFactory = new GraphicFactory(game.box2App);

    gFactory.newPlatform({
        x: w / 2,
        y: h - 2,
        w: w / 2,
        userData: "floor",
    });

    gFactory.newPlatform({
        x: 610,
        y: h - 27 * 2,
        w: 70,
        userData: "floor",
    });

    gFactory.newPlatform({
        x: 260,
        y: h - 27 * 5,
        w: 70,
        userData: "floor",
    });

    let player = new Player({
        x: 200,
        y: 20,
        userData: "player",
    }, game.box2App);

    function physicsLoop() {
        game.box2App.world.Step(1 / 60, 8, 3);
        game.box2App.world.ClearForces();
        game.box2App.world.DrawDebugData();

        player.updateMovements();
        setTimeout(physicsLoop, 1 / 60);
    }

    physicsLoop();

    document.onkeydown = (e: KeyboardEvent) => {
        player.keyDown(e);
    };
    document.onkeyup = (e) => {
        player.keyUp(e);
    };

    // tslint:disable-next-line:no-empty
    pixiApp.ticker.add((delta) => {

    });
};

