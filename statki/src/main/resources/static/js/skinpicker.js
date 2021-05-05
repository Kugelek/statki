let isSkinpickerActive = false;
const toggleSkinpickerVisibility = () => {
    isSkinpickerActive = !isSkinpickerActive;
    console.log(isSkinpickerActive);
}
function changeSkin(skinID){
    switch (skinID) {
        case 1:
            ship.skinBuilder = changeSkin1;
            break;
        case 2:
            ship.skinBuilder = changeSkin2;
            break;
        case 3:
            ship.skinBuilder = changeSkin3;
            break;
        case 4:
            ship.skinBuilder = changeSkin4;
            break;

    }

}


function changeSkin1(myShip) {
    fill(250, 215, 88);
    ellipse(myShip.position.x, myShip.position.y, myShip.r * 2, myShip.r * 2);
}

function changeSkin2(myShip) {
    c1=color(148,48,128)
    c2 = color(255,20, 20)
    const shipR = myShip.r ;

    fill(148,148,128)
    drawPolygonShape(myShip.position.x, myShip.position.y, shipR*1.16, 6);
    fill(154, 141, 131)
    drawPolygonShape(myShip.position.x, myShip.position.y, shipR * 0.95, 6);
    fill(117, 120, 141)
    arc(myShip.position.x, myShip.position.y+5, shipR * 1.4, shipR * 1.7, 0.8*PI, 2.2*PI );
    fill(80)
    drawPolygonShape(myShip.position.x, myShip.position.y, shipR /2.5, 8);
    fill(171, 190, 219)
    arc(myShip.position.x, myShip.position.y+5, shipR/3, shipR/3, -PI, -2*PI );
}

function changeSkin3(myShip) {
    fill(255)
    ellipse(myShip.position.x, myShip.position.y, myShip.r * 2, myShip.r * 2)
    fill(255,0,0)
    arc(myShip.position.x, myShip.position.y, myShip.r * 2, myShip.r * 2, 0, PI );
}

 function changeSkin4(myShip){
    const shipX = myShip.position.x;
    const shipY = myShip.position.y;
    const shipR = myShip.r * 2;

     fill(148,148,128)
     ellipse(shipX,shipY, shipR,shipR)
     fill(171, 190, 219)
     ellipse(shipX,shipY+3, shipR-5,shipR-5)

     fill(128,128,128)
     arc(shipX,shipY+5, shipR+5, shipR-10, 0, PI );
     fill(255)
     ellipse(shipX,shipY+8, 3,3)
     ellipse(shipX-10,shipY+8, 3, 3)
     ellipse(shipX+10, shipY+8, 3,3)
     fill(255)
     arc(shipX, shipY+10, shipR-1, shipR-18, 0, PI );

 }

function drawPolygonShape(x, y, radius, anglesCount) {
    let angleVal = PI * 2 / anglesCount;
    beginShape();
    for (let currAngle = 0; currAngle < PI *2; currAngle += angleVal)
        vertex(x + cos(currAngle) * radius, y + sin(currAngle) * radius);
    endShape(CLOSE);
}

