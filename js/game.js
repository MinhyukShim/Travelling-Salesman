var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var rect = canvas.getBoundingClientRect();

var nodes_amount = 25;
var padding_border = 25;
var nodes;
var edges;
var width= canvas.width;
var height = canvas.height;
var simulateInterval;
var slider = document.getElementById("myRange");
var sliderValue = document.getElementById("demo");
var simulating = false;



function generate_x_y(){

    x = Math.floor(Math.random() * width);
    if(x<padding_border){
        x= padding_border
    }
    else if(x>width-padding_border){
        x = x-padding_border
    }
    y= Math.floor(Math.random() * height);
    if(y<padding_border){
        y= padding_border
    }
    else if(y>height-padding_border){
        y = y-padding_border
    }

    return [x,y];
}
// Update the current slider value (each time you drag the slider handle)
//board[y][x]; larger y = down; larger x = across.
function init(){

    nodes = createArray(nodes_amount);
    
    for (var i =0; i<nodes_amount; i++){
        xy = generate_x_y();
        nodes[i] = new Node(xy[0] ,xy[1]);
    }



    render();
}


function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i =0; i<nodes_amount; i++){
        node = nodes[i];
        ctx.beginPath();
        ctx.arc(node.x,node.y, 6, 0, 2 * Math.PI, false);
        if(i==0){
            ctx.fillStyle = "blue";
        }
        else{
            ctx.fillStyle = "Black"; 
        }
        ctx.fill();
    }

    

}


function nearest_click(){
    distance = nearest(nodes);

    draw_edges();
}


function draw_edges(){
    for (var i =0; i<edges.length; i++){
        edge = edges[i]
        ctx.beginPath();
        ctx.moveTo(edge.nodes[0].x,edge.nodes[0].y);
        ctx.lineTo(edge.nodes[1].x, edge.nodes[1].y);
        ctx.stroke();
    }
}


function all_2_degrees(nodes){
    for (var i =0; i<nodes_amount; i++){
        if(nodes[i].degree!=2){
            return false;
        }
    }
    return true
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function nearest(nodes){
    total_dist = 0
    edges = createArray(nodes_amount);
    cur_i = 0
    nodes_copy = [];

    for (i = 0; i < nodes.length; i++) {
        nodes_copy[i] = nodes[i];
    }
    current_node = nodes_copy[0]
    
    while(nodes_copy.length!=1){

        //find closest node with current node
        min_dist = 1000000;
        var connecting_node;
        for (var i =0; i<nodes_copy.length; i++){
            new_dist = current_node.distance(nodes_copy[i]);
            if(new_dist!=0 && new_dist<min_dist){
                min_dist= new_dist;
                connecting_node = nodes_copy[i];
            }
        }

        //connect these two.
        edges[cur_i++] = new Edge(current_node, connecting_node, min_dist);
        current_node.degree++;
        connecting_node.degree++;
        const index = nodes_copy.indexOf(current_node);
        if (index > -1) { // only splice array when item is found
            nodes_copy.splice(index, 1); // 2nd parameter means remove one item only
        }  

        //update current node to the new node
        current_node=connecting_node;
        total_dist+= min_dist
    }

    //connect the last node.
    edges[cur_i++] = new Edge(current_node, nodes[0], current_node.distance(nodes[0]));
    return total_dist



}