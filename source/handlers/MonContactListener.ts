export class MonContactListener implements Box2D.Dynamics.b2ContactListener {

    public BeginContact(contact: Box2D.Dynamics.Contacts.b2Contact): void {
        let fA = contact.GetFixtureA();
        let fB = contact.GetFixtureB();
        console.log(fA.GetUserData() + ", " + fB.GetUserData());
    }

    public EndContact(contact: Box2D.Dynamics.Contacts.b2Contact): void {
        // console.log("EndContact");

    }

    public PostSolve(contact: Box2D.Dynamics.Contacts.b2Contact, impulse: Box2D.Dynamics.b2ContactImpulse): void {
        // console.log("PostSolve");

    }

    public PreSolve(contact: Box2D.Dynamics.Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold): void {
        // console.log("PreSolve");

    }
}
