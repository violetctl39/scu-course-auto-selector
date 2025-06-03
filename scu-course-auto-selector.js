// ==UserScript==
// @name         SCU Course Auto Selector
// @version      1.1.0
// @description  Auto course selection assistant for Sichuan University
// @author       violetctl39
// @match        http*://zhjw.scu.edu.cn/student/courseSelect/freeCourse/index*
// @license      MIT
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const CONFIG = {
        targetCourses: [
            { courseName: "法医世界：全球大案的深度剖析", courseCode: "501265020", classNumber: "01", priority: 1 },
            { courseName: "中华文化（哲学篇）", courseCode: "999009020", classNumber: "03", priority: 2 },
            { courseName: "静力学与材料力学1（全英文）", courseCode: "312015030", classNumber: "01", priority: 3 },
            { courseName: "概率、随机变量与分布（全英文）", courseCode: "312176030", classNumber: "02", priority: 4 },
            { courseName: "用C++解决ECE问题（全英文）", courseCode: "501265020", classNumber: "01", priority: 5 },
            { courseName: "ECE分析方法（全英文）", courseCode: "312177030", classNumber: "02", priority: 6 }
        ],
        autoSelect: { enabled: true, autoSubmit: false },
        ui: { showPanel: true, highlightTarget: true, showNotification: true }
    };

    let selectedCourses = [];
    let controlPanel = null;
    let courseCheckboxCache = new Map();
    let lastQueryTime = 0;    const utils = {
        log: (message, type = 'info') => {
            const timestamp = new Date().toLocaleTimeString();
            const prefix = `[SCU Course Selector ${timestamp}]`;
            const colors = {
                success: '#4CAF50',
                error: '#f44336',
                warning: '#FF9800',
                info: '#2196F3'
            };
            const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
            console.log(`%c${prefix} ${icons[type]} ${message}`, `color: ${colors[type]}; font-weight: bold;`);
        },

        showNotification: (message) => {
            if (!CONFIG.ui.showNotification) return;
            (window.urp?.alert || alert)(message);
        },

        sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),

        waitFor: async (condition, timeout = 5000, interval = 25) => {
            const startTime = Date.now();
            while (Date.now() - startTime < timeout) {
                const result = typeof condition === 'function' ? condition() : condition;
                if (result) return result;
                await utils.sleep(interval);
            }
            return false;
        },

        waitForQueryResult: async (timeout = 1000) => {
            return utils.waitFor(() => {
                const checkboxes = document.querySelectorAll('input[type="checkbox"][name="kcId"]');
                const loadingElement = document.querySelector('.loading, .spinner, [class*="loading"]');
                if (loadingElement && loadingElement.style.display !== 'none') return false;
                return checkboxes.length > 0 ? checkboxes : false;
            }, timeout, 10);
        },

        fuzzyMatch: (text, pattern) => !pattern || text.toLowerCase().includes(pattern.toLowerCase())
    };    const courseSelector = {
        getAllCourseCheckboxes: () => {
            const cacheKey = 'checkboxes_' + Date.now();
            if (courseCheckboxCache.has(cacheKey) && Date.now() - lastQueryTime < 5000) {
                return courseCheckboxCache.get(cacheKey);
            }
            const checkboxes = document.querySelectorAll('input[type="checkbox"][name="kcId"]');
            courseCheckboxCache.set(cacheKey, checkboxes);
            lastQueryTime = Date.now();
            return checkboxes;
        },

        parseCourseInfo: (checkbox) => {
            try {
                const courseData = JSON.parse(checkbox.value);
                return {
                    element: checkbox,
                    id: checkbox.id,
                    courseName: courseData.kcm || '',
                    courseCode: courseData.kch || '',
                    classNumber: courseData.kxh || '',
                    teacher: courseData.skjs || '',
                    capacity: courseData.bkskyl || 0,
                    rawData: courseData
                };
            } catch (e) {
                utils.log(`解析课程信息失败: ${e.message}`, 'error');
                return null;
            }
        },

        findMatchingCourses: () => {
            const checkboxes = courseSelector.getAllCourseCheckboxes();
            const matchingCourses = [];

            checkboxes.forEach(checkbox => {
                const courseInfo = courseSelector.parseCourseInfo(checkbox);
                if (!courseInfo) return;

                CONFIG.targetCourses.forEach(targetCourse => {
                    if (courseInfo.courseCode === targetCourse.courseCode && 
                        courseInfo.classNumber === targetCourse.classNumber) {
                        matchingCourses.push({
                            ...courseInfo,
                            priority: targetCourse.priority || 999,
                            targetConfig: targetCourse
                        });
                    }
                });
            });

            return matchingCourses.sort((a, b) => a.priority - b.priority);
        },

        selectCourse: async (courseInfo) => {
            const checkbox = courseInfo.element;

            if (checkbox.disabled) {
                utils.log(`课程 ${courseInfo.courseName}(${courseInfo.courseCode}_${courseInfo.classNumber}) 不可选择（已禁用）`, 'warning');
                return false;
            }

            if (checkbox.checked) {
                utils.log(`课程 ${courseInfo.courseName}(${courseInfo.courseCode}_${courseInfo.classNumber}) 已经选中`, 'info');
                return true;
            }

            try {
                checkbox.checked = true;
                ['change', 'click', 'input'].forEach(eventType => {
                    checkbox.dispatchEvent(new Event(eventType, { bubbles: true }));
                });

                if (checkbox.checked) {
                    utils.log(`✅ 成功选中课程: ${courseInfo.courseName}(${courseInfo.courseCode}_${courseInfo.classNumber})`, 'success');
                    selectedCourses.push(courseInfo);
                    return true;
                }

                checkbox.click();
                await utils.sleep(10);

                if (checkbox.checked) {
                    utils.log(`✅ 成功选中课程: ${courseInfo.courseName}(${courseInfo.courseCode}_${courseInfo.classNumber})`, 'success');
                    selectedCourses.push(courseInfo);
                    return true;
                } else {
                    utils.log(`❌ 选择课程失败: ${courseInfo.courseName}(${courseInfo.courseCode}_${courseInfo.classNumber})`, 'error');
                    return false;
                }
            } catch (error) {
                utils.log(`选择课程时出错: ${error.message}`, 'error');
                return false;
            }
        }
    };    const autoSelectHandler = {
        selectAllTargetCourses: async () => {
            const btn = document.getElementById('auto-select-btn');
            const resultArea = document.getElementById('result-area');
            const successList = document.getElementById('success-list');
            const failedList = document.getElementById('failed-list');

            btn.disabled = true;
            btn.textContent = '⚡ Selecting...';
            btn.style.background = '#999';

            resultArea.style.display = 'block';
            successList.innerHTML = '';
            failedList.innerHTML = '';

            const successCourses = [];
            const failedCourses = [];

            utils.log('开始自动勾选所有目标课程...', 'info');

            try {
                const courseGroups = {};
                CONFIG.targetCourses.forEach(course => {
                    if (!courseGroups[course.courseCode]) {
                        courseGroups[course.courseCode] = [];
                    }
                    courseGroups[course.courseCode].push(course);
                });

                for (const [courseCode, courseList] of Object.entries(courseGroups)) {
                    utils.log(`正在处理课程号: ${courseCode} (包含 ${courseList.length} 个课序号)`, 'info');

                    const success = await autoSelectHandler.fillCourseInfo({ courseCode });
                    if (!success) {
                        utils.log(`填写课程号失败: ${courseCode}`, 'error');
                        courseList.forEach(course => {
                            failedCourses.push(course);
                            const failedItem = document.createElement('div');
                            failedItem.style.cssText = 'color: #f44336; padding: 2px 0; font-size: 12px;';
                            failedItem.textContent = `❌ ${course.courseName} (填写课程号失败)`;
                            failedList.appendChild(failedItem);
                        });
                        continue;
                    }

                    await autoSelectHandler.queryThisCourse();

                    const queryResult = await utils.waitForQueryResult(1000);
                    if (!queryResult) {
                        utils.log(`查询超时: ${courseCode}`, 'warning');
                        continue;
                    }

                    const matchingCourses = courseSelector.findMatchingCourses();

                    const selectPromises = courseList.map(async (targetCourse) => {
                        const targetMatch = matchingCourses.find(course =>
                            course.courseCode === targetCourse.courseCode &&
                            course.classNumber === targetCourse.classNumber
                        );

                        if (targetMatch) {
                            const result = await courseSelector.selectCourse(targetMatch);

                            if (result) {
                                successCourses.push(targetMatch);
                                const successItem = document.createElement('div');
                                successItem.style.cssText = 'color: #4CAF50; padding: 2px 0; font-size: 12px;';
                                successItem.textContent = `✅ ${targetCourse.courseName} (${targetCourse.courseCode}_${targetCourse.classNumber})`;
                                successList.appendChild(successItem);
                                utils.log(`✅ 成功勾选: ${targetCourse.courseName} (${targetCourse.classNumber})`, 'success');
                                return { success: true, course: targetCourse };
                            } else {
                                failedCourses.push(targetCourse);
                                const failedItem = document.createElement('div');
                                failedItem.style.cssText = 'color: #f44336; padding: 2px 0; font-size: 12px;';
                                failedItem.textContent = `❌ ${targetCourse.courseName} (勾选失败)`;
                                failedList.appendChild(failedItem);
                                return { success: false, course: targetCourse };
                            }
                        } else {
                            utils.log(`未找到课序号: ${targetCourse.classNumber} (课程号: ${targetCourse.courseCode})`, 'warning');
                            failedCourses.push(targetCourse);
                            const failedItem = document.createElement('div');
                            failedItem.style.cssText = 'color: #f44336; padding: 2px 0; font-size: 12px;';
                            failedItem.textContent = `❌ ${targetCourse.courseName} (未找到课序号 ${targetCourse.classNumber})`;
                            failedList.appendChild(failedItem);
                            return { success: false, course: targetCourse };
                        }
                    });

                    await Promise.all(selectPromises);
                    await utils.sleep(100);
                }

                const totalTargets = CONFIG.targetCourses.length;
                const successCount = successCourses.length;
                const failedCount = failedCourses.length;

                if (successCount > 0) {
                    utils.log(`✅ 成功勾选 ${successCount} 门课程`, 'success');
                    utils.showNotification(`✅ 成功勾选 ${successCount}/${totalTargets} 门课程！请手动提交选课申请。`);
                }

                if (failedCount > 0) {
                    utils.log(`❌ ${failedCount} 门课程勾选失败`, 'error');
                }

                selectedCourses = successCourses;
                updateControlPanel();

            } catch (error) {
                utils.log(`勾选课程时发生错误: ${error.message}`, 'error');
                const errorItem = document.createElement('div');
                errorItem.style.cssText = 'color: #f44336; padding: 5px; background: #ffebee; border-radius: 3px;';
                errorItem.textContent = `❌ 发生错误: ${error.message}`;
                failedList.appendChild(errorItem);
            } finally {
                btn.disabled = false;
                btn.textContent = '⚡ Auto Select Courses';
                btn.style.background = '#4CAF50';
            }
        },        fillCourseInfo: async (targetCourse) => {
            try {
                const kchInput = document.getElementById('kch') ||
                                document.querySelector('input[name="kch"]') ||
                                document.querySelector('input[placeholder*="课程号"]') ||
                                document.querySelector('input[placeholder*="课程代码"]') ||
                                document.querySelector('input[id*="course"]');

                if (!kchInput) {
                    utils.log('未找到课程号输入框，正在查找其他可能的输入框...', 'warning');
                    const allInputs = document.querySelectorAll('input[type="text"]');
                    utils.log(`找到 ${allInputs.length} 个文本输入框`, 'info');
                    allInputs.forEach((input, i) => {
                        utils.log(`输入框 ${i}: id="${input.id}", name="${input.name}", placeholder="${input.placeholder}"`, 'info');
                    });
                    return false;
                }

                kchInput.value = '';
                kchInput.focus();
                kchInput.value = targetCourse.courseCode;

                ['input', 'change', 'blur', 'keyup'].forEach(eventType => {
                    kchInput.dispatchEvent(new Event(eventType, { bubbles: true }));
                });

                utils.log(`已填写课程号: ${targetCourse.courseCode}（将查询该课程的所有课序号）`, 'info');
                await utils.sleep(150);
                return true;

            } catch (error) {
                utils.log(`填写课程信息时出错: ${error.message}`, 'error');
                return false;
            }
        },

        queryThisCourse: async () => {
            try {
                const queryButton = document.getElementById('queryButton') ||
                                  document.querySelector('button[onclick*="guolv"]') ||
                                  document.querySelector('input[value="查询"]') ||
                                  document.querySelector('button:contains("查询")') ||
                                  document.querySelector('[onclick*="query"]');

                if (queryButton) {
                    utils.log('点击查询按钮...', 'info');
                    queryButton.click();
                    return true;
                } else {
                    if (window.guolv && typeof window.guolv === 'function') {
                        utils.log('调用查询函数...', 'info');
                        window.guolv(1);
                        return true;
                    } else {
                        utils.log('未找到查询按钮或查询函数', 'error');
                        return false;
                    }
                }
            } catch (error) {
                utils.log(`执行查询时出错: ${error.message}`, 'error');
                return false;
            }
        },

        refreshCourseList: async () => {
            try {
                if (window.guolv && typeof window.guolv === 'function') {
                    window.guolv(1);
                    await utils.sleep(2000);
                } else {
                    const queryButton = document.getElementById('queryButton');
                    if (queryButton) {
                        queryButton.click();
                        await utils.sleep(2000);
                    }
                }
            } catch (error) {
                utils.log(`刷新课程列表时出错: ${error.message}`, 'error');
            }
        }
    };    const createControlPanel = () => {
        if (!CONFIG.ui.showPanel) return;

        const panel = document.createElement('div');
        panel.id = 'auto-select-panel';

        const getResponsiveStyles = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            const configs = [
                { min: 0, max: 480, width: Math.min(vw - 15, 280), height: Math.min(vh * 0.8, 450), 
                  maxHeight: vh - 30, fontSize: '10px', padding: '8px', headerPadding: '5px', buttonFontSize: '12px' },
                { min: 480, max: 600, width: Math.min(vw - 20, 320), height: Math.min(vh * 0.7, 500), 
                  maxHeight: vh - 40, fontSize: '11px', padding: '10px', headerPadding: '6px', buttonFontSize: '13px' },
                { min: 600, max: 1024, width: Math.min(vw * 0.4, 380), height: Math.min(vh * 0.6, 550), 
                  maxHeight: vh - 60, fontSize: '12px', padding: '12px', headerPadding: '8px', buttonFontSize: '14px' },
                { min: 1024, max: 1440, width: Math.min(vw * 0.25, 420), height: Math.min(vh * 0.55, 600), 
                  maxHeight: vh - 80, fontSize: '13px', padding: '14px', headerPadding: '10px', buttonFontSize: '15px' },
                { min: 1440, max: Infinity, width: Math.min(vw * 0.2, 450), height: Math.min(vh * 0.5, 650), 
                  maxHeight: vh - 100, fontSize: '14px', padding: '15px', headerPadding: '12px', buttonFontSize: '16px' }
            ];

            return configs.find(config => vw >= config.min && vw < config.max);
        };

        const styles = getResponsiveStyles();        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: ${styles.width}px;
            height: ${styles.height}px;
            max-height: ${styles.maxHeight}px;
            background: white;
            border: 2px solid #2196F3;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: ${styles.fontSize};
            resize: both;
            overflow: hidden;
            min-width: 250px;
            min-height: 200px;
        `;

        panel.innerHTML = `
            <div id="panel-header" style="background: #2196F3; color: white; padding: ${styles.headerPadding}; border-radius: 6px 6px 0 0; font-weight: bold; cursor: move; user-select: none; display: flex; justify-content: space-between; align-items: center;">
                <span>🎯 SCU Course Auto Selector</span>
                <button id="toggle-panel" style="background: none; border: none; color: white; cursor: pointer; font-size: ${styles.buttonFontSize};">－</button>
            </div>
            <div id="panel-content" style="padding: ${styles.padding}; height: calc(100% - ${parseInt(styles.headerPadding) * 2 + 30}px); overflow-y: auto; box-sizing: border-box;">
                <div style="margin-bottom: 10px; font-size: ${styles.fontSize};">
                    <strong>Selected:</strong> <span id="selected-count">0</span> / ${CONFIG.targetCourses.length}
                </div>
                <div style="margin-bottom: 15px;">
                    <button id="auto-select-btn" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; width: 100%; font-size: ${styles.buttonFontSize}; font-weight: bold;">⚡ Auto Select Courses</button>
                </div>
                <div id="result-area" style="margin-bottom: 15px; display: none;">
                    <div style="background: #f5f5f5; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                        <strong style="font-size: ${styles.fontSize};">Results:</strong>
                        <div id="success-list" style="margin-top: 5px; max-height: 100px; overflow-y: auto; font-size: calc(${styles.fontSize} - 1px);"></div>
                        <div id="failed-list" style="margin-top: 5px; max-height: 100px; overflow-y: auto; font-size: calc(${styles.fontSize} - 1px);"></div>
                    </div>
                </div>
                <div style="border-top: 1px solid #eee; padding-top: 10px;">
                    <strong style="font-size: ${styles.fontSize};">Target Courses (${CONFIG.targetCourses.length}):</strong>
                    <div id="target-courses" style="max-height: 120px; overflow-y: auto; margin-top: 5px; font-size: calc(${styles.fontSize} - 1px);">
                        ${CONFIG.targetCourses.map(course =>
                            `<div style="padding: 2px 0; color: #666;">• ${course.courseName} (${course.courseCode}_${course.classNumber})</div>`
                        ).join('')}
                    </div>
                    <div style="margin-top: 10px; padding: 8px; background: #f0f0f0; border-radius: 4px; font-size: calc(${styles.fontSize} - 2px); color: #666;">
                        ⚡ Ultra-fast version with 10ms-level checks, batch concurrent processing, and optimized event handling.
                    </div>
                    <div style="margin-top: 8px; padding: 6px; background: #e3f2fd; border-radius: 4px; font-size: calc(${styles.fontSize} - 3px); color: #1976d2; text-align: center;">
                        Made with ❤️ by <a href="https://github.com/violetctl39" target="_blank" style="color: #1976d2; text-decoration: none; font-weight: bold; border-bottom: 1px dotted #1976d2;" onmouseover="this.style.borderBottom='1px solid #1976d2'" onmouseout="this.style.borderBottom='1px dotted #1976d2'">violetctl39</a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        controlPanel = panel;        document.getElementById('auto-select-btn').addEventListener('click', autoSelectHandler.selectAllTargetCourses);        const toggleBtn = document.getElementById('toggle-panel');
        const content = document.getElementById('panel-content');
        let isCollapsed = false;
        let originalHeight = styles.height + 'px';

        toggleBtn.addEventListener('click', () => {
            const panelHeader = document.getElementById('panel-header');
            if (isCollapsed) {
                content.style.display = 'block';
                panel.style.resize = 'both';
                panel.style.height = originalHeight;
                panel.style.minHeight = '200px';
                toggleBtn.textContent = '－';
            } else {
                content.style.display = 'none';
                panel.style.resize = 'none';
                const headerHeight = panelHeader.offsetHeight + 4; // +4 for border
                panel.style.height = headerHeight + 'px';
                panel.style.minHeight = headerHeight + 'px';
                toggleBtn.textContent = '＋';
            }
            isCollapsed = !isCollapsed;
        });        const autoAdaptSize = () => {
            const newStyles = getResponsiveStyles();
            panel.style.width = newStyles.width + 'px';
            
            // Only update height if not collapsed
            if (!isCollapsed) {
                panel.style.height = newStyles.height + 'px';
                originalHeight = newStyles.height + 'px';
            }
            
            panel.style.maxHeight = newStyles.maxHeight + 'px';
            panel.style.fontSize = newStyles.fontSize;

            const header = document.getElementById('panel-header');
            const content = document.getElementById('panel-content');
            const autoSelectBtn = document.getElementById('auto-select-btn');

            if (header) header.style.padding = newStyles.headerPadding;
            if (content) {
                content.style.padding = newStyles.padding;
                content.style.height = `calc(100% - ${parseInt(newStyles.headerPadding) * 2 + 30}px)`;
            }
            if (autoSelectBtn) autoSelectBtn.style.fontSize = newStyles.buttonFontSize;

            const rect = panel.getBoundingClientRect();
            let needReposition = false;

            if (rect.right > window.innerWidth) {
                panel.style.left = (window.innerWidth - rect.width - 20) + 'px';
                panel.style.right = 'auto';
                needReposition = true;
            }

            if (rect.bottom > window.innerHeight) {
                panel.style.top = (window.innerHeight - rect.height - 20) + 'px';
                needReposition = true;
            }

            if (rect.left < 0) {
                panel.style.left = '20px';
                panel.style.right = 'auto';
                needReposition = true;
            }

            if (rect.top < 0) {
                panel.style.top = '20px';
                needReposition = true;
            }

            if (needReposition) {
                utils.log('面板已自动适应窗口变化', 'info');
            }
        };

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(autoAdaptSize, 200);
        });

        setTimeout(() => {
            autoAdaptSize();
            utils.log('面板已完成初始自适应调整', 'info');
        }, 100);        const header = document.getElementById('panel-header');
        let isDragging = false;
        let dragStartX, dragStartY, panelStartX, panelStartY;

        header.addEventListener('mousedown', (e) => {
            if (e.target.id === 'toggle-panel') return;

            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            const rect = panel.getBoundingClientRect();
            panelStartX = rect.left;
            panelStartY = rect.top;

            panel.style.userSelect = 'none';
            panel.style.pointerEvents = 'none';
            document.body.style.cursor = 'move';

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            e.preventDefault();
        });

        function onMouseMove(e) {
            if (!isDragging) return;

            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;

            let newX = panelStartX + deltaX;
            let newY = panelStartY + deltaY;

            const panelWidth = panel.offsetWidth;
            const panelHeight = panel.offsetHeight;
            const minVisible = 50;

            const maxX = window.innerWidth - minVisible;
            const maxY = window.innerHeight - minVisible;
            const minX = -(panelWidth - minVisible);
            const minY = 0;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            panel.style.left = newX + 'px';
            panel.style.top = newY + 'px';
            panel.style.right = 'auto';
        }

        function onMouseUp() {
            isDragging = false;
            panel.style.userSelect = '';
            panel.style.pointerEvents = '';
            document.body.style.cursor = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        let userResized = false;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === panel && !userResized) {
                    userResized = true;
                    const customSize = {
                        width: entry.contentRect.width,
                        height: entry.contentRect.height
                    };
                    localStorage.setItem('scu-course-selector-size', JSON.stringify(customSize));
                }
            }
        });

        resizeObserver.observe(panel);

        const savedSize = localStorage.getItem('scu-course-selector-size');
        if (savedSize) {
            try {
                const customSize = JSON.parse(savedSize);
                panel.style.width = customSize.width + 'px';
                panel.style.height = customSize.height + 'px';
                userResized = true;
            } catch (e) {
                utils.log('恢复保存的面板尺寸失败，使用默认尺寸', 'warning');
            }
        }
    };    const updateControlPanel = () => {
        if (!controlPanel) return;
        const selectedCountEl = document.getElementById('selected-count');
        if (selectedCountEl) selectedCountEl.textContent = selectedCourses.length;
    };

    const highlightTargetCourses = () => {
        if (!CONFIG.ui.highlightTarget) return;

        const matchingCourses = courseSelector.findMatchingCourses();

        matchingCourses.forEach(course => {
            const row = course.element.closest('tr');
            if (row) {
                row.style.backgroundColor = '#e8f5e8';
                row.style.border = '2px solid #4CAF50';
                const nameCell = row.querySelector('td:nth-child(3)');
                if (nameCell && !nameCell.querySelector('.target-mark')) {
                    const mark = document.createElement('span');
                    mark.className = 'target-mark';
                    mark.style.cssText = 'color: #4CAF50; font-weight: bold; margin-left: 5px;';
                    mark.textContent = `🎯 ${course.courseCode}_${course.classNumber}`;
                    nameCell.appendChild(mark);
                }
            }
        });
    };

    const init = () => {
        utils.log('SCU Course Auto Selector loaded successfully', 'success');

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(init, 1000);
            });
            return;
        }

        createControlPanel();

        setTimeout(() => {
            highlightTargetCourses();
        }, 2000);

        const observer = new MutationObserver(() => {
            setTimeout(highlightTargetCourses, 500);
        });

        const targetNode = document.getElementById('xirxkxkbody');
        if (targetNode) {
            observer.observe(targetNode, { childList: true, subtree: true });
        }

        utils.log(`Configured ${CONFIG.targetCourses.length} target courses`, 'info');
        CONFIG.targetCourses.forEach(course => {
            utils.log(`Target: ${course.courseName} (${course.courseCode}_${course.classNumber})`, 'info');
        });
        utils.showNotification('🎯 SCU Course Auto Selector is ready! Click "Auto Select Courses" to start.');
    };

    init();

})();
