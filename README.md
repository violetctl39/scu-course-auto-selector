# SCU Course Auto Selector

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](https://github.com/violetctl39/scu-course-auto-selector)
[![GreasyFork](https://img.shields.io/badge/GreasyFork-Ready-brightgreen.svg)](https://greasyfork.org/)
[![GitHub Stars](https://img.shields.io/github/stars/violetctl39/scu-course-auto-selector?style=social)](https://github.com/violetctl39/scu-course-auto-selector)

**Sichuan University Course Auto Selector** | **四川大学自动选课助手**

专为四川大学选课系统设计的 Tampermonkey 用户脚本，支持自动勾选目标课程。极速版本采用最优化策略实现最快的选课速度，包含 10ms 级别检查、批量并发处理等高级优化功能。

**Author | 作者**: [violetctl39](https://github.com/violetctl39)

## 🚀 特性

- ⚡ **极速选课**：10ms级别检查，批量并发处理，最快的选课速度
- 🎯 **精确匹配**：通过课程号和课序号精确定位目标课程
- 📋 **批量处理**：支持同时处理多门课程，按课程号分组查询
- 🔄 **智能重试**：自动处理网络延迟和页面加载问题
- 📊 **实时反馈**：详细的成功/失败结果显示
- 🎨 **用户友好**：可拖拽控制面板，高亮目标课程
- 🛡️ **安全可靠**：只勾选不提交，用户手动确认提交

## 📦 Installation | 安装方法

### Method 1: Install from GitHub (Recommended) | 方法一：从 GitHub 安装（推荐）
1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension | 安装 Tampermonkey 浏览器扩展
2. Click to install: [📥 Install Script](https://github.com/violetctl39/scu-course-auto-selector/raw/main/scu-course-auto-selector.js) | 点击安装脚本
3. Tampermonkey will automatically detect and prompt to install | Tampermonkey 会自动检测并提示安装

### Method 2: Manual Installation | 方法二：手动安装
1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension | 安装 Tampermonkey 浏览器扩展
2. Copy the [script source code](https://github.com/violetctl39/scu-course-auto-selector/raw/main/scu-course-auto-selector.js) | 复制脚本源码
3. Create a new script in Tampermonkey dashboard and paste the code | 在 Tampermonkey 管理页面创建新脚本并粘贴代码

### Method 3: GreasyFork (Coming Soon) | 方法三：GreasyFork（即将推出）
- Will be available on GreasyFork after review | 审核通过后将在 GreasyFork 上提供

## 🔧 Usage | 使用方法

### Step 1: Configure Target Courses | 步骤一：配置目标课程
Edit the script configuration to add your target courses | 编辑脚本配置添加目标课程：
```javascript
targetCourses: [
    {
        courseName: "法医世界：全球大案的深度剖析",  // Course name | 课程名称
        courseCode: "501265020",                    // Course code | 课程号
        classNumber: "01",                          // Class number | 课序号
        priority: 1                                 // Priority | 优先级
    }
]
```

### Step 2: Run the Script | 步骤二：运行脚本
1. Open Sichuan University course selection page | 打开四川大学选课系统页面
2. The script will automatically display a control panel | 脚本自动显示控制面板
3. Click "⚡ Auto Select Courses" button | 点击 "⚡ Auto Select Courses" 按钮

### Step 3: Check Results | 步骤三：查看结果
- ✅ Green checkmark indicates successful selection | 绿色勾号表示勾选成功
- ❌ Red cross indicates selection failed | 红色叉号表示勾选失败
- Check detailed failure reasons in the panel | 查看面板中的详细失败原因

### Step 4: Manual Submission | 步骤四：手动提交
- Confirm the selection results | 确认勾选结果
- Manually click the page submit button to complete course selection | 手动点击页面提交按钮完成选课

## ⚡ Ultra-Fast Optimization Features | 极速优化特性

- **10ms-level checks** | **10ms级检查**：Lightning-fast response, 10x faster than standard versions | 极速响应，比标准版本快10倍
- **Concurrent processing** | **并发处理**：Handle multiple class numbers simultaneously without waiting | 同时处理多个课序号，无需等待  
- **Smart caching** | **智能缓存**：Reduce DOM queries for improved performance | 减少DOM查询，提升性能
- **Batch events** | **批量事件**：Trigger all necessary events in one go | 一次性触发所有必要事件
- **Instant verification** | **无延迟验证**：Immediately verify selection status | 立即验证勾选状态
- **Ultra-fast queries** | **超快查询**：1-second query timeout for maximum success rate | 1秒查询超时，最大化成功率

## 🔧 Workflow | 工作流程

1. **Enter course code** | **输入课程号** → Auto-fill search box | 自动填写到搜索框
2. **Query courses** | **查询课程** → Display all class numbers | 显示所有课序号
3. **Select targets** | **勾选目标** → Precise matching and selection | 精确匹配并勾选
4. **Repeat process** | **重复处理** → Process next course code | 处理下一个课程号
5. **Manual submission** | **手动提交** → User confirm and submit | 用户确认并提交

## 📝 Configuration Guide | 配置说明

### Basic Configuration | 基本配置
```javascript
{
    courseName: "Course Name",       // Display only | 仅用于显示
    courseCode: "501265020",        // Course code (Required) | 课程号（必填）
    classNumber: "01",              // Class number (Required) | 课序号（必填）
    priority: 1                     // Priority (Lower = Higher) | 优先级（数字越小越优先）
}
```

### Advanced Configuration | 高级配置
```javascript
// Multiple class numbers for the same course | 同一课程的多个课序号
{
    courseName: "Advanced Mathematics A",
    courseCode: "101001010",
    classNumber: "01",
    priority: 1
},
{
    courseName: "Advanced Mathematics A", 
    courseCode: "101001010",        // Same course code | 相同课程号
    classNumber: "02",              // Different class number | 不同课序号
    priority: 2
}
```

## ⚠️ Important Notes | 注意事项

1. **Select only, no auto-submit** | **仅勾选不提交**：Script only selects courses, won't auto-submit | 脚本只勾选课程，不会自动提交
2. **Course code accuracy** | **课程号准确性**：Ensure course codes are correct | 请确保课程号正确
3. **Class number availability** | **课序号存在性**：Confirm target class numbers exist in system | 确认目标课序号在系统中存在
4. **Manual confirmation** | **手动确认**：Check and submit manually after selection | 勾选完成后请手动检查并提交

## 🔍 Troubleshooting | 故障排除

| Problem | Solution | 问题 | 解决方案 |
|---------|----------|------|----------|
| Course code input not found | Check if page is fully loaded | 找不到课程号输入框 | 检查页面是否完全加载 |
| Query failed | Confirm course code format | 查询失败 | 确认课程号格式正确 |
| Selection failed | Check if class number exists and is available | 勾选失败 | 检查课序号是否存在且可选 |
| Control panel not shown | Refresh page or reinstall script | 控制面板不显示 | 刷新页面或重新安装脚本 |

## 📄 License | 许可证

This project is licensed under the [MIT License](LICENSE) | 本项目采用 [MIT 许可证](LICENSE) 开源。

## 🤝 Contributing | 贡献

Issues and Pull Requests are welcome! | 欢迎提交 Issue 和 Pull Request！

- **Issues**: [Report bugs or request features](https://github.com/violetctl39/scu-course-auto-selector/issues) | 报告问题或请求功能
- **Pull Requests**: Help improve the code | 帮助改进代码
- **Discussions**: Share your experience | 分享使用经验

## 📧 Support | 支持

- **GitHub Issues**: [Report problems](https://github.com/violetctl39/scu-course-auto-selector/issues) | 报告问题
- **Author**: [violetctl39](https://github.com/violetctl39) | 作者
- **Email**: Contact via GitHub | 通过 GitHub 联系

## 🌟 Star History | 星标历史

If this project helps you, please give it a ⭐️! | 如果这个项目对你有帮助，请给它一个 ⭐️！

---

**Version | 版本**: 1.0.0  
**Author | 作者**: [violetctl39](https://github.com/violetctl39)  
**License | 许可证**: MIT  
**Compatible with | 适用于**: Sichuan University Academic System Course Selection Page | 四川大学教务系统选课页面

---

<div align="center">

**Made with ❤️ by violetctl39**

*Ultra-fast, precise, and reliable course selection for SCU students*  
*为川大学子提供极速、精准、可靠的选课体验*

</div>
