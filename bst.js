
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
    constructor(arr){
        this.arr = arr;
        this.root = buildTree(arr);
    }
}

/* function buildTree(nums){
    if (nums.length === 0){return null;}

    let ab = (a,b) => a-b;
    nums = nums.sort(ab);
    nums = rmDup(nums);
    //console.log(nums);
    //nums = [...new Set(nums)].sort((a,b)=> a - b);

    const mid = Math.floor(nums.length/2);
    const root = new Node(nums[mid]);

    // initializing queue
    const q = [[root, [0, mid - 1]], [root, [mid + 1 , nums.length - 1]] ];

    while (q.length > 0){
        const [ parent,[left, right] ] = q.shift();

        if (left <= right && parent != null){
            const mid = Math.floor( (left + right) / 2);
            const child = new Node(nums[mid]);

            // set the child node as left or right child of the parent node
            if (nums[mid] < parent.val){
                parent.left = child;
            } else {
                parent.right = child;
            }

            // push the left and right child and their indices to the queue
            q.push( [ child, [left, mid - 1] ] );
            q.push( [child, [mid + 1, right] ] );
        }
    }

    return root;
}
 */

function buildTree(nums){
    if (nums.length === 0){return null;}

    let ab = (a,b) => a-b;
    nums = nums.sort(ab);
    nums = rmDup(nums);
    //console.log(nums);
    //nums = [...new Set(nums)].sort((a,b)=> a - b);

    const mid = Math.floor(nums.length/2);
    const firstHalf = nums.slice(0, mid);
    const secondHalf = nums.slice(mid);

    const root = new Node(nums[mid]);
    root.left = buildTree(firstHalf);
    root.right = buildTree(secondHalf);

    return root;
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
 

const aRR = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324];


//const root =  buildTree(aRR);

const roots =  new Tree(aRR);
const baNodes = roots.root;
prettyPrint(baNodes);




