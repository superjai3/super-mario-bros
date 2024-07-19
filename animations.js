export const createAnimations = (game) => {
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 1, end: 3 }
        ),
        frameRate: 12, // indica la velocidad con la que se mueve.
        repeat: -1
    });

    game.anims.create({
        key: 'mario-idle',
        frames: [{key: 'mario', frame: 0 }],
        frameRate: 12, // indica la velocidad con la que se mueve.
        repeat: -1
    });

    game.anims.create({
        key: 'mario-jump',
        frames: [{key: 'mario', frame: 5 }],
        frameRate: 12, // indica la velocidad con la que se mueve.
        repeat: -1
    });

    game.anims.create({
        key: 'mario-dead',
        frames: [{key: 'mario', frame: 4 }],
        frameRate: 12, // indica la velocidad con la que se mueve.
        repeat: -1
    });
}