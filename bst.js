
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
        let root = new Node(nums[mid]);

        root.left = this.buildTree(nums, start, mid-1);
        root.right = this.buildTree(nums, mid + 1 , end);

        return root;
    }

    insert(value){

        const insertRec = (root, value) => { 
            if (root == null){
                return new Node(value);
            }

            if (value < root.data){
                root.left = insertRec(root.left, value);
            } else if (value > root.data){
                root.right = insertRec(root.right, value);
            }

            return root; 
        };  
        
        this.root = insertRec(this.root, value);
    }

    deleteItem(value){

        const deleteNode = (root, value) => { 
            if (root == null){
                return new root;
            }

            if (value < root.data){
                root.left = deleteNode(root.left, value);
            } else if (value > root.data){
                root.right = deleteNode(root.right, value);
            } // if the value is same as the root's value
            else{
                // Node with only one child or no child
                if (root.left === null) return root.right;
                else if (root.right === null) return root.left;

                // Node with two children
                root.data = this.minValue(root.right);

                // delete the inorder successor
                root.right = deleteNode(root.right, root.data)
            }

            return root; 
        };  
        
        this.root = deleteNode(this.root, value);
    }
    minValue(node){
        let minv = node.data;
        while (node.left !== null){
            minv = node.left.value;
            node = node.left;
        }
        return minv;
    }

    find(value){

        const findRec = (root, value) => { 
            if (root == null || root.data === value){
                return root;
            }

            if (value < root.data){
                root.left = findRec(root.left, value);
            } else if (value > root.data){
                root.right = findRec(root.right, value);
            }

            return root; 
        };  
        
        return findRec(this.root, value);
    }

    levelOrder(callback){

        if(!this.root){
            return [];
        }

        const queue = [this.root];
        const level = [];

        while (queue.length){

            const queueLength = queue.length;

            for (let i=0; i < queueLength; i++){
                const node = queue.shift();

                if(callback){
                    callback(node);
                }else {
                    level.push(node.data);
                }

                if(node.left){
                    queue.push(node.left);
                }
                if (node.right){
                    queue.push(node.right);
                }
            }
        }
        if(!callback){
            return level;
        }
    }

    inOrder(callback){ // (left, root(data), right)
        const result = [];
        const inRec = (root) => { 
    
            if (root == null){return;}

            inRec(root.left);

            if(callback){
                callback(root);
            }else {
                result.push(root.data);
            }

            inRec(root.right);
        };

        inRec(this.root);

        if(!callback){
            return result;
        }
    }

    preOrder(callback){// (root(data), left, right)
        const result = []; 
        const preOrderRec = (node) => {
            if (node == null){return;}

            if(callback){ 
                callback(node);
            }else {
                result.push(node.data);
            }
        
            preOrderRec(node.left);
            preOrderRec(node.right);
        };

        preOrderRec(this.root);
        if(!callback){ 
            return result;
        }
    }

    postOrder(callback){// (left, right, root(data))
        const result = [];
        const postOrderRec = (node) => {
            if (node == null){return};

            postOrderRec(node.left);
            postOrderRec(node.right);

            if(callback){ 
                callback(node);
            }else {
                result.push(node.data);
            }
        }

        postOrderRec(this.root);
        if(!callback){ 
            return result;
        }
    }

    height(node){// height (for the root node)
        if(node === null){  return -1;}

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    depth(node){
        const depthRec = (currentNode, Depth) =>{
            if (currentNode === null) {return -1;}

            if (currentNode === this.root) {
                return Depth;
            }

            return depthRec(currentNode.node, Depth + 1);
        };
        return depthRec(node, 0);
    }

    maxDepth(root){
        let fringe = [{node:root, depth:1}];
        let current = fringe.pop();
        let max = 0;

        while(current && current.node){
            let node = current.node;

            if(node.left){
                fringe.push({node: node.left, depth: current.depth + 1});
            }

            if(node.right){
                fringe.push({node: node.right, depth: current.depth + 1});
            }

            if(current.depth > max){
                max = current.depth;
            }

            current = fringe.pop();
        }

        return max;
        
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
 


let aRR = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324];

let ab = (a,b) => a-b;
aRR = aRR.sort(ab);
aRR = rmDup(aRR); 

const n = aRR.length;

const tree =  new Tree();

tree.root = tree.buildTree(aRR, 0, n-1);

//tree.insert(50);
//tree.deleteItem(4);
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.height(tree.root));
console.log(tree.depth(tree.root));
console.log(tree.maxDepth(3));
//console.log(tree.find(9));

prettyPrint(tree.root);
//preOrder(tree.root);

const root = tree.root;
//console.log(root);


/* fNode(val){// for other nodes
        if (!this.root){return;}

        const queue = [this.root];
        let height = 0;

        const level = [];

        while (queue.length){

            const queueLength = queue.length;

            for (let i=0; i < queueLength; i++){
                const node = queue.shift();

                level.push(node.data);
                if (level[i] == val){
                    //console.log(level[i]);
                    return height;
                }

                if(node.left){
                    queue.push(node.left);
                }
                if (node.right){
                    queue.push(node.right);
                }

                height++; 
            }

               
        }
    }  */


