
function generate_random(nodes){
    var edges_temp = createArray(nodes.length+1);
    var nodes_copy= createArray(nodes.length);
    for (var i = 0; i < nodes.length; i++) {
        nodes_copy[i] = nodes[i];
    }

    current_node = nodes_copy[0];
    edges_temp[0] = nodes_copy[0];
    nodes_copy.splice(0, 1);
    cur_i = 1;
    while(nodes_copy.length!=0){
        random_node = Math.floor(Math.random() * nodes_copy.length);
        edges_temp[cur_i++] = nodes_copy[random_node];
        current_node = nodes_copy[random_node]
        if (random_node > -1) { // only splice array when item is found
            nodes_copy.splice(random_node, 1); // 2nd parameter means remove one item only
        }  
      
    }
    edges_temp[cur_i++] = nodes[0];

    total_dist = calc_dist(edges_temp);
    return [edges_temp,total_dist];
}

function breed(edges_a,edges_b){
    bred_edges = createArray(edges_a.length);

    bred_edges[0] = edges_a[0]
    bred_edges[edges_a.length-1] = edges_a[edges_a.length-1]
    edges_left = createArray(edges_a.length-2);
    
    for (var i = 0; i < edges_a.length-2; i++) {
        edges_left[i] = edges_a[i+1];
    } 
    var which = 0;
    for(var i=1; i<edges_a.length-1;i++){

        if((i-1)%3==0){
            which = Math.random();
        }
        found = false;
        if(which<0.5){
            if(edges_left.includes(edges_a[i])){
                bred_edges[i] = edges_a[i];
                const index = edges_left.indexOf(bred_edges[i]);
                edges_left.splice(index, 1); // 2nd parameter means remove one item only
                found = true;
            }
            else if(edges_left.includes(edges_b[i])){
                bred_edges[i] = edges_b[i];
                const index = edges_left.indexOf(bred_edges[i]);
                edges_left.splice(index, 1); // 2nd parameter means remove one item only
                found = true;
            }
        }
        else{
            if(edges_left.includes(edges_b[i])){
                bred_edges[i] = edges_b[i];
                const index = edges_left.indexOf(bred_edges[i]);
                edges_left.splice(index, 1); // 2nd parameter means remove one item only
                found = true;
            }
            else if(edges_left.includes(edges_a[i])){
                bred_edges[i] = edges_a[i];
                const index = edges_left.indexOf(bred_edges[i]);
                edges_left.splice(index, 1); // 2nd parameter means remove one item only
                found = true;
            }
        }

        if(found==false){
            index_rand = Math.floor(Math.random() * edges_left.length);
            bred_edges[i] = edges_left[index_rand]
            edges_left.splice(index_rand, 1); // 2nd parameter means remove one item only
        }

    }

    total_dist = calc_dist(bred_edges);
    return [bred_edges,total_dist];
}

function calc_dist(edges_in){
    total_dist = 0
    cur_node = edges_in[0]
    for (var i = 1; i<edges_in.length;i++){
        total_dist+= cur_node.distance(edges_in[i]);
        cur_node = edges_in[i];

    }

    return total_dist
}



function mutate(edges_in){
    max_swaps = 10
    swaps = Math.floor(Math.pow(Math.random(), 3)*max_swaps)+1;
    for(var i = 0; i <swaps; i++){
        edge_a = Math.floor(Math.random() *(edges_in.length-3)) + 1;
        edge_b = Math.floor(Math.random() *(edges_in.length-3)) + 1;
        [edges_in[edge_a], edges_in[edge_b]] = [edges_in[edge_b], edges_in[edge_a]];
        [edges_in[edge_a+1], edges_in[edge_b+1]] = [edges_in[edge_b+1], edges_in[edge_a+1]];
    }

    new_dist = calc_dist(edges_in)
    return [edges_in,new_dist];
}

function genetic(nodes){
    total_dist = 0;
     

    generations = 50
    candidates = 20000
    mutation_rate = 50
    keep_rate = 16000
    non_mutate = 10

    snapshot_amount = 50
    snapshot_i = 0;
    snapshot_edges =createArray(snapshot_amount);
    all_edges = createArray(candidates);

    for (var i = 0; i < candidates; i++) {
        all_edges[i] = generate_random(nodes);
    }

    all_edges = all_edges.sort(function(a, b) {
        return a[1] - b[1];
    });

    for (var i =0; i<generations; i++ ){
        new_edges = createArray(candidates); 

        for (var j =0; j<keep_rate; j ++){
           
            if(j>=non_mutate ){
                cand_a =Math.floor(Math.pow(Math.random(), 5)*Math.floor(candidates/4))
                cand_b =Math.floor(Math.pow(Math.random(), 5)*Math.floor(candidates/4))
                new_edges[j] = breed(all_edges[cand_a][0],all_edges[cand_b][0])
                if(Math.floor(Math.random() * 100)<mutation_rate){
                   new_edges[j] = mutate(new_edges[j][0])
                }
            }
            else{
                new_edges[j] = all_edges[j]
            }
        }

        for (var j=keep_rate; j<candidates; j++){
            new_edges[j] = generate_random(nodes);
        }

        all_edges=new_edges
        all_edges = all_edges.sort(function(a, b) {
            return a[1] - b[1];
        });
        if(i%(generations/snapshot_amount)==0){
            snapshot_edges[snapshot_i++] = all_edges[0];
        }
    }
    return [all_edges[0],snapshot_edges]
}

