/*
 * @Author: WesFerreira - https://github.com/WesFerreira
 * @Date: 2019-01-04 06:04:02
 * @Last Modified by:   WesFerreira
 * @Last Modified time: 2019-01-04 06:04:02
 */

import playerSharedProps from "../entities/Player";
import IDENTFIER from "../Identifiers";

export class MonContactListener implements Box2D.Dynamics.b2ContactListener {

    private airJumpCount = playerSharedProps.jumpCount;

    public BeginContact(contact: Box2D.Dynamics.Contacts.b2Contact): void {
        // console.log(contact.GetFixtureA().GetUserData() + " --- " + contact.GetFixtureB().GetUserData());

        this.playerIsOnGround(contact);
    }

    public EndContact(contact: Box2D.Dynamics.Contacts.b2Contact): void {

        // contact.SetEnabled(true);
        this.playerIsNotOnGround(contact);
    }

    public PostSolve(contact: Box2D.Dynamics.Contacts.b2Contact, impulse: Box2D.Dynamics.b2ContactImpulse): void {
        // console.log("PostSolve");

    }

    public PreSolve(contact: Box2D.Dynamics.Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold): void {
        if (contact.GetFixtureB().GetUserData() === IDENTFIER.DATA.TYPE.ONE_WAY_PLATFORM) {
            if (contact.GetFixtureA().GetBody().GetPosition().y > contact.GetFixtureB().GetBody().GetPosition().y) {
                contact.SetEnabled(false);
            }
        }
    }

    private playerIsOnGround(c: Box2D.Dynamics.Contacts.b2Contact) {
        if (c.GetFixtureA().GetUserData() === IDENTFIER.DATA.PLAYER_FOOT) {

            playerSharedProps.grounded = true;
            playerSharedProps.canAirJump = false;

            playerSharedProps.jumpCount = this.airJumpCount; // Reset jumpCount
        }
    }
    private playerIsNotOnGround(c: Box2D.Dynamics.Contacts.b2Contact) {
        if (c.GetFixtureA().GetUserData() === IDENTFIER.DATA.PLAYER_FOOT) {
            playerSharedProps.grounded = false;
            playerSharedProps.canAirJump = true;
        }
    }
}
