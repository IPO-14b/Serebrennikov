/**
 * Пордключения окружения движка
 *
 * Используется для инициальзции всех переменных и объектов движка
 *
 * @var $pjs
 */
var pjs = new PointJS('2d', 400, 400);
pjs.system.initFullPage();
/**
 * Ссылка на объект
 *
 * Используется для сокращения записи
 *
 * @var $game
 */
var game = pjs.game;
/**
 * Ссылка на объект
 *
 * Используется для сокращения записи
 *
 * @var $point
 */
var point = pjs.vector.point;
/**
 * Ссылка на объект
 *
 * Используется для сокращения записи
 *
 * @var $height
 */
var height = game.getWH().h;
/**
 * Ссылка на объект
 *
 * Используется для сокращения записи
 *
 * @var $width
 */
var width = game.getWH().w;
/**
 * Первая часть фона игры
 *
 * Испоьзуется для создания фона игры
 *
 * @var  $fon1
 */  
var fon1 = game.newImageObject({
    x : 0, y : 0,
    file : 'imgs/fon.jpg',
    h : height,
    onload : function () {
        fon2.x = fon1.x+fon1.w;
    }
});
/**
 * Вторая часть фона игры
 *
 * Испоьзуется для создания фона игры
 *
 * @var  $fon2
 */  
var fon2 = game.newImageObject({
    x : 0, y : 0,
    file : 'imgs/fon.jpg',
    h : height
});
/**
 * Первая часть граунда
 *
 * Испоьзуется для создания граунда
 *
 * @var  $gr1
 */  
var gr1 = game.newImageObject({
    x : 0, y : 0,
    file : 'imgs/ground.png',
    w : width,
    onload : function () {
        gr2.y = gr1.y = height - 110 - gr1.h;
        gr2.x = gr1.x+gr1.w;
    }
});
/**
 * Вторая часть граунда
 *
 * Испоьзуется для создания граунда
 *
 * @var  $gr2
 */  
var gr2 = game.newImageObject({
    x : 0, y : 0,
    file : 'imgs/ground.png',
    w : width
});
/**
 * Персонаж
 *
 * Испоьзуется для создания персонаж
 *
 * @var  $gr2
 */  
var monkey = game.newAnimationObject({
    x : width / 10, y : 0,
    h : 200, w : 200,
    delay : 4,
    animation : pjs.tiles.newAnimation('imgs/monkey.png', 200, 200, 8)
});
/**
 * Движение фона
 *
 * Испоьзуется передвижения заднего фона игры
 *
 * @var  $moveBackGround
 */  
var moveBackGround = function (s) {
    fon1.move(point(-s / 2, 0));
    fon2.move(point(-s / 2, 0));
    gr1.move(point(-s, 0));
    gr2.move(point(-s, 0));
    if (fon1.x + fon1.w < 0) {
        fon1.x = fon2.x+fon2.w;
    }
    if (fon2.x + fon2.w < 0) {
        fon2.x = fon1.x+fon1.w;
    }
    if (gr1.x + gr1.w < 0) {
        gr1.x = gr2.x+gr2.w;
    }
    if (gr2.x + gr2.w < 0) {
        gr2.x = gr1.x+gr1.w;
    }
};
/**
 * Жизненые цикл игры 
 *
 * Функция, которая является жизненым циклом игры.
 */
game.newLoop('game', function () {
    game.fill('#D9D9D9');
    fon1.draw();
    fon2.draw();
    gr1.draw();
    gr2.draw();
    monkey.y = -monkey.h + gr1.y + gr1.h /2.5;
    monkey.draw();
    moveBackGround(6.5);
});

game.startLoop('game');
