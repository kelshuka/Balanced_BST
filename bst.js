
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

    inOrder(callback){
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

    // inOrder() no callbacks
    /* inOrder(){

        const result = [];
        const inRec = (root) => { 

            if (root != null){
                inRec(root.left);
                result.push(root.data);
                inRec(root.right);
            }
        };

        inRec(this.root);
        return result;
    }
 */
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

//tree.insert(50);
//tree.deleteItem(4);
console.log(tree.levelOrder());
console.log(tree.inOrder());
//console.log(tree.find(9));

prettyPrint(tree.root);
preOrder(tree.root);

const root = tree.root;
console.log(root);





