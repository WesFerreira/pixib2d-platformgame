export interface IBox2App {
    world: Box2D.Dynamics.b2World;
    scale: number;
    set: IBox2AppSetters;
    applyPhysics: () => void;
}

export interface IBox2AppSetters {
    animation: {
        positionIterations: (positionIterations: number) => void,
        timeStep: (timeStep: number) => void,
        velocityIterations: (velocityIterations: number) => void,
    };
    debug: {
        fillAlpha: (alpha: number) => void,
        flags: (flags: number) => void,
        lineThickness: (lineThickness: number) => void,
    };
}

export interface B2AppOptions {
    debug?: boolean;
    gravity?: Box2D.Common.Math.b2Vec2;
    allowSleep?: boolean;
    w: number;
    h: number;
}
