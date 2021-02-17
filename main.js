function inicio(){
    $("#botao").hide(); //oculta botao de inicio
    $("#gameover").hide();   
    let canvas = document.getElementById("snake");
    let context = canvas.getContext("2d");
    let box = 32;
    let pontos = 0;
    let tempo = setInterval(iniciarJogo, 100);
   
    let snake = [];
    snake[0]={
        x: 8 * box,
        y: 8 * box
    }

    let direction = "right";

    let food = { //cria comida
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    function criarBG() { //cria background da tela
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box);
    } //fim da função cria background da tela

    function criarCobrinha(){ //funçao cria cobrinha
        for(i=0; i < snake.length; i++){
            context.fillStyle= "green";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }  //fim da funçao cria cobrinha

    function drawFood(){ // função desenha comida
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, box, box);
    } // fim da função desenha comida

    document.addEventListener('keydown', update); //ler tecla pressionada
    function update(event){ //função q define movimentos pelo teclado
        if(event.keyCode == 37 && direction != "right"){ // 
            direction= "left";
        }
        if(event.keyCode == 38 && direction != "down"){
            direction= "up";
        }
        if(event.keyCode == 39 && direction != "left"){
            direction= "right";
        }
        if(event.keyCode == 40 && direction != "up"){
            direction= "down";
        }
    } // fim da função q define movimentos pelo teclado

  //  let pontos = 0;
  // let tempo = setInterval(iniciarJogo, 100);
    function iniciarJogo(){
           
        criarBG(); //chama funcao de desenhar background
        criarCobrinha(); //chama funcao cria cobrinha
        drawFood(); //chama funcao de desenhar comida

        if(snake[0].x >= 16 * box && direction == "right"){ //colisao com a parede
            //snake[0].x = 0;
            gameOver();
        }
        if(snake[0].x <= -1  && direction == "left"){
           // snake[0].x = 16 * box;
            gameOver();
        }
        if(snake[0].y >= 16 * box && direction == "down"){
            //snake[0].y = 0;
            gameOver();
        }
        if(snake[0].y <= -1 && direction == "up"){
            //snake[0].y = 16 * box;
            gameOver();
        }

        for(i = 1; i < snake.length; i++){ 
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ // se cobrinha colidir com o proprio corpo
                gameOver();
            }
        }

        let snakeX= snake[0].x;//onde a cobrinha nasce
        let snakeY= snake[0].y;  
     
        if(direction=="right") snakeX +=box;//atualiza movimento da cobra
        if(direction=="left") snakeX -=box;
        if(direction=="up") snakeY -=box;
        if(direction=="down") snakeY +=box;
               
        if (snakeX != food.x || snakeY != food.y){ //cobrinha come e aumenta de tamanho
            snake.pop();
        }else{
            pontos = pontos+1;
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }        
    
        let newHead = { //inserido nova cabeça na cobrinha
            x: snakeX,
            y: snakeY
        }    
        snake.unshift(newHead);   
    }

    function gameOver(){ // função fim de tem
        clearInterval(tempo);
        $('h3 span').html(pontos);            
        $("#gameover").show();
        $("#botao").show();
        $("#snake").hide();
    } // fim da função fim de tem  

}

$(function(){
    $(".btn-toggle").click(function(e){
        e.preventDefault();
        el = $(this).data('element');
        $(el).toggle();
    });
});