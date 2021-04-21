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
     //pseudo ufo
    fill(148,148,128)
    ellipse(50,50, 70,80)
    fill(171, 190, 219)
    ellipse(50,55, 65,65)

    fill(128,128,128)
    arc(50, 55, 100, 50, 0, PI );
    fill(255)
    ellipse(50,69, 10,10)
    ellipse(25,67, 10,10)
    ellipse(77, 67, 10,10)
    fill(255)
    arc(50, 77, 53, 24, 0, PI );

 }




