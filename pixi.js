const Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

const app = new PIXI.Application({ height: 700, width: 940, backgroundColor: 0X87CEEB, antialias: true })

document.body.appendChild(app.view);

loader
    .add("images/tile.png")
    .add('images/bacgkround.png')
    .add('images/ball.png')
    .add('images/stoneset.png')
    .add('images/ground0.png')
    .add('images/trail.png')
    .load(setup);

function setup() {
    const trailTexture = PIXI.Texture.from('images/trail.png');
    const rope = new PIXI.SimpleRope(trailTexture, points);
    rope.blendmode = PIXI.BLEND_MODES.ADD;
    const landscapeTexture = PIXI.Texture.fromImage('images/background.png');
    const background = new PIXI.Sprite(landscapeTexture);
    background.anchor.set(0, 0);
    background.scale.set(0.5, 0.6);
    background.position.set(0, 0);

    app.stage.addChild(background)
    app.stage.addChild(tile);
    app.stage.addChild(ball);

    for (let i = 0; i < numberOfTiles; i++) {
        const currentIteration = i;

        if (i !== 0 && i % 30 === 0) {
            xOffset -= 810;
            yOffset += 27;
        }

        const stone = new PIXI.Sprite(
            PIXI.loader.resources["images/ground0.png"].texture
        );

        stone.scale.set(0.2, 0.2)
        const x = spacing * currentIteration + xOffset;
        stone.position.set(x, yOffset);
        app.stage.addChild(stone);
        app.stage.addChild(rope);
    }

    app.ticker.add(() => {
        animation(app);
    });
}


