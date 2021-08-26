window.onload = () => {
  document.getElementById("playAgain").onclick = () => {
    startGame();
    clearParametros();
  };

  function startGame() {
    //Variables del DOM
    const winner = document.getElementById("winnerTemporal");
    const gameOverPlayer1 = document.getElementById("gameOverPlayer1");
    const gameOverPlayer2 = document.getElementById("gameOverPlayer2");
    const jugador1 = document.getElementById("jugador1");
    const jugador2 = document.getElementById("jugador2");

    const barraDiferencia = document.getElementById("barraDiferenciaPlayer1");
    const barraDiferencia2 = document.getElementById("barraDiferenciaPlayer2");
    const barra = document.getElementsByClassName("player1");
    const div1 = document.getElementById("div1");
    const playAgain = document.getElementById("playAgain");

    //inicializar canvas jugador 1
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    //inicializar canvas jugador 2
    const canvas2 = document.getElementById("game2");
    const ctx2 = canvas2.getContext("2d");

    // Preguntar nombre jugadores
    function yourName() {
      const player1Name = prompt("Jugador 1 - Escriba su nombre ");
      const player2Name = prompt("Jugador 2 - Escriba su nombre ");

      jugador1.innerHTML = `${player1Name}`;
      jugador2.innerHTML = `${player2Name}`;
    }
    yourName();

    /*
//barraDiferencia.createElement("div");
const nuevoDiv = document.createElement("div");
const nuevoDiv2 = document.createElement("div");

nuevoDiv.setAttribute("class", "player1");
nuevoDiv2.setAttribute("class", "player1");

//insertarDiv();
barraDiferencia.appendChild(nuevoDiv);
barraDiferencia.appendChild(nuevoDiv2);
*/

    //Audios
    const gameOverSound = new Audio("../audio/gameOver2.mp3");
    const comerManzana = new Audio("../audio/comerManzana.mp3");
    const aplausosAudio = new Audio("../audio/applause.wav");
    //constructor  canvas jugador 1
    class SnakePart {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }

    //constructor canvas jugador 2
    class SnakePart2 {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }

    // variables jugador 1
    let speed = 7;
    let tileCount = 20;
    let tileSize = canvas.width / tileCount - 2;
    let headX = 10;
    let headY = 10;
    const snakeParts = [];
    let tailLength = 2;
    let appleX = 5;
    let appleY = 5;

    let xVelocity = 0;
    let yVelocity = 0;

    let score = 0;

    let nivel = 1;

    let gameOver = false;

    // variables jugador 2

    let speed2 = 7;
    let score2 = 0;

    let tileCount2 = 20;
    let tileSize2 = canvas2.width / tileCount2 - 2;
    let headX2 = 10;
    let headY2 = 10;
    const snakeParts2 = [];
    let tailLength2 = 2;

    let appleX2 = 5;
    let appleY2 = 5;

    let xVelocity2 = 0;
    let yVelocity2 = 0;

    let gameOver2 = false;

    //Función principal para pintar el juego del jugador 1

    function drawGame() {
      changeSnakePosition();
      let result = isGameOver();
      let result2 = isLooser();
      let result3 = isWinner();
      if (result || result2) {
        // gameOverSound.play();
        return;
      }

      clearScreen();

      checkAppleCollision();
      drawApple();
      drawSnake();

      drawScore();
      drawNivel();

      //requestAnimationFrame(drawGame);
      setTimeout(drawGame, 1000 / speed);
    }

    //Definir funciones jugador 1

    function isGameOver() {
      //let gameOver = false;

      if (xVelocity === 0 && yVelocity === 0) {
        return false;
      }

      //walls
      if (headX < 0) {
        gameOver = true;
        gameOverSound.play();
      } else if (headX === tileCount) {
        gameOver = true;
        gameOverSound.play();
      } else if (headY < 0) {
        gameOver = true;
        gameOverSound.play();
      } else if (headY === tileCount) {
        gameOver = true;
        gameOverSound.play();
      }

      for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
          gameOver = true;
          break;
        }
      }

      if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        ctx.font = "30px Verdana";
        ctx.fillText(
          `Tu puntuación es: ${score}`,
          canvas.width / 6.5,
          canvas.height / 1.5
        );
      }

      return gameOver;
    }

    function isLooser() {
      let isLooser = false;

      let diferenciaScore = score2 - score;
      if (diferenciaScore === 4) {
        aplausosAudio.play();
        isLooser = true;
      }
      if (isLooser) {
        ctx.fillStyle = "white";
        ctx.font = "20px Verdana";
        ctx.fillText(
          `${jugador1.innerHTML} ha perdido la partida!`,
          canvas2.width / 8.5,
          canvas2.height / 2
        );
      }

      return isLooser;
    }

    function isWinner() {
      let winner = false;

      let diferenciaScore = score2 - score;
      if (diferenciaScore === 4) {
        winner = true;
      }
      if (winner) {
        ctx.fillStyle = "white";
        ctx.font = "20px Verdana";
        ctx.fillText(
          `${jugador2.innerHTML} ha ganado la partida!`,
          canvas2.width / 8.5,
          canvas2.height / 2
        );
      }
      return winner;
    }

    function drawNivel() {
      ctx.fillStyle = "white";
      ctx.font = "10px Verdana";
      ctx.fillText("Nivel " + nivel, 10, 10);
    }

    function drawScore() {
      ctx.fillStyle = "white";
      ctx.font = "10px Verdana";
      ctx.fillText("Score " + score, canvas.width - 50, 10);
    }

    function clearScreen() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
      for (let i = 0; i < snakeParts.length; i++) {
        if (i % 2) {
          ctx.fillStyle = "blue";
        } else {
          ctx.fillStyle = "red";
        }
        let part = snakeParts[i];
        ctx.fillRect(
          part.x * tileCount,
          part.y * tileCount,
          tileSize,
          tileSize
        );
      }

      snakeParts.push(new SnakePart(headX, headY));
      while (snakeParts.length > tailLength) {
        snakeParts.shift();
      }

      ctx.fillStyle = "blue";
      ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    }

    function changeSnakePosition() {
      headX = headX + xVelocity;
      headY = headY + yVelocity;
    }

    function drawApple() {
      ctx.fillStyle = "red";
      ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    }

    function checkAppleCollision() {
      if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        comerManzana.play();
        if (score % 6 === 0) {
          nivel++;
          speed++;
        }
      }
    }

    document.body.addEventListener("keydown", keyDown);

    function keyDown(event) {
      //arriba
      if (event.keyCode == 38) {
        if (yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
      }
      //abajo
      if (event.keyCode == 40) {
        if (yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
      }

      //izquierda
      if (event.keyCode == 37) {
        if (xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
      }

      // derecha
      if (event.keyCode == 39) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
      }
    }

    // Iniciar el juego jugador1
    drawGame();

    //  Función principal para pintar el juego del jugador 1

    function drawGame2() {
      changeSnakePosition2();
      let result2 = isGameOver2();
      let result3 = isWinner2();
      if (result2 || result3) {
        return;
      }

      clearScreen2();

      checkAppleCollision2();
      drawApple2();
      drawSnake2();

      drawScore2();

      setTimeout(drawGame2, 1000 / speed2);
    }

    function isGameOver2() {
      // let gameOver2 = false;

      if (xVelocity2 === 0 && yVelocity2 === 0) {
        return false;
      }

      //walls
      if (headX2 < 0) {
        gameOver2 = true;
        gameOverSound.play();
      } else if (headX2 === tileCount2) {
        gameOver2 = true;
        gameOverSound.play();
      } else if (headY2 < 0) {
        gameOver2 = true;
        gameOverSound.play();
      } else if (headY2 === tileCount2) {
        gameOver2 = true;
        gameOverSound.play();
      }

      for (let i = 0; i < snakeParts2.length; i++) {
        let part = snakeParts2[i];
        if (part.x === headX2 && part.y === headY2) {
          gameOver2 = true;
          break;
        }
      }

      if (gameOver2) {
        ctx2.fillStyle = "white";
        ctx2.font = "50px Verdana";
        ctx2.fillText("Game Over!", canvas2.width / 6.5, canvas2.height / 2);
        ctx2.font = "30px Verdana";
        ctx2.fillText(
          `Tu puntuación es: ${score2}`,
          canvas2.width / 6.5,
          canvas2.height / 1.5
        );
      }

      return gameOver2;
    }

    function isLooser2() {
      let isLooser2 = false;

      let diferenciaScore = score - score2;
      if (diferenciaScore === 4) {
        aplausosAudio.play();
        isLooser2 = true;
      }
      if (isLooser2) {
        ctx2.fillStyle = "white";
        ctx2.font = "20px Verdana";
        ctx2.fillText(
          `${jugador1.innerHTML} ha perdido la partida!`,
          canvas2.width / 8.5,
          canvas2.height / 2
        );
      }

      return isLooser;
    }

    function isWinner2() {
      let winner2 = false;

      let diferenciaScore = score2 - score;
      if (diferenciaScore === 4) {
        winner2 = true;
      }
      if (winner2) {
        ctx2.fillStyle = "white";
        ctx2.font = "20px Verdana";
        ctx2.fillText(
          `${jugador2.innerHTML} ha ganado la partida!`,
          canvas2.width / 8.5,
          canvas2.height / 2
        );
      }
      return winner2;
    }

    function drawScore2() {
      ctx2.fillStyle = "white";
      ctx2.font = "10px Verdana";
      ctx2.fillText("Score " + score2, canvas2.width - 50, 10);
    }

    function clearScreen2() {
      ctx2.fillStyle = "black";
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    }

    function drawSnake2() {
      for (let i = 0; i < snakeParts2.length; i++) {
        if (i % 2) {
          ctx2.fillStyle = "white";
        } else {
          ctx2.fillStyle = "red";
        }
        let part = snakeParts2[i];
        ctx2.fillRect(
          part.x * tileCount2,
          part.y * tileCount2,
          tileSize2,
          tileSize2
        );
      }

      snakeParts2.push(new SnakePart2(headX2, headY2));
      while (snakeParts2.length > tailLength2) {
        snakeParts2.shift();
      }

      ctx2.fillStyle = "red";
      ctx2.fillRect(
        headX2 * tileCount2,
        headY2 * tileCount2,
        tileSize2,
        tileSize2
      );
    }

    function changeSnakePosition2() {
      headX2 = headX2 + xVelocity2;
      headY2 = headY2 + yVelocity2;
    }

    function drawApple2() {
      ctx2.fillStyle = "red";
      ctx2.fillRect(
        appleX2 * tileCount2,
        appleY2 * tileCount2,
        tileSize2,
        tileSize2
      );
    }

    function checkAppleCollision2() {
      if (appleX2 === headX2 && appleY2 == headY2) {
        appleX2 = Math.floor(Math.random() * tileCount2);
        appleY2 = Math.floor(Math.random() * tileCount2);
        tailLength2++;
        score2++;
        comerManzana.play();
        if (score2 % 6 === 0) {
          nivel2++;
          speed2++;
        }
      }
    }

    document.body.addEventListener("keydown", keyDown2);

    function keyDown2(event) {
      //arriba
      if (event.keyCode == 87) {
        if (yVelocity2 == 1) return;
        yVelocity2 = -1;
        xVelocity2 = 0;
      }
      //abajo
      if (event.keyCode == 83) {
        if (yVelocity2 == -1) return;
        yVelocity2 = 1;
        xVelocity2 = 0;
      }

      //izquierda
      if (event.keyCode == 65) {
        if (xVelocity2 == 1) return;
        yVelocity2 = 0;
        xVelocity2 = -1;
      }

      // derecha
      if (event.keyCode == 68) {
        if (xVelocity2 == -1) return;
        yVelocity2 = 0;
        xVelocity2 = 1;
      }
    }
    // Iniciar el juego jugador2
    drawGame2();

    let clearWinnerTemporal;
    // Cambios en el DOM
    function drawWinnerTemporal() {
      clearWinnerTemporal = setInterval(() => {
        if (
          xVelocity == 0 &&
          yVelocity == 0 &&
          xVelocity2 == 0 &&
          yVelocity2 == 0
        ) {
          winner.innerHTML = ` `;
        } else if (gameOver === true && gameOver2 === true) {
          winner.innerHTML = ` `;
        } else {
          if (score < score2) {
            let diferenciaScore = score2 - score;
            console.log(diferenciaScore);
            console.log(score, score2);
            if (diferenciaScore === 1) {
              winner.innerHTML = `${jugador2.innerHTML} está ganado a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "26rem";
              barraDiferencia.style.width = "22rem";
            } else if (diferenciaScore === 2) {
              winner.innerHTML = `${jugador2.innerHTML} está ganado a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "28rem";
              barraDiferencia.style.width = "20rem";
            } else if (diferenciaScore === 3) {
              winner.innerHTML = `${jugador2.innerHTML} está aplastando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "30rem";
              barraDiferencia.style.width = "18rem";
            } else if (diferenciaScore === 4) {
              winner.innerHTML = `${jugador2.innerHTML} está aplastando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "32rem";
              barraDiferencia.style.width = "16rem";
            } else if (diferenciaScore === 5) {
              winner.innerHTML = `${jugador2.innerHTML} está aplastando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "34rem";
              barraDiferencia.style.width = "14rem";
            } else if (diferenciaScore === 6) {
              winner.innerHTML = `${jugador2.innerHTML} está humillando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "36rem";
              barraDiferencia.style.width = "12rem";
            } else if (diferenciaScore === 7) {
              winner.innerHTML = `${jugador2.innerHTML} está humillando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "38rem";
              barraDiferencia.style.width = "10rem";
            } else if (diferenciaScore === 8) {
              winner.innerHTML = `${jugador2.innerHTML} está humillando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "40rem";
              barraDiferencia.style.width = "8rem";
            } else if (diferenciaScore === 9) {
              winner.innerHTML = `${jugador2.innerHTML} está humillando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "42rem";
              barraDiferencia.style.width = "6rem";
            } else if (diferenciaScore === 10) {
              winner.innerHTML = `${jugador2.innerHTML} está humillando a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "44rem";
              barraDiferencia.style.width = "4rem";
            } else if (diferenciaScore === 11) {
              winner.innerHTML = `${jugador1.innerHTML} está pidiendo clemencia a ${jugador1.innerHTML}`;
              barraDiferencia2.style.width = "46rem";
              barraDiferencia.style.width = "2rem";
            } else {
              winner.innerHTML = `${jugador1.innerHTML} está pidiendo clemencia a ${jugador2.innerHTML}`;
              barraDiferencia2.style.width = "48rem";
              barraDiferencia.style.width = "0rem";
            }
          } else if (score === score2) {
            winner.innerHTML = `Estais empatados!!`;
            barraDiferencia2.style.width = "24rem";
            barraDiferencia.style.width = "24rem";
          } else {
            if (score > score2) {
              let diferenciaScore = score - score2;
              if (diferenciaScore === 1) {
                winner.innerHTML = `${jugador1.innerHTML} está ganando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "26rem";
                barraDiferencia2.style.width = "22rem";
              } else if (diferenciaScore === 2) {
                winner.innerHTML = `${jugador1.innerHTML} está ganado a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "28rem";
                barraDiferencia2.style.width = "20rem";
              } else if (diferenciaScore === 3) {
                winner.innerHTML = `${jugador1.innerHTML} está aplastando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "30rem";
                barraDiferencia2.style.width = "18rem";
              } else if (diferenciaScore === 4) {
                winner.innerHTML = `${jugador1.innerHTML} está aplastando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "32rem";
                barraDiferencia2.style.width = "16rem";
              } else if (diferenciaScore === 5) {
                winner.innerHTML = `${jugador1.innerHTML} está aplastando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "34rem";
                barraDiferencia2.style.width = "14rem";
              } else if (diferenciaScore === 6) {
                winner.innerHTML = `${jugador1.innerHTML} está humillando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "36rem";
                barraDiferencia2.style.width = "12rem";
              } else if (diferenciaScore === 7) {
                winner.innerHTML = `${jugador1.innerHTML} está humillando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "38rem";
                barraDiferencia2.style.width = "10rem";
              } else if (diferenciaScore === 8) {
                winner.innerHTML = `${jugador1.innerHTML} está humillando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "40rem";
                barraDiferencia2.style.width = "8rem";
              } else if (diferenciaScore === 9) {
                winner.innerHTML = `${jugador1.innerHTML} está humillando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "42rem";
                barraDiferencia2.style.width = "6rem";
              } else if (diferenciaScore === 10) {
                winner.innerHTML = `${jugador1.innerHTML} está humillando a ${jugador2.innerHTML}`;
                barraDiferencia.style.width = "44rem";
                barraDiferencia2.style.width = "4rem";
              } else if (diferenciaScore === 11) {
                winner.innerHTML = `${jugador2.innerHTML} está pidiendo clemencia a ${jugador1.innerHTML}`;
                barraDiferencia.style.width = "46rem";
                barraDiferencia2.style.width = "2rem";
              } else {
                winner.innerHTML = `${jugador2.innerHTML} está pidiendo clemencia a ${jugador1.innerHTML}`;
                barraDiferencia.style.width = "48rem";
                barraDiferencia2.style.width = "2rem";
              }
            }
          }
        }
      }, 1000);
    }

    drawWinnerTemporal();

    let clearGameOverPlayer1;

    function drawGaveOverPlayer1() {
      clearGameOverPlayer1 = setInterval(() => {
        if (gameOver === true) {
          gameOverPlayer1.innerHTML = `Ha acabado la partida para <span>${jugador1.innerHTML}</span> con una puntacion de <span> <b> ${score} </span></b>`;
        }
      }, 1000);
    }

    drawGaveOverPlayer1();

    let clearGameOverPlayer2;

    function drawGaveOverPlayer2() {
      clearGameOverPlayer2 = setInterval(() => {
        if (gameOver2 === true) {
          gameOverPlayer2.innerHTML = `Ha acabado la partida para el  <span>${jugador2.innerHTML} </span> con una puntacion de <span><b>${score2}</span>`;
        }
      }, 1000);
    }

    drawGaveOverPlayer2();

    let clearWinnerDefinitivo;

    function drawWinnerDefinitivo() {
      clearWinnerDefinitivo = setInterval(() => {
        if (gameOver === true && gameOver2 === true) {
          if (score > score2) {
            winnerDefinitivo.innerHTML = `El ganador es ${jugador1.innerHTML}`;
          }
          if (score < score2) {
            winnerDefinitivo.innerHTML = `El ganador es ${jugador2.innerHTML} `;
          }

          if (score === score2) {
            winnerDefinitivo.innerHTML = `El resultado ha sido un empate `;
          }
        }
      }, 1000);
    }

    drawWinnerDefinitivo();
  }

  function clearParametros() {
    // clearInterval(clearWinnerDefinitivo);
    clearInterval(clearWinnerDefinitivo);
    clearInterval(clearGameOverPlayer1);
    clearInterval(clearGameOverPlayer2);
    clearInterval(clearWinnerTemporal);
    winner.innerHTML = " ";
    winnerDefinitivo = " ";
  }
};
