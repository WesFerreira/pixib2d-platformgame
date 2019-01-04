import playerSharedProps from "../entities/Player";

export class MonContactListener implements Box2D.Dynamics.b2ContactListener {

    public BeginContact(contact: Box2D.Dynamics.Contacts.b2Contact): void {
        if (contact.GetFixtureA().GetUserData() === "foot") {
            playerSharedProps.grounded = true;
            playerSharedProps.canJump = false;

            /* playerSharedProps.canJump = true;
            playerSharedProps.jumpCount = 2; */
        }
    }

    public EndContact(contact: Box2D.Dynamics.Contacts.b2Contact): void {
        if (contact.GetFixtureA().GetUserData() === "foot") {
            playerSharedProps.grounded = false;
            playerSharedProps.canJump = true;

/*
            if (playerSharedProps.jumpCount < 1) {
                playerSharedProps.canJump = false;
            } */
        }
    }

    public PostSolve(contact: Box2D.Dynamics.Contacts.b2Contact, impulse: Box2D.Dynamics.b2ContactImpulse): void {
        // console.log("PostSolve");

    }

    public PreSolve(contact: Box2D.Dynamics.Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold): void {
        // console.log("PreSolve");

    }
}
