export interface ToolMirror {
  name: string;
  url: string;
  icon?: string; // 新增图标字段
}
export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: string; // 图片 URL
  category: string;
  mirrors?: ToolMirror[]; // 新增的多节点数组
}

export interface ToolCategory {
  id: string;
  name: string;
  description?: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: "productivity",
    name: "IDE",
    tools: [
      {
        id: "vscode",
        name: "VS Code",
        description: "Microsoft 开发的代码编辑器",
        url: "https://code.visualstudio.com/",
        icon: "https://api.iconify.design/logos:visual-studio-code.svg",
        category: "productivity"
      },
      {
        id: "antigravity",
        name: "Antigravity",
        description: "Google 推出的智能代码编辑与开发环境项目",
        url: "https://antigravity.google/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260225160212633.png",
        category: "productivity"
      },
      {
        id: "devcpp",
        name: "Dev-C++",
        description: "轻量级 C/C++ 免费集成开发环境",
        url: "https://www.dev-cpp.com/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260225155938324.png",
        category: "productivity"
      }
    ]
  },
  {
    id: "ai",
    name: "AI",
    tools: [
      {
        id: "chatgpt",
        name: "ChatGPT",
        description: "OpenAI 强大的自然语言对话模型",
        url: "https://chatgpt.com/",
        icon: "https://api.iconify.design/logos:openai-icon.svg",
        category: "ai"
      },
      {
        id: "gemini",
        name: "Gemini",
        description: "Google 推出的多模态原生人工智能助手",
        url: "https://gemini.google.com/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datagemini-color.png",
        category: "ai"
      },
      {
        id: "aistudio",
        name: "AI Studio",
        description: "Google 提供的大模型原型开发与 API 工作台",
        url: "https://aistudio.google.com/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/dataaistudio.svg",
        category: "ai"
      },
      {
        id: "claude",
        name: "Claude",
        description: "Anthropic 开发的安全高效的 AI 助手",
        url: "https://claude.ai/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/dataclaude-color.png",
        category: "ai"
      },
      {
        id: "notebooklm",
        name: "NotebookLM",
        description: "Google 推出的 AI 驱动个性化笔记与研究助手",
        url: "https://notebooklm.google.com/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datanotebooklm.svg",
        category: "ai"
      },
      {
        id: "grok",
        name: "Grok",
        description: "xAI 打造的拥有实时知识访问能力的 AI",
        url: "https://grok.com/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datagrok.png",
        category: "ai"
      },
      {
        id: "deepseek",
        name: "DeepSeek",
        description: "深度求索推出的高性能开源大语言模型",
        url: "https://chat.deepseek.com/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datadeepseek-color.png",
        category: "ai"
      },
      {
        id: "qwen",
        name: "Qwen",
        description: "阿里云推出的通义千问大模型系列",
        url: "https://chat.qwenlm.ai/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/dataqwen-color.png",
        category: "ai"
      },
      {
        id: "doubao",
        name: "豆包",
        description: "字节跳动推出的 AI 对话与创作助手",
        url: "https://www.doubao.com/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datadoubao-color.svg",
        category: "ai"
      }
    ]
  },
  {
    id: "dev-env",
    name: "开发与环境",
    tools: [
      {
        id: "git",
        name: "Git",
        description: "目前世界上最先进的分布式版本控制系统",
        url: "https://git-scm.com/",
        icon: "https://api.iconify.design/logos:git-icon.svg",
        category: "dev-env"
      },
      {
        id: "anaconda",
        name: "Anaconda",
        description: "开源的 Python 发行版本与数据科学环境",
        url: "https://www.anaconda.com/",
        icon: "https://api.iconify.design/devicon:anaconda.svg",
        category: "dev-env"
      },
      {
        id: "miniconda",
        name: "Miniconda",
        description: "轻量级的 Conda 安装程序",
        url: "https://docs.conda.io/en/latest/miniconda.html",
        icon: "https://api.iconify.design/devicon:anaconda.svg",
        category: "dev-env"
      },
      {
        id: "cc-switching",
        name: "CC-Switching",
        description: "Claude Code 终端环境与账号切换脚本",
        url: "https://github.com/farion1231/cc-switch/blob/main/README_ZH.md", // 请在后续替换为你的实际项目或文章链接
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260301155844513.png",
        category: "dev-env"
      }
    ]
  },
  {
    id: "writing",
    name: "写作与笔记",
    tools: [
      {
        id: "obsidian",
        name: "Obsidian",
        description: "基于本地 Markdown 文件的强大知识库",
        url: "https://obsidian.md/",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg",
        category: "writing"
      },
      {
        id: "typora",
        name: "Typora",
        description: "极致简洁的所见即所得 Markdown 编辑器",
        url: "https://typora.io/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260301160542149.png",
        category: "writing"
      }
    ]
  },
  {
    id: "general",
    name: "通用",
    tools: [
      {
        id: "c-drive-cleaner",
        name: "C盘清理利器",
        description: "高效实用的 Windows C盘空间清理工具",
        url: "https://tools.nwumba.cn/%E5%B7%A5%E5%85%B7%E8%BD%AF%E4%BB%B6/c-drive/",
        icon: "https://img.icons8.com/?size=100&id=Tz9PDLsM4vOV&format=png&color=000000",
        category: "general"
      },
      {
        id: "picgo",
        name: "PicGo",
        description: "一个用于快速上传图片并获取图片 URL 链接的工具",
        url: "https://picgo.github.io/PicGo-Doc/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/data20260301160632940.png",
        category: "general"
      },
      {
        id: "pdf24",
        name: "PDF24 Tools",
        description: "免费且易于使用的在线 PDF 工具箱，提供合并、压缩、转换等功能",
        url: "https://tools.pdf24.org/en/",
        icon: "https://raw.githubusercontent.com/Ryanjxy123/picbed/main/datafile.png",
        category: "general"
      },
      {
        id: "ilovepdf",
        name: "iLovePDF",
        description: "功能强大的 PDF 在线处理工具，支持几乎所有常见的 PDF 操作",
        url: "https://www.ilovepdf.com/",
        icon: "https://api.iconify.design/ph:file-pdf-fill.svg?color=%23E53935",
        category: "general"
      }
    ]
  },
  {
    id: "resources",
    name: "数字资源",
    tools: [
      {
        id: "zlibrary",
        name: "Z-Library",
        description: "全球最大的数字图书馆，提供海量电子书与文献下载",
        url: "https://zh.zlib.li/",
        icon: "https://api.iconify.design/fluent-emoji-flat:books.svg",
        category: "resources",
        mirrors: [
          { name: "直连节点", url: "https://zh.zlib.li/", icon: "https://api.iconify.design/mdi:lightning-bolt.svg" }, // 闪电图标代表快速直连
          { name: "亚洲节点", url: "https://zh.z-lib.gd/", icon: "https://api.iconify.design/mdi:map-marker-radius.svg" }, // 定位图标代表特定区域
          { name: "国际版", url: "https://z-library.sk/", icon: "https://api.iconify.design/mdi:web.svg" } // 地球图标代表全球/国际
        ]
      }
    ]
  }
];