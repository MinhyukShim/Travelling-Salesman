class Node{

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.degree = 0;

    }

    distance(node){
        return Math.sqrt(Math.pow((node.x-this.x),2) + Math.pow((node.y-this.y),2));
    }


} 


class Edge{
    constructor(node_a, node_b, distance){
        this.distance = distance;
        this.nodes = [node_a,node_b];
    }

}