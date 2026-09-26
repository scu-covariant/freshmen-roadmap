# 🎓 智锐科创协会 · CS 技能成长与科研通关路线图 (CS Guidance Roadmap)

> **四川大学智锐科创计算机协会 (SCU Covariant) 官方出品**  
> 专为计算机初学者、自学者与科研新秀打造的交互式通关指南。涵盖开发工具箱（Git/Linux/VS Code/Docker）、核心编程语言（C/C++/Python/数学基石）、学术科研启蒙（Zotero/LaTeX/论文复现/大创）、计算机专业四大件（数据结构/计组/操作系统/网络）、工业界工程赛道（Web/后端/深度学习/大模型LLM/嵌入式）与精选优质免费自学视频/文档外链。

![GitHub Pages Compatible](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-6-646cff)
![Zhirui Innovation](https://img.shields.io/badge/四川大学智锐科创协会-官方出品-indigo)

---

## 🏛️ 关于智锐科创协会

**四川大学智锐科创计算机协会（协变团队）**是立足高校前沿技术探索与工程实践的学生科技创新组织。坚持**「锐意创新 · 研产并进 · 知行合一」**的理念，推动工程开发与学术科研双轨并行：

- 🔬 **科研学术部**：顶会论文精读、科研工具链（Zotero/LaTeX）、学术实验复现、大创与挑战杯学术科技作品孵化。
- 💻 **软件工程部**：Web 全栈开发、开源协同、移动与桌面端工程、大型软件架构实战。
- 🤖 **人工智能部**：大模型 Agent 应用开发、计算机视觉 (CV)、自然语言处理 (NLP) 与前沿算法复现。
- ⚙️ **硬件物联部**：单片机 (STM32/ESP32)、智能传感器、物联网应用与全国大学生电子设计竞赛备赛。

🌐 **官方站点**：[unicov.cn/scu](https://unicov.cn/scu/)  
😸 **GitHub 组织**：[@scu-covariant](https://github.com/scu-covariant)  
📂 **源资料索引**：[scu-covariant/CSGuidance](https://github.com/scu-covariant/CSGuidance)

---

## ✨ 核心特性

- 🏛️ **智锐科创深度印记**：融入社团愿景、部门介绍、官方主页直达链接与自学防坑指南。
- 🗺️ **双视图自由切换**：
  - **关卡闯关流 (Adventure View)**：循序渐进的通关路线，分步解锁阶段性技能。
  - **模块全景技能树 (Grid View)**：按开发工具、编程语言、学术科研、核心专业课、工程赛道、竞赛自学模块分类平铺，直观清晰。
- 🔬 **学术科研与创新启蒙**：专设学术科研阶段，覆盖顶会文献检索（arXiv/Connected Papers）、Zotero 文献管理、LaTeX 专业学术排版、Papers with Code 源码复现、导师学术套磁与大创规划。
- 🔗 **全网精选外链直达**：每个技能节点均附带经过真实检验的优质自学资源（包含 B站经典公开课（翁恺、左程云、蒋炎岩、王道等）、交互式练习沙盒（LearnGitBranching、Hello-Algo、LeetCode）、经典名著与官方中文文档）。
- 📝 **通关实战挑战 (Action Quests)**：拒绝“看视频收藏而不写代码”，每个技能均配有明确的动手实操小任务。
- 🏆 **本地进度打卡系统**：支持将技能标记为「未开始」、「学习中」、「已掌握」，进度实时保存在浏览器 `localStorage` 中，打卡成功伴随撒花烟花特效，刷新不丢失！
- 🔍 **多维搜索与筛选**：支持按关键词搜索技能名、简介、要点与外链，支持按掌握状态与技术领域快速过滤。
- ⚙️ **极简数据解耦**：所有阶段、节点、推荐链接均定义在 `src/data/roadmapData.ts` 中，无需修改复杂前端逻辑，像填表格一样即可随意新增技能点和更新视频链接。
- 🚀 **零成本一键部署**：预置 GitHub Actions 自动化工作流，代码 push 即自动构建发布到 GitHub Pages。

---

## 🧭 路线图六大关卡规划

```
第一阶段：极客起步与实用工具箱（入门起航 · 夯实开发习惯）
└── 盲打与提问智慧 ── 终端与Linux ── Git & GitHub ── VS Code ── Docker容器化
                                                                  │
第二阶段：编程思维与语言筑基（基础筑基 · 熟能生巧） ──────────────┘
└── C语言程序设计（指针/内存） ── C++ 与面向对象 ── Python极速上手 ── 计算机数学基石（线代与离散）
                                                                  │
第三阶段：学术科研与创新启蒙（智锐科研特色 · 尽早了解早受益） ───────┘
├── 文献检索与论文精读 (Google Scholar / arXiv / Zotero)
├── LaTeX 学术排版与协作 (Overleaf / BibTeX / 公式排版)
├── 开源论文复现与科研实验 (Papers with Code / wandb)
└── 本科生科研进组与大创培育 (导师物色 / 套磁信 / 大创申报)
                                                                  │
第四阶段：计算机内功四大件（校内大二~大三核心期 · 深度研读） ───────┘
└── 数据结构与算法 ── 计算机组成原理 ── 操作系统 ── 计算机网络
                                                                  │
第五阶段：工业界赛道与项目实战（高年级方向选修与简历项目打磨） ─────┘
├── Web 前端全栈开发 (React / Tailwind)
├── 服务端后端体系 (Java / Go / MySQL / Redis)
├── 机器学习与深度学习基础 (PyTorch / 吴恩达 / 李沐)
├── 大语言模型 (LLM) 与应用开发 (Prompt / Transformer / RAG)
└── 嵌入式与物联网 (单片机 / STM32 / 软硬件协同)
                                                                  │
第六阶段：竞赛保研与自学升维（贯穿大学全程 · 持续进阶） ─────────────┘
├── 大学高含金量技术竞赛攻略（蓝桥杯、ACM、软件杯等）
└── 全球顶尖名校开源神课宝库（川大学长 CSGuide、CSDIY、CSGuidance）
```

---

## 🛠️ 本地运行开发

确保本地已安装 **Node.js** (推荐 v18 及以上版本)：

```bash
# 1. 安装项目依赖
npm install

# 2. 启动本地开发服务器
npm run dev
```

启动后在浏览器中打开控制台输出的地址（通常为 `http://localhost:5173`）即可预览和交互。

---

## 🌐 部署到 GitHub Pages 保姆级步骤

本项目已配置相对路径以及自动化工作流文件 `.github/workflows/deploy.yml`，只需以下 3 步即可永久免费发布：

### 第一步：在 GitHub 上创建仓库并推送代码
在 GitHub 网页上新建一个公开仓库（例如 `freshmen-roadmap` 或 `cs-guidance`），然后在本地终端执行：

```bash
# 关联远程仓库并推送
git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
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

---

## ✍️ 如何自定义 / 增加更多技能与学习链接？

无需修改 React 组件代码！所有内容均存放在：
📂 [`src/data/roadmapData.ts`](./src/data/roadmapData.ts)

修改保存后重新运行 `npm run build` 或直接 git push，网站内容就会自动更新！

---

## 🤝 四川大学智锐科创计算机协会 · 研产并进

智锐科创协会技术部与科研学术部欢迎所有同学提出宝贵建议与优质资源推荐！
- 欢迎提交 PR 补充最新顶会论文清单、教程与工具
- 欢迎校内初学者与各年级同学加入智锐科创协会，一起搞技术、做科研、打比赛！
