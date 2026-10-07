@namespace
class SpriteKind:
    Ore = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    info.change_score_by(1)
    sprites.destroy(otherSprite)
    music.play(music.create_sound_effect(WaveShape.SQUARE,
            400,
            600,
            255,
            0,
            100,
            SoundExpressionEffect.NONE,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.UNTIL_DONE)
sprites.on_overlap(SpriteKind.player, SpriteKind.Ore, on_on_overlap)
vidas = 3
def on_on_overlap2(sprite2, otherSprite2):
    global vidas
    vidas += -1
    
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

ore: Sprite = None
info.set_score(0)

mySprite = sprites.create(img("""
        . . . . . . f f f f . . . . . .
        . . . . f f f 2 2 f f f . . . .
        . . . f f f 2 2 2 2 f f f . . .
        . . f f f e e e e e e f f f . .
        . . f f e 2 2 2 2 2 2 e e f . .
        . . f e 2 f f f f f f 2 e f . .
        . . f f f f e e e e f f f f . .
        . f f e f b f 4 4 f b f e f f .
        . f e e 4 1 f d d f 1 4 e e f .
        . . f f f f d d d d d e e f . .
        . f d d d d f 4 4 4 e e f . . .
        . f b b b b f 2 2 2 2 f 4 e . .
        . f b b b b f 2 2 2 2 f d 4 . .
        . . f c c f 4 5 5 4 4 f 4 4 . .
        . . . f f f f f f f f . . . . .
        . . . . . f f . . f f . . . . .
        """),
    SpriteKind.player)
mySprite.set_stay_in_screen(True)
controller.move_sprite(mySprite)
Mob = sprites.create(img("""
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
        """),
    SpriteKind.enemy)
Mob.set_position(135, 12)
if vidas <= 0:
    game.game_over(False)

def on_update_interval():
    global ore
    print(vidas)
    if info.score() < 10:
        ore = sprites.create(img("""
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
                """),
            SpriteKind.Ore)
        ore.set_position(randint(0, scene.screen_width()),
            randint(0, scene.screen_height()))
game.on_update_interval(500, on_update_interval)

def on_update_interval2():
    Mob.follow(mySprite, 50)
game.on_update_interval(500, on_update_interval2)
