---
title: '数据结构与算法设计综合训练上机题目5'
# description: "周记"
pubDate: '2025-11-23'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data秋の匂い-136275604.png"
heroImageSource: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data秋の匂い-136275604.png"
tags: ["DS"]
---


## 题目一：基于邻接矩阵的图遍历

题目描述：  
  
给定一个包含 n 个顶点的无向图，其存储方式为邻接矩阵（Adjacency Matrix）。图的顶点编号为 0 ~ n−1。请你完成以下任务：  
  
1. 编写函数 voidBFS_Matrix(int graph[][MAXN], int n, int start)，采用邻接矩阵方式对图进行 BFS（广度优先遍历），从顶点 start 出发，并输出遍历顺序。  

2. 编写函数 voidDFS_Matrix(int graph[][MAXN], int n, int start)，采用邻接矩阵方式对图进行 DFS（深度优先遍历），从顶点 start 出发，并输出遍历顺序。  
  
3. 输入示例（n = 5）：  
0 1 1 0 0   
1 0 0 1 1    
1 0 0 1 0   
0 1 1 0 1      
0 1 0 1 0    
请写出 BFS 和 DFS 的遍历结果（从 0 开始）。

## 代码：
```java
import java.util.*;

public class GraphMatrix {
    static final int MAXN = 105;
    int n;
    boolean[][] graph;
    boolean[] visited;

    public GraphMatrix(int n) {
        this.n = n;
        graph = new boolean[n][n];
        visited = new boolean[n];
    }

    public void readFromConsole() {
        Scanner sc = new Scanner(System.in);
        System.out.println("请依次输入 " + n + " 行邻接矩阵（每行 " + n + " 个 0/1，不含空格）：");
        for (int i = 0; i < n; i++) {
            String line = sc.nextLine().trim().replaceAll("\\s+", "");
            if (line.length() != n) {
                System.out.println("第 " + (i + 1) + " 行长度不对，请重新输入这行：");
                i--;
                continue;
            }
            for (int j = 0; j < n; j++) {
                graph[i][j] = (line.charAt(j) == '1');
            }
        }
    }

    public void BFS(int start) {
        Arrays.fill(visited, false);
        Queue<Integer> q = new LinkedList<>();
        q.offer(start);
        visited[start] = true;

        System.out.print("BFS 从 " + start + " 开始: ");
        while (!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for (int v = 0; v < n; v++) {
                if (graph[u][v] && !visited[v]) {
                    visited[v] = true;
                    q.offer(v);
                }
            }
        }
        System.out.println();
    }

    private void dfs(int u) {
        System.out.print(u + " ");
        visited[u] = true;
        for (int v = 0; v < n; v++) {
            if (graph[u][v] && !visited[v]) {
                dfs(v);
            }
        }
    }

    public void DFS(int start) {
        Arrays.fill(visited, false);
        System.out.print("DFS 从 " + start + " 开始: ");
        dfs(start);
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("请输入顶点个数 n : ");
        int n = sc.nextInt();
        sc.nextLine();

        GraphMatrix g = new GraphMatrix(n);
        g.readFromConsole();

        System.out.print("请输入起始顶点（0 ~ " + (n-1) + "）: ");
        int start = sc.nextInt();

        System.out.println("==================================");
        g.BFS(start);
        g.DFS(start);

        sc.close();
    }
}
/*
5
01100
10011
10101
01010
01101
0
 */

```
## 题目二：基于邻接表的图遍历

题目描述：  

给定一个包含 n 个顶点的无向图，其存储方式为邻接表（Adjacency List）。图的顶点编号为 1 ~ n。请根据邻接表结构完成以下任务：  

1. 定义图的数据结构：  

```c++
typedef struct Node {

   int v;

   struct Node* next;

} Node;

 

typedef struct {

   Node* head[MAXN];

   int n;

} Graph;
```

2. 编写函数 voidBFS_List(Graph* g, int start) 对图进行 BFS 遍历并输出遍历序列。   

3. 编写函数 voidDFS_List(Graph* g, int start) 对图进行 DFS 遍历并输出遍历序列。   

4. 给定如下邻接表（n = 6），请写出 BFS 和 DFS 的输出序列，起点为1：
```text
1: 2 → 3

2: 1 → 4 → 5

3: 1 → 6

4: 2

5: 2 → 6

6: 3 → 5
```
## 代码：
```java
import java.util.*;

class Node {
    int v;
    Node next;
    Node(int v) { this.v = v; }
}

public class GraphList {
    int n;
    Node[] head;
    Node[] tail;
    boolean[] visited;

    public GraphList(int n) {
        this.n = n;
        // 数组大小为 n+1，以便使用 1 到 n 的索引
        head = new Node[n + 1];
        tail = new Node[n + 1];
        visited = new boolean[n + 1];
    }

    public void addEdge(int u, int v) {
        Node p = new Node(v);

        if (head[u] == null) {
            head[u] = p;
            tail[u] = p;
        } else {
            tail[u].next = p;
            tail[u] = p;
        }
    }

    public void BFS(int start) {
        Arrays.fill(visited, false); // 重置访问状态
        Queue<Integer> q = new LinkedList<>();

        q.offer(start);
        visited[start] = true;

        System.out.print("BFS 从 " + start + " 开始: ");
        while (!q.isEmpty()) {
            int u = q.poll(); // 出队
            System.out.print(u + " ");

            for (Node p = head[u]; p != null; p = p.next) {
                int v = p.v;
                if (!visited[v]) {
                    visited[v] = true;
                    q.offer(v);
                }
            }
        }
        System.out.println();
    }

    private void dfs(int u) {
        System.out.print(u + " ");
        visited[u] = true;

        for (Node p = head[u]; p != null; p = p.next) {
            int v = p.v;
            if (!visited[v]) {
                dfs(v);
            }
        }
    }

    public void DFS(int start) {
        Arrays.fill(visited, false); // 重置访问状态
        System.out.print("DFS 从 " + start + " 开始: ");
        dfs(start);
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("请输入顶点个数 n（顶点编号从 1 到 n）: ");
        int n = sc.nextInt();
        GraphList g = new GraphList(n);

        System.out.println("请依次输入所有有向边（输入 0 0 结束）");
        System.out.println("格式：u v   （u → v 有一条边）");

        while (true) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            if (u == 0 && v == 0) break;

            if (u < 1 || u > n || v < 1 || v > n) {
                System.out.println("顶点编号非法（必须在 1~" + n + "），请重新输入！");
                continue;
            }
            if (u == v) {
                System.out.println("（已忽略自环）");
                continue;
            }
            g.addEdge(u, v);
        }

        System.out.print("请输入起始顶点（1 ~ " + n + "）: ");
        int start = sc.nextInt();

        System.out.println("==================================");
        g.BFS(start);
        g.DFS(start);

        sc.close();
    }
}
/*
6
1 2
1 3
2 1
2 4
2 5
3 1
3 6
4 2
5 2
5 6
6 3
6 5
0 0
1
 */
```