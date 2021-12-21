class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);

    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);

    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);

    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);

    cars = [car1, car2, car3, car4];


  }

  play(){
    form.hide();
    //textSize(30);
    //text("Inicio del Juego", 120, 100)
    Player.getPlayerInfo();

    //player gerCarsAtEnd

    if(allPlayers !== undefined){

      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        //var display_position = 130;

        //INDEX DEL ARREGLO
        var index = 0;

        //POSICION EN X Y Y DE LOS CARROS
        var x = 175;
        var y;

        for(var plr in allPlayers){
        

        //if (plr === "player" + player.index)
        //  fill("red")
        //else
         // fill("black");

        //display_position+=20;
        //textSize(15);
       // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)

       //AÑADIR 1 AL INDEX
          index = index + 1 ;

          //POSICION DE LOS CARROS ENTRE ELLOS
          x = x + 200;

          //USART LA BASE DE DATOS PARA MOSTRAR LOS CARROS EN LA DIRECCCION Y
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }



      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      //player rank

      //player update cars
    }

    drawSprites();
  }

  end(){
    console.log("Game Ended");

    //console.log player rank
  }


}
