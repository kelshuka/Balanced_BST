
class Node{
    constructor(d){
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(arr){
        this.arr = arr;
    }
}

const aRR = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324];

let ab = (a,b) => a-b;
aRR.sort(ab);
console.log(aRR);

function rmDup(arr){
    if (arr.length == 0){return;}

    let unique = [];
    arr.forEach(ele => {
        if (!unique.includes(ele)){
            unique.push(ele);
        }
    });
    return unique;
}

rmDup(aRR);
console.log(rmDup(aRR));





