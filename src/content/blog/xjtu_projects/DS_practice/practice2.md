---
title: '数据结构与算法设计综合训练上机题目2'
# description: "周记"
pubDate: '2025-11-02'    
heroImage: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data萃香🍂-131125125.png"
tags: ["DS"]

---

![](https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data萃香🍂-131125125.png)

*image from [Rhea](https://pixiviz.pwp.app/artist/113473183)*

## 题目一


一、给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

输入1：s = "()"

输出1：true

输入2：s = "(]"

输出2：false

要求：

①左括号必须用相同类型的右括号闭合。

②左括号必须以正确的顺序闭合。

③每个右括号都有一个对应的相同类型的左括号。

提示：

①使用栈结构解决问题 

②1 <= s.length <= 104

③s 仅由括号 '()[]{}' 组成

验收样例：

输入1：s = "([])"，期望输出1：true

输入2：s = "([)]"，期望输出2：false

输入3：s = "()[]{}"，期望输出3：true


## 代码：

```java
import java.util.Scanner;
import java.util.Stack;

public class Bracket{

    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            if (c == '{' || c == '[' || c == '(') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) {
                    return false;
                }

                char top = stack.pop();
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
                if (c == ')' && top != '(') return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String input;
        Scanner sc = new Scanner(System.in);
        input = sc.nextLine();
        System.out.println(new Bracket().isValid(input));
    }

}
```


## 题目二

二、给定一个字符串 s ，找到它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。

输入1：s = "xjtuse"

输出1：0

输入2：s = "aabb"

输出2：-1

提示：

①使用队列结构解决问题

②s 只包含小写字母

验收样例：

输入1：s = "leetcode"，期望输出：0

输入2：s = "loveleetcode"，期望输出：2

输入3：s= "xjtusexjtuse"，期望输出：-1

```java
import java.util.*;

public class FirstUnique {
    public static int firstUniqChar(String s) {
        Map<Character, Integer> count = new HashMap<>();
        Queue<int[]> queue = new LinkedList<>();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            count.put(c, count.getOrDefault(c, 0) + 1);
            queue.offer(new int[]{c, i});
        }

        while (!queue.isEmpty() && count.get((char)queue.peek()[0]) > 1) {
            queue.poll();
        }

        return queue.isEmpty() ? -1 : queue.peek()[1];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(firstUniqChar(s));

    }

}

```