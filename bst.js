class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  #root;
  constructor() {
    this.#root = null;
  }

  #handle(data) {
    // sort and remove duplicates from array
    return [...new Set(data)].sort((a, b) => a - b);
  }

  #insertNode(root, node) {
    // insert internal function
    if (node.value < root.value) {
      if (root.left === null) root.left = node;
      else this.#insertNode(root.left, node);
    }
    if (node.value > root.value) {
      if (root.right === null) root.right = node;
      else this.#insertNode(root.right, node);
    }
  }

  #prettyPrint(node, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.#prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.#prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  #min(root) {
    if (!root.left) return root.value;
    else return this.#min(root.left);
  }

  #getRoot() {
    return this.#root;
  }

  #maxDepth(root) {
    if (!root) return 0;
    let left = this.#maxDepth(root.left);
    let right = this.#maxDepth(root.right);
    return left > right ? left + 1 : right + 1;
  }

  empty() {
    return this.#root === null;
  }

  insert(value) {
    const node = new Node(value);
    if (this.empty()) this.#root = node;
    else this.#insertNode(this.#root, node);
  }

  delete(value) {
    // functions accepts a value to delete
    const _delete = (root, value) => {
      if (root === null) return root;
      if (value < root.value) root.left = _delete(root.left, value);
      else if (value > root.value) root.right = _delete(root.right, value);
      else {
        if (!root.left && !root.right) return null;
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        root.value = this.#min(root.right);
        root.right = _delete(root.right, root.value);
      }
      return root;
    };
    this.#root = _delete(this.#root, value);
  }

  find(value) {
    const node = this.#getRoot();
    const _find = (node, value) => {
      if (!node) return false;
      else if (node.value === value) return node;
      else if (value < node.value) return _find(node.left, value);
      else if (value > node.value) return _find(node.right, value);
    };
    return _find(node, value);
  }

  levelOrder() {
    const result = [];
    const queue = [];
    queue.push(this.#getRoot());
    while (queue.length) {
      let curr = queue.shift();
      result.push(curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return result;
  }

  inorder() {
    // const result = [];
    // const _inorder = (root) => {
    //   if (root) {
    //     _inorder(root.left);
    //     result.push(root.value);
    //     _inorder(root.right);
    //   }
    // };
    // _inorder(this.#getRoot());
    // return result;
    const _inorder = (root)=>{
      if(!root) return [];
      return [..._inorder(root.left), root.value, ..._inorder(root.right)]
    }
    return _inorder(this.#getRoot())
  }

  preorder() {
    const result = [];
    const _preorder = (root) => {
      if (root) {
        result.push(root.value);
        _preorder(root.left);
        _preorder(root.right);
      }
    };
    _preorder(this.#getRoot());
    return result;
  }

  postorder() {
    const result = [];
    const _postorder = (root) => {
      if (root) {
        _postorder(root.left);
        _postorder(root.right);
        result.push(root.value);
      }
    };
    _postorder(this.#getRoot());
    return result;
  }

  height(node) {
    if (!node) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  depth(node) {
    const _depth = (root, node) => {
      if (!node) return -1;
      let depth;
      if (root === node) return 0;
      if (node.value < root.value) depth = _depth(root.left, node) + 1;
      if (node.value > root.value) depth = _depth(root.right, node) + 1;
      return depth;
    };
    return _depth(this.#root, node);
  }

  isBalanced() {
    let left = this.#maxDepth(this.#getRoot().left);
    let right = this.#maxDepth(this.#getRoot().right);
    if (Math.abs(left - right) <= 1) return true;
    return false;
  }

  rebalance(){
    const _rebalance = (root)=>{
      if(this.isBalanced()) return 'Nothing to rebalance';
      const current = this.inorder(root);
      return this.buildBST(current);
    }
    return _rebalance(this.#getRoot())
  }

  buildBST(data) {
    // takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node
    let sorted = this.#handle(data);
    const _buildBST = (arr) => {
      if (!arr.length) return null;
      const mid = Math.floor((arr.length - 1) / 2);
      const [left, right] = [arr.slice(0, mid), arr.slice(mid + 1)];
      const node = new Node(arr[mid]);
      node.left = _buildBST(left);
      node.right = _buildBST(right);
      return node;
      // this.insert(arr[mid]);
      // _buildBST(left);
      // _buildBST(right);
    };
    return (this.#root = _buildBST(sorted));
    // _buildBST(sorted)
  }

  print() {
    console.log();
    this.#prettyPrint(this.#root);
  }
}

/*
buildTree(data) {
    let sorted = this.#handle(data);
    const _buildTree = (data, start = 0, end = data.length - 1) => {
      if (end < start) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(data[mid]);
      node.left = _buildTree(data, start, mid - 1);
      node.right = _buildTree(data, mid + 1, end);
      return node;
    };
    return (this.#root = _buildTree(sorted));
  }
*/
module.exports = BinarySearchTree;
