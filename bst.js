
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


class Node{
    constructor(d){
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    // nums is a sorted ( no duplicates) array.
    buildTree(nums, start, end){
    
        if (start > end){return null;}

        let mid = parseInt((start + end)/2);
        let node = new Node(nums[mid]);

        node.left = this.buildTree(nums, start, mid-1);
        node.right = this.buildTree(nums, mid + 1 , end);

        return node;
    }
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
 
function preOrder(node){
    if (node == null){return;}
    console.log(node.data + " ");

    preOrder(node.left);
    preOrder(node.right);

}

let aRR = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324];
//let aRR = [1,3,4,5,7,8,9,23,67,324,6345];

let ab = (a,b) => a-b;
aRR = aRR.sort(ab);
aRR = rmDup(aRR); 

const n = aRR.length;

const tree =  new Tree();
tree.root = tree.buildTree(aRR, 0, n-1);
prettyPrint(tree.root);
preOrder(tree.root);





