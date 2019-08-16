const historyX = [];
const historyY = [];
const historySize = 20;
const ropeSize = 100;
const points = [];

for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
}

for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
}

let numberOfTiles = 240,
    spacing = 27;
xOffset = 50;
yOffset = 100;

let ballSpeed = 3;

let ballXDirection = 0;
let ballYDirection = 1;

const ball = new PIXI.Sprite(
    PIXI.loader.resources["images/ball.png"].texture
);

const tile = new PIXI.Sprite(
    PIXI.loader.resources["images/tile.png"].texture
);

ball.scale.set(0.01, 0.01);
tile.anchor.set(0.5, 0.5);
ball.anchor.set(0.5, 0.5);
tile.scale.set(0.5, 0.5);
tile.position.y = app.screen.height - 15;

function animation(app) {

    ballSpeed += 0.01;
    const mouseposition = app.renderer.plugins.interaction.mouse.global;
    tile.position.x = mouseposition.x;

    ball.position.x += (ballSpeed * ballXDirection);
    ball.position.y += (ballSpeed * ballYDirection);

    historyX.pop();
    historyX.unshift(ball.position.x);
    historyY.pop();
    historyY.unshift(ball.position.y);

    for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
        const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

        p.x = ix;
        p.y = iy;
    }

    if (ball.position.x >= app.screen.width - 10) {
        ballXDirection = -1;
    }

    if (ball.position.x <= 10) {
        ballXDirection = 1;
    }

    if (ball.position.y >= app.screen.height - 35 && (ball.position.x >= tile.position.x - 150 && ball.position.x <= tile.position.x + 150)) {
        ballYDirection = -1;
    }

    if (ball.position.y >= app.screen.height - 35 && (ball.position.x >= tile.position.x && ball.position.x <= tile.position.x + 150)) {
        ballXDirection = (ball.position.x - tile.position.x) / 100;
    }

    if (ball.position.y >= app.screen.height - 35 && (ball.position.x >= tile.position.x - 150 && ball.position.x <= tile.position.x)) {
        ballXDirection = (ball.position.x - tile.position.x) / 100;
    }

    if (ball.position.y <= 10) {
        ballYDirection = 1;
    }

    if (ball.position.y > app.screen.height) {
        ballSpeed = 3;
        ballYDirection = -1;
    }

    for (let i = 3; i < numberOfTiles + 3; i++) {

        let currentTile = app.stage.getChildAt(i);

        if (ball.position.x >= currentTile.position.x
            &&
            ball.position.x <= (currentTile.position.x + currentTile.width)) {
            if (ball.position.y >= currentTile.position.y && ball.position.y <= (currentTile.position.y + currentTile.height)) {
                app.stage.removeChildAt(i);
                numberOfTiles--;
                ballYDirection = -ballYDirection;
                continue;
            }
        }

        if (ball.position.y >= currentTile.position.y &&
            ball.position.y <= (currentTile.position.y + currentTile.height)) {
            if (ball.position.x >= currentTile.position.x && ball.position.x <= (currentTile.position.x + currentTile.width)) {
                app.stage.removeChildAt(i);
                numberOfTiles--;
                ballXDirection = -ballXDirection;
            }
        }
    }
}