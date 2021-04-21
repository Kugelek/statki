let isSkinpickerActive = false;
const toggleSkinpickerVisibility = () => {
    isSkinpickerActive = !isSkinpickerActive;
    console.log(isSkinpickerActive);
}
function changeSkin(skinID){
    console.log("przeszlo");
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
    fill(50, 215, 108);
    ellipse(myShip.position.x, myShip.position.y, myShip.r * 2, myShip.r * 2);
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




