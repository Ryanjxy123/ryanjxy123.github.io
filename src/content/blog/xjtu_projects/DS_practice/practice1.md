---
title: '数据结构与算法设计综合训练上机题目'
# description: "周记"
pubDate: '2025-10-19'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data%E8%91%AC%E9%80%81%E3%81%AE%E3%83%95%E3%83%AA%E3%83%BC%E3%83%AC%E3%83%B3%20P2-134948898.png"
tags: ["DS"]

---

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data%E8%91%AC%E9%80%81%E3%81%AE%E3%83%95%E3%83%AA%E3%83%BC%E3%83%AC%E3%83%B3%20P2-134948898.png)

## 题目一

一、给定一组整数（以-1结束输入），长度为n（1≤n≤100），从输入读取建立对应的单向链表，并将链表逆转后输出。

输入：1,2,3,4,5,-1

输出：5,4,3,2,1

要求：

①逆转操作需原地进行，不得新建数组或辅助链表；

②时间复杂度要求： O(n)；

③空间复杂度要求： O(1)。

提示：

①可采用三指针法实现链表逆转：prev、curr、next；

②建议编写辅助函数：

createList()：从输入创建链表

reverseList()：逆转链表

printList()：输出链表


## 代码：

```
import java.util.Scanner;


class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class ReverseLinkedList {

    public static ListNode createList(Scanner scanner) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (scanner.hasNextInt()) {
            int val = scanner.nextInt();
            if (val == -1) {
                break;
            }

            ListNode node = new ListNode(val);
            tail.next = node;
            tail = node;
        }

        return dummy.next;
    }

    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        return prev;
    }

    public static void printList(ListNode head) {
        if (head == null) {
            System.out.println("链表为空");
            return;
        }

        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) {
                System.out.print(",");
            }
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("请输入整数序列（以-1结束）：");

        ListNode head = createList(scanner);

        System.out.print("原链表：");
        printList(head);

        head = reverseList(head);

        System.out.print("逆转后：");
        printList(head);

        scanner.close();
    }
}

```

## 题目二

二、已知两个递增有序的单向链表A和B，长度分别为m和n（1≤m, n≤100），将它们合并为一个新的递增有序链表C，要求在原链表基础上进行合并（不得新建节点）。

输入：链表A：1 3 5 7 -1；链表B：2 4 6 8 -1

输出：1 2 3 4 5 6 7 8

要求：

①使用单向链表实现；

②合并操作在原链表上完成，不得新建节点；

③输出合并后的有序链表；

④时间复杂度要求：O(m + n)

⑤空间复杂度要求：O(1)

提示：

①可使用两个指针 pa 和 pb 分别遍历链表 A 和 B；

②比较节点值大小，将较小的节点链接到新链表尾部；

③注意处理其中一个链表提前遍历完的情况；

④可使用带头结点法或双指针法实现。

## 代码：

```
import java.util.Scanner;

class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class MergeSortedLists {

    public static ListNode createList(Scanner scanner) {
        ListNode dummy = new ListNode(0);  // 哨兵节点
        ListNode tail = dummy;

        while (scanner.hasNextInt()) {
            int val = scanner.nextInt();
            if (val == -1) {
                break;
            }

            ListNode node = new ListNode(val);
            tail.next = node;
            tail = node;
        }

        return dummy.next;
    }

    public static ListNode mergeTwoLists(ListNode listA, ListNode listB) {

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        ListNode pa = listA;
        ListNode pb = listB;

        while (pa != null && pb != null) {
            if (pa.val <= pb.val) {
                tail.next = pa;
                pa = pa.next;
            } else {
                tail.next = pb;
                pb = pb.next;
            }
            tail = tail.next;
        }

        if (pa != null) {
            tail.next = pa;
        }
        if (pb != null) {
            tail.next = pb;
        }

        return dummy.next;
    }

    public static void printList(ListNode head) {
        if (head == null) {
            System.out.println("链表为空");
            return;
        }

        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) {
                System.out.print(" ");
            }
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("请输入第一个递增有序链表A（以-1结束）：");
        ListNode listA = createList(scanner);
        System.out.print("链表A：");
        printList(listA);

        System.out.println("\n请输入第二个递增有序链表B（以-1结束）：");
        ListNode listB = createList(scanner);
        System.out.print("链表B：");
        printList(listB);

        ListNode mergedList = mergeTwoLists(listA, listB);

        System.out.print("\n合并后的有序链表：");
        printList(mergedList);

        scanner.close();
    }
}

```