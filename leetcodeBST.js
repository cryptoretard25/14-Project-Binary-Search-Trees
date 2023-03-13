function Node(val, left, right) {
  this.value = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function treeToArray(root){
  if(!root) return [];
  return [...treeToArray(root.left), root.value, ...treeToArray(root.right)]
}

function _treeToArray(root){
  let result = []
  const _inOrder = (root)=>{
    if(root){
      _inOrder(root.left);
      result.push(root.value);
      _inOrder(root.right)
    }
  }
  _inOrder(root);
  return result;
}

function balanceBST(arr){
  if(!arr.length) return null;
  const mid = Math.floor((arr.length-1)/2);
  const [left, right] = [arr.slice(0, mid), arr.slice(mid+1)]
  const node = new Node(arr[mid]);
  node.left = balanceBST(left);
  node.right = balanceBST(right);
  return node;
}

function print(node, prefix = "", isLeft = true){
  if (node.right !== null) {
    print(
      node.right,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false
    );
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    print(
      node.left,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true
    );
  }
}

print(balanceBST([1,2,3]))