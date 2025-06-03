# SCU Course Auto Selector

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.1.0-blue.svg)](https://github.com/violetctl39/scu-course-auto-selector)
[![GreasyFork](https://img.shields.io/badge/GreasyFork-Ready-brightgreen.svg)](https://greasyfork.org/)
[![GitHub Stars](https://img.shields.io/github/stars/violetctl39/scu-course-auto-selector?style=social)](https://github.com/violetctl39/scu-course-auto-selector)

**Sichuan University Course Auto Selector** | **四川大学自动选课助手**

专为四川大学选课系统设计的 Tampermonkey 用户脚本，支持自动勾选目标课程。极速版本采用最优化策略实现最快的选课速度，包含 10ms 级别检查、批量并发处理等高级优化功能。

**Author | 作者**: [violetctl39](https://github.com/violetctl39)

## 🚀 Features | 特性

- ⚡ **Ultra-Fast Selection** | **极速选课**：10ms-level response with optimized event handling for lightning-fast course selection | 10ms级响应，优化事件处理，实现极速选课
- 🎯 **Precise Matching** | **精确匹配**：Accurate course identification using course code and class number | 通过课程号和课序号精确定位目标课程
- 📋 **Batch Processing** | **批量处理**：Handle multiple courses simultaneously with grouped queries by course code | 支持同时处理多门课程，按课程号分组查询
- 🔄 **Smart Retry** | **智能重试**：Automatic handling of network delays and page loading issues | 自动处理网络延迟和页面加载问题
- 📊 **Real-time Feedback** | **实时反馈**：Detailed success/failure results with comprehensive logging | 详细的成功/失败结果显示和全面日志记录
- 🎨 **User-Friendly Interface** | **用户友好界面**：Draggable control panel with target course highlighting | 可拖拽控制面板，高亮目标课程
- 🛡️ **Safe & Reliable** | **安全可靠**：Only selects courses without auto-submission, requires manual confirmation | 只勾选不提交，用户手动确认提交
- 📱 **Responsive Design** | **响应式设计**：Adaptive interface that works on different screen sizes | 自适应界面，支持不同屏幕尺寸
- 💾 **Smart Caching** | **智能缓存**：Optimized DOM queries with caching for improved performance | 优化DOM查询并缓存，提升性能

## 📦 Installation | 安装方法

### 🚀 Method 1: Install from GitHub (Recommended) | 方法一：从 GitHub 安装（推荐）
1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension | 安装 Tampermonkey 浏览器扩展
2. Click to install: [📥 Install Script](https://github.com/violetctl39/scu-course-auto-selector/raw/main/scu-course-auto-selector.js) | 点击安装脚本
3. Tampermonkey will automatically detect and prompt to install | Tampermonkey 会自动检测并提示安装

### 🔧 Method 2: Manual Installation | 方法二：手动安装
1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension | 安装 Tampermonkey 浏览器扩展
2. Copy the [script source code](https://github.com/violetctl39/scu-course-auto-selector/raw/main/scu-course-auto-selector.js) | 复制脚本源码
3. Create a new script in Tampermonkey dashboard and paste the code | 在 Tampermonkey 管理页面创建新脚本并粘贴代码

### 🌐 Method 3: GreasyFork (Coming Soon) | 方法三：GreasyFork（即将推出）
- Will be available on GreasyFork after review | 审核通过后将在 GreasyFork 上提供

## 🔧 Usage | 使用方法

### ⚡ Quick Start | 快速开始
1. **Install** | **安装**: Install the script via Tampermonkey | 通过 Tampermonkey 安装脚本
2. **Configure** | **配置**: Edit target courses in script settings | 在脚本设置中编辑目标课程
3. **Navigate** | **导航**: Go to SCU course selection page | 进入川大选课页面
4. **Execute** | **执行**: Click "Auto Select Courses" button | 点击"Auto Select Courses"按钮
5. **Confirm** | **确认**: Review and manually submit | 检查并手动提交

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

- **⚡ 10ms-level Response** | **10ms级响应**：Lightning-fast course detection and selection, up to 10x faster than standard versions | 极速课程检测和勾选，比标准版本快10倍
- **🔄 Concurrent Processing** | **并发处理**：Simultaneous handling of multiple class numbers without sequential waiting | 同时处理多个课序号，无需顺序等待  
- **💾 Smart Caching** | **智能缓存**：Efficient DOM element caching to minimize queries and boost performance | 高效DOM元素缓存，减少查询提升性能
- **🎯 Batch Event Handling** | **批量事件处理**：Optimized event triggering for immediate course selection response | 优化事件触发，立即响应课程勾选
- **⚡ Instant Verification** | **即时验证**：Real-time selection status validation without delays | 实时勾选状态验证，零延迟确认
- **🚀 Ultra-Fast Queries** | **超速查询**：1-second optimized query timeout for maximum success rate | 1秒优化查询超时，最大化成功率
- **📊 Performance Monitoring** | **性能监控**：Built-in timing and performance analytics for optimal speed | 内置计时和性能分析，确保最优速度

## 🔧 Workflow | 工作流程

1. **🔍 Course Code Input** | **课程号输入** → Automatically fill course code into search field | 自动填写课程号到搜索框
2. **🔍 Query Execution** | **执行查询** → Trigger course query and wait for results | 触发课程查询并等待结果
3. **📋 Course Discovery** | **课程发现** → Parse and identify all available class numbers | 解析并识别所有可用课序号
4. **🎯 Target Selection** | **目标勾选** → Precise matching and automatic selection of target courses | 精确匹配并自动勾选目标课程
5. **🔄 Batch Processing** | **批量处理** → Process next course code group efficiently | 高效处理下一组课程号
6. **✅ Manual Confirmation** | **手动确认** → User reviews results and submits manually | 用户检查结果并手动提交

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

### Example Configuration | 配置示例

Based on the script's default configuration | 基于脚本默认配置：

```javascript
const CONFIG = {
    targetCourses: [
        { 
            courseName: "法医世界：全球大案的深度剖析", 
            courseCode: "501265020", 
            classNumber: "01", 
            priority: 1 
        },
        { 
            courseName: "中华文化（哲学篇）", 
            courseCode: "999009020", 
            classNumber: "03", 
            priority: 2 
        },
        { 
            courseName: "静力学与材料力学1（全英文）", 
            courseCode: "312015030", 
            classNumber: "01", 
            priority: 3 
        },
        { 
            courseName: "概率、随机变量与分布（全英文）", 
            courseCode: "312176030", 
            classNumber: "02", 
            priority: 4 
        }
    ],
    autoSelect: { enabled: true, autoSubmit: false },
    ui: { showPanel: true, highlightTarget: true, showNotification: true }
};
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

### UI Configuration | 界面配置

```javascript
ui: {
    showPanel: true,        // Display control panel | 显示控制面板
    highlightTarget: true,  // Highlight target courses | 高亮目标课程
    showNotification: true  // Show success notifications | 显示成功通知
}
```

## ⚠️ Important Notes | 注意事项

1. **Select only, no auto-submit** | **仅勾选不提交**：Script only selects courses, won't auto-submit | 脚本只勾选课程，不会自动提交
2. **Course code accuracy** | **课程号准确性**：Ensure course codes are correct | 请确保课程号正确
3. **Class number availability** | **课序号存在性**：Confirm target class numbers exist in system | 确认目标课序号在系统中存在
4. **Manual confirmation** | **手动确认**：Check and submit manually after selection | 勾选完成后请手动检查并提交

## 🔍 Troubleshooting | 故障排除

### Common Issues | 常见问题

| Problem | Solution | 问题 | 解决方案 |
|---------|----------|------|----------|
| Course code input not found | Check if page is fully loaded, verify course system access | 找不到课程号输入框 | 检查页面是否完全加载，确认选课系统访问正常 |
| Query failed or timeout | Confirm course code format is correct, check network connection | 查询失败或超时 | 确认课程号格式正确，检查网络连接状态 |
| Selection failed | Verify class number exists and is available for selection | 勾选失败 | 检查课序号是否存在且可供选择 |
| Control panel not displayed | Refresh page, check Tampermonkey script status, or reinstall | 控制面板不显示 | 刷新页面，检查Tampermonkey脚本状态或重新安装 |
| Script not working | Ensure you're on the correct course selection page URL | 脚本不工作 | 确保在正确的选课页面URL上 |
| Performance issues | Clear browser cache, disable other extensions temporarily | 性能问题 | 清除浏览器缓存，暂时禁用其他扩展 |

### FAQ | 常见问题解答

**Q: Is this script safe to use? | 这个脚本使用安全吗？**  
A: Yes, the script only selects courses and never auto-submits. You maintain full control. | 是的，脚本只勾选课程，从不自动提交。您保持完全控制权。

**Q: Will this guarantee I get the courses? | 这能保证我选到课程吗？**  
A: The script helps with speed and accuracy, but course availability depends on the system. | 脚本有助于提高速度和准确性，但课程可用性取决于系统。

**Q: Can I use this for other universities? | 我可以在其他大学使用吗？**  
A: This script is specifically designed for SCU's system. Modifications would be needed for other systems. | 此脚本专为川大系统设计。其他系统需要修改。

**Q: How fast is the selection process? | 选课过程有多快？**  
A: The script can process selections in 10ms intervals with concurrent handling for maximum speed. | 脚本可以10ms间隔处理选课，并发处理以获得最大速度。

## 📄 License | 许可证

This project is licensed under the [MIT License](LICENSE) | 本项目采用 [MIT 许可证](LICENSE) 开源。

## 🔧 Technical Specifications | 技术规格

- **Script Engine** | **脚本引擎**: Tampermonkey / Greasemonkey compatible
- **Target Website** | **目标网站**: `http*://zhjw.scu.edu.cn/student/courseSelect/freeCourse/index*`
- **Browser Support** | **浏览器支持**: Chrome, Firefox, Edge, Safari (with Tampermonkey)
- **Performance** | **性能**: 10ms response time, concurrent processing
- **File Size** | **文件大小**: ~15KB (optimized and commented)
- **Dependencies** | **依赖**: None (vanilla JavaScript)

## 📋 Changelog | 更新日志

### Version 1.1.0 (Latest) | 版本 1.1.0（最新）
- ⚡ **Performance Optimization**: Implemented 10ms-level response time | 性能优化：实现10ms级响应时间
- 🔄 **Concurrent Processing**: Added batch course selection with concurrent handling | 并发处理：添加批量选课和并发处理
- 💾 **Smart Caching**: Optimized DOM queries with intelligent caching | 智能缓存：优化DOM查询并增加智能缓存
- 📱 **Responsive Design**: Enhanced UI adaptability for different screen sizes | 响应式设计：增强界面对不同屏幕尺寸的适应性
- 🎯 **Improved Accuracy**: Better course matching and error handling | 提升准确性：更好的课程匹配和错误处理
- 🛡️ **Enhanced Safety**: Additional validation and confirmation steps | 增强安全性：增加验证和确认步骤

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

**Version | 版本**: 1.1.0  
**Author | 作者**: [violetctl39](https://github.com/violetctl39)  
**License | 许可证**: MIT  
**Compatible with | 适用于**: Sichuan University Academic System Course Selection Page | 四川大学教务系统选课页面

---

<div align="center">

**Made with ❤️ by violetctl39**


</div>
