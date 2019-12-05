  let MainCanvasHTML5, MainCanvas;

  let PointStar = new createjs.Container();
  let StarCon = new createjs.Container();
  let PathCon = new createjs.Container();

  var Bools = false;
  var CirX,CirY = 0;
  var Orion;

  var LineArr = [];

function startGame()
{
  var temp = document.getElementById('select-1574668650011');
  var val = temp.options[temp.selectedIndex].value;
  console.log(val);

  document.getElementById('startPanel').hidden = true;
  document.getElementById('CursorDD').hidden = false;

  var canvas = document.createElement('canvas');
  canvas.id = "CursorLayer";
  canvas.width = window.visualViewport.width;
  canvas.height = window.visualViewport.height;
  canvas.style.position = "absolute";

  var sumStar = (canvas.width + canvas.height)/3.75;

  var body = document.getElementById("CurDIV1");
  body.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  var ctx1 = canvas.getContext("2d");

  for (var i = 0; i < sumStar; i++) {
    var chil = Math.random()*2;
    ctx.fillStyle = "white";
    ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, chil, chil);
  }

  MainCanvasHTML5 = document.getElementById('CursorDD'); // Для HTML5
  MainCanvasHTML5.width = window.visualViewport.width;
  MainCanvasHTML5.height = window.visualViewport.height;
  MainCanvas = new createjs.Stage(MainCanvasHTML5);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", MainCanvas);
  MainCanvas.enableMouseOver(60);

  MainCanvas.addChild(StarCon,PathCon,PointStar);


  if (val == "Легко") {
      Orion = [
        [200,200],
        [600, 800],
        [1200, 800],
        [1400, 800]
      ];
      Easy();
  }
  else if (val == "Средне") {
    Orion = [
      [200,200],
      [600, 800]
    ];
    Easy();
  }
  else {
    console.log("Бишкек");
  }
}

function Easy() {
  for (var i = 0; i < Orion.length; i++) {
    let circle3 = new createjs.Shape();
    let CentralPoint = new createjs.Shape;
    circle3.graphics.beginStroke("DeepSkyBlue").beginFill("rgba(0, 0, 0, 0.1)").drawCircle(0, 0, 20);
    circle3.name = i;
    circle3.x = Orion[i][0];
    circle3.y = Orion[i][1];
    CentralPoint.graphics.setStrokeStyle(0.5).beginFill("White").drawRect(circle3.x, circle3.y, 2,2);
    StarCon.addChild(circle3);
    PointStar.addChild(CentralPoint);
    circle3.on("mouseover", circleOver.bind(this));
  }
}

function test2(e) {
  let NewLine = PathCon.children[PathCon.children.length-1];

    if (NewLine.graphics._activeInstructions.length < 2)
      {
        NewLine.graphics.lineTo(CirX, CirY);
      }
    else {
        let LastPoint = NewLine.graphics._activeInstructions[NewLine.graphics._activeInstructions.length - 1];
        LastPoint.x = e.currentTarget.mouseX;
        LastPoint.y = e.currentTarget.mouseY;
      }
}
function circleClick(t) {
    //t.currentTarget.graphics._stroke.style = "White";
    CirX = t.currentTarget.x;
    CirY = t.currentTarget.y;
    let CirName = t.currentTarget.name;

    if (CirName-1 == LineArr[0] || CirName+1 == LineArr[0]) {
      Bools = true;
    }

    LineArr.push(CirName);

    if(!MainCanvas.hasEventListener("stagemousemove"))
    {
      var Line = new createjs.Shape();

      Line.graphics.beginStroke("White").moveTo(t.currentTarget.x, t.currentTarget.y);
      PathCon.addChild(Line);


      MainCanvas.addEventListener("stagemousemove", test2);
    }
    else {
      if(Bools)
      {
        LineArr.length = 0;
        PathCon.children[PathCon.children.length-1].graphics._activeInstructions[1].x = t.currentTarget.x;
        PathCon.children[PathCon.children.length-1].graphics._activeInstructions[1].y = t.currentTarget.y;
        MainCanvas.removeAllEventListeners("stagemousemove");
      }
      else {
        LineArr.push(CirName);
      }
    }
    Bools = false;
}

function circleOver(e) {
  if(!e.currentTarget.hasEventListener("click"))
    e.currentTarget.on("click", circleClick.bind(this));
}
