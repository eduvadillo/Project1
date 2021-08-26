function yourName() {
  const playerName = prompt("Please enter your name");

  if (playerName != null) {
    document.getElementById("nombreJugador").innerHTML =
      "Hello " + playerName + "! Ready to play and beat the record?";
  }
  let saveName = localStorage.setItem("NAME", playerName);
}

yourName();

const betisBox = document.querySelector("#elegirBetis");
const bilbaoBox = document.querySelector("#elegirBilbao");
const gameBoy = document.querySelector(".gameBoy");

const sinParedesBox = document.querySelector("#elegirSinParedes");

sinParedesBox.addEventListener("change", function (e) {
  if (sinParedesBox.checked) {
    gameBoy.href = "/html/gameboyBarcaSinParedes.html";
  } else {
    gameBoy.href = "/html/gameboyBarca.html";
  }
});

const betisBoxSinParedes = document.querySelector("#elegirBetis");

betisBoxSinParedes.addEventListener("change", function (e) {
  if (
    betisBoxSinParedes.checked &&
    sinParedesBox.addEventListener("change", function (e) {
      if (sinParedesBox.checked) {
        gameBoy.href = "./gameboyBetisSinParedes.html";
      } else {
        gameBoy.href = "./gameboyBarca.html";
      }
    })
  ) {
    gameBoy.href = "./gameboyBetis.html";
  } else {
    gameBoy.href = "./gameboyBarca.html";
  }
});

const bilbaoBoxSinParedes = document.querySelector("#elegirBilbao");

bilbaoBoxSinParedes.addEventListener("change", function (e) {
  if (
    bilbaoBoxSinParedes.checked &&
    sinParedesBox.addEventListener("change", function (e) {
      if (sinParedesBox.checked) {
        gameBoy.href = "./gameboyBilbaoSinParedes.html";
      } else {
        gameBoy.href = "./gameboyBarca.html";
      }
    })
  ) {
    gameBoy.href = "./gameboyBilbao.html";
  } else {
    gameBoy.href = "./gameboyBarca.html";
  }
});

bilbaoBox.addEventListener("change", function (e) {
  if (bilbaoBox.checked) {
    gameBoy.href = "./gameboyBilbao.html";
  } else {
    gameBoy.href = "./gameboyBarca.html";
  }
});

betisBox.addEventListener("change", function (e) {
  if (betisBox.checked) {
    gameBoy.href = "./gameboyBetis.html";
  } else {
    gameBoy.href = "./gameboyBarca.html";
  }
});
