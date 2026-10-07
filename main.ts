namespace SpriteKind {
    export const Ore = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ore, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    if (hurt == false && vidas > 0) {
        vidas += -1
        hurt = true
        timer = 60
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    }
})
info.onScore(10, function () {
    game.setGameOverMessage(true, "You Win!")
    game.gameOver(true)
})
let ore: Sprite = null
let vidas = 0
let hurt = false
let timer = 0
timer = 60
hurt = false
vidas = 3
info.setScore(0)
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . e d d d d d e . . . . . 
    . . . . d 1 8 d 8 1 d . . . . . 
    . . . . d d d d d d d . . . . . 
    . . . 9 9 9 e e e 9 9 9 . . . . 
    . . 9 9 9 9 9 9 9 9 9 9 9 . . . 
    . . d d 9 9 9 9 9 9 9 d d . . . 
    . . d d 9 9 9 9 9 9 9 d d . . . 
    . . d d 9 9 9 9 9 9 9 d d . . . 
    . . d d 8 8 8 8 8 8 8 d d . . . 
    . . . . 8 8 8 . 8 8 8 . . . . . 
    . . . . 8 8 8 . 8 8 8 . . . . . 
    . . . . c c c . c c c . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite)
let Mob = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 6 7 7 7 7 7 7 7 7 . . . . 
    . . . 7 7 f f 7 7 f f 7 . . . . 
    . . . 7 7 f f 7 7 f f 7 . . . . 
    . . . 7 7 7 7 f f 7 7 7 . . . . 
    . . . 6 7 7 f f f f 7 6 . . . . 
    . . . 7 7 7 f f f f 7 7 . . . . 
    . . . 7 7 7 f 7 7 f 7 7 . . . . 
    . . . . . 7 7 7 7 7 . . . . . . 
    . . . . . 7 7 7 7 7 6 . . . . . 
    . . . . 7 7 6 7 7 7 7 . . . . . 
    . . . . 7 7 7 7 7 7 7 . . . . . 
    . . . . 7 7 7 7 6 7 7 . . . . . 
    . . . . 6 7 7 7 7 7 7 . . . . . 
    . . 7 7 7 7 . . . 7 7 7 7 . . . 
    `, SpriteKind.Enemy)
Mob.setPosition(135, 12)
game.onUpdate(function () {
    if (vidas <= 0) {
        game.gameOver(false)
    }
    if (hurt == true) {
        timer += -1
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . e e e e e e e . . . . . 
            . . . . e e e e e e e . . . . . 
            . . . . e d f d f d e . . . . . 
            . d . . d f f d f f d . . d d . 
            d d . . d d d d d d d . . d d . 
            d d d 9 9 9 e e e 9 9 9 d d d . 
            . d d d 9 9 9 9 9 9 9 9 d d . . 
            . . . . 9 9 9 9 9 9 9 d d . . . 
            . . . . 9 9 9 9 9 9 9 . . . . . 
            . . . . 9 9 9 9 9 9 9 . . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . . 8 8 8 . 8 8 8 . . . . . 
            . . . . 8 8 8 . 8 8 8 . . . . . 
            . . . . c c c . c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        mySprite.setImage(assets.image`Steve`)
    }
})
game.onUpdateInterval(500, function () {
    console.log("\"Vidas\"" + vidas)
    console.log("\"timer\"" + timer)
    console.log("")
    if (info.score() < 10) {
        ore = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 7 7 . . . . . . . . 
            . . . . . . . 7 7 . . . . . . . 
            . . . . . . 7 6 7 7 . . . . . . 
            . . . . . 7 5 6 6 5 5 . . . . . 
            . . . . 7 7 5 7 7 7 5 7 . . . . 
            . . . 7 7 6 6 7 6 7 7 6 . . . . 
            . . 7 7 6 7 7 7 6 7 7 6 7 . . . 
            . . . . 5 6 7 7 7 7 6 7 7 . . . 
            . . . . 5 5 6 7 7 6 7 7 . . . . 
            . . . . 7 7 6 7 7 6 7 . . . . . 
            . . . . . . 7 6 6 5 7 . . . . . 
            . . . . . . 7 7 6 5 . . . . . . 
            . . . . . . . 7 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Ore)
        ore.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
    }
})
game.onUpdateInterval(500, function () {
    Mob.follow(mySprite, 50)
})
game.onUpdateInterval(60, function () {
    if (hurt == true) {
        timer += -1
    }
    if (timer <= 0) {
        hurt = false
    }
})
