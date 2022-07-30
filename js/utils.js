
//https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function returnCount(board,x,y){
    var directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    var count = 0;
    for (var i =0; i<directions.length; i++){
        var newY = y+directions[i][0];
        var newX= x+directions[i][1];
        if(0<newY && board.length>newY && 0<newX && board[0].length>newX){
            count +=board[newY][newX];
        }
    }
    return count;
}