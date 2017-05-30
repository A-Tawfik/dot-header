var positions;
var rowsInPlace = 9;
var colInPlace = 8;
var dots;


// these 2 functions create the dots
function init(e){
  positions = document.getElementsByClassName("position")

  createDots()
}

function createDots(){
  for (var i = 0; i < positions.length; i++) {
    for (var j = 1; j < rowsInPlace+1; j++) {
      for (var k = 1; k < colInPlace+1; k++) {
        var dot = document.createElement("div");
        dot.classList.add('dot');
        dot.setAttribute("data-loc", j+"-"+k);
        dot.addEventListener("click", clickActive);
        positions[i].appendChild(dot);
        // debugger;
      }
    }
  }
}

function clickActive(e) {
    e.target.classList.toggle("active");
}

//these 2 functions help make new letters by outputting the stringified json of the active dots in a grid array
function saveLetter(e) {
  var number = e.target.getAttribute("id").substr(7,8);
  var input = document.querySelector('input[name$="input-'+number+'"]').value[0].toUpperCase();
  var grid = parseInt(number) - 1;
  var activeDots = findActives(grid);

  letters[input] = activeDots;
}

function findActives(i) {
  var dotsOn = []
  var activeEls = positions[i].getElementsByClassName("active");
  for (var i = 0; i < activeEls.length; i++) {
    dotsOn.push(activeEls[i].getAttribute("data-loc").split("-"))
  }
  return dotsOn;
}



// these functions use made letters to re-activate the dots

function updateMarquee(e) {
  var str = e.target.value
  for (var i = 0; i < 11; i++) {
    if (!!str[i]) {
      dots = letters[str[i].toUpperCase()]
      clearPosition(i)
      if (!!dots) {
        for (var j = 0; j < dots.length; j++) {
          makeActive(dots[j], i)
        }
      }
    } else {
      clearPosition(i)
    }
  }
}


function clearPosition(i){
  var activeDots = positions[i].getElementsByClassName("dot");
  for (var i = 0; i < activeDots.length; i++) {
    activeDots[i].classList.remove("active");
  }
}

function makeActive(location, i) {
  var el = positions[i].querySelector("[data-loc$='"+ location.join('-') +"']")
  el.classList.add("active")
}
