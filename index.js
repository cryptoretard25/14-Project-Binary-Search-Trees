const BinarySearchTree = require("./bst");
const { log } = console;

const bst = new BinarySearchTree();

log(`Create a binary search tree from an array of random numbers.`)
bst.buildBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67])

log()
log(`Confirm that the tree is balanced by calling isBalanced`)
log('Balanced?', bst.isBalanced())

log()
log(`Print out all elements in level, pre, post, and in order`)
bst.print()
log('Preorder:', bst.preorder())
log('Inorder:', bst.inorder())
log('Postorder:', bst.postorder())

log()
log(`Unbalance the tree by adding several numbers > 100`)
bst.insert(100)
bst.insert(110)
bst.insert(120)
bst.print()

log()
log(`Confirm that the tree is unbalanced by calling isBalanced`)
log('Balanced?', bst.isBalanced())

log()
log(`Balance the tree by calling rebalance`)
bst.rebalance();

log()
log(`Confirm that the tree is balanced by calling isBalanced`)
log('Balanced?', bst.isBalanced())

log()
log(`Print out all elements in level, pre, post, and in order`)
bst.print()
log('Preorder:', bst.preorder())
log('Inorder:', bst.inorder())
log('Postorder:', bst.postorder())