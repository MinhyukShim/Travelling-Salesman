class Node{

    constructor(x,y,number){
        this.x = x;
        this.y = y;
        this.degree = 0;
        this.number = number;

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