---
title: '数据结构与算法设计综合训练上机题目3'
# description: "周记"
pubDate: '2025-11-09'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datanew%20glenn-chan-137447994.png"
tags: ["DS"]

---

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datanew%20glenn-chan-137447994.png)


## 题目一：判断二叉树是否为镜像对称树

给定一个二叉树的根节点 root，判断该树是否关于中心对称。

示例：
```text
输入：root = [1, 2, 2, 3, 4, 4, 3]
输出：true
```
解释：
```text
        1  
       / \  
      2   2  
     / \ / \  
    3  4 4  3
```
此树关于根节点对称。

验收样例：
```text
输入:root = [1]  
输出: true  
输入: root =[1,2,2,null,3,null,3]  
输出: false  
```
要求：  
①	时间复杂度要求： O(n)  
②	空间复杂度要求： O(n)  
提示：  
①	 定义一个递归函数 isMirror(a, b) 比较左右子树是否镜像  




## 代码：
```java
    import java.util.*;

    import static java.sql.Types.NULL;

    public class Solution1 {

        static class TreeNode {
            int val;
            TreeNode left;
            TreeNode right;
            TreeNode(int val) { this.val = val; }
        }

        public boolean isSymmetric(TreeNode root) {
            if (root == null) return true;
            return isMirror(root.left, root.right);
        }

        private boolean isMirror(TreeNode a, TreeNode b) {
            if (a == null && b == null) return true;
            if (a == null || b == null || a.val != b.val) return false;
            return isMirror(a.left, b.right) && isMirror(a.right, b.left);
        }

        private static TreeNode buildTree(Integer[] arr) {
            if (arr == null || arr.length == 0 || arr[0] == null) return null;
            TreeNode root = new TreeNode(arr[0]);
            Queue<TreeNode> queue = new LinkedList<>();
            queue.offer(root);
            int i = 1;
            while (i < arr.length) {
                TreeNode curr = queue.poll();
                if (i < arr.length && arr[i] != null) {
                    curr.left = new TreeNode(arr[i]);
                    queue.offer(curr.left);
                }
                i++;
                if (i < arr.length && arr[i] != null) {
                    curr.right = new TreeNode(arr[i]);
                    queue.offer(curr.right);
                }
                i++;
            }
            return root;
        }

        public static void main(String[] args) {
            Solution1 sol = new Solution1();

            Integer[] input1 = {1, 2, 2, 3, 4, 4, 3};
            TreeNode root1 = buildTree(input1);
            System.out.println("Test 1: " + sol.isSymmetric(root1));

            Integer[] input2 = {1};
            TreeNode root2 = buildTree(input2);
            System.out.println("Test 2: " + sol.isSymmetric(root2));

            Integer[] input3 = {1, 2, 2, NULL, 3,NULL, 3};
            TreeNode root3 = buildTree(input3);
            System.out.println("Test 3: " + sol.isSymmetric(root3));
        }
    }
```


## 题目二:根据层序遍历构建二叉树并输出中序遍历

给定一个数组 level_order 表示一棵二叉树的层序遍历结果，其中 null 表示该节点为空。请你根据该序列构建二叉树，并输出其中序遍历结果。  
示例：
```text
输入：level_order = [1, 2, 3, null, 4, null, 5]
输出：[2, 4, 1, 3, 5]
```
解释：
```text
        1
       / \
      2   3
       \    \
        4    5
```
中序遍历顺序为：左 → 根 → 右，即 [2, 4, 1, 3, 5]。  

验收样例：
```text
输入: level_order = [1,2,3,4,5,6,7]
输出: [4,2,5,1,6,3,7]
输入: level_order = [1,2,null,3,null,4]
输出: [4,3,2,1]
```
要求：   
①	时间复杂度要求： O(n)   
②	空间复杂度要求： O(n)  
提示：  
①	 使用队列辅助层序构建。  
②	注意跳过 null 节点。  


## 代码：
```java
import java.util.*;

import static java.sql.Types.NULL;

public class Solution2 {

    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) { this.val = val; }
    }

    public int[] buildAndInorder(int[] level_order) {
        TreeNode root = buildTree(level_order);
        List<Integer> inorder = new ArrayList<>();
        inorderTraversal(root, inorder);
        return inorder.stream().mapToInt(i -> i).toArray();
    }

    private TreeNode buildTree(int[] level_order) {
        if (level_order == null || level_order.length == 0) return null;
        TreeNode root = new TreeNode(level_order[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        while (!queue.isEmpty() && i < level_order.length) {
            TreeNode curr = queue.poll();

            if (i < level_order.length && level_order[i] != Integer.MIN_VALUE) {
                curr.left = new TreeNode(level_order[i]);
                queue.offer(curr.left);
            }
            i++;

            if (i < level_order.length && level_order[i] != Integer.MIN_VALUE) {
                curr.right = new TreeNode(level_order[i]);
                queue.offer(curr.right);
            }
            i++;
        }
        return root;
    }

    private void inorderTraversal(TreeNode root, List<Integer> result) {
        if (root == null) return;
        inorderTraversal(root.left, result);
        result.add(root.val);
        inorderTraversal(root.right, result);
    }

    public static void main(String[] args) {
        Solution2 sol = new Solution2();

        int[] input1 = {1, 2, 3, NULL, 4, NULL, 5};
        int[] res1 = sol.buildAndInorder(input1);
        System.out.println("Test 1: " + Arrays.toString(res1));

        int[] input2 = {1, 2, 3, 4, 5, 6, 7};
        int[] res2 = sol.buildAndInorder(input2);
        System.out.println("Test 2: " + Arrays.toString(res2));

        int[] input3 = {1, 2, NULL, 3,NULL, 4};
        int[] res3 = sol.buildAndInorder(input3);
        System.out.println("Test 3: " + Arrays.toString(res3));
    }
}
```

### 题目三：二叉树最大锯齿路径和

给定一棵非空二叉树，每个节点包含一个整数值。一条从根节点到叶子节点的路径被称为「锯齿路径」当且仅当满足以下条件：   
1. 路径长度 ≥ 3（即路径上至少有三个节点）。   
2. 路径上任意三个连续节点的值必须严格交替变化：即对于连续节点 a, b, c，要么 a > b 且 b < c，要么 a < b 且 b > c。   
你的任务是找到所有锯齿路径中节点值之和的最大值。如果不存在任何锯齿路径，返回 -1。   
  
示例：
```text
输入：root=[5,3,10,1,4,null,11]
输出：12
```
解释：
```text
路径 5->3->1：不满足（5 > 3 > 1，连续下降）
路径 5->3->4：满足 5 > 3 < 4，和 = 12
路径 5->10->11：不满足（5 < 10 < 11，连续上升）
最大和为 12
```
```text
       5
      / \
     3   10
    / \    \
   1   4    11
```
验收样例：
```text
输入: root =[1,2,3,4,5,null,6]
输出: -1
输入:root =[3,2,4,1,5,null,6]
输出: 10
```
要求：   
①	时间复杂度优于O(n2)   
②	禁止修改树结构   
提示：   
①	使用DFS遍历所有根到叶子的路径   
②	在递归中记录当前路径的交替方向和路径和   

## 代码：
```java
import java.util.*;

public class Solution3 {

    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    private int maxSum = -1;

    public int maxZigzagPathSum(TreeNode root) {
        maxSum = -1;
        if (root == null) return -1;
        dfs(root, new ArrayList<>());
        return maxSum;
    }

    private void dfs(TreeNode node, List<Integer> path) {
        if (node == null) return;

        path.add(node.val);

        if (node.left == null && node.right == null) {
            checkFullZigzag(path);
        }

        dfs(node.left, path);
        dfs(node.right, path);

        path.remove(path.size() - 1);
    }

    private void checkFullZigzag(List<Integer> path) {
        if (path.size() < 3) return;

        boolean valid = true;
        for (int i = 0; i + 2 < path.size(); i++) {
            int a = path.get(i);
            int b = path.get(i + 1);
            int c = path.get(i + 2);
            if (!((a < b && b > c) || (a > b && b < c))) {
                valid = false;
                break;
            }
        }

        if (valid) {
            int sum = path.stream().mapToInt(Integer::intValue).sum();
            maxSum = Math.max(maxSum, sum);
        }
    }

    private static TreeNode buildTree(Integer[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == null) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (i < arr.length) {
            TreeNode cur = q.poll();
            if (i < arr.length && arr[i] != null) {
                cur.left = new TreeNode(arr[i]);
                q.offer(cur.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                cur.right = new TreeNode(arr[i]);
                q.offer(cur.right);
            }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        Solution3 sol = new Solution3();

        Integer[] in1 = {5, 3, 10, 1, 4, null, 11};
        TreeNode r1 = buildTree(in1);
        System.out.println("Test 1: " + sol.maxZigzagPathSum(r1));   // 12

        Integer[] in2 = {1, 2, 3, 4, 5, null, 6};
        TreeNode r2 = buildTree(in2);
        System.out.println("Test 2: " + sol.maxZigzagPathSum(r2));   // -1

        Integer[] in3 = {3, 2, 4, 1, 5, null, 6};
        TreeNode r3 = buildTree(in3);
        System.out.println("Test 3: " + sol.maxZigzagPathSum(r3));   // 10
    }
}
```