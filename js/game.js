var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("click", clickPoint);

var rect = canvas.getBoundingClientRect();

var size = 20
var yGridSize = canvas.height/size;
var xGridSize = canvas.width/(size*2);
var board;
var simulateInterval;
var slider = document.getElementById("myRange");
var sliderValue = document.getElementById("demo");
var simulating = false;
sliderValue.innerHTML = slider.value;

slider.oninput = function() {
    sliderValue.innerHTML = this.value;
  if(simulating){
    pauseSim();
    continualSimulate();
  }
}
// Update the current slider value (each time you drag the slider handle)
//board[y][x]; larger y = down; larger x = across.
function init(){

    board = createArray(size,size*2);
    
    for (var i =0; i <board.length; i++){
        for (var j =0; j <board[0].length; j++){
            board[i][j] = 0;
        }
    } 
    console.log(board);

    render();
}

function simulateStep(){
    var newBoard = createArray(size,size*2);
    for (var i =0; i <board.length; i++){
        for (var j =0; j <board[0].length; j++){
            var count = returnCount(board,j,i);
            if(board[i][j]==1){
                if(count ==2 || count ==3){
                    newBoard[i][j] = 1;
                }
                else{
                    newBoard[i][j] = 0;
                }
            }
            else if(board[i][j]==0){
                if(count==3){
                    newBoard[i][j] = 1;
                }
                else{
                    newBoard[i][j] = 0;
                }
            }
            else{
                newBoard[i][j] = 0;
            }
        }
    }
    board = newBoard;
    render();
}

function continualSimulate(){
    if(simulating==false){
        simulating = true;
        simulateInterval = setInterval(simulateStep,sliderValue.innerHTML);
    }
}

function pauseSim(){
    simulating= false;
    clearInterval(simulateInterval);
}

function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var currentY =0;
    var currentX = 0;
    for (var i =0; i <board.length; i++){
        for (var j =0; j <board[0].length; j++){
            if(board[i][j]==1){
                ctx.fillRect(currentX,currentY, xGridSize,yGridSize);
            }

            currentX +=xGridSize;
        }
        currentY +=yGridSize;
        currentX = 0;
    }

}

function clickPoint(event) {
    var x = Math.floor((event.clientX - rect.left) /xGridSize);
    var y = Math.floor((event.clientY - rect.top )/yGridSize);


    if(board[y][x] ==1){
        board[y][x] = 0;
    }
    else if(board[y][x] ==0){
        board[y][x] = 1;
    }
    render();


       
}




