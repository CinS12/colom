window.onload = function(){
  background_1 = document.getElementById("img1");
  background_2 = document.getElementById("img2");
  character = document.getElementById("personatge");
  enemy = document.getElementById("enemic");
  panell_inicial = document.getElementById("espai");
  img_enemic = document.getElementById("img_enemic");
  marcador = document.getElementById("punts");

  var character_offset_top = character.offsetTop;
  var onTheAir = false;
  var enemy_position = enemy.offsetLeft;
  var partidaIniciada = false;
  var enemic = 1;
  var girat = true;
  var punts = 0;
  var audio = new Audio("colom.mp3");

  document.onkeypress = teclaPremuda;


  function desplacaFons(){
    var i = 0;
    function moveBackground(){
      i = i - 10;
      position = i+"px";
      //console.log(position);
      j = i + 1280;
      moving = j+"px";
      //console.log(moving);
      background_1.style.left = position;
      background_2.style.left = moving;
    }
    function resetBackground() {
      background_1.style.left="0px";
      background_2.style.left="1280px";
      i=0;
    }
    setInterval(moveBackground, 25);
    setInterval(resetBackground,3200);
  }

  //Funció que genera l'enemic de forma random
  function triaEnemic(){
    num = Math.floor(Math.random() * 3) + 1;
    return num;
  }
   function desplacaEnemic(){
     function moveEnemy(){
       enemy_position = enemy_position-15;
       enemy.style.left = enemy_position + "px";
     }
     function resetEnemy(){
       actualitzaMarcador();
       enemy_position=1500;
       enemy.style.left = enemy_position + "px";
       enemic = triaEnemic();
       switch (enemic){
         case 1:
          //llop
          img_enemic.src = "img6.gif";
          img_enemic.style.width = "110%";
          img_enemic.style.height = "110%";
          var enemy_offset_top = enemy.offsetTop;
          enemy.style.top=enemy_offset_top+"px";
          break;
        case 2:
          //Ocellot
          img_enemic.src = "img7.gif";
          img_enemic.style.width = "60%";
          img_enemic.style.height = "60%";
          var enemy_offset_top = enemy.offsetTop;
          enemy.style.top=enemy_offset_top+"px";
          break;
        case 3:
          //Senyora
          img_enemic.src = "img16.gif";
          img_enemic.style.width = "90%";
          img_enemic.style.height = "90%";
          var enemy_offset_top = enemy.offsetTop;
          enemy.style.top=enemy_offset_top+"px";
       }
     }

     ataque=setInterval(moveEnemy, 15);
     resFir=setInterval(resetEnemy, 2000);

   }



   function teclaPremuda(input){
     var key = input.which;
     console.log("Tecla premuda: "+key);
     if (partidaIniciada == true){
       if (onTheAir == false){
         if (key == "32"){
           onTheAir = true;
           up=setInterval(characterUp, 50);
         }
       }
      } else{
       if(key == "32"){
         onTheAir = true;
         up=setInterval(characterUp, 50);
         iniciaPartida();
       }
     }
   }

   var character_offset_top_max = 500;
   var character_offset_top_min = 200;

   function characterDown(){
     //console.log("Baixant");
     //console.log("character_offset_top: "+character_offset_top);
     if(character_offset_top < character_offset_top_max){
       character_offset_top+=50;
       character.style.top=character_offset_top+"px";
     } else{
       clearInterval(down);
       onTheAir = false;
     }
   }

   function characterUp(){
     //console.log("Pujant");
     //console.log("character_offset_top: "+character_offset_top);
     if(character_offset_top > character_offset_top_min){
       character_offset_top-=30;
       character.style.top=character_offset_top+"px";
     } else{
       clearInterval(up);
       down=setInterval(characterDown, 60);
     }
   }

   function xocAltura(){
     switch (enemic){
       case 1:
        //llop
        if (character_offset_top > 400) {
          return true;
        }
        return false;
        break;
      case 2:
        //Ocellot
        if (character_offset_top > 350) {
          return true;
        }
        return false;
        break;
      case 3:
        //Senyora
        if (character_offset_top > 300) {
          return true;
        }
        return false;
        break;
     }
   }

   var lim_superior_llop = 255;
   var lim_inferior_llop = 0;
   var lim_superior_ocellot = -120;
   var lim_inferior_ocellot = -330;
   var lim_superior_homer = 150;
   var lim_inferior_homer = 0;

   function xocLateral (){
     switch (enemic){
       case 1:
        //llop
        if (enemy_position < lim_superior_llop & enemy_position > lim_inferior_llop){
          return true;
        }
        return false;
        break;
      case 2:
        //Ocellot
        if (enemy_position < lim_superior_ocellot & enemy_position > lim_inferior_ocellot){
          return true;
        }
        return false;
        break;
      case 3:
        //Homer
        if (enemy_position < lim_superior_homer & enemy_position > lim_inferior_homer){
          return true;
        }
        return false;
        break;
     }
   }
   function netejaTaulell(){
     while (document.body.firstChild) {
       document.body.removeChild(document.body.firstChild);
     }
     taulellFinal();
   }

   function taulellFinal(){
     var body = document.querySelector("body");
     var img = document.createElement("img");
     img.setAttribute("src", "final.png");
     img.style = "position:absolute";
     img.style.top ="50px";
     img.style.left ="700px";
     img.setAttribute("width", "25%");
     img.setAttribute("height", "28%");
     body.appendChild(img);

     var img2 = document.createElement("img");
     img2.setAttribute("src", "final.gif");
     img2.style = "position:absolute";
     img2.style.top ="450px";
     img2.style.left ="700px";
     img2.setAttribute("width", "25%");
     img2.setAttribute("height", "25%");
     body.appendChild(img2);

     var felicitats = document.createElement("p");
     //var text_node = document.createTextNode("Felicitats! Has esquivat "+punts+" enemics");
     felicitats.style="position:absolute";
     felicitats.style.top ="350px";
     felicitats.style.left ="700px";
     felicitats.style.fontStyle = "italic";
     felicitats.style.fontSize = "xx-large";
     //p.appendChildNode(text_node);
     felicitats.innerHTML = "Felicitats! Has esquivat "+punts+" enemics!!";
     body.appendChild(felicitats);

   }

   var final = false;
   function haXocat(){
     if (xocLateral() & xocAltura()){
       //console.log("Tocat!! GAME OVER");
       if (!final){
          alert("GAME OVER");
          final = true;
       }
       netejaTaulell();
    }
  }

  function actualitzaMarcador(){
    if(!final){
      punts++;
    }
    marcador.innerHTML="Punts: "+punts;
  }

  function iniciaPartida(){
    audio.play();
    i = 0;
    partidaIniciada = true;
    onTheAir = true;
    game=setInterval(haXocat, 25);
    desplacaFons();
    desplacaEnemic();
    panell_inicial.style.visibility = "hidden";
  }


}
