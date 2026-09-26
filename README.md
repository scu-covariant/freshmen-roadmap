# 🎓 CS 初学者与大一新生技能路线图 (Freshmen CS Roadmap)

> 专为计算机初学者与大学新生打造的交互式知识技能成长路线图。涵盖开发工具链（Git/Linux/VS Code）、核心编程语言（C/C++/Python）、计算机专业四大件（数据结构、计组、操作系统、网络）、赛道分流与精选优质免费自学视频/文档外链。

![GitHub Pages Compatible](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-6-646cff)

---

## ✨ 核心特性

- 🗺️ **双视图自由切换**：
  - **关卡闯关流 (Adventure View)**：类似打怪升级的游戏化成长路线，分步解锁阶段性知识。
  - **模块全景技能树 (Grid View)**：按开发环境、编程语言、CS四大件、工业界赛道、竞赛自学模块分类平铺，直观清晰。
- 🔗 **全网精选外链直达**：每个技能节点均附带经过真实检验的优质自学资源（包含 B站经典公开课（如翁恺、左程云、蒋炎岩、王道等）、交互式练习沙盒（如 LearnGitBranching、Hello-Algo、LeetCode）、经典名著与官方中文文档）。
- 📝 **新生通关挑战 (Action Quests)**：拒绝“看视频收藏而不写代码”，每个技能均配有明确的实操练手小任务。
- 🏆 **本地进度打卡系统**：支持将技能标记为「未开始」、「学习中」、「已掌握」，进度实时保存在浏览器 `localStorage` 中，打卡成功伴随撒花烟花特效，刷新不丢失！
- 🔍 **多维搜索与筛选**：支持按关键词搜索技能名、简介、要点与外链，支持按掌握状态与技术领域快速过滤。
- ⚙️ **极简数据解耦**：所有阶段、节点、推荐链接均定义在 `src/data/roadmapData.ts` 中，小白无需修改复杂前端逻辑，像填表格一样即可随意新增技能点和更新视频链接。
- 🚀 **零成本一键部署**：预置 GitHub Actions 自动化工作流，代码 push 即自动构建发布到 GitHub Pages。

---

## 🧭 路线图规划大纲

```
第一阶段：极客新手村（前1~3周）
└── 盲打与提问智慧 ── 终端与Linux ── Git & GitHub ── 现代编辑器VS Code
                                                         │
第二阶段：程序设计筑基（大一上） ─────────────────────────┘
└── C语言程序设计（指针/内存） ── C++ 与面向对象 ── Python极速脚本
                                                       │
第三阶段：CS 内功心法（大一下 ~ 大二） ────────────────┘
└── 数据结构与算法 ── 计算机组成原理 ── 操作系统 ── 计算机网络
                                                       │
第四阶段：赛道分流与工业界实战（大二下 ~ 大三） ─────────┘
├── Web 前端开发 (React / Tailwind)
├── 服务端后端 (Java / Go / MySQL / Redis)
├── 人工智能与数据分析 (PyTorch / 大模型 Agent)
└── 嵌入式与物联网 (单片机 / STM32 / 软硬件协同)
                                                       │
第五阶段：升维打怪与自学锦囊（贯穿大学四年） ─────────────┘
├── 大学高含金量技术竞赛攻略（蓝桥杯、ACM、软件杯等）
└── 全球顶尖名校开源神课宝库（CSDIY、MIT、UC Berkeley）
```

---

## 🛠️ 本地运行开发

确保本地已安装 **Node.js** (推荐 v18 及以上版本)：

```bash
# 1. 克隆本项目
git clone <你的仓库地址>
cd freshmen-roadmap

# 2. 安装项目依赖
npm install

# 3. 启动本地开发服务器
npm run dev
```

启动后在浏览器中打开控制台输出的地址（通常为 `http://localhost:5173`）即可预览和交互。

---

## 🌐 部署到 GitHub Pages 保姆级步骤

本项目已配置相对路径以及自动化工作流文件 `.github/workflows/deploy.yml`，只需以下 3 步即可永久免费发布：

### 第一步：在 GitHub 上创建仓库并推送代码
在 GitHub 网页上新建一个公开仓库（例如 `freshmen-roadmap`），然后在本地终端执行：

```bash
# 初始化 git 仓库（如果尚未初始化）
git init
git add .
git commit -m "feat: initial commit for freshmen cs roadmap"

# 关联远程仓库并推送
git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
git branch -M main
git push -u origin main
```

### 第二步：开启 GitHub Pages 设置
1. 打开你的 GitHub 仓库主页，点击顶部的 **Settings**（设置）。
2. 在左侧菜单栏中找到并点击 **Pages**。
3. 在 **Build and deployment** 下方的 **Source** 下拉菜单中，选择：
   👉 **`GitHub Actions`**。

### 第三步：等待自动部署完成
- 切换到仓库的 **Actions** 标签页，你会看到名为 `Deploy to GitHub Pages` 的工作流正在自动运行（通常耗时约 1 分钟）。
- 构建完成后，访问链接：
  `https://<你的用户名>.github.io/<你的仓库名>/`
  即可公开访问你的路线图！

> 💡 **提示**：如果你想使用 **Vercel** 或 **Cloudflare Pages** 托管，也同样支持！只需直接导入 GitHub 仓库，构建命令填 `npm run build`，输出目录填 `dist` 即可秒级上线。

---

## ✍️ 如何自定义 / 增加更多技能与学习链接？

无需修改 React 组件代码！所有内容均存放在：
📂 [`src/data/roadmapData.ts`](./src/data/roadmapData.ts)

### 增加或修改一个节点：
打开该文件，在 `ROADMAP_NODES` 数组中添加或修改对应项：

```typescript
{
  id: 'git-github', // 唯一ID
  stageId: 'stage-tools', // 所属阶段ID
  title: 'Git 与 GitHub 协作',
  subtitle: '版本控制、时光机与开源社区',
  category: 'tools', // 分类: 'tools' | 'language' | 'cs-core' | 'direction' | 'growth'
  categoryLabel: '版本控制',
  iconName: 'GitBranch', // 对应 Lucide 图标名称
  difficulty: 2, // 难度 1 ~ 5 星
  estimatedTime: '1 周',
  isEssential: true, // 是否新生必学
  summary: '告别 final_v1.zip 的噩梦，掌握代码版本控制与分支。',
  whyItMatters: '没有任何商业项目不需要 Git。从大一开始把作业代码上传到 GitHub，四年后你的绿格子主页就是最硬核的求职简历！',
  keyPoints: [
    'Git 核心概念：工作区、暂存区、本地仓库、远程仓库',
    '核心三板斧：git add, commit, push, pull',
  ],
  // 推荐的学习资源链接列表（视频、文档、交互沙盒）
  resources: [
    {
      title: 'Learn Git Branching (游戏化交互自学)',
      url: 'https://learngitbranching.js.org/?locale=zh_CN',
      type: 'interactive', // 'video' | 'doc' | 'interactive' | 'book' | 'tool'
      tag: '互动神器',
      description: '通过图形化关卡沙盒一步步敲命令，直观理解分支与合并。',
    },
    {
      title: 'B站 - Git 零基础到进阶教程',
      url: 'https://www.bilibili.com/video/BV1FE411P7B3',
      type: 'video',
      tag: 'B站精品',
      description: '从安装配置到 GitHub 远程仓库协作全流程。',
    }
  ],
  // 实战小挑战
  quests: [
    {
      title: '点亮第一格绿色贡献',
      description: '注册 GitHub 账号，创建一个公开仓库并 push 包含你个人介绍的 README.md。',
    }
  ]
}
```

修改保存后重新运行 `npm run build` 或直接 git push，网站内容就会自动更新！

---

## 🤝 参与贡献

如果你发现了更适合新生的宝藏视频教程、神级工具或者有更好的知识点建议：
1. 欢迎 Fork 本项目提交 Pull Request
2. 或者在 Issues 中提出你的推荐链接与想法
