// <reference path="../vsdoc/jquery.d.ts" />
// <reference path="../vsdoc/easyweb.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var extend;
(function (extend) {
    //日期格式化输出
    Date.prototype.format = function (formatStr) {
        /// <summary>对Date的扩展，将 Date 转化为指定格式的字符串。</summary>
        /// <param name="formatStr" type="String">yyyy-MM-dd hh:mm:ss.S ==> 2006-07-02 08:09:04.423 或 "yyyy-M-d h:m:s.S" ==> 2006-7-2 8:9:4.18</param>
        /// <returns type="void">返回格式化后的日期字符串。</returns>
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(formatStr))
            formatStr = formatStr.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(formatStr))
                formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return formatStr;
    };

    Date.prototype.addYear = function (num) {
        var tmpDate = new Date(this);
        tmpDate.setFullYear(tmpDate.getFullYear() + num);
        return tmpDate;
    };

    Date.prototype.addMonth = function (num) {
        var tmpDate = new Date(this);
        tmpDate.setMonth(tmpDate.getMonth() + num);
        return tmpDate;
    };

    Date.prototype.addDay = function (num) {
        var tmp = this.valueOf();
        tmp = tmp + (num * 24 * 60 * 60 * 1000);
        return new Date(tmp);
    };

    //替换所有字符串
    String.prototype.replaceAll = function (oldStr, newStr, ignoreCase) {
        /// <summary>替换源字符串中所有匹配的字符串为指定的字符串。（javascript原生的replace只替换第1个匹配项。）</summary>
        /// <param name="oldStr" type="String">所要替换的字符串</param>
        /// <param name="newStr" type="String">替换为新的字符串</param>
        /// <param name="ignoreCase" type="bool">[可选]是否忽略大小写,默认为false。</param>
        /// <returns type="String">替换操作后产生新的字符串。</returns>
        if (!RegExp.prototype.isPrototypeOf(oldStr)) {
            return this.replace(new RegExp(oldStr, (ignoreCase ? "gi" : "g")), newStr);
        } else {
            return this.replace(oldStr, newStr);
        }
    };

    String.prototype.padLeft = function (totalWidth, paddingChar) {
        if (paddingChar != null) {
            return this.PadHelper(totalWidth, paddingChar, false);
        } else {
            return this.PadHelper(totalWidth, ' ', false);
        }
    };

    String.prototype.padRight = function (totalWidth, paddingChar) {
        if (paddingChar != null) {
            return this.PadHelper(totalWidth, paddingChar, true);
        } else {
            return this.PadHelper(totalWidth, ' ', true);
        }
    };

    String.prototype.PadHelper = function (totalWidth, paddingChar, isRightPadded) {
        if (this.length < totalWidth) {
            var paddingString = new String();
            for (i = 1; i <= (totalWidth - this.length); i++) {
                paddingString += paddingChar;
            }

            if (isRightPadded) {
                return (this + paddingString);
            } else {
                return (paddingString + this);
            }
        } else {
            return this;
        }
    };

    String.prototype.format = function (args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    };

    //RGB颜色转换为16进制
    String.prototype.toRgbColor = function () {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/, that = this;
        if (/^(rgb|RGB)/.test(that)) {
            var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = that;
            }
            return strHex;
        } else if (reg.test(that)) {
            var aNum = that.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return that;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return '#000000';
        }
    };

    //16进制颜色转为RGB格式
    String.prototype.toHexColor = function () {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/, sColor = this.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }

            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        } else {
            return sColor;
        }
    };

    //修复早期IE不支持数据的indexOf方法
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    //修复早期IE不支持console控制台方法
    if (!window.console) {
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

        window.console = {};
        for (var i = 0; i < names.length; i++)
            window.console[names[i]] = function () {
            };
    }
})(extend || (extend = {}));

var easyweb;
(function (easyweb) {
    var appDomain = (function () {
        function appDomain() {
        }
        appDomain.startMain = function () {
            var mainScriptElement = easyweb.appDomain.getMainScriptElement();
            if (mainScriptElement === undefined)
                return;

            var mainScriptUrl = mainScriptElement.getAttribute('data-main');
            if (mainScriptUrl !== undefined)
                appDomain.loadScript(mainScriptUrl, null);
        };

        appDomain.loadScript = function (fileName, callback) {
            var fileNames = [fileName];
            appDomain.loadScriptFiles(fileNames, callback);
        };

        appDomain.loadCSSFile = function (fileName) {
            var fileNames = [fileName];
            appDomain.loadCSSFiles(fileNames);
        };

        appDomain.loadScriptFiles = function (fileNames, callback) {
            if (fileNames.length == 0) {
                callback();
                return;
            }

            var fileName = fileNames[0], script = document.createElement('script'), runCallBack = function (files, callback) {
                files.shift();
                if (files.length == 0)
                    callback();
                else
                    appDomain.loadScriptFiles(files, callback);
            };

            script.src = fileName;
            document.getElementsByTagName('head')[0].appendChild(script);

            if (callback) {
                if (script.readyState === undefined) {
                    script.onload = function (event) {
                        runCallBack(fileNames, callback);
                    };
                } else {
                    script.onreadystatechange = function () {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            runCallBack(fileNames, callback);
                        }
                    };
                }
                script.onerror = function (event) {
                    console.error('Can not load the script file:"{0}".'.format(script.src));
                };
            }
        };

        appDomain.loadHtmlViews = function (fileNames, viewCache, callback) {
            if (fileNames.length == 0) {
                callback();
                return;
            }

            var tmpBox = $('<div></div>'), fileName = fileNames[0], runCallBack = function (files, viewCache, callback) {
                files.shift();
                if (files.length == 0)
                    callback();
                else
                    appDomain.loadHtmlViews(files, viewCache, callback);
            };

            tmpBox.load(fileName, function (httpRequest, textStatus, errorThrown) {
                if (textStatus == 'success') {
                    var appviews = tmpBox.find('.app-view');
                    for (var i = 0; i < appviews.length; i++) {
                        var appview = appviews.eq(i), viewName = appview.data('viewname');

                        if (validate.isNotNull(viewName))
                            viewCache[viewName] = appview;
                    }

                    var dialogs = tmpBox.find('.app-dialog');

                    for (var i = 0; i < dialogs.length; i++) {
                        var dialogview = dialogs.eq(i), viewName = dialogview.data('dialogname');

                        if (validate.isNotNull(viewName))
                            viewCache[viewName] = dialogview;
                    }

                    runCallBack(fileNames, viewCache, callback);
                }
            });
        };

        appDomain.loadCSSFiles = function (fileNames) {
            for (var n = 0; n < fileNames.length; n++) {
                var link = document.createElement('link');
                link.href = fileNames[n];
                link.rel = 'stylesheet';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        };

        appDomain.loadImgFiles = function (fileNames, callback) {
            if (fileNames.length == 0) {
                callback();
                return;
            }

            var fileName = fileNames[0], img = new Image(), runCallBack = function (files, callback) {
                files.shift();
                if (files.length == 0)
                    callback();
                else
                    appDomain.loadImgFiles(files, callback);
            };

            img.src = fileName;
            if (img.complete) {
                runCallBack(fileNames, callback);
            } else {
                img.onload = function () {
                    runCallBack(fileNames, callback);
                };
            }
        };

        appDomain.getMainScriptElement = function () {
            var scriptLink, scriptMain, scriptList = document.getElementsByTagName('script');

            for (var n = 0; n < scriptList.length; n++) {
                var tmpScript = scriptList[n];
                if (tmpScript.getAttribute('data-main') != undefined) {
                    return tmpScript;
                }
            }
        };
        appDomain.language = 'zh-cn';

        appDomain.animateStyle = {
            moveToLeft: { outClass: 'pt-page-moveToLeft', inClass: 'pt-page-moveFromRight' },
            moveToRight: { outClass: 'pt-page-moveToRight', inClass: 'pt-page-moveFromLeft' },
            moveToTop: { outClass: 'pt-page-moveToTop', inClass: 'pt-page-moveFromBottom' },
            moveToBottom: { outClass: 'pt-page-moveToBottom', inClass: 'pt-page-moveFromTop' }
        };
        return appDomain;
    })();
    easyweb.appDomain = appDomain;

    var application = (function () {
        function application() {
            this.moduleViewsCache = {};
            this.moduleClassCache = {};
            this.windowBody = null;
            this.currentContainer = null;
            this.currentLayout = { name: null, controllers: {}, views: {}, viewName: null };
            this.currentModule = { name: null, controllers: {}, views: {}, viewName: null };
            this.needLoginDlgIsOnShow = false;
            this.isOnUpdateHash = false;
            this.disableHistory = true;
            this.context = {};
            this.settings = {
                appName: 'Easyweb Application',
                debugMode: true,
                language: (navigator.language || navigator.browserLanguage).toLowerCase(),
                currentUserAPI: '/API/Common/CurrentUser',
                defaultModuleName: 'Login',
                loginModuleName: 'Login',
                rootPath: '/',
                animateTime: 200,
                resource: {
                    CSS: [],
                    JS: [],
                    Images: [],
                    Modules: [],
                    Views: []
                }
            };
            this.eventManager = new eventManager();
        }
        application.prototype.start = function () {
            var app = this;
            var startApplication = function () {
                document.title = window.lang != undefined ? window.lang['AppName'] : app.settings.appName;
                app.windowBody = $(window.top.document.body).css('opacity', 0);
                app.currentContainer = app.windowBody;

                app.settings.rootPath = app.settings.rootPath.toString().substr(0, app.settings.rootPath.length - 1);

                easyweb.appDomain.language = app.settings.language;
                easyweb.server.rootPath = app.settings.rootPath;
                easyweb.server.debugMode = app.settings.debugMode;
                easyweb.server.onNotLogin = function () {
                    if (app.context.currentUser != null) {
                        if (!app.needLoginDlgIsOnShow) {
                            app.needLoginDlgIsOnShow = true;
                            easyweb.dialog.alert('您的帐号尚未登录或已经超时，请您重新登录系统。', function () {
                                app.needLoginDlgIsOnShow = false;
                                app.loadModule(app.settings.loginModuleName);
                                return true;
                            });
                        }
                    } else {
                        app.loadModule(app.settings.loginModuleName).done(function () {
                            app.windowBody.animate({ 'opacity': 1 }, app.settings.animateTime);
                        });
                    }
                };

                $(window).resize(function () {
                    var viewController = app.currentModule.controllers[app.currentModule.viewName];
                    if (viewController != undefined)
                        app.triggerEvent(viewController, 'resize', null);

                    var layoutController = app.currentLayout.controllers[app.currentLayout.viewName];
                    if (layoutController != undefined)
                        app.triggerEvent(layoutController, 'resize', null);
                });

                easyweb.server.load(app.settings.currentUserAPI, null, function (currentUser) {
                    app.context.currentUser = currentUser;

                    var moduleInfo = app.getModuleInfoByHash();
                    var viewOnShowParm = app.getParmsByHash();

                    if (moduleInfo === null) {
                        moduleInfo = easyweb.validate.isNotNull(app.context.currentUser) ? app.context.currentUser.DefaultModuleName : app.settings.defaultModuleName;
                    }

                    app.loadModule(moduleInfo, null, viewOnShowParm).done(function () {
                        app.windowBody.animate({ 'opacity': 1 }, app.settings.animateTime);
                    });
                });

                window.addEventListener("hashchange", function () {
                    app.loadViewByHash();
                }, false);
            };
            this.loadResourceFiles(startApplication);
        };

        application.prototype.regModule = function (moduleName, moduleClass) {
            this.moduleClassCache[moduleName] = moduleClass;
        };

        application.prototype.regDialog = function (dialogName, dialogClass) {
            var app = this;

            app[dialogName] = function () {
                var showDialogArgs = arguments;
                var dialog = new easyweb.dialog();
                if (app.moduleViewsCache['Dialog.' + dialogName] == undefined) {
                    console.error('找不到名称为' + 'Dialog.' + dialogName + '的对话框视图。');
                    return;
                }

                dialog.control = app.moduleViewsCache['Dialog.' + dialogName].clone();

                var dialogInstance = new dialogClass(dialog);
                var buttons = [];
                for (var i = 0; i < dialogInstance.buttons.length; i++) {
                    var btnModel = dialogInstance.buttons[i];
                    var button = {
                        text: btnModel.text, click: function (dialog, index) {
                            dialogInstance.actions[dialogInstance.buttons[index].action]();
                        }
                    };
                    buttons.push(button);
                }

                dialog.title = (dialogInstance.title === undefined) ? '' : dialogInstance.title;

                app.bindViewEvent(dialog.control, dialogInstance);

                dialog.buttons = buttons;
                dialog.onShow(function () {
                    dialogInstance.events['show'].apply(dialog, showDialogArgs);
                });
                dialog.onClose(dialogInstance.events['close']);
                dialog.show();

                return dialog;
            };
        };

        application.prototype.loadLayout = function (layoutInfo) {
            var app = this, dtd = $.Deferred(), nameInfo = validate.isNull(layoutInfo) ? [null, null] : layoutInfo.split('.'), moduleName = nameInfo[0], targetView = nameInfo[1];

            if (app.currentLayout.name === moduleName && app.currentLayout.viewName == targetView)
                return dtd.resolve();

            app.destroyModule(app.currentLayout);

            if (moduleName === null && targetView === null) {
                app.currentContainer = app.windowBody.empty();
                return dtd.resolve();
            }

            if (app.moduleClassCache[moduleName] === undefined) {
                easyweb.dialog.error('找不到名称为“' + moduleName + '”的页面布局。');
                return dtd.resolve();
            }

            var moduleInstance = new app.moduleClassCache[moduleName](null), viewName = app.getViewName(targetView, moduleInstance.controllers), view = app.moduleViewsCache[moduleName + '.' + viewName].clone(), controller = new moduleInstance.controllers[viewName](view);

            app.currentContainer = app.windowBody.empty();
            app.currentContainer.append(view);

            var initReturn = app.triggerEvent(controller, 'init', null), dtdInit = validate.isDeferred(initReturn) ? initReturn : $.Deferred().resolve();

            dtdInit.done(function () {
                app.currentLayout.name = moduleName;
                app.currentLayout.viewName = viewName;
                app.currentLayout.controllers[viewName] = controller;
                app.currentLayout.views[viewName] = view;

                app.currentContainer = view.find('.app-module-container');

                app.bindViewEvent(view, controller);
                app.triggerEvent(controller, 'show', true);

                view.css('visibility', 'visible');
                dtd.resolve();
            });

            return dtd;
        };

        application.prototype.loadModule = function (moduleInfo, moduleParm, viewOnShowParm) {
            var app = this, dtd = $.Deferred(), nameInfo = validate.isNull(moduleInfo) ? [null, null] : moduleInfo.split('.'), moduleName = nameInfo[0], targetView = nameInfo[1];

            if (validate.isNull(app.moduleClassCache[moduleName])) {
                easyweb.dialog.error('找不到名称为“' + moduleName + '”的功能模块。');
                dtd.resolve();
                return dtd;
            }

            var moduleInstance = new app.moduleClassCache[moduleName](moduleParm), layout = moduleInstance.layoutsName;

            targetView = app.getViewName(targetView, moduleInstance.controllers);

            app.destroyModule(app.currentModule);

            app.loadLayout(layout).done(function () {
                var viewIndex = 0;
                var initViewDeferredList = [];

                app.currentModule.name = moduleName;

                for (var viewName in moduleInstance.controllers) {
                    if (app.moduleViewsCache[moduleName + '.' + viewName] == undefined) {
                        easyweb.dialog.error('找不到名称为“' + moduleName + '.' + viewName + '”的模块视图。');
                        dtd.resolve();
                        return dtd;
                    }

                    var view = app.moduleViewsCache[moduleName + '.' + viewName].clone(), controller = new moduleInstance.controllers[viewName](view);

                    app.currentContainer.append(view);

                    var initReturn = app.triggerEvent(controller, 'init', null), dtdInit = validate.isDeferred(initReturn) ? initReturn : $.Deferred().resolve();

                    initViewDeferredList.push(dtdInit);
                    app.bindViewEvent(view, controller);

                    app.currentModule.views[viewName] = view;
                    app.currentModule.controllers[viewName] = controller;

                    viewIndex++;
                }
                app.eventManager.trigger('moduleChanged', moduleName);

                asyncTask.waitTaskList(initViewDeferredList, function () {
                    app.changeView(targetView, viewOnShowParm);
                    dtd.resolve();
                });
            });

            return dtd;
        };

        application.prototype.changeView = function (targetViewName, viewOnShowParm, animate) {
            var app = this, animateStyle = appDomain.animateStyle[animate], viewName = targetViewName, prevView = app.currentModule.views[app.currentModule.viewName], prevCont = app.currentModule.controllers[app.currentModule.viewName], nextView = app.currentModule.views[viewName], nextCont = app.currentModule.controllers[viewName], viewTitle = app.currentModule.controllers[viewName].title;

            if (viewTitle != undefined) {
                window.top.document.title = viewTitle;
            }

            if (animateStyle === undefined) {
                app.hideCurrentView(function () {
                    app.currentModule.viewName = viewName;
                    app.currentModule.views[viewName].appendTo(app.currentContainer).css('visibility', 'visible');
                    app.triggerEvent(app.currentModule.controllers[viewName], 'show', viewOnShowParm);
                });
            } else {
                app.currentModule.viewName = viewName;

                prevView.addClass(animateStyle.outClass);
                nextView.appendTo(app.currentContainer).css('visibility', 'visible').addClass(animateStyle.inClass);

                app.triggerEvent(prevCont, 'hide', null);
                app.triggerEvent(nextCont, 'show', viewOnShowParm);

                setTimeout(function () {
                    prevView.css('visibility', 'hidden');
                    prevView.removeClass(animateStyle.outClass);
                    nextView.removeClass(animateStyle.inClass);
                }, 600);
            }

            app.updateLocationHash(viewOnShowParm);
        };

        application.prototype.goback = function () {
            window.top.history.back();
        };

        application.prototype.bind = function (eventName, handle) {
            this.eventManager.bind(eventName, handle);
        };

        application.prototype.unbind = function (eventName) {
            this.eventManager.unbind(eventName);
        };

        application.prototype.enable = function () {
            var instance = this;
            instance.windowBody.find('.app-mask').remove();
        };

        application.prototype.disable = function () {
            var instance = this;
            instance.windowBody.find('.app-mask').remove();
            instance.windowBody.append($('<div class="app-mask"></div>'));
        };

        application.prototype.hideCurrentView = function (callback) {
            var app = this;
            if (app.currentModule.viewName === null) {
                callback();
                return;
            }

            // 隐藏当前视图
            var view = app.currentModule.views[app.currentModule.viewName], controller = app.currentModule.controllers[app.currentModule.viewName];

            var hideReturn = app.triggerEvent(controller, 'hide', null), dtdHide = validate.isDeferred(hideReturn) ? hideReturn : $.Deferred().resolve();

            dtdHide.done(function () {
                view.css('visibility', 'hidden');
                callback();
            });
        };

        application.prototype.destroyModule = function (moduleInstance) {
            var app = this;
            for (var o in moduleInstance.controllers) {
                app.triggerEvent(moduleInstance.controllers[o], 'destroy', null);
                moduleInstance.views[o].remove();
            }

            moduleInstance.name = null;
            moduleInstance.viewName = null;
            moduleInstance.views = {};
            moduleInstance.controllers = {};
        };

        application.prototype.triggerEvent = function (controller, eventName, parm) {
            if (controller.events != undefined && $.isFunction(controller.events[eventName])) {
                return controller.events[eventName](parm);
            }
        };

        application.prototype.bindViewEvent = function (view, controller) {
            var controls = view.find('[data-event]');
            controls.each(function () {
                var view = $(this), eventInfo = view.data('event').split(':'), eventName = eventInfo.length === 2 ? eventInfo[0] : 'click', actionName = eventInfo.length === 2 ? eventInfo[1] : eventInfo[0];

                if (controller.actions[actionName] === undefined)
                    console.error("找不到指定的事件处理方法，方法名称：" + actionName);

                if (eventName.indexOf('(') == -1) {
                    view.bind(eventName, controller.actions[actionName]);
                } else {
                    var b = eventName.indexOf('('), e = eventName.indexOf(')'), filter = eventName.substring(b + 1, e);

                    eventName = eventName.substring(0, b);
                    view.on(eventName, filter, controller.actions[actionName]);
                }
            });
        };

        application.prototype.loadResourceFiles = function (callback) {
            var instance = this;
            easyweb.appDomain.loadCSSFiles(instance.settings.resource.CSS);
            easyweb.appDomain.loadScriptFiles(instance.settings.resource.JS, function () {
                easyweb.appDomain.loadScriptFiles(instance.settings.resource.Modules, function () {
                    easyweb.appDomain.loadHtmlViews(instance.settings.resource.Views, instance.moduleViewsCache, function () {
                        easyweb.appDomain.loadImgFiles(instance.settings.resource.Images, function () {
                            callback();
                        });
                    });
                });
            });
        };

        application.prototype.getModuleInfoByHash = function () {
            var hash = location.hash.substr(1);

            if (hash.length === 0)
                return null;
            if (hash === '/')
                return null;

            if (hash.indexOf('?') > -1)
                hash = hash.substr(0, hash.indexOf('?'));
            if (hash[0] === '/')
                hash = hash.substr(1);
            if (hash[hash.length - 1] === '/')
                hash = hash.substr(0, hash.length - 1);

            var hashInfo = hash.split('/');

            return (hashInfo.length === 1) ? hash : hashInfo[0] + '.' + hashInfo[1];
        };

        application.prototype.getParmsByHash = function () {
            var hash = location.hash.substr(1);
            if (hash.length === 0)
                return null;
            if (hash === '/')
                return null;

            if (hash.indexOf('?') > -1)
                hash = hash.substr(0, hash.indexOf('?'));
            if (hash[0] === '/')
                hash = hash.substr(1);
            if (hash[hash.length - 1] === '/')
                hash = hash.substr(0, hash.length - 1);

            var hashInfo = hash.split('/');
            if (hashInfo.length == 3) {
                return JSON.parse(decodeURI(hashInfo[2]));
            }
            return null;
        };

        application.prototype.getViewName = function (viewName, controllers) {
            if (viewName === undefined || controllers[viewName] === undefined) {
                for (var name in controllers) {
                    viewName = name;
                    break;
                }
            }
            return viewName;
        };

        application.prototype.loadViewByHash = function () {
            var app = this;
            if (app.isOnUpdateHash) {
                app.isOnUpdateHash = false;
                return;
            }

            var moduleInfo = app.getModuleInfoByHash(), parm = app.getParmsByHash(), nameInfo = validate.isNull(moduleInfo) ? [null, null] : moduleInfo.split('.'), moduleName = nameInfo[0], targetView = nameInfo[1];

            if (app.currentModule.name == moduleName) {
                app.changeView(targetView, parm);
            } else {
                app.loadModule(moduleInfo, null, parm);
            }
        };

        application.prototype.updateLocationHash = function (parm) {
            var app = this, href = url.getNoAnchorUrl(), hash = '#/' + app.currentModule.name + '/' + app.currentModule.viewName;

            if (parm != undefined)
                hash += '/' + JSON.stringify(parm);

            app.isOnUpdateHash = true;
            if (app.disableHistory) {
                window.top.location.replace(href + hash);
                app.disableHistory = false;
            } else {
                window.top.location.href = href + hash;
            }

            setTimeout(function () {
                app.isOnUpdateHash = false;
            }, 100);
        };
        return application;
    })();
    easyweb.application = application;

    var asyncTask = (function () {
        function asyncTask() {
        }
        asyncTask.runTaskList = function (taskList, callback) {
            var arrayOfPromises = [];
            for (var i = 0; i < taskList.length; i++) {
                var task = taskList[i];
                arrayOfPromises.push(task());
            }

            jQuery.when.apply(jQuery, arrayOfPromises).done(function () {
                var resultList = arguments;
                callback(resultList);
            }).fail(function (errorInfo) {
                console.error('asyncTask.runTaskList:', errorInfo);
            });
        };

        asyncTask.runTaskQueue = function (taskList, callback, resultList) {
            if (typeof resultList === "undefined") { resultList = []; }
            if (taskList.length == 0) {
                callback([]);
                return;
            }

            var task = taskList[0], runCallBack = function (taskList, callback, resultList) {
                taskList.shift();
                if (taskList.length == 0)
                    callback(resultList);
                else
                    asyncTask.runTaskQueue(taskList, callback, resultList);
            };

            task().done(function (result) {
                resultList.push(result);
                runCallBack(taskList, callback, resultList);
            }).fail(function (errorInfo) {
                //console.error('asyncTask.runTaskQueue:', errorInfo);
            });
        };

        asyncTask.waitTaskList = function (deferredList, callback) {
            var dtd = $.Deferred();
            jQuery.when.apply(jQuery, deferredList).done(function () {
                var resultList = arguments;
                dtd.resolve(resultList);
                if ($.isFunction(callback))
                    callback(resultList);
            });
            return dtd;
        };

        asyncTask.waitTaskQueue = function (taskList) {
            var dtd = $.Deferred();
            asyncTask.runTaskQueue(taskList, function () {
                dtd.resolve();
            });
            return dtd;
        };
        return asyncTask;
    })();
    easyweb.asyncTask = asyncTask;

    var calendar = (function () {
        function calendar(htmlContainer) {
            this.langDict = {};
            this.container = null;
            this.head = null;
            this.body = null;
            this.mask = null;
            this.pnlCurYear = null;
            this.pnlCurMonth = null;
            this.currentDate = new Date();
            this.isNeedInit = true;
            this.mutiSelect = false;
            this.selectedDate = new Date();
            this.selectedDateList = [];
            this.language = 'zh-cn';
            this.eventManager = new easyweb.eventManager();
            this.container = htmlContainer;
            this.head = $('<div class="e-calendar-head"><div class="pnlCurYear"></div><div class="pnlCurMonth"></div><div class="e-theme-bg e-navbtn btnPrevYear"></div><div class="e-theme-bg e-navbtn btnPrevMonth"></div><div class="e-theme-bg e-navbtn btnNextMonth"></div><div class="e-theme-bg e-navbtn btnNextYear"></div></div>');
            this.body = $('<div class="e-calendar-body"><table><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table></div>');
            this.mask = $('<div class="e-calendar-body"></div>').hide();
            this.pnlCurYear = this.head.find('.pnlCurYear');
            this.pnlCurMonth = this.head.find('.pnlCurMonth');

            this.container.empty().addClass('e-unselect');
            this.container.append(this.head);
            this.container.append(this.body);
            this.container.append(this.mask);

            this.bindEvent();
        }
        calendar.prototype.onDateSelected = function (handle) {
            this.eventManager.bind('onDateSelected', handle);
        };

        calendar.prototype.onDateChanged = function (handle) {
            this.eventManager.bind('onDateChanged', handle);
        };

        calendar.prototype.databind = function () {
            this.initCalendar();

            var instance = this, tableCssName = 'singlemode', today = new Date(), startYear = instance.currentDate.getFullYear(), startMonth = instance.currentDate.getMonth() + 1, weekDay = instance.currentDate.getDay(), bDayPos = 0 - weekDay, eDayPos = 6 * 7 + bDayPos;

            instance.langDict = instance.language == 'zh-cn' ? calendar.langCN : calendar.langEN;

            for (var i = 0; i < calendar.dayNameList.length; i++) {
                instance.body.find('table tr th').eq(i).text(instance.langDict[calendar.dayNameList[i]]);
            }

            for (var i = bDayPos; i < eDayPos; i++) {
                var index = i + Math.abs(bDayPos), tmpDate = instance.currentDate.addDay(i), isRestDay = (tmpDate.getDay() === 0 || tmpDate.getDay() === 6), isOtherMonth = (tmpDate.getMonth() + 1 !== startMonth), isToday = (tmpDate.format('yyyy-MM-dd') === today.format('yyyy-MM-dd')), td = instance.body.find('table tr td').eq(index);

                td.text(tmpDate.format('d')).prop('class', '');
                td.data('date', tmpDate.format('yyyy-MM-dd'));
                if (isRestDay) {
                    td.prop('class', '').addClass('restday');
                }
                if (isOtherMonth) {
                    td.prop('class', '').addClass('otherMonth');
                }
                if (isToday) {
                    td.prop('class', '').addClass('today');
                }

                if (!instance.mutiSelect) {
                    var isActive = (tmpDate.format('yyyy-MM-dd') === instance.selectedDate.format('yyyy-MM-dd'));
                    if (isActive) {
                        td.prop('class', '').addClass('active');
                    }
                } else {
                    var isActive = instance.selectedDateList.indexOf(tmpDate.format('yyyy-MM-dd')) > -1;
                    if (isActive) {
                        td.prop('class', '').addClass('active');
                    }
                }
            }

            instance.pnlCurYear.text(instance.currentDate.format('yyyy' + instance.langDict['year']));
            instance.pnlCurMonth.text(instance.langDict['mon' + startMonth]);

            instance.body.find('table').attr('class', tableCssName);
        };

        calendar.prototype.active = function () {
            this.mask.hide();
        };

        calendar.prototype.disable = function () {
            this.mask.show();
        };

        calendar.convertListToSpan = function (dateList) {
            if (dateList.length === 0)
                return [];
            if (dateList.length === 1)
                return [{ From: dateList[0], To: dateList[0] }];

            dateList.sort();
            var spanList = [], needCreateNew = false, from = dateList[0], to = dateList[0];

            for (var i = 1; i < dateList.length; i++) {
                var prev = new Date(to.replace(/-/g, "/"));
                var next = new Date(dateList[i].replace(/-/g, "/"));
                if (prev.addDay(1).format('yyyy-MM-dd') === next.format('yyyy-MM-dd')) {
                    to = next.format('yyyy-MM-dd');
                } else {
                    spanList.push({ From: from, To: to });
                    from = dateList[i], to = dateList[i];
                }

                if (i === dateList.length - 1) {
                    spanList.push({ From: from, To: to });
                }
            }

            return spanList;
        };

        calendar.convertSpanToList = function (spanList) {
            var dateList = [];
            for (var i = 0; i < spanList.length; i++) {
                var from = new Date(spanList[i].From.replace(/-/g, "/"));
                var to = new Date(spanList[i].To.replace(/-/g, "/"));

                while (from <= to) {
                    dateList.push(from.format('yyyy-MM-dd'));
                    from = from.addDay(1);
                }
            }

            return dateList;
        };

        calendar.prototype.bindEvent = function () {
            var instance = this;

            instance.head.on('click', '.e-navbtn', function (e) {
                var btn = $(this);
                if (btn.hasClass('btnPrevYear')) {
                    instance.currentDate = instance.currentDate.addYear(-1);
                } else if (btn.hasClass('btnPrevMonth')) {
                    instance.currentDate = instance.currentDate.addMonth(-1);
                } else if (btn.hasClass('btnNextMonth')) {
                    instance.currentDate = instance.currentDate.addMonth(1);
                } else if (btn.hasClass('btnNextYear')) {
                    instance.currentDate = instance.currentDate.addYear(1);
                }

                if (!instance.mutiSelect) {
                    instance.selectedDate = new Date(instance.currentDate.getFullYear(), instance.currentDate.getMonth(), instance.selectedDate.getDate());
                    instance.eventManager.trigger('onDateChanged', instance.selectedDate);
                }

                instance.databind();
            });

            instance.body.on('click', 'td', function () {
                var cell = $(this);
                if (!instance.mutiSelect) {
                    instance.selectedDate = new Date(cell.data('date').replace(/-/g, "/"));
                    instance.databind();
                    instance.eventManager.trigger('onDateSelected', instance.selectedDate);
                } else {
                    if (!cell.hasClass('active')) {
                        instance.selectedDateList.push(cell.data('date'));
                        instance.databind();
                    } else {
                        var index = instance.selectedDateList.indexOf(cell.data('date'));
                        instance.selectedDateList.splice(index, 1);
                        instance.databind();
                    }
                    instance.eventManager.trigger('onDateChanged', instance.selectedDate);
                }
            });
        };

        calendar.prototype.initCalendar = function () {
            var instance = this;

            if (!instance.isNeedInit)
                return;

            instance.isNeedInit = false;
            instance.initCurrentDate();
            //instance.initMutiSelect();
        };

        calendar.prototype.initCurrentDate = function () {
            // 重置为当月的第一天
            var instance = this;
            if (!instance.mutiSelect) {
                instance.currentDate = new Date(instance.selectedDate.getTime());
            } else {
                if (instance.selectedDateList.length > 0) {
                    instance.selectedDateList.sort();
                    instance.currentDate = new Date(instance.selectedDateList[0].toString().replace(/-/g, "/"));
                }
            }
            instance.currentDate = new Date(instance.currentDate.getFullYear() + '/' + (instance.currentDate.getMonth() + 1) + '/1');
        };

        calendar.prototype.initMutiSelect = function () {
            var instance = this;
            if (!instance.mutiSelect)
                return;

            instance.body.on('mousedown.calendar', 'td', function (e) {
                var startCell = $(this), selectBox = $('<div class="e-calendar-selectBox"></div>'), isMouseDown = true, x = startCell.offset().left + 1, y = startCell.offset().top + 1, w = startCell.width(), h = startCell.height(), maxw = instance.body.offset().left + instance.body.innerWidth(), maxh = instance.body.offset().top + instance.body.innerHeight();

                setTimeout(function () {
                    if (!isMouseDown)
                        return;

                    document.body.focus();
                    instance.body[0].onselectstart = function () {
                        return false;
                    };
                    instance.body[0].ondragstart = function () {
                        return false;
                    };

                    instance.body.find('table').attr('class', 'mutimode');
                    selectBox.css({ left: x, top: y, width: w, height: h });
                    selectBox.appendTo($('body'));

                    $(document).bind('mousemove.calendar', function (e) {
                        if (e.pageX > maxw)
                            e.pageX = maxw;
                        if (e.pageY > maxh)
                            e.pageY = maxh;

                        w = e.pageX - x;
                        h = e.pageY - y;

                        w = Math.floor((w / startCell.outerWidth())) * startCell.outerWidth() - 1;
                        h = Math.floor((h / startCell.outerHeight())) * startCell.outerHeight() - 1;

                        if (w < startCell.outerWidth())
                            w = startCell.outerWidth();
                        if (h < startCell.outerHeight())
                            h = startCell.outerHeight();

                        selectBox.css({ left: x, top: y, width: w, height: h });
                    });
                }, 300);

                $(document).bind('mouseup.calendar', function (e) {
                    isMouseDown = false;
                    $(document).unbind('.calendar');
                    selectBox.remove();
                    instance.body.find('table').attr('class', 'singlemode');
                });
            });
        };

        calendar.getDaysInMonth = function (year, month) {
            month = parseInt(month, 10) + 1;
            var temp = new Date(year + "/" + month + "/0");
            return temp.getDate();
        };

        calendar.dayNameList = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

        calendar.langEN = {
            year: '',
            month: '',
            su: 'Su',
            mo: 'Mo',
            tu: 'Tu',
            we: 'We',
            th: 'Th',
            fr: 'Fr',
            sa: 'Sa',
            mon1: 'January',
            mon2: 'February',
            mon3: 'March',
            mon4: 'April',
            mon5: 'May',
            mon6: 'June',
            mon7: 'July',
            mon8: 'August',
            mon9: 'September',
            mon10: 'October',
            mon11: 'November',
            mon12: 'December'
        };

        calendar.langCN = {
            year: '年',
            month: '月',
            su: '日',
            mo: '一',
            tu: '二',
            we: '三',
            th: '四',
            fr: '五',
            sa: '六',
            mon1: '01月',
            mon2: '02月',
            mon3: '03月',
            mon4: '04月',
            mon5: '05月',
            mon6: '06月',
            mon7: '07月',
            mon8: '08月',
            mon9: '09月',
            mon10: '10月',
            mon11: '11月',
            mon12: '12月'
        };
        return calendar;
    })();
    easyweb.calendar = calendar;

    var datePicker = (function () {
        function datePicker(htmlTextBox) {
            this.isShow = false;
            this.datemat = '';
            this.doc = null;
            this.textBox = null;
            this.calendarBox = null;
            this.calendar = null;
            var instance = this;
            instance.doc = $(document);
            instance.textBox = htmlTextBox;
            instance.textBox.unbind('.datePicker');
            instance.textBox.on('focus.datePicker', function () {
                instance.show();
            });
            instance.textBox.on('keydown.datePicker', function (e) {
                if (event.keyCode == 9 || event.keyCode == 13) {
                    if (instance.isShow)
                        instance.hide();
                    else
                        instance.show();
                }
            });
        }
        datePicker.prototype.show = function (dateFormat) {
            if (this.isShow)
                return;

            var instance = this, posX = instance.textBox.offset().left, posY = instance.textBox.offset().top + instance.textBox.outerHeight() + 1, width = instance.textBox.outerWidth(), dateStr = instance.textBox.val().replace(/-/g, "/"), currentDate = easyweb.validate.isDate(dateStr, true) ? new Date(dateStr) : new Date();

            instance.calendarBox = $('<div class="e-datePicker e-calendar"></div>');
            instance.calendarBox.css({ left: posX, top: posY, width: width });

            instance.calendar = new easyweb.calendar(instance.calendarBox);
            instance.calendar.selectedDate = currentDate;

            instance.calendar.onDateSelected(function (date) {
                if(instance.datemat == "" || !instance.datemat){
                    instance.textBox.val(instance.calendar.selectedDate.format('yyyy-MM-dd'));
                }else{
                    instance.textBox.val(instance.calendar.selectedDate.format(instance.datemat));
                }
                
                instance.hide();
            });

            instance.doc.on('mousedown.datepicker', function () {
                instance.hide();
            });

            instance.textBox.on('mousedown.datepicker', function (e) {
                e.stopPropagation();
            });

            instance.calendar.databind();

            instance.calendarBox.appendTo($('body'));
            instance.calendarBox.show();
            instance.isShow = true;

            instance.calendarBox.on('mousedown.datepicker', function (e) {
                e.stopPropagation();
            });
        };

        datePicker.prototype.hide = function () {
            if (!this.isShow)
                return;
            this.calendarBox.remove();
            this.isShow = false;

            this.doc.off('.datepicker');
            this.textBox.off('.datepicker');
            this.calendarBox.off('.datepicker');
        };
        return datePicker;
    })();
    easyweb.datePicker = datePicker;

    var dialog = (function () {
        function dialog() {
            this.title = appDomain.language == 'zh-cn' ? '系统提示' : 'System Info';
            this.buttons = [];
            this.topMost = true;
            this.showModal = true;
            this.animateSpeed = 50;
            this.eventManager = new easyweb.eventManager();
        }
        dialog.prototype.show = function () {
            this.initControl();
            this.createDialogMask();
            this.createDialogControl();
            this.showInCenter();
        };

        dialog.prototype.close = function (speed) {
            var instance = this;
            if (speed === undefined)
                speed = instance.animateSpeed;
            instance.dialog.fadeOut(speed, function () {
                instance.dialog.remove();
            });
            instance.dialogMask.fadeOut(speed, function () {
                instance.dialogMask.remove();
            });
            instance.eventManager.trigger('onClose', null);
        };

        dialog.prototype.find = function (selector) {
            return this.dialog.find(selector);
        };

        dialog.prototype.setTitle = function (title) {
            this.dialog.find('.e-dialog-title').text(title);
        };

        dialog.prototype.onShow = function (handle) {
            this.eventManager.bind('onShow', handle);
        };

        dialog.prototype.onClose = function (handle) {
            this.eventManager.bind('onClose', handle);
        };

        dialog.prototype.bind = function (eventName, handle) {
            this.eventManager.bind(eventName, handle);
        };

        dialog.prototype.unbind = function (eventName) {
            this.eventManager.unbind(eventName);
        };

        dialog.prototype.initControl = function () {
            this.win = this.topMost ? $(window.top) : $(window);
            this.body = this.topMost ? $(window.top.document.body) : $(document.body);

            this.dialog = $('<table class="e-dialog e-unselect"><tr class="e-dialog-t"><td class="e-theme-bg e-dialog-t-l"></td><td class="e-theme-bg e-dialog-t-m"><div class="e-theme-bg e-dialog-icon"></div><div class="e-dialog-title"></div><div class="e-theme-bg e-dialog-btnClose"></div></td><td class="e-theme-bg e-dialog-t-r"></td></tr><tr class="e-dialog-m"><td class="e-theme-bg e-dialog-m-l"></td><td class="e-dialog-m-m"><div class="e-dialog-content"></div><div class="e-theme-bg e-dialog-btnbar"></div></td><td class="e-theme-bg e-dialog-m-r"></td></tr><tr class="e-dialog-b"><td class="e-theme-bg e-dialog-b-l"></td><td class="e-theme-bg e-dialog-b-m"></td><td class="e-theme-bg e-dialog-b-r"></td></tr></table>');
            this.dialogMask = $('<div class="e-controlMask"></div>');
        };

        dialog.prototype.createDialogMask = function () {
            if (!this.showModal)
                return;
            this.dialogMask.css('opacity', this.body.find('.e-controlMask').length === 0 ? '0.4' : '0.2');
            this.dialogMask.bind('contextmenu', function () {
                return false;
            });
            this.body.append(this.dialogMask);
            this.dialogMask.show();
        };

        dialog.prototype.createDialogControl = function () {
            var instance = this;

            if (typeof this.control === 'string') {
                var url = this.control, tmpBox = $('<div></div>');

                url += (window.app != undefined) ? '?ver=' + window.app.settings.version : '?ver=' + new Date().format('yyyyMMddhhmmssS');
                url += ' .dialog';

                $.ajaxSettings.async = false;
                this.control = tmpBox.load(url).children();
                $.ajaxSettings.async = true;
            }

            if (this.control == undefined || this.control instanceof jQuery == false)
                this.control = $('<div></div>');

            this.dialog.find('.e-dialog-title').text(this.title);
            this.dialog.find('.e-dialog-content').append(instance.control);

            this.body.append(this.dialog);

            this.dialog.find('.e-dialog-btnClose').click(function () {
                instance.close();
            });
            this.dialog.bind("contextmenu", function () {
                return false;
            });
            if (instance.buttons.length == 0) {
                this.dialog.find('.e-dialog-btnbar').hide();
            } else {
                for (var i = 0; i < instance.buttons.length; i++) {
                    var btn = $('<input type="button" class="e-theme-bg e-btn" value="' + instance.buttons[i].text + '" />').attr('data-index', i).appendTo(this.dialog.find('.e-dialog-btnbar'));
                    if (!$.isFunction(instance.buttons[i].click))
                        btn.bind('click', function () {
                            instance.close();
                        });
                    else
                        btn.bind('click', function () {
                            instance.buttons[$(this).attr('data-index')].click(instance, $(this).attr('data-index'));
                        });
                }
            }

            this.dragManager = new easyweb.dragable(this.dialog);
            this.dragManager.handle = this.dialog.find('.e-dialog-title');
            this.dragManager.startDrag();
        };

        dialog.prototype.showInCenter = function () {
            var left = (this.win.width() - this.dialog.width()) / 2 + this.win.scrollLeft();
            var top = (this.win.height() - this.dialog.height()) / 2 + this.win.scrollTop();
            if (this.dialog.height() < 400)
                top = top - 40;
            if (this.body.find('.e-controlMask').length > 0 && this.body.find('.e-dialog-msgbox').length > 1) {
                left = left + 40;
                top = top + 40;
            }
            this.dialog.css('left', left);
            this.dialog.css('top', top);
            this.dialog.fadeIn(this.animateSpeed);
            this.dialog.find('.e-btn').eq(0).focus();
            this.eventManager.trigger('onShow', null);
        };

        dialog.message = function (icon, message, options) {
            var defaults = {
                buttons: [{ text: '确定' }], onClose: function () {
                }
            }, settings = $.extend(defaults, options), msgbox = $('<table class="e-dialog-msgbox"><tr><td style="vertical-align: top;width:70px;"><div class="e-theme-bg e-dialog-msgbox-logo"></div></td><td class="e-dialog-msgbox-msg"></td></tr></table>'), logo = msgbox.find('.e-dialog-msgbox-logo'), msg = msgbox.find('.e-dialog-msgbox-msg');

            if (options.width)
                msgbox.width(options.width);

            logo.css(icon);
            if (options.htmlMode)
                msg.html(message);
            else
                msg.text(message);

            var dialog = new easyweb.dialog();
            dialog.control = msgbox;
            dialog.title = settings['title'];
            dialog.onClose(settings['onClose']);
            dialog.buttons = settings['buttons'];
            dialog.show();
        };

        dialog.info = function (message, onClose, options) {
            easyweb.dialog.message({ 'background-position': '-100px -100px' }, message, $.extend({ title: appDomain.language == 'zh-cn' ? '系统提示' : 'System Info', onClose: onClose }, options));
        };

        dialog.alert = function (message, onClose, options) {
            easyweb.dialog.message({ 'background-position': '-280px -100px' }, message, $.extend({ title: appDomain.language == 'zh-cn' ? '系统警告' : 'System Warning', onClose: onClose }, options));
        };

        dialog.error = function (message, onClose, options) {
            easyweb.dialog.message({ 'background-position': '-220px -100px' }, message, $.extend({ title: appDomain.language == 'zh-cn' ? '系统错误' : 'System Error', onClose: onClose }, options));
        };

        dialog.success = function (message, onClose, options) {
            dialog.message({ 'background-position': '-340px -100px' }, message, $.extend({ title: appDomain.language == 'zh-cn' ? '操作成功' : 'Success', onClose: onClose }, options));
        };

        dialog.remove = function (message, btnDeleteClick, btnCancelClick, options) {
            dialog.message({ 'background-position': '-400px -100px' }, message, $.extend({
                title: easyweb.appDomain.language == 'zh-cn' ? '删除确认' : 'Delete',
                buttons: [{ text: appDomain.language == 'zh-cn' ? '删除' : 'Delete', click: btnDeleteClick }, { text: appDomain.language == 'zh-cn' ? '取消' : 'Cancel', click: btnCancelClick }]
            }, options));
        };

        dialog.confirm = function (message, btnYesClick, btnNoClick, options) {
            dialog.message({ 'background-position': '-160px -100px' }, message, $.extend({
                title: easyweb.appDomain.language == 'zh-cn' ? '操作确认' : 'Confirm',
                buttons: [{ text: appDomain.language == 'zh-cn' ? '确定' : 'OK', click: btnYesClick }, { text: appDomain.language == 'zh-cn' ? '取消' : 'Cancel', click: btnNoClick }]
            }, options));
        };
        return dialog;
    })();
    easyweb.dialog = dialog;

    var dragable = (function () {
        function dragable(control) {
            this.offset = { x: 0, y: 0 };
            this.x = 0;
            this.y = 0;
            this.minX = 0;
            this.minY = 0;
            this.maxX = 0;
            this.maxY = 0;
            this.onlyH = false;
            this.onlyV = false;
            this.outParent = false;
            this.cursor = 'move';
            this.dragStep = 1;
            this.control = control;
            this.eventManager = new easyweb.eventManager();
            this.uniqueId = '.easyweb_dragable_' + new Date().format("yyyyMMddhhmmssS");
        }
        dragable.prototype.startDrag = function () {
            if (easyweb.validate.isNull(this.control)) {
                console.error('dragable:没有指定所要进行拖拽的控件。');
                return;
            }

            this.initControl();
            this.initEvent();
        };

        dragable.prototype.onDrag = function (handle) {
            this.eventManager.bind('onDrag', handle);
        };

        dragable.prototype.afterDrag = function (handle) {
            this.eventManager.bind('afterDrag', handle);
        };

        dragable.prototype.bind = function (eventName, handle) {
            this.eventManager.bind(eventName, handle);
        };

        dragable.prototype.unbind = function (eventName) {
            this.eventManager.unbind(eventName);
        };

        dragable.prototype.initControl = function () {
            this.control.css('position', 'absolute');
            this.handle = this.handle == null ? this.control : this.handle;
            this.parent = this.control.parent();
            this.mousedown = 'mousedown' + this.uniqueId;
            this.mousemove = 'mousemove' + this.uniqueId;
            this.mouseup = 'mouseup' + this.uniqueId;
            this.maxX = this.parent.width() - this.control.outerWidth();
            this.maxY = this.parent.height() - this.control.outerHeight();
            this.outParent = this.parent[0].tagName != "BODY" ? this.outParent : true;
        };

        dragable.prototype.initEvent = function () {
            var instance = this;
            this.handle.bind(this.mousedown, function (e) {
                var nowPos = instance.control.position();
                instance.offset.x = e.pageX - nowPos.left;
                instance.offset.y = e.pageY - nowPos.top;
                instance.handle.css('cursor', instance.cursor);

                document.body.focus();
                document.onselectstart = function () {
                    return false;
                };
                instance.control.ondragstart = function () {
                    return false;
                };

                $(document).bind(instance.mouseup, function (e) {
                    if (instance.dragStep > 1) {
                        if (instance.x % instance.dragStep != 0)
                            instance.x = Math.round(instance.x / instance.dragStep) * instance.dragStep;
                        if (instance.y % instance.dragStep != 0)
                            instance.y = Math.round(instance.y / instance.dragStep) * instance.dragStep;

                        if (!instance.onlyV)
                            instance.control.css("left", instance.x);
                        if (!instance.onlyH)
                            instance.control.css("top", instance.y);
                    }
                    instance.handle.css('cursor', '');
                    $(document).unbind(instance.uniqueId); //取消当前对象对document中命名空间为.dragable的事件绑定。
                    document.onselectstart = null;

                    instance.eventManager.trigger('afterDrag', { x: instance.x, y: instance.y }); //触发afterDrag事件。
                });

                $(document).bind(instance.mousemove, function (e) {
                    instance.x = e.pageX - instance.offset.x;
                    instance.y = e.pageY - instance.offset.y;
                    if (!instance.outParent) {
                        if (instance.x < instance.minX)
                            instance.x = instance.minX;
                        if (instance.y < instance.minY)
                            instance.y = instance.minY;
                        if (instance.x > instance.maxX)
                            instance.x = instance.maxX;
                        if (instance.y > instance.maxY)
                            instance.y = instance.maxY;
                    }

                    if (!instance.onlyV)
                        instance.control.css("left", instance.x);
                    if (!instance.onlyH)
                        instance.control.css("top", instance.y);

                    instance.eventManager.trigger('onDrag', { x: instance.x, y: instance.y }); //触发onDrag事件。
                });
            });
        };
        return dragable;
    })();
    easyweb.dragable = dragable;

    var hint = (function () {
        function hint(_control, _selector, _content) {
            this.current = null;
            this.arrow = null;
            this.control = null;
            this.element = null;
            this.content = null;
            this.selector = null;
            this.win = $(window.top);
            this.root = $('body');
            this.needSetPostion = true;
            this.mouseoverEvent = "mouseover.hint";
            this.mouseleaveEvent = "mouseleave.hint";
            this.direction = 'esnw';
            this.padding = 10;
            this.animationTime = 200;
            this.opacity = 1;
            this.onShow = null;
            this.control = _control;
            this.content = _content;
            this.selector = _selector;
        }
        hint.prototype.show = function () {
            this.initControl();
            this.initEvent();
        };

        hint.prototype.stop = function () {
            this.control.unbind('.hint');
        };

        hint.prototype.initControl = function () {
            var instance = this;

            if (instance.direction.indexOf('n') === -1 || instance.direction.indexOf('s') === -1 || instance.direction.indexOf('e') === -1 || instance.direction.indexOf('w') === -1)
                instance.direction = "esnw";

            if (instance.selector === undefined)
                instance.selector = null;
        };

        hint.prototype.initEvent = function () {
            var instance = this;

            instance.control.on(instance.mouseoverEvent, instance.selector, function () {
                instance.element = $(this);
                instance.buildNewHint();

                if ($.isFunction(instance.onShow))
                    instance.onShow(instance.element, instance.current.find('.e-hint-panel').children());
                instance.showHint();
            });

            instance.control.on(instance.mouseleaveEvent, instance.selector, function () {
                if (instance.current != null)
                    instance.current.remove();
            });
        };

        hint.prototype.buildNewHint = function () {
            var instance = this;

            if (instance.current != null)
                instance.current.remove();

            instance.current = $('<div class="e-hint"><div class="e-hint-panel"></div><div class="e-hint-arrow"></div></div>');
            instance.current.find('.e-hint-panel').append(instance.content.clone().show());
            instance.current.css('opacity', '0');
            instance.current.appendTo(instance.root);

            instance.arrow = instance.current.find('.e-hint-arrow');
        };

        hint.prototype.showHint = function () {
            var instance = this;
            instance.needSetPostion = true;
            for (var i = 0; i < instance.direction.length; i++) {
                var direction = instance.direction[i];
                switch (direction) {
                    case 'n':
                        instance.setPostionAtNorth();
                        break;

                    case 'e':
                        instance.setPostionAtEast();
                        break;

                    case 'w':
                        instance.setPostionAtWest();
                        break;

                    case 's':
                        instance.setPostionAtSourth();
                        break;
                }
            }
        };

        hint.prototype.setPostionAtEast = function () {
            var instance = this;
            if (!instance.needSetPostion)
                return;

            var freeAreaW = instance.win.width() - (instance.element.offset().left + instance.element.outerWidth() + instance.padding);
            if (freeAreaW < instance.current.outerWidth())
                return;

            instance.arrow.attr('class', 'e-hint-arrow e-hint-arrow-e');

            var x = instance.element.offset().left + instance.element.outerWidth() + instance.padding, y = instance.element.offset().top + instance.element.outerHeight() / 2 - (instance.current.outerHeight() / 2), w = instance.current.outerWidth(), h = instance.current.outerHeight(), minY = instance.padding, maxY = instance.win.height() - h - instance.padding;

            if (y > maxY) {
                instance.arrow.css('margin-top', y - maxY);
                y = maxY;
            }

            if (y < minY) {
                instance.arrow.css('margin-top', y - minY);
                y = minY;
            }

            instance.current.css({ left: x, top: y });
            instance.current.fadeTo(instance.animationTime, instance.opacity);
            instance.needSetPostion = false;
        };

        hint.prototype.setPostionAtWest = function () {
            var instance = this;
            if (!instance.needSetPostion)
                return;

            var freeAreaW = instance.element.offset().left - instance.padding;
            if (freeAreaW < instance.current.outerWidth())
                return;

            instance.arrow.attr('class', 'e-hint-arrow e-hint-arrow-w');

            var x = instance.element.offset().left - instance.current.outerWidth() - instance.padding, y = instance.element.offset().top + instance.element.outerHeight() / 2 - (instance.current.outerHeight() / 2), w = instance.current.outerWidth(), h = instance.current.outerHeight(), minY = instance.padding, maxY = instance.win.height() - h - instance.padding;

            if (y > maxY) {
                instance.arrow.css('margin-top', y - maxY);
                y = maxY;
            }

            if (y < minY) {
                instance.arrow.css('margin-top', y - minY);
                y = minY;
            }

            instance.current.css({ left: x, top: y });
            instance.current.fadeTo(instance.animationTime, instance.opacity);
            instance.needSetPostion = false;
        };

        hint.prototype.setPostionAtNorth = function () {
            var instance = this;
            if (!instance.needSetPostion)
                return;

            var freeAreaH = instance.element.offset().top - instance.padding;
            if (freeAreaH < instance.current.outerHeight())
                return;

            instance.arrow.attr('class', 'e-hint-arrow e-hint-arrow-n');

            var x = instance.element.offset().left + instance.element.outerWidth() / 2 - (instance.current.outerWidth() / 2), y = instance.element.offset().top - instance.current.outerHeight() - instance.padding, w = instance.current.outerWidth(), h = instance.current.outerHeight(), minX = instance.padding, maxX = instance.win.width() - w - instance.padding;

            if (x > maxX) {
                instance.arrow.css('margin-left', x - maxX);
                x = maxX;
            }

            if (x < minX) {
                instance.arrow.css('margin-left', x - minX);
                x = minX;
            }

            instance.current.css({ left: x, top: y });
            instance.current.fadeTo(instance.animationTime, instance.opacity);
            instance.needSetPostion = false;
        };

        hint.prototype.setPostionAtSourth = function () {
            var instance = this;
            if (!instance.needSetPostion)
                return;

            var freeAreaH = instance.win.height() - (instance.element.offset().top + instance.element.height() + instance.padding);
            if (freeAreaH < instance.current.outerHeight())
                return;

            instance.arrow.attr('class', 'e-hint-arrow e-hint-arrow-s');

            var x = instance.element.offset().left + instance.element.outerWidth() / 2 - (instance.current.outerWidth() / 2), y = instance.element.offset().top + instance.element.outerHeight() + instance.padding, w = instance.current.outerWidth(), h = instance.current.outerHeight(), minX = instance.padding, maxX = instance.win.width() - w - instance.padding;

            if (x > maxX) {
                instance.arrow.css('margin-left', x - maxX);
                x = maxX;
            }

            if (x < minX) {
                instance.arrow.css('margin-left', x - minX);
                x = minX;
            }

            instance.current.css({ left: x, top: y });
            instance.current.fadeTo(instance.animationTime, instance.opacity);
            instance.needSetPostion = false;
        };
        return hint;
    })();
    easyweb.hint = hint;

    var eventManager = (function () {
        function eventManager() {
            this.handleList = {};
        }
        /**
        * 添加绑定事件处理方法
        * @param eventName 事件名称，如click或click.custom01，当事件名称带有后缀时，
        *                  可以选择只删除匹配的事件绑定，而不会删除其它事件的绑定。
        * @param handle 事件处理方法
        */
        eventManager.prototype.bind = function (eventName, handle) {
            if (this.handleList[eventName] instanceof Array === false) {
                this.handleList[eventName] = new Array();
            }

            if ($.isFunction(handle)) {
                this.handleList[eventName].push(handle);
            }
        };

        /**
        * 解除事件绑定处理方法
        * @param eventName 事件名称，如：
        *                  click：删除所有click事件
        *                  .custom01：删除所有后缀为custom01的事件，如mousemove.custom01,mouseleave.custom01。
        *                  click.custom01：仅删除后缀为custom01的click事件。
        */
        eventManager.prototype.unbind = function (eventName) {
            var mode = 'global', pos = eventName.indexOf('.');

            if (pos === 0)
                mode = 'filter';
            if (pos > 0)
                mode = 'single';

            var tmpEventName;

            switch (mode) {
                case 'global':
                    for (tmpEventName in this.handleList) {
                        if (tmpEventName.indexOf(eventName + '.') === 0)
                            delete this.handleList[tmpEventName];
                    }
                    break;

                case 'filter':
                    for (tmpEventName in this.handleList) {
                        if (tmpEventName.indexOf(eventName) > 0)
                            delete this.handleList[tmpEventName];
                    }
                    break;

                case 'single':
                    for (tmpEventName in this.handleList) {
                        if (tmpEventName === eventName)
                            delete this.handleList[tmpEventName];
                    }
                    break;
            }
        };

        /**
        * 触发事件处理方法
        * @param eventName 事件名称，如click,mousemove
        * @param params 事件处理方法所需的自定义参数。
        */
        eventManager.prototype.trigger = function (eventName, params) {
            var tmpEventName;
            for (tmpEventName in this.handleList) {
                if (tmpEventName === eventName || tmpEventName.indexOf(eventName + '.') === 0) {
                    for (var i = 0; i < this.handleList[tmpEventName].length; i++) {
                        this.handleList[tmpEventName][i](params);
                    }
                }
            }
        };
        return eventManager;
    })();
    easyweb.eventManager = eventManager;

    var server = (function () {
        function server() {
        }
        server.load = function (url, parms, callback, callback2) {
            var waitmsg = appDomain.language == 'zh-cn' ? '正在载入，请稍候' : 'Now loading, Please wait...';
            return server.run(url, parms, waitmsg, function (serviceMethodResult) {
                if (server.isSuccess(serviceMethodResult))
                    if ($.isFunction(callback))
                        callback(serviceMethodResult.ContextData);
                        
                        // 新增回调函数 取到所有数据
                    if ($.isFunction(callback2))
                        callback2(serviceMethodResult)
            });
        };

        server.save = function (url, parms, callback) {
            var waitmsg = appDomain.language == 'zh-cn' ? '正在保存，请稍候' : 'Now saving, Please wait...';
            return server.run(url, parms, waitmsg, function (serviceMethodResult) {
                if (server.isSuccess(serviceMethodResult))
                    if ($.isFunction(callback))
                        callback(serviceMethodResult.ContextData);
            });
        };

        server.remove = function (url, parms, callback) {
            var waitmsg = appDomain.language == 'zh-cn' ? '正在删除，请稍候' : 'Now removing, Please wait...';
            return server.run(url, parms, waitmsg, function (serviceMethodResult) {
                if (server.isSuccess(serviceMethodResult))
                    if ($.isFunction(callback))
                        callback(serviceMethodResult.ContextData);
            });
        };

        server.slient = function (url, parms, callback) {
            var waitmsg = null;
            return server.run(url, parms, waitmsg, function (apiResult) {
                if (validate.isJson(apiResult) && apiResult.Status == 'SUCCESS') {
                    if ($.isFunction(callback))
                        callback(apiResult.ContextData);
                }
            });
        };

        server.run = function (url, parms, waitmsg, callback) {
            var dtd = $.Deferred(), delayShowTime = 350, isNeedTip = waitmsg == null ? false : true, tip = {
                close: function () {
                }
            }, hideTip = function () {
                isNeedTip = false;
                server.isTipOnShow = false;
                setTimeout(function () {
                    tip.close();
                }, delayShowTime + 200);
            };

            setTimeout(function () {
                if (isNeedTip) {
                    if (!server.isTipOnShow) {
                        tip = easyweb.tipbox.waiting(waitmsg);
                        server.isTipOnShow = true;
                    }
                }
            }, delayShowTime);

            $.ajax({
                type: "post",
                async: true,
                dataType: "json",
                url: url,
                data: parms,
                success: function (apiResult) {
                    hideTip();
                    if (apiResult.Status == "SUCCESS") {
                        dtd.resolve(apiResult.ContextData);
                    } else {
                        dtd.reject(apiResult.Message);
                    }
                    if ($.isFunction(callback))
                        callback(apiResult);
                },
                error: function (httpRequest, textStatus, errorThrown) {
                    if (!isNeedTip)
                        return;
                    hideTip();
                    var apiResult = {};
                    apiResult.Status = "ERROR";
                    console.info(httpRequest.status);
                    if (httpRequest.status == "404") {
                        apiResult.Message = appDomain.language == "zh-cn" ? '所要访问的远程服务不存在。远程服务地址：' + url : 'The remote address does not exist.Remote address:' + url;
                    } else {
                        apiResult.Message = appDomain.language == "zh-cn" ? '服务器内部发生错误' : 'Server Internal Error';
                        apiResult.ContextData = httpRequest.responseText;
                    }
                    server.isSuccess(apiResult);
                    dtd.reject(apiResult.Message);
                }
            });
            return dtd;
        };

        server.isSuccess = function (apiResult) {
            var instance = this;

            if (!validate.isJson(apiResult)) {
                easyweb.dialog.alert(appDomain.language == 'zh-cn' ? '服务端返回的结果不是一个有效的JSON对象。' : 'The result of server is not json format.');
                return false;
            }

            switch (apiResult.Status) {
                case 'SUCCESS':
                    return true;

                case 'WARN':
                    easyweb.dialog.alert(apiResult.Message);
                    return false;

                case 'ERROR':
                    easyweb.dialog.error(apiResult.Message);
                    return false;

                case "NOTLOGIN":
                    if ($.isFunction(instance.onNotLogin))
                        instance.onNotLogin();
                    return false;
            }

            return false;
        };
        server.isTipOnShow = false;

        server.debugMode = false;

        server.onNotLogin = null;
        return server;
    })();
    easyweb.server = server;

    var tab = (function () {
        function tab(control) {
            this.tabControl = null;
            this.headContainer = null;
            this.heads = null;
            this.pageContainer = null;
            this.pages = null;
            this.activeHead = null;
            this.beforeChange = null;
            this.onChanged = null;
            if (control == null || control.length == 0) {
                console.error("必须指定一个有效的Html元素，来实例化Tab控件。");
                return;
            }

            this.tabControl = control;
            this.headContainer = control.find('.tabhead');
            this.heads = this.headContainer.children();
            this.pageContainer = control.find('.tabpage');
            this.pages = this.pageContainer.children();
            this.activeHead = this.headContainer.find('.active').eq(0);

            this.initControl();
            this.bindEvent();
            this.setActive(this.activeHead.data('tabname'));
        }
        tab.prototype.setActive = function (tabName) {
            var instance = this;
            instance.heads.each(function () {
                var head = $(this);
                if (head.data('tabname') == tabName) {
                    instance.activeHead = head;
                    instance.activeHead.addClass('active').siblings().removeClass('active');

                    if (instance.beforeChange != null) {
                        instance.beforeChange(tabName);
                    }

                    instance.pages.each(function () {
                        var page = $(this);
                        if (page.data('tabname') == tabName) {
                            page.css('visibility', 'inherit');
                            page.appendTo(instance.pageContainer); // 确保page在容器的最顶层，防止chrome显示时闪烁，或鼠标会触发其它page中控件的hover事件。
                        } else
                            page.css('visibility', 'hidden');
                    });

                    if (instance.onChanged != null) {
                        instance.onChanged(tabName);
                    }

                    return;
                }
            });
        };

        tab.prototype.initControl = function () {
            if (this.activeHead.length == 0) {
                this.activeHead = this.heads.eq(0).addClass('active');
            }

            var tabDirection = this.tabControl.data('direction');
            switch (tabDirection) {
                case "left":
                    this.headContainer.addClass('tableft');
                    this.pageContainer.addClass('tableftpage');
                    break;

                case "right":
                    this.headContainer.addClass('tabright');
                    this.pageContainer.addClass('tabrightpage');
                    break;

                case "bottom":
                    this.headContainer.addClass('tabbottom');
                    this.pageContainer.addClass('tabbottompage');
                    break;

                default:
                    this.headContainer.addClass('tabtop');
                    this.pageContainer.addClass('tabtoppage');
                    break;
            }
        };

        tab.prototype.bindEvent = function () {
            var instance = this;
            this.heads.click(function () {
                var head = $(this);
                var tabName = head.data("tabname");

                if (tabName === undefined)
                    return;
                if (head.hasClass('active'))
                    return;

                instance.setActive(tabName);
            });
        };
        return tab;
    })();
    easyweb.tab = tab;

    var timer = (function () {
        function timer() {
            this.isRunning = false;
            this.timerFlag = 0;
            this.interval = 1000;
            this.elapsed = null;
        }
        timer.prototype.start = function () {
            var instance = this;
            if (instance.isRunning)
                return;

            instance.isRunning = true;
            instance.timerFlag = setInterval(function () {
                if ($.isFunction(instance.elapsed))
                    instance.elapsed();
            }, instance.interval);
        };

        timer.prototype.stop = function () {
            var instance = this;
            instance.isRunning = false;
            clearInterval(instance.timerFlag);
        };

        timer.prototype.reset = function () {
            var instance = this;
            if (!instance.isRunning)
                return;
            instance.stop();
            instance.start();
        };
        return timer;
    })();
    easyweb.timer = timer;

    var tipbox = (function () {
        function tipbox() {
        }
        tipbox.waiting = function (message) {
        };
        return tipbox;
    })();
    easyweb.tipbox = tipbox;

    var uploader = (function () {
        function uploader() {
            this.fileList = [];
            this.serverDataList = [];
            this.baiduUploader = null;
            this.isHadError = false;
            this.swfFilePath = '';
            this.serverHandlePath = '';
            this.btnBrowse = null;
            this.fileQueue = null;
            this.fileMaxSize = 0;
            this.queueMaxCount = 99;
            this.multiple = true;
            this.acceptTypes = [];
            this.mimeTypes = '';
            this.beginUpload = null;
            this.afterUpload = null;
            this.swfFilePath = window.app.settings.rootPath + '/JS/lib/webuploader.swf';
            this.serverHandlePath = '/API/UploadFile/UploadFile';
        }
        uploader.prototype.init = function () {
            var instance = this;
            var uniqueId = 'easywebUpload' + new Date().getTime();

            instance.btnBrowse.addClass('e-upload-btnBrowse').attr('id', uniqueId);
            instance.fileQueue.addClass('e-upload-fileQueue');

            instance.baiduUploader = window.WebUploader.create({
                swf: instance.swfFilePath,
                server: instance.serverHandlePath,
                pick: { id: '#' + uniqueId, multiple: instance.multiple },
                accept: { mimeTypes: instance.mimeTypes },
                resize: false,
                compress: false
            });

            instance.baiduUploader.on('beforeFileQueued', function (file) {
                if (instance.isHadError)
                    return false;

                if (instance.acceptTypes.length > 0 && instance.acceptTypes.indexOf(file.ext) == -1) {
                    instance.isHadError = true;
                    easyweb.dialog.alert('所选择的文件格式错误，支持的文件格式为：' + instance.acceptTypes.join(',') + '。', function () {
                        instance.isHadError = false;
                    });
                    return false;
                }

                if (instance.queueMaxCount == 1) {
                    instance.reset();
                } else {
                    if (instance.fileList.length >= instance.queueMaxCount) {
                        easyweb.dialog.alert('一次最多可以上传' + instance.queueMaxCount + '个文件，请您先移除多余的文件。');
                        return false;
                    }
                }
            });

            instance.baiduUploader.on('fileQueued', function (file) {
                instance.fileList.push(file);
                instance.bindFileList();
            });

            instance.baiduUploader.on('uploadProgress', function (file, percentage) {
                instance.fileQueue.find('.bar' + file.id).css({ 'width': percentage * 100 + '%' });
            });

            instance.baiduUploader.on('uploadAccept', function (fileObj, serverData) {
                instance.serverDataList.push(serverData);
            });

            instance.baiduUploader.on('uploadFinished', function () {
                if ($.isFunction(instance.afterUpload))
                    instance.afterUpload(instance.serverDataList);
            });

            instance.fileQueue.on('click', '.btnCancel', function () {
                var item = $(this).parent().fadeOut(200, function () {
                    instance.bindFileList();
                }), index = item.index(), file = instance.fileList[index];

                instance.baiduUploader.removeFile(file.id, true);
                instance.fileList.splice(index, 1);
            });
        };

        uploader.prototype.upload = function () {
            var instance = this;
            if (instance.fileList.length == 0) {
                easyweb.dialog.alert('请您先选择所要上传的文件。');
                return;
            }

            instance.serverDataList = [];
            instance.baiduUploader.upload();

            if ($.isFunction(instance.beginUpload))
                instance.beginUpload(instance.fileList);
        };

        uploader.prototype.reset = function () {
            var instance = this;
            for (var i = 0; i < instance.fileList.length; i++) {
                var file = instance.fileList[i];
                instance.baiduUploader.removeFile(file.id, true);
            }
            instance.fileList = [];
            instance.fileQueue.empty();
        };

        uploader.prototype.bindFileList = function () {
            var instance = this;
            instance.fileQueue.empty();
            for (var i = 0; i < instance.fileList.length; i++) {
                var file = instance.fileList[i], newItem = '';

                newItem += '<div class="fileItem">';
                newItem += '<div class="fileInfo">' + file.name + '(' + utility.bytesToSize(file.size) + ')</div>';
                newItem += '<div class="btnCancel"></div>';
                newItem += '<div class="progress"><div class="bar bar' + file.id + '"></div></div>';
                newItem += '</div>';
                instance.fileQueue.append(newItem);
            }
        };
        return uploader;
    })();
    easyweb.uploader = uploader;

    var url = (function () {
        function url() {
        }
        /**
        * 获取一个url请求所包含的参数信息，如：http://localhost:8089/userInfo.ashx?id=1&ver=1.0 ，将返回{id:"1",ver:"1.0"}。
        * @param url url地址
        */
        url.getUrlParms = function (url) {
            if (url == undefined)
                url = window.location.href;

            var parms = {}, bPos = url.indexOf('?'), ePos = url.indexOf('#');

            if (bPos === -1)
                return parms;
            if (ePos === -1)
                ePos = url.length;

            var parmStr = url.substring(bPos + 1, ePos), parmList = parmStr.split('&');

            for (var i = 0; i < parmList.length; i++) {
                var parmInfo = parmList[i].split('=');
                if (parmInfo.length == 2) {
                    parms[parmInfo[0]] = parmInfo[1];
                }
            }
            return parms;
        };

        url.getUrlPath = function () {
            var location = window.top.location;

            return location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '') + location.pathname;
        };

        url.getNoAnchorUrl = function () {
            var url = window.location.href;
            var bPos = url.indexOf('#');
            if (bPos > -1)
                url = url.substring(0, bPos);
            return url;
        };
        return url;
    })();
    easyweb.url = url;

    var utility = (function () {
        function utility() {
        }
        utility.htmlEncode = function (html) {
            return $('<div></div>').text(html).html();
        };

        utility.htmlDecode = function (html) {
            return $('<div></div>').html(html).text();
        };

        utility.clone = function (object) {
            return JSON.parse(JSON.stringify(object));
        };

        utility.isSupportFlash = function () {
            var support;
            var userAgent = navigator.userAgent.toLowerCase();
            var msie = /msie/.test(userAgent) && !/opera/.test(userAgent);
            if (msie) {
                try {
                    support = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                } catch (error) {
                }
            } else {
                support = navigator.plugins["Shockwave Flash"];
            }
            return (support) !== undefined;
        };

        utility.getTimeSpan = function (startTime, endTime, diffType) {
            startTime = startTime.replace(/\-/g, "/");
            endTime = endTime.replace(/\-/g, "/");

            //将计算间隔类性字符转换为小写
            diffType = (diffType) ? diffType.toLowerCase() : 'day';
            var sTime = new Date(startTime);
            var eTime = new Date(endTime);

            //作为除数的数字
            var divNum = 1;
            switch (diffType) {
                case "second":
                    divNum = 1000;
                    break;
                case "minute":
                    divNum = 1000 * 60;
                    break;
                case "hour":
                    divNum = 1000 * 3600;
                    break;
                case "day":
                    divNum = 1000 * 3600 * 24;
                    break;
                default:
                    divNum = 1000 * 3600 * 24;
                    break;
            }
            return Math.ceil((eTime.getTime() - sTime.getTime()) / divNum);
        };

        utility.bytesToSize = function (bytes) {
            if (bytes === 0)
                return '0B';
            var k = 1024, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        };
        return utility;
    })();
    easyweb.utility = utility;

    var validate = (function () {
        function validate() {
        }
        validate.isNotNull = function (str) {
            return validate.isNull(str) ? false : true;
        };

        validate.isNull = function (obj) {
            return obj == undefined || obj == null || obj == '';
        };

        validate.isJson = function (obj) {
            var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            return isjson;
        };

        validate.isInt = function (str) {
            var exp = /^[-]{0,1}[0-9]*$/;
            return exp.test(str);
        };

        validate.isUint = function (str) {
            var exp = /^\+?[1-9][0-9]*$/;
            return exp.test(str);
        };

        validate.isFloat = function (str) {
            if (validate.isNull(str)) {
                //return false;
                return true;
            }
            var n = parseFloat(str);
            return !isNaN(n);
        };

        validate.isMoney = function (str) {
            if (str == 'free')
                return true;
            var tmp = str.replaceAll(',', ''), exp = /^[-]{0,1}[0-9]*[.]{0,1}[0-9]{0,25}$/;
            return exp.test(tmp);
        };

        validate.isMobile = function (str) {
            //var patrn = /^1[3|4|5|7|8][0-9]\d{8}$/;

            if (!str) return true;

            var phone = /^1[3|4|5|7|8][0-9]\d{8}$/;
            var mobile = /([0-9]{3,4}-)?[0-9]{7,8}/;

            return phone.test(str) || mobile.test(str);
        };

        validate.isBasicChar = function (str) {
            var patrn = /^[A-Za-z\u4e00-\u9fa5]+$/;
            return patrn.test(str);
        };

        validate.isDate = function (str, allowNull) {
            if (easyweb.validate.isNull(str) && allowNull != true)
                return true;
            var tmpDate = new Date(str.replace(/-/g, "/"));
            return tmpDate.format('yyyy-MM-dd') !== "NaN-aN-aN";
        };

        validate.isTime = function (str) {
            var result = str.match(/^(\d{1,2})(:)(\d{1,2})\2(\d{1,2})$/);

            if (result == null)
                return false;

            var currentDate = new Date();
            var d = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), parseInt(result[1]), parseInt(result[3]), parseInt(result[4]));
            return (d.getHours() == parseInt(result[1]) && d.getMinutes() == parseInt(result[3]) && d.getSeconds() == parseInt(result[4]));
        };

        validate.isMaxLen = function (str, lenStr) {
            var maxLen = lenStr.indexOf('(') > -1 ? parseInt(lenStr.substring(1, lenStr.length - 1)) : parseInt(lenStr);
            return str.length <= maxLen;
        };

        validate.isMinLen = function (str, lenStr) {
            var minLen = lenStr.indexOf('(') > -1 ? parseInt(lenStr.substring(1, lenStr.length - 1)) : parseInt(lenStr);
            return str.length >= minLen;
        };

        validate.isLen = function (str, lenStr) {
            var len = lenStr.indexOf('(') > -1 ? parseInt(lenStr.substring(1, lenStr.length - 1)) : parseInt(lenStr);
            return str.length == len;
        };

        validate.isBetween = function (numStr, parmStr) {
            var num = parseFloat(numStr);
            var parm = parmStr.substring(1, parmStr.length - 1);
            var min = parseFloat(parm.split('-')[0]);
            var max = parseFloat(parm.split('-')[1]);
            return num >= min && num <= max;
        };

        validate.isGreaterThan = function (numStr, minStr) {
            if (numStr == "")
                return true;

            var num = parseFloat(numStr);
            var minNum = parseFloat(minStr.substring(1, minStr.length - 1));
            return num >= minNum;
        };

        validate.isEmail = function (str) {
            var reg = /^[A-Za-z0-9d]+([-_.][A-Za-z0-9d]+)*@([A-Za-z0-9d]+[-.])+[A-Za-zd]{2,5}$/;
            return reg.test(str);
        };

        validate.isURL = function (str) {
            if (str === 'http://' || str === 'https://')
                return false;
            // return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-:]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)(:[0-9]{1,4})?$/g);
            return !!str.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/g);
        };

        validate.isInArray = function (str, parmStr) {
            var parm = parmStr.substring(1, parmStr.length - 1);
            var array = parm.split('|');
            return array.indexOf(str) > -1;
        };

        validate.isDeferred = function (dtd) {
            if (validate.isNull(dtd))
                return false;
            return $.isFunction(dtd.done);
        };

        validate.getNotNullMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”不能为空，请您重新输入。' : '"' + memberName + '" is required, Please input again.';
        };

        validate.getIntMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”必需为一个整数，请您重新输入。' : '"' + memberName + '" must be a integer, Please input again.';
        };

        validate.getUintMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”必需为一个正整数，请您重新输入。' : '"' + memberName + '" must be a positive integer, Please input again.';
        };

        validate.getFloatMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”必需为一个数值，请您重新输入。' : '"' + memberName + '" must be a number, Please input again.';
        };

        validate.getMoneyMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”不是一个有效的货币格式，请您重新输入。' : '"' + memberName + '" must be a number, Please input again.';
        };

        validate.getBasicCharMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”只能由中英文字符组成，请您重新输入。' : '"' + memberName + '" must be simple char, Please input again.';
        };

        validate.getMobileMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”格式错误，请您重新输入。' : '"' + memberName + '" format error, Please input again.';
        };

        validate.getDateMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”日期格式错误，正确的格式为：2016-10-01，请您重新输入。' : '"' + memberName + '" date format wrong, the corect format is:yyyy-mm-dd, Please input again.';
        };

        validate.getTimeMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”时间格式错误，正确的格式为：08:30，请您重新输入。' : '"' + memberName + '" date format wrong, the corect format is:yyyy-mm-dd, Please input again.';
        };

        validate.getEmailMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”不是一个有效的邮件地址，请您重新输入。' : '"' + memberName + '" is not a valid email address, Please input again.';
        };

        validate.getURLMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”不是一个有效的URL地址，请您重新输入' : '"' + memberName + '" must be a valid url, Please input again.';
        };

        validate.getMaxLenMsg = function (memberName, lenStr) {
            var maxLen = lenStr.indexOf('(') > -1 ? parseInt(lenStr.substring(1, lenStr.length - 1)) : parseInt(lenStr);
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”长度不能大于' + maxLen + '字符，请您重新输入。' : '"' + memberName + '" can\'t more than ' + maxLen + ' character, Please input again.';
        };

        validate.getMinLenMsg = function (memberName, lenStr) {
            var minLen = lenStr.indexOf('(') > -1 ? parseInt(lenStr.substring(1, lenStr.length - 1)) : parseInt(lenStr);
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”长度不能少于' + minLen + '个字符，请您重新输入。' : '"' + memberName + '" can\'t less than ' + minLen + ' character, Please input again.';
        };

        validate.getLenMsg = function (memberName, lenStr) {
            var len = lenStr.indexOf('(') > -1 ? parseInt(lenStr.substring(1, lenStr.length - 1)) : parseInt(lenStr);
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”字符长度必需为' + len + '字符，请您重新输入。' : '"' + memberName + '" must equal to ' + len + ', Please input again.';
        };

        validate.getGreaterThanMsg = function (memberName, minStr) {
            var minNum = minStr.indexOf('(') > -1 ? parseInt(minStr.substring(1, minStr.length - 1)) : parseInt(minStr);
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”必需大于等于 ' + minNum + ' ，请您重新输入。' : '"' + memberName + '" must be a number greater than or equal to ' + minNum + ', Please input again.';
        };

        validate.getBetweenMsg = function (memberName, parmStr) {
            var parm = parmStr.substring(1, parmStr.length - 1);
            var min = parseFloat(parm.split('-')[0]);
            var max = parseFloat(parm.split('-')[1]);
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”必需介于 ' + min + ' 和 ' + max + ' 之间，请您重新输入。' : '"' + memberName + '" must be a number between ' + min + ' to ' + max + ', Please input again.';
        };

        validate.getInArrayMsg = function (memberName) {
            return (easyweb.appDomain.language === "zh-cn") ? '“' + memberName + '”超出了规定的范围，请您重新输入。' : '"' + memberName + '" must out of the range, Please input again.';
        };
        return validate;
    })();
    easyweb.validate = validate;

    var baseGrid = (function () {
        function baseGrid() {
        }
        baseGrid.prototype.draw = function () {
            console.info("draw");
        };
        return baseGrid;
    })();
    easyweb.baseGrid = baseGrid;

    var editGrid = (function (_super) {
        __extends(editGrid, _super);
        function editGrid() {
            _super.apply(this, arguments);
        }
        editGrid.prototype.render = function () {
            console.info("render");
        };
        return editGrid;
    })(baseGrid);
    easyweb.editGrid = editGrid;

    // 通过地址下载文件，并重命名
    var download = function (path, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        //var blob = new Blob([content]);
        //eleLink.href = URL.createObjectURL(blob);
        eleLink.target = "_blank";
        eleLink.href = path;
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    };
    easyweb.download = download;

})(easyweb || (easyweb = {}));

var appMain;
(function (appMain) {
    //在页面载入完成后，运行App入口Javascript脚本
    window.onload = function () {
        easyweb.appDomain.startMain();
    };
})(appMain || (appMain = {}));
/// <reference path='~/JS/vsdoc/jquery.vsdoc.js' />


/*
* Name     : Arvato Web 快速开发框架
* Version  : 1.0.0(12/19/2013)
* Author   : BudStudio 程瀚
* Site     : http://www.arvato.com.cn/easyweb/ 
*/
(function () {
    easyweb.language = "cn"; // CN 、 EN


    // 根据模板绑定并获取Html
    easyweb.getHtmlByTemplate = function (tmplateHtml, obj, htmlMode, prePer) {
        var newHtml = tmplateHtml;
        for (var o in obj) {
            var perName = prePer == undefined ? "{" + o + "}" : "{" + prePer + "." + o + "}";
            var value = obj[o] === null ? '' : obj[o];
            var type = typeof value;

            if (type == "object") {
                var newPre = prePer == undefined ? o : prePer + "." + o;
                newHtml = easyweb.getHtmlByTemplate(newHtml, value, newPre);
            }
            else {
                if (htmlMode) {
                    newHtml = newHtml.replaceAll(perName, value);
                }
                else {
                    newHtml = newHtml.replaceAll(perName, easyweb.utility.htmlEncode(value));
                }
            }
        }
        return newHtml;
    };

    easyweb.include = function (file) {
        var files = typeof file == "string" ? [file] : file;
        for (var i = 0; i < files.length; i++) {
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + name + "'";
            if ($(tag + "[" + link + "]").length == 0) $(document).find('head').append("<" + tag + attr + link + "></" + tag + ">");
        }
    }

    easyweb.getDateDiff = function (startTime, endTime, diffType) {
        startTime = startTime.replace(/\-/g, "/");
        endTime = endTime.replace(/\-/g, "/");

        //将计算间隔类性字符转换为小写
        diffType = diffType.toLowerCase();
        var sTime = new Date(startTime);      //开始时间
        var eTime = new Date(endTime);  //结束时间
        //作为除数的数字
        var divNum = 1;
        switch (diffType) {
            case "second":
                divNum = 1000;
                break;
            case "minute":
                divNum = 1000 * 60;
                break;
            case "hour":
                divNum = 1000 * 3600;
                break;
            case "day":
                divNum = 1000 * 3600 * 24;
                break;
            default:
                break;
        }
        return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    }

    easyweb.getMoneyFormat = function (str) {
        var num = str.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        var money = (((sign) ? '' : '-') + num + '.' + cents);
        return money
    }
})();


/*
* Name     : Arvato Web DataBinder
* Version  : 1.3.0(05/08/2014)
* Author   : BudStudio 程瀚
* Site     : http://www.arvato.com.cn/easyweb/binder/ 
*/
(function () {
    easyweb.binder = {

        getProperty: function (json, name) {
            if (name.indexOf('.') > -1) {
                var pos = name.indexOf('.');
                var name1 = name.substring(0, pos);
                var name2 = name.substring(pos + 1, name.length);
                if (json[name1] != null)
                    return easyweb.binder.getProperty(json[name1], name2);
                else
                    return null;
            }
            else {
                return json[name];
            }
        },

        setProperty: function (json, name, value) {
            if (name.indexOf('.') > -1) {
                var pos = name.indexOf('.');
                var name1 = name.substring(0, pos);
                var name2 = name.substring(pos + 1, name.length);
                if (json[name1] == null || json[name1] == undefined) json[name1] = {};
                easyweb.binder.setProperty(json[name1], name2, value);
            }
            else {
                json[name] = value;
                if (json[name] === 'true') json[name] = true;
                if (json[name] === 'false') json[name] = false;
            }
        },

        bindControlToJson: function (container, defaultValue) {

            var json = defaultValue == null ? {} : JSON.parse(JSON.stringify(defaultValue));
            var dataList = [];

            container.find('input[type=text],input[type=hidden],input[type=password],textarea,select').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var value = $.trim($(this).val()) == "" ? null : $.trim($(this).val());

                    var rule = $(this).attr('data-valid');
                    if (easyweb.validate.isNotNull(rule)) {
                        var rules = rule.split(',');
                        if (rules.indexOf('Money') > -1) {
                            if (value != null) {
                                value = value.toString().replaceAll(',', '');
                            }
                        }
                    }
                    dataList.push({ Id: memberName, Value: value });
                }
            });

            // 单选框
            container.find('input[type=checkbox]').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var value = $(this).prop("checked");
                    dataList.push({ Id: memberName, Value: value });
                }
            });

            for (var n = 0; n < dataList.length; n++) {
                easyweb.binder.setProperty(json, dataList[n].Id, dataList[n].Value);
            }

            return json;
        },

        bindJsonToControl: function (container, json) {
            container.find('input[type=text],input[type=hidden],input[type=password],textarea').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var control = $(this),
                        property = easyweb.binder.getProperty(json, memberName);
                    if (property !== undefined) {
                        if (property == null) property = '';
                        else property = property.toString();
                        control.val(property);
                    }


                    var rule = control.attr('data-valid');
                    if (easyweb.validate.isNotNull(rule)) {
                        var rules = rule.split(',');
                        if (rules.indexOf('Money') > -1) {
                            initMoneyControl(control);
                        }
                        else if (rules.indexOf('Date') > -1) {
                            if (easyweb.validate.isDate(property) && easyweb.validate.isNotNull(property)) {
                                control.val(new Date(property.replace(/-/g, "/")).format('yyyy-MM-dd'));
                            }
                            initDateControl(control);
                        }
                    }

                }
            });

            // 单选框
            container.find('input[type=checkbox]').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var control = $(this),
                        property = easyweb.binder.getProperty(json, memberName);
                    control.prop("checked", property || false);
                }
            });

            container.find('select').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var property = easyweb.binder.getProperty(json, memberName);
                    if (property !== undefined) {
                        if (property == null) property = '';
                        else property = property.toString();

                        var select = $(this);
                        select.find('option').each(function () {
                            var option = $(this);
                            if (option.attr('value') == property)
                                option.prop('selected', true);
                        });
                    }
                }
            });

            container.find('span,label,li,p').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var property = easyweb.binder.getProperty(json, memberName);
                    if (easyweb.validate.isNotNull(property)) $(this).text(property);
                }

                if (easyweb.validate.isNotNull(memberName)) {
                    if (easyweb.binder.getProperty(json, memberName) != undefined) $(this).text(easyweb.binder.getProperty(json, memberName));
                }
            });

            container.find('iframe').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var body = $($(this)[0].contentWindow.document.body);
                    var property = easyweb.binder.getProperty(json, memberName);

                    if (property !== undefined) body.html(property);
                }
            });

            container.find('img').each(function () {
                var memberName = $(this).attr('data-member');
                if (easyweb.validate.isNotNull(memberName)) {
                    var property = easyweb.binder.getProperty(json, memberName);
                    if (property !== undefined) {
                        $(this).attr('src', property);
                    }
                }
            });

            function initMoneyControl(control) {
                var format = function () {
                    var money = easyweb.getMoneyFormat(control.val());
                    control.val(money);
                };
                format();
                control.unbind('blur.ControlMoney'); // 先解除相关事件绑定，防止重复绑定
                control.bind('blur.ControlMoney', function () {
                    var num = control.val().toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) {
                        easyweb.dialog.alert('“' + control.data('title') + '”不是一个有效的数字，请您重新输入。');
                        return;
                    }
                    format();
                });
            }

            function initDateControl(control) {
                new easyweb.datePicker(control);
            }
        },

        bindGridToJson: function (grids, json) {
            if (grids.dataMember != undefined) {
                var grid = grids;
                if (grid.dataMember != undefined) {
                    easyweb.binder.setProperty(json, grid.dataMember, grid.dataSource);
                }
            }
            else {
                for (var p in grids) {
                    var grid = grids[p];
                    if (grid.dataMember != undefined) {
                        easyweb.binder.setProperty(json, grid.dataMember, grid.dataSource);
                    }
                }
            }
        },

        bindJsonToGrid: function (grids, json) {
            if (grids.dataMember != undefined) {
                var grid = grids;
                if (grid.dataMember != undefined) {
                    grid.dataSource = easyweb.binder.getProperty(json, grid.dataMember);
                    grid.dataBind();
                    grid.refresh();
                }
            }
            else {
                for (var p in grids) {
                    var grid = grids[p];
                    if (grid.dataMember != undefined) {
                        grid.dataSource = easyweb.binder.getProperty(json, grid.dataMember);
                        grid.dataBind();
                        grid.refresh();
                    }
                }
            }
        },

        checkValid: function (container) {
            var dataList = [];
            container.find('input[type=text],input[type=hidden],input[type=password],textarea,select').each(function () {
                var rule = $(this).attr('data-valid');
                if (easyweb.validate.isNotNull(rule))
                    dataList.push({ Title: $(this).data('title'), Rule: rule, Value: $(this).val(),$control:$(this) });
            });
            for (var n = 0; n < dataList.length; n++) {
                var item = dataList[n];
                var rules = item.Rule.split(',');
                for (var i = 0; i < rules.length; i++) {
                    var rule = rules[i];
                    var pos = Math.max(rule.indexOf('('), rule.indexOf('['));
                    if (!easyweb.validate.isNotNull(rule)) continue;
                    // 无参数型有效性检查，如isInt,isNotNull等。
                    if (pos == -1) {
                        var func = rule[0].toUpperCase() + rule.substr(1);
                        if (!easyweb.validate['is' + func](item.Value)) {
                            var msg = easyweb.validate['get' + func + 'Msg'](item.Title);
                            easyweb.dialog.alert(msg, function () {
                                item.$control && item.$control.focus();
                            });
                            return false;
                        }
                    }
                    else {  // 有参数型有效性检查，如isBetween(100,500),isInArray["A","B","C"]。
                        var func = rule.substring(0, pos);
                        var parm = rule.substring(pos, rule.length);
                        func = func[0].toUpperCase() + func.substr(1);
                        if (!easyweb.validate['is' + func](item.Value, parm)) {
                            var msg = easyweb.validate['get' + func + 'Msg'](item.Title, parm);
                            easyweb.dialog.alert(msg, function () {
                                item.$control && item.$control.focus();
                            });
                            return false;
                        }
                    }
                }
            }
            return true;

        },

        // 下拉框   参数：'操作的元素'  '下拉框中的数据' '处理(展示)'  
        bindSelect: function (control, dataSource, options) {
            var settings = $.extend({ //$.extend 用一个和多个对象来扩展一个对象
                value: null,
                displayMember: 'Name',
                valueMember: 'Id',
                parentMember: 'ParentId',
                parentSelect: null,
                defaultMode: false,
                defaultValue: null,
                defaultName: '请选择'
                
            }, options);

            var fillData = function () {
                control.empty(); //删除匹配元素的所有子节点包括文本元素
                if (settings.defaultMode) {
                    // 向每个下拉框元素追加内容
                    control.append($('<option value="'+ settings.defaultValue +'">' + settings.defaultName + '</option>'));
                }

                if (settings.parentSelect === null) {
                    for (var i = 0; i < dataSource.length; i++) {
                        var item = dataSource[i],
                            text = item[settings.displayMember],
                            value = item[settings.valueMember],
                            option = $('<option value="' + value + '">' + easyweb.utility.htmlEncode(text) + '</option>');

                        if (settings.value != null && settings.value == value) {
                            option.prop('selected', true);
                        }
                        control.append(option);
                    }
                }
                else {
                    for (var i = 0; i < dataSource.length; i++) {
                        var item = dataSource[i],
                            text = item[settings.displayMember],
                            value = item[settings.valueMember],
                            option = $('<option value="' + value + '">' + text + '</option>');

                        if (settings.value != null && settings.value == value) {
                            option.prop('selected', true);
                        }

                        var parentId = item[settings.parentMember];
                        if (parentId == settings.parentSelect.val() || parentId == '00000000-0000-0000-0000-000000000000') {
                            control.append(option);
                        }
                    }
                    control.change();
                }
            };


            fillData();

            if (settings.parentSelect !== null) {
                settings.parentSelect.change(function () {
                    fillData();
                });
            }
        }



    };
})();






/*
* Arvato Web TipBox 
* verson: 1.0.2(05/03/2014)
* Author   : BudStudio 程瀚
* Site     : http://www.arvato.com.cn/easyweb/tipbox/ 
*/
(function () {
    easyweb.tipbox = function (options) {
        var instance = this,
            settings = $.extend({}, easyweb.tipbox.defaults, options),
            win = settings.showOnTop ? $(window.top) : $(window),
            body = settings.showOnTop ? $(window.top.document.body) : $(document.body),
            tipbox = $('<table class="e-dialog e-unselect"><tr class="e-dialog-t" style="height:8px;"><td class="e-theme-bg e-dialog-t-l"><input type="button" class="e-hide-focus"></td><td class="e-theme-bg e-dialog-t-m" style="border-bottom:1px solid #999;"></td><td class="e-theme-bg e-dialog-t-r"></td></tr><tr class="e-dialog-m"><td class="e-theme-bg e-dialog-m-l"></td><td class="e-dialog-m-m"><div class="e-dialog-content"></div></td><td class="e-theme-bg e-dialog-m-r"></td></tr><tr class="e-dialog-b"><td class="e-theme-bg e-dialog-b-l"></td><td class="e-theme-bg e-dialog-b-m"></td><td class="e-theme-bg e-dialog-b-r"></td></tr></table>'),
            content = tipbox.find('.e-dialog-content'),
            tipboxControl = null,
            parentControl = null,
            tipboxMask = null;

        this.clone = settings.clone;
        this.title = settings.title;
        this.showBox = settings.showBox;
        this.showModal = settings.showModal;
        this.control = settings.control;
        this.onShown = settings.onShown;
        this.onClose = settings.onClose;
        this.content = tipbox;


        this.show = function () {
            initControl();
            bindEvent();
            if ($.isFunction(instance.onShown)) instance.onShown(tipbox, instance.close);

        };

        this.close = function () {
            var canClose = true;
            if ($.isFunction(instance.onClose)) canClose = instance.onClose(tipbox, instance.close);
            if (canClose == undefined) canClose = true;
            if (!canClose) return;
            tipbox.fadeOut(settings.animateSpeed);
            tipboxMask.fadeOut(settings.animateSpeed);

            setTimeout(function () {
                if (parentControl.length > 0) instance.control.appendTo(parentControl);
                tipbox.remove();
                tipboxMask.remove();
            }, settings.animateSpeed);
        }

        function initControl() {
            createMask();
            createControl();
            showInCenter();
        }

        function bindEvent() {
            tipbox.bind("contextmenu", function () { return false; });
        }

        function createControl() {
            if (!instance.showBox) {
                tipbox = $('<table class="e-tipbox e-unselect"><tr class="e-dialog-m"><td class="e-tipbox-content"><input type="button" class="e-hide-focus"></td></tr></table>');
                content = tipbox.find('.e-tipbox-content');
            }
            if (instance.control == undefined) instance.control = $('<div></div>');
            tipboxControl = settings.clone ? instance.control.clone(true) : instance.control;
            parentControl = instance.control.parent();

            // 采用克隆模式时，为防止$('#id')存在重复项，先从dom中移除源Control,在tipbox关闭时重新添加至dom.
            if (settings.clone) instance.control.remove();

            tipboxControl.show().appendTo(content);

            body.append(tipbox);
        }

        function showInCenter() {
            var left = (win.width() - tipbox.width()) / 2 + win.scrollLeft();
            var top = (win.height() - tipbox.height()) / 2 + win.scrollTop() - 40;
            if (body.find('.e-controlMask').length > 0 && body.find('.e-tipbox-msgbox').length > 1) {
                left = left + 40;
                top = top + 40;
            }
            tipbox.css('left', left);
            tipbox.css('top', top);
            tipbox.fadeIn(settings.animateSpeed);
            tipbox.find('.e-hide-focus').focus();
        }

        function createMask() {
            if (!settings.showModal) return;
            tipboxMask = $('<div class="e-controlMask"></div>');
            tipboxMask.css('opacity', '0.4');
            tipboxMask.bind("contextmenu", function () { return false; });
            body.append(tipboxMask);
            tipboxMask.fadeIn(settings.animateSpeed);
        }

    }

    easyweb.tipbox.defaults = {
        showOnTop: true, //当tipbox在frame页中被创建时，是否跳至top窗口中创建及显示
        showBox: true,
        animateSpeed: 200,
        showModal: true,
        clone: false,
        control: null,
        onShown: null,
        onClose: null
    };


    easyweb.tipbox.showBox = function (iconName, message, bigSize) {
        var box = bigSize
            ? $('<div class="e-tipbox-panle" style="height:70px;width:350px;"><div class="e-tipbox-icon"></div><div class="e-tipbox-msg" style="line-height:70px;left:70px;width:250px;"></div></div>')
            : $('<div class="e-tipbox-panle"><div class="e-tipbox-icon"></div><div class="e-tipbox-msg"></div></div>'),
            icon = box.find('.e-tipbox-icon').addClass(iconName),
            msg = box.find('.e-tipbox-msg').text(message);

        var tipbox = new easyweb.tipbox();
        tipbox.control = box;
        tipbox.show();
        return tipbox;
    };

    easyweb.tipbox.waiting = function (msg) { return easyweb.tipbox.showBox('e-icon-loading', msg == null ? easyweb.language == "cn" ? '正在进行计算，请稍候…' : 'Calculating…' : msg); };
    easyweb.tipbox.uploading = function () { return easyweb.tipbox.showBox('e-icon-loading', easyweb.language == "cn" ? '正在上传，请稍候…' : 'Uploading…'); };
    easyweb.tipbox.uploadSuccess = function () { return easyweb.tipbox.showBox('e-theme-bg e-icon-success', easyweb.language == "cn" ? '所选择的文件已成功上传至服务器。' : 'The selected file has already been uploaded to server.'); };



})();



/*
* Name     : Arvato Web Gird
* Version  : 2.0.0(03/28/2014)
* Author   : BudStudio 程瀚
* Site     : http://www.arvato.com.cn/easyweb/gird/ 
*/
(function () {
    //控件对象定义
    easyweb.grid = function (table, options) {
        var htmlOptions = getTableOptions(table),
            settings = $.extend({}, easyweb.grid.defaults, htmlOptions, options),

            heads = table.find('thead'),
            leftTHead = heads.length > 1 ? heads.eq(0) : null,
            mainTHead = heads.length > 1 ? heads.eq(1) : heads.eq(0),

            gridView,
            leftView, leftHead, leftBody, leftHeadTable, leftBodyTable, leftHeadHeight,
            mainView, mainHead, mainBody, mainHeadTable, mainBodyTable, mainHeadHeight, noRecordTip,

            hasFrozenCol = false,
            leftColModels = [],
            mainColModels = [],
            leftViewWidth = 0,
            mainViewWidth = 0,

            instance = this;

        this.allowColumnResize = settings.allowColumnResize;// 是否允许可变列宽
        this.allowCellEdit = settings.allowCellEdit;        // 是否允许编辑。当allowCreateRow同时为true时，编辑不更改源数据
        this.allowCreateRow = settings.allowCreateRow;      // 是否允许创建新行。
        this.allowPaging = settings.allowPaging;            // 是否分页。为true时allowCellEdit属性失效
        this.curPage = settings.curPage;
        this.pageSize = settings.pageSize;
        this.showRowNumber = settings.showRowNumber;        // 是否显示序号列
        this.hideSelection = settings.hideSelection;        // 是否加亮显示选择的行
        this.defaultColWidth = settings.defaultColWidth;    // 默认列宽
        this.defaultRowHeight = settings.defaultRowHeight;  // 默认行高
        this.rowBackColor = settings.rowBackColor;          // 行背景色
        this.rowAlternateColor = settings.rowAlternateColor;// 间隔行颜色
        this.rowHoverColor = settings.rowHoverColor;        // 鼠标悬停在行上时的背景色
        this.rowSelectColor = settings.rowSelectColor;      // 被选择行的背景色


        this.htmlControl = gridView;                        // Grid对象在DOM上所对应的html控件
        this.serviceUrl = null;
        this.serviceParm = {};
        this.dataSource = [];                               // 数据源 - 通常为一个对象数组
        this.selectIndex = -1;                              // 当前选中行的索引
        this.selectItem = null;                             // 当前选中的对象 - 与绑定的数据源相关
        this.rowCount = 0;                                  // 当前页的行数
        this.editMode = settings.editMode;                  // 编辑模式 - false:插入模式、true:改写模式
        this.pageBar = null;
        this.autoADdNewRowWhileEdit = false;

        this.dataMember = settings.dataMember;              // 数据成员 - 用于easyweb.binder中相关对象绑定方法
        this.dataBind = bindDataSource;                     // 绑定数据源至控件
        this.clear = clearData;
        this.rebindData = bindPageData;
        this.destroy = onDestroy;                           // 销毁控件
        this.refresh = resetLayout;                         // 重置表格布局
        this.hideColumn = function (colume) {               // 隐藏指定列，column参数输入值可为列名或者列的index
            setColWidth(colume, 0)
        };
        this.setColWidth = setColWidth;                     // 设置指定列的宽度，column参数输入值可为列名或者列的index
        this.resetByColumnNames = resetByColumnNames;
        this.createNewRow = createNewRow;                   // 在选择的行前增加新行。分页模式下无效。
        this.createNewRowToBottom = createNewRowToBottom;
        this.removeRow = removeRow;                         // 删除选择的行。分页模式下无效。      
        this.setColEditable = setAllowCellEdit;             // 设置指定列可编辑
        this.scroll = scrollGrid;
        this.contextMenu = null;                        // 标题右键菜单

        this.onSelectChange = null;                         // 选择的行发生变更事件
        this.onCellEdit = null;                             // 单元格编辑时发生
        this.onCellClick = null;                            // 单元格单击事件
        this.onClick = null;                                // 行被单击事件
        this.onDbClick = null;                              // 行被双击事件
        this.onDataBinding = null;                          // 开始绑定数据时事件
        this.onDataBindFinish = null;                       // 绑定数据结束时事件
        this.onScroll = null;

        initialize();


        //========================   控件私有方法定义   ========================//
        //初始化控件
        function initialize() {
            createControl();
            resetLayout();
            bindEvent();
            setAllowCellEdit();

        }

        // 创建控件至DOM
        function createControl() {
            initRowNumberColumn();

            if (leftTHead != null) hasFrozenCol = true;


            gridView = $('<div class="e-grid"></div>');
            noRecordTip = $('<div class="noRecordTip">' + settings.noRecordMsg + '</div>').appendTo(gridView);

            if (leftTHead != null) {
                leftView = $('<div class="e-grid-left"></div>').appendTo(gridView);
                leftHead = $('<div class="e-grid-head"></div>').appendTo(leftView);
                leftBody = $('<div class="e-grid-body"></div>').appendTo(leftView);
                leftHeadTable = $('<table class="e-unselect"></table>').appendTo(leftHead);
                leftBodyTable = $('<table class="e-unselect"></table>').appendTo(leftBody);
                leftHeadTable.append(leftTHead);

                leftColModels = getColModels(leftTHead);

                createLeftColGroups();
                setLeftViewSize();

                leftHead.css('background', settings.headerBG);
                leftHeadTable.css('color', settings.headerColor);

            }

            if (mainTHead != null) {


                mainView = $('<div class="e-grid-main"></div>').appendTo(gridView);
                mainHead = $('<div class="e-grid-head"></div>').appendTo(mainView);
                mainBody = $('<div class="e-grid-body" style="overflow:auto;"></div>').appendTo(mainView);
                mainHeadTable = $('<table class="e-unselect"></table>').appendTo(mainHead);
                mainBodyTable = $('<table class="e-unselect"></table>').appendTo(mainBody);
                mainHeadTable.append(mainTHead);

                mainColModels = getColModels(mainTHead);

                createMainColGroups();
                setMainViewSize();

                mainHead.css('background', settings.headerBG);
                mainHeadTable.css('color', settings.headerColor);
            }

            if (instance.allowPaging) {
                if (leftTHead != null) leftView.css('bottom', '30px');
                if (mainTHead != null) mainView.css('bottom', '30px');
                var pageBarPanel = $('<div class="e-grid-pagebar"></div>').appendTo(gridView);
                instance.pageBar = new easyweb.pager(pageBarPanel);
                instance.pageBar.onDataBind = bindPageData;
            }


            gridView.attr('style', table.attr('style'));
            gridView.attr('class', table.attr('class'));
            gridView.addClass('e-grid');
            gridView.insertBefore(table);
            table.remove();

            instance.htmlControl = gridView;
        }

        // 重新设置表格的界面布局
        function resetLayout() {
            if (mainBodyTable.height() >= mainBody.height()) mainBody.css('right', '0px');
            else mainBody.css('right', '-2px');
            mainHeadTable.width(mainBodyTable.width());
            mainBody.scroll();
        }

        //绑定事件
        function bindEvent() {
            mainBody.scroll(function () {
                var left = mainBodyTable.position().left;
                var top = mainBodyTable.position().top;
                mainHeadTable.css('left', left);
                if (leftTHead != null) {
                    leftBodyTable.css('top', top);
                }
                if ($.isFunction(instance.onScroll)) instance.onScroll(left, top);
            });

            gridView.on('click', '.datarow', function (event) {
                var i = $(this).index();

                if (!instance.hideSelection) {
                    if (instance.selectIndex != -1) {
                        var color = instance.selectIndex % 2 == 0 ? instance.rowBackColor : instance.rowAlternateColor;
                        if (leftBodyTable != null)
                            leftBodyTable.find('.datarow').eq(instance.selectIndex).css('background', color);
                        mainBodyTable.find('.datarow').eq(instance.selectIndex).css('background', color);
                    }

                    if (leftBodyTable != null)
                        leftBodyTable.find('.datarow').eq(i).css('background', instance.rowSelectColor);
                    mainBodyTable.find('.datarow').eq(i).css('background', instance.rowSelectColor);
                }

                var oldItem = JSON.stringify(instance.selectItem);

                instance.selectIndex = i;
                instance.selectItem = instance.allowPaging ? instance.pageBar.pageList[i] : instance.dataSource[i];

                var newItem = JSON.stringify(instance.selectItem);
                var isSelectChange = oldItem != newItem;


                if (isSelectChange) {
                    if ($.isFunction(instance.onSelectChange))
                        instance.onSelectChange(instance.selectIndex, instance.selectItem);
                }

                if ($.isFunction(instance.onClick) && event.pageX !== undefined)   // 表格定义了click方法，且当前是由用户手动单击出发而不是由代码触发
                    instance.onClick(instance.selectIndex, instance.selectItem);
            });

            gridView.on('dblclick', '.datarow', function () {
                if ($.isFunction(instance.onDbClick))
                    instance.onDbClick(instance.selectIndex, instance.selectItem);
            });

            gridView.on('mousemove', '.datarow', function () {
                if (!instance.hideSelection) {
                    var i = $(this).index();
                    if (i != instance.selectIndex) {
                        if (leftBodyTable != null)
                            leftBodyTable.find('.datarow').eq(i).css('background', instance.rowHoverColor);
                        mainBodyTable.find('.datarow').eq(i).css('background', instance.rowHoverColor);
                    }
                }
            });

            gridView.on('mouseleave', '.datarow', function () {
                if (!instance.hideSelection) {
                    var i = $(this).index();
                    var color = i % 2 == 0 ? instance.rowBackColor : instance.rowAlternateColor;
                    if (i != instance.selectIndex) {
                        if (leftBodyTable != null)
                            leftBodyTable.find('.datarow').eq(i).css('background', color);
                        mainBodyTable.find('.datarow').eq(i).css('background', color);
                    }
                }
            });

            gridView.on('contextmenu', '.e-grid-main .e-grid-head th', function (event) {
                if ($.isFunction(instance.contextMenu)) {
                    var option = $(this).data("options");
                    var field = option.split(";")[0].split(":")[1];

                    return instance.contextMenu(field, $(this).text(), event);
                }
            });



            if (instance.allowColumnResize) {
                var autoColumnWidth = false;

                mainHead.on('mousedown', 'th', function (event) {
                    var columnSeperater = null;
                    var resizeCell = $(this);
                    var cellRight = resizeCell.offset().left + resizeCell.outerWidth();
                    var mainHeadTableRight = mainHeadTable.offset().left + mainHeadTable.outerWidth();

                    if (Math.abs(cellRight - event.pageX) < 5 && Math.abs(mainHeadTableRight - event.pageX) > 5) {
                        autoColumnWidth = true;

                        columnSeperater = $("<div class='columnSeperater'  style='left:" + (event.pageX - mainView.offset().left).toString() + "px'></div>");
                        columnSeperater.appendTo(mainView);
                    }

                    if (autoColumnWidth && columnSeperater != null) {
                        $(document).bind('mousemove', function (e) {
                            columnSeperater.css('left', e.pageX - mainView.offset().left);
                        });

                        $(document).bind('mouseup', function (e) {
                            var width = e.pageX - resizeCell.offset().left;

                            setColWidth(resizeCell.index(), width);

                            autoColumnWidth = false;
                            columnSeperater.remove();
                            resizeCell = null;
                            $(document).unbind('mousemove');
                            $(document).unbind('mouseup');
                        });
                    }
                });

                mainHead.on('mousemove', 'th', function (event) {
                    var cell = $(this);
                    var cellRight = cell.offset().left + cell.outerWidth();
                    var mainHeadTableRight = mainHeadTable.offset().left + mainHeadTable.outerWidth();

                    if (Math.abs(cellRight - event.pageX) < 5 && Math.abs(mainHeadTableRight - event.pageX) > 5 || autoColumnWidth) {
                        cell.css('cursor', 'e-resize');
                    }
                    else cell.css('cursor', 'default');
                });
            }


            gridView.on('contextmenu', function () { return false; });
        }

        function scrollGrid(left, top) {

            mainBodyTable.css('left', left);
            mainBodyTable.css('top', top);
            mainHeadTable.css('left', left);
            if (leftTHead != null) {
                leftBodyTable.css('top', top);
            }

        }

        //绑定数据源至表格
        function bindDataSource(callback) {

            if (instance.allowPaging) {
                instance.pageBar.curPage = instance.curPage;
                instance.pageBar.pageSize = instance.pageSize;
                instance.pageBar.serviceUrl = instance.serviceUrl;
                instance.pageBar.serviceParm = instance.serviceParm;
                instance.pageBar.dataSource = instance.dataSource;
                instance.pageBar.dataBind();
            }
            else {
                bindPageData();
            }
            instance.refresh();
        }

        function clearData() {
            if (instance.allowPaging) instance.pageBar.pageList = [];
            else instance.dataSource = [];

            bindPageData();
        }

        function bindPageData() {
            var pageData = instance.allowPaging ? instance.pageBar.pageList : instance.dataSource;
            var pageSize = instance.allowPaging ? instance.pageBar.pageSize : 0;
            var curPage = instance.allowPaging ? instance.pageBar.curPage : 1;
            var customBind = instance.onDataBinding;
            var needCustomBind = $.isFunction(customBind);
            instance.rowCount = pageData.length;
            instance.curPage = curPage;
            if (pageData.length > 0)
                noRecordTip.hide();
            else noRecordTip.show();

            if (leftTHead != null) {
                var leftRow = "";
                for (var i = 0; i < pageData.length; i++) {
                    var o = pageData[i];

                    var color = i % 2 == 0 ? instance.rowBackColor : instance.rowAlternateColor;
                    leftRow += "<tr class='datarow' style='height:" + instance.defaultRowHeight + "px;background-color:" + color + "'>";

                    for (var li = 0; li < leftColModels.length; li++) {
                        var colModel = leftColModels[li];
                        var frozenColBackcolor = hasFrozenCol ? "" : "";
                        var customCell = needCustomBind ? customBind(colModel.field, o[colModel.field], o, colModel) : false;

                        if (customCell) {
                            leftRow += customCell;
                        }
                        else {
                            if (colModel.field == settings.rowNumberField) {
                                leftRow += "<td class='rowHeader'>" + (i + 1 + pageSize * (curPage - 1)) + "</td>"
                            }
                            else {
                                leftRow += "<td class='" + colModel['class'] + "' style='text-align:" + colModel.align + frozenColBackcolor + ";'>" + getProperty(o, colModel.field) + "</td>"
                            }
                        }
                    }
                    leftRow += "</tr>";
                }
                leftBodyTable.find('.datarow').remove();
                leftBodyTable.append($(leftRow));
            }

            if (mainTHead != null) {

                var mainRow = "";
                for (var i = 0; i < pageData.length; i++) {
                    var o = pageData[i];
                    var color = i % 2 == 0 ? instance.rowBackColor : instance.rowAlternateColor;
                    mainRow += "<tr class='datarow' style='height:" + instance.defaultRowHeight + "px;background-color:" + color + "'>";
                    for (var ri = 0; ri < mainColModels.length; ri++) {
                        var colModel = mainColModels[ri];
                        var customCell = needCustomBind ? customBind(colModel.field, o[colModel.field], o, colModel) : false;
                        if (customCell) {
                            mainRow += customCell;
                        }
                        else {
                            if (colModel.field == settings.rowNumberField) {
                                mainRow += "<td class='" + colModel['class'] + "' style='text-align:" + colModel.align + ";'>" + (i + 1) + "</td>"
                            }
                            else
                                mainRow += "<td class='" + colModel['class'] + "' style='text-align:" + colModel.align + ";'>" + getProperty(o, colModel.field) + "</td>"
                        }
                    }
                    mainRow += "</tr>";
                }
                mainBodyTable.find('.datarow').remove();
                mainBodyTable.append($(mainRow));

                var newRowIndex = instance.selectIndex;
                if (instance.selectIndex === -1) newRowIndex = 0;
                if (instance.selectIndex > pageData.length - 1) newRowIndex = pageData.length - 1;

                if (newRowIndex != -1) {
                    mainBodyTable.find('.datarow').eq(newRowIndex).click();
                }
                else {
                    if (instance.selectIndex != -1) {
                        instance.selectIndex = -1;
                        instance.selectItem = null;
                        if ($.isFunction(instance.onSelectChange))
                            instance.onSelectChange(instance.selectIndex, instance.selectItem);
                    }
                }

            }
            mainBody.scroll();
            if ($.isFunction(instance.onDataBindFinish)) instance.onDataBindFinish();
            instance.refresh();
        }

        //设置列的宽度,column参数可为列的name或者index
        function setColWidth(column, newWidth) {
            var colIndex = null;

            if (typeof (column) == 'string') {
                for (var i = 0; i < mainColModels.length; i++) {
                    if (mainColModels[i].title == column) {
                        colIndex = i;
                        continue;
                    }
                }
            }
            else if (typeof (column) == 'number' && column < mainColModels.length && column >= 0) colIndex = column;

            if (colIndex != null) {
                mainHeadTable.find('col').eq(colIndex).css('width', newWidth + 'px');
                mainBodyTable.find('col').eq(colIndex).css('width', newWidth + 'px');
                resetLayout();

                resizeMainTableWidth();
                setMainViewSize();
            }
            else console.error(easyweb.language == "cn" ? '列名错误' : 'Wrong column name');
        }

        function resetByColumnNames(columnNames, columnWidths) {
            var headCols = mainHeadTable.find('col');
            var bodyCols = mainBodyTable.find('col');

            for (var i = 0; i < mainColModels.length; i++) {
                headCols.eq(i).css('width', '0px');
                bodyCols.eq(i).css('width', '0px');
            }

            for (var c = 0; c < columnNames.length; c++) {
                var column = columnNames[c];
                var width = columnWidths[c];
                for (var i = 0; i < mainColModels.length; i++) {
                    if (mainColModels[i].title == column) {
                        headCols.eq(i).css('width', width + 'px');
                        bodyCols.eq(i).css('width', width + 'px');
                        break;
                    }
                }
            }
            resetLayout();
            resizeMainTableWidth();
            setMainViewSize();
        }

        //重置mainTable的宽度
        function resizeMainTableWidth() {
            var tableWidth = 0;

            mainHeadTable.find('col').each(function () {
                tableWidth += $(this).width();
            });

            mainBodyTable.css('width', tableWidth);
            mainHeadTable.css('width', tableWidth);
        }

        //销毁控件
        function onDestroy() {
        }

        // 创建左侧表格的colGroups
        function createLeftColGroups() {
            var leftHtml = '<colgroup>';
            for (var i = 0; i < leftColModels.length; i++) {
                if (easyweb.validate.isUint(leftColModels[i].width))
                    leftHtml += '<col style="width:' + leftColModels[i].width + 'px;" />';
                else
                    leftHtml += '<col style="width:' + leftColModels[i].width + ';" />';
            }
            leftHtml += '</colgroup>';
            leftHeadTable.prepend($(leftHtml));
            leftBodyTable.prepend($(leftHtml));
        }

        // 创建右侧表格的colGroups
        function createMainColGroups() {
            var mainHtml = '<colgroup>';
            for (var i = 0; i < mainColModels.length; i++) {
                if (easyweb.validate.isUint(mainColModels[i].width))
                    mainHtml += '<col style="width:' + mainColModels[i].width + 'px;" />';
                else
                    mainHtml += '<col style="width:' + mainColModels[i].width + ';" />';
            }
            mainHtml += '</colgroup';
            mainHeadTable.prepend($(mainHtml));
            mainBodyTable.prepend($(mainHtml));
        }

        // 获取列模型
        function getColModels(headObj) {
            var cols = [];
            if (headObj == null) return cols;
            var head = headObj.clone();
            var rows = head.find('tr');
            var row = rows.eq(0);
            row.find('th').each(function () {
                var th = $(this);
                var spanCount = th.attr('colspan') == undefined ? 1 : parseInt(th.attr('colspan'));
                if (spanCount == 1) {
                    var col = getColOptions(th);
                    cols.push(col);
                }
                else {
                    var spanCols = getSpanCols(rows, 0, spanCount);
                    for (var n = 0; n < spanCols.length; n++) {
                        cols.push(spanCols[n]);
                    }
                }
            });
            return cols;
        }

        // 获取指定合并列的子列的模型
        function getSpanCols(rows, rowIndex, colspan) {
            var cols = [];
            var count = 0;
            while (count < colspan) {
                var row = rows.eq(rowIndex + 1);
                var th = row.find('th').eq(0);
                var spanCount = th.attr('colspan') == undefined ? 1 : parseInt(th.attr('colspan'));
                if (spanCount == 1) {
                    var col = getColOptions(th);
                    cols.push(col);
                    th.remove();
                    count++;
                }
                else {
                    var spanCols = getSpanCols(rows, rowIndex + 1, spanCount);
                    for (var n = 0; n < spanCols.length; n++) {
                        cols.push(spanCols[n]);
                    }
                    th.remove();
                    count += spanCount;
                }
            }
            return cols;
        }

        // 设置左侧视图的尺寸
        function setLeftViewSize() {

            leftHeadHeight = 0;

            mainTHead.find('tr').each(function () {
                leftHeadHeight += getRowHeight($(this));
            });


            leftHead.css('height', leftHeadHeight - 1 + "px");
            leftBody.css('top', leftHeadHeight + "px");

            for (var i = 0; i < leftColModels.length; i++) {
                var w = leftColModels[i].width;
                if (w.indexOf('px') > -1) {
                    w = w.substring(0, w.length - 2);
                }
                if (easyweb.validate.isUint(w)) {
                    leftViewWidth += parseInt(w);
                }
                else {
                    console.error("easyweb.grid对象左侧锁定列必须使用绝对宽度，而不允许使用百分比或auto等相对宽度。");
                }
            }

            leftView.css('width', leftViewWidth + "px");
            leftHeadTable.css('width', leftViewWidth + "px");
            leftBodyTable.css('width', leftViewWidth + "px");

        }

        // 设置右侧视图的尺寸
        function setMainViewSize() {
            mainHeadHeight = 0;
            mainTHead.find('tr').each(function () {
                mainHeadHeight += getRowHeight($(this));
            });
            mainHead.css('height', mainHeadHeight - 1 + "px");
            mainBody.css('top', mainHeadHeight + "px");
            noRecordTip.css('top', mainHeadHeight + "px");

            mainView.css('left', leftViewWidth + "px");
            for (var i = 0; i < mainColModels.length; i++) {
                var w = mainColModels[i].width;
                if (w.indexOf('px') > -1) {
                    w = w.substring(0, w.length - 2);
                }
                if (easyweb.validate.isUint(w)) {
                    mainViewWidth += parseInt(w);
                }
                else if (w.indexOf("%") > -1 || w == "*" || w == "auto") {
                    mainHeadTable.css('width', "100%");
                    mainBodyTable.css('width', "100%");
                    return;
                }
            }
            resizeMainTableWidth();
        }

        // 获取指定行的高度
        function getRowHeight(row) {

            var str = "";
            var style = row.attr('style');

            if (style != null) {
                var props = style.split(";");
                for (var n = 0; n < props.length; n++) {
                    var prop = props[n];
                    var keyValue = prop.split(":", 2);
                    if (keyValue[0] == "height" && keyValue[0] != "") {
                        str = keyValue[1].trim();
                        break;
                    }
                }
            }

            if (str.indexOf('px') == -1) return instance.defaultRowHeight;
            str = str.substring(0, str.length - 2);
            if (easyweb.validate.isUint(str) && str != "0") return parseInt(str);
            return instance.defaultRowHeight;
        }

        // 初始化序号列
        function initRowNumberColumn() {
            if (options != undefined && options.rowNumberTitle == undefined)
                settings.rowNumberTitle = easyweb.language == "cn" ? "序号" : "No"

            if (instance.showRowNumber != false) {
                if (leftTHead == null) {
                    mainHeadHeight = 0;
                    mainTHead.find('tr').each(function () {
                        mainHeadHeight += getRowHeight($(this));
                    });
                    leftTHead = $('<thead><tr style="height:' + mainHeadHeight + 'px"><th data-options="field:' + settings.rowNumberField + ';width:' + settings.rowNumberWidth + ';">' + settings.rowNumberTitle + '</th></tr></thead>');
                }
                else {
                    var rows = leftTHead.find('tr'),
                        spanStr = rows.length > 1 ? ' rowspan="' + rows.length + '" ' : ' ';
                    rows.eq(0).prepend('<th' + spanStr + 'data-options="field:' + settings.rowNumberField + ';width:' + settings.rowNumberWidth + ';">' + settings.rowNumberTitle + '</th>');
                }
            }
        }

        // 获取列的参数设置
        function getColOptions(th) {
            var col = { field: null, title: th.text(), width: 0, align: "center" };
            var str = th.data('options');
            if (str == null)
                return col;

            var props = str.split(";");
            for (var n = 0; n < props.length; n++) {
                var prop = props[n];
                var keyValue = prop.split(":", 2);
                if (keyValue[0] != null && keyValue[0] != "")
                    col[keyValue[0]] = keyValue[1];
            }
            return col;
        }

        // 获取表格的参数设置
        function getTableOptions(table) {
            var options = {};
            var str = table.data('options');
            if (str == null)
                return options;

            var props = str.split(";");
            for (var n = 0; n < props.length; n++) {
                var prop = props[n];
                var keyValue = prop.split(":", 2);
                if (keyValue[0] != null && keyValue[0] != "")
                    options[keyValue[0]] = keyValue[1];
            }
            options.showRowNumber = options.showRowNumber == "true" ? true : false;
            options.hideSelection = options.hideSelection == "true" ? true : false;
            options.allowCellEdit = options.allowCellEdit == "true" ? true : false;
            return options;
        }

        // 重置序号列
        function resetRowNumber() {
            for (var i = instance.selectIndex; i <= instance.rowCount; i++) {
                var row = leftBodyTable.find('tr').eq(i);
                var cell = row.find('td').eq(0);
                cell.text(i + 1);
            }
        }

        //设置表格可编辑
        function setAllowCellEdit(colIndex) {
            if (colIndex == undefined) {
                if (!instance.allowCellEdit)
                    return;
                if (instance.allowPaging)
                    return;
            }

            var edit = $('<input id="editor" type="text"/>');
            var cell = null;

            mainBodyTable.on('click', 'td', function () {
                if (!instance.allowCellEdit) return;
                if (colIndex != undefined && $(this).index() != colIndex) return;

                if ($(this).children("input").length > 0) return;
                resetCellEditor($(this));
                if ($.isFunction(instance.onCellClick)) {
                    var index = $(this).parent().index();
                    instance.onCellClick($(this), instance.dataSource[index]);
                }
            });

            mainBodyTable.on('keydown', 'input', function (event) {
                if (!instance.allowCellEdit) return;
                if (colIndex != undefined && $(this).index() != colIndex) return;

                if (event.shiftKey) return;
                if (event.ctrlKey) return;
                if (event.keyCode == 8 || event.keyCode == 46) return; //BackSpace,Delete

                var targetCell = [];
                switch (event.keyCode) {
                    case 37://左
                        targetCell = cell.prev();
                        if (targetCell.length > 0) {
                            resetCellEditor(targetCell);
                            event.preventDefault();
                        }
                        return;

                    case 38://上
                        targetCell = cell.parent().prev().children().eq(cell.index());
                        if (targetCell.length > 0) {
                            resetCellEditor(targetCell);
                            event.preventDefault();
                        }
                        return;

                    case 39: case 9://右
                        targetCell = cell.next();
                        if (targetCell.length > 0) {
                            resetCellEditor(targetCell);
                            event.preventDefault();
                        }
                        return;

                    case 40: case 13://下
                        targetCell = cell.parent().next().children().eq(cell.index());
                        if (targetCell.length > 0) {
                            resetCellEditor(targetCell);
                            event.preventDefault();
                        }
                        return;

                    case 45://Insert
                        if (instance.editMode) {
                            instance.editMode = false;
                            edit[0].selectionStart = 999;
                            edit[0].selectionEnd = 999;
                        }
                        else {
                            instance.editMode = true;
                            edit[0].selectionStart = 0;
                            edit[0].selectionEnd = 999;
                            edit[0].select();
                        }
                        return;
                }

                var activeCell = edit.parent();
                var value = edit.val();
                var decimalWidth = value.indexOf(".") < 0 ? 0 : value.length - value.indexOf(".") - 1;

                if (activeCell.hasClass('floatCell')) {
                    if (instance.editMode) {
                        if ((event.keyCode > 95 && event.keyCode < 106)
                            || (event.keyCode > 47 && event.keyCode < 60)
                            || (event.keyCode == 110 && value.length > 0 && value.indexOf(".") < 0)
                            || (event.keyCode == 190 && value.length > 0 && value.indexOf(".") < 0)
                            || (event.keyCode == 109 && value.length == 0)
                            || (event.keyCode == 189 && value.length == 0)
                        ) {

                        }
                        else {
                            event.preventDefault();
                        }
                    }
                    else {
                        if ((event.keyCode > 95 && event.keyCode < 106 && decimalWidth < 4)
                            || (event.keyCode > 47 && event.keyCode < 60 && decimalWidth < 4)
                            || (event.keyCode == 110 && value.length > 0 && value.indexOf(".") < 0)
                            || (event.keyCode == 190 && value.length > 0 && value.indexOf(".") < 0)
                            || (event.keyCode == 109 && value.length == 0)
                            || (event.keyCode == 189 && value.length == 0)
                        ) {

                        }
                        else {
                            event.preventDefault();
                        }
                    }
                }

                if (activeCell.hasClass('intCell')) {
                    if ((event.keyCode > 95 && event.keyCode < 106 && decimalWidth < 4)
                        || (event.keyCode > 47 && event.keyCode < 60 && decimalWidth < 4)
                        || (event.keyCode == 109 && value.length == 0)
                        || (event.keyCode == 189 && value.length == 0)
                    ) {

                    }
                    else {
                        event.preventDefault();
                    }
                }

            });

            mainBodyTable.on('keyup', 'input', function (event) {
                if (!instance.allowCellEdit) return;
                if (colIndex != undefined && $(this).index() != colIndex) return;

                var activeCell = edit.parent();
                var value = edit.val();

                if (activeCell.hasClass('intCell')) {
                    if (!easyweb.validate.isInt(value)) {
                        edit.val("");
                    }
                }

                if (activeCell.hasClass('floatCell')) {
                    if (!easyweb.validate.isFloat(value)) {
                        edit.val("");
                    }
                }

            });

            function resetCellEditor(_cell) {
                if (cell != null) {
                    cell.text(edit.val());
                }

                cell = _cell;
                edit.val(cell.text());
                edit.prop('readonly', cell.hasClass('readonly'));
                edit.css('text-align', cell.css('text-align'));
                edit.css('background-color', cell.css('background-color'));
                cell.empty();

                edit.appendTo(cell);

                // 防止IE在edit刚插入td时，无法进行全选，所以进行延时处理。
                setTimeout(function () {
                    edit.focus();
                    if (instance.editMode) {
                        edit[0].selectionStart = 0;
                        edit[0].selectionEnd = 999;
                        edit[0].select();
                    }
                    else {
                        edit[0].selectionStart = 999;
                        edit[0].selectionEnd = 999;
                    }

                    // 当edit的内容发生变更时，调用插入新行方法。
                    edit.unbind();
                    edit.bind('propertychange input', function () {
                        var curRowIndex = cell.parent().index();
                        var curColIndex = cell.index();

                        //不允许创建新行时，根据表格编辑修改数据
                        //if (!instance.allowCreateRow)
                        setProperty(instance.dataSource[curRowIndex], mainColModels[curColIndex].field, $(edit).val());

                        if (instance.autoADdNewRowWhileEdit && curRowIndex + 1 == instance.rowCount) {
                            createNewRowToBottom();
                        }

                        if ($.isFunction(instance.onCellEdit)) {
                            instance.onCellEdit();
                        }
                    });
                }, 50);
            }

        }

        //增加新行
        function createNewRow() {
            if (!instance.allowCreateRow || instance.allowPaging)
                return;

            instance.rowCount = instance.rowCount + 1;

            if (leftTHead != null) {
                var leftRowSelected = leftBodyTable.find('tr').eq(instance.selectIndex);
                var leftRow = createNewLeftRow();
                leftRowSelected.length > 0 ? $(leftRow).insertBefore(leftRowSelected) : $(leftRow).appendTo(leftBodyTable);

                if (instance.showRowNumber) resetRowNumber();
            }

            var mainRowSelected = mainBodyTable.find('tr').eq(instance.selectIndex);
            var mainRow = createNewMainRow();
            mainRowSelected.length > 0 ? $(mainRow).insertBefore(mainRowSelected) : $(mainRow).appendTo(mainBodyTable);

            resetRowBackcolor();
            resetLayout();
        }

        // 添加新行时，给绑定的数据源添加新数据
        function addNewData() {
            var newData = {};
            for (var i = 0; i < mainColModels.length; i++) {
                newData[mainColModels[i].field] = null;
            }
            instance.dataSource.push(newData);
        }

        //在表格最后增加新行
        function createNewRowToBottom() {
            if (!instance.allowCreateRow || instance.allowPaging)
                return;

            instance.rowCount = instance.rowCount + 1;

            if (leftTHead != null) {
                var leftRow = createNewLeftRow();
                leftBodyTable.append($(leftRow));

                if (instance.showRowNumber) { resetRowNumber(); }
            }

            var mainRow = createNewMainRow();
            mainBodyTable.append($(mainRow));

            addNewData();
            resetRowBackcolor();
            resetLayout();
        }

        function createNewLeftRow() {
            var leftRow = "<tr class='datarow' style='height:" + instance.defaultRowHeight + "px'>";
            for (var li = 0; li < leftColModels.length; li++) {
                var colModel = leftColModels[li];
                leftRow += colModel.field == settings.rowNumberField ? "<td class='rowHeader'></td>" : "<td style='text-align:" + colModel.align + ";'></td>";
            }
            leftRow += "</tr>";
            return leftRow;
        }

        function createNewMainRow() {
            var mainRow = "<tr class='datarow' style='height:" + instance.defaultRowHeight + "px'>";
            for (var ri = 0; ri < mainColModels.length; ri++) {
                var colModel = mainColModels[ri];
                mainRow += "<td style='text-align:" + colModel.align + ";'></td>";
            }
            return mainRow;
        }

        //删除当前行        
        function removeRow() {
            if (!instance.allowCreateRow || instance.allowPaging)
                return;

            //不允许删除最后一行
            //if (instance.selectIndex == instance.rowCount - 1 || instance.rowCount <= 0) return;

            instance.rowCount = instance.rowCount - 1;
            if (leftTHead != null) {
                var leftRowSelected = leftBodyTable.find('tr').eq(instance.selectIndex);
                leftRowSelected.remove();

                if (instance.showRowNumber) resetRowNumber();
            }

            var mainRowSelected = mainBodyTable.find('tr').eq(instance.selectIndex);
            mainRowSelected.remove();

            instance.dataSource.splice(instance.selectIndex, 1);
            resetRowBackcolor();
            resetLayout();
        }

        //重置序号列
        function resetRowNumber() {
            for (var i = instance.selectIndex; i <= instance.rowCount; i++) {
                var row = leftBodyTable.find('tr').eq(i);
                var cell = row.find('td').eq(0);
                cell.text(i + 1);
            }
        }

        // 重置每行的背景色
        function resetRowBackcolor() {
            if (instance.rowBackColor != instance.rowAlternateColor) {
                for (var i = instance.selectIndex; i <= instance.rowCount; i++) {
                    var color = i % 2 == 0 ? instance.rowBackColor : instance.rowAlternateColor;
                    if (leftTHead != null) leftBodyTable.find('tr').eq(i).css('background-color', color);
                    mainBodyTable.find('tr').eq(i).css('background-color', color);
                }
            }
        }

        // 获取一个对象指定属性的值
        function getProperty(json, name) {
            if (name == undefined) return "";
            if (name.indexOf('.') > -1) {
                var pos = name.indexOf('.');
                var name1 = name.substring(0, pos);
                var name2 = name.substring(pos + 1, name.length);
                if (json[name1] != null)
                    return getProperty(json[name1], name2);
                else
                    return null;
            }
            else {
                return getValue(json[name]);
            }
        }

        // 根据绑定类型（html/text）来获取值
        function getValue(value) {
            if (value == null || value == undefined) return "";
            if (settings.bindContent == "text") return $('<div>').text(value).html();
            return value;
        }

        //设置一个对象指定属性的值
        function setProperty(json, name, value) {
            if (name == undefined) return "";
            if (name.indexOf('.') > -1) {
                var pos = name.indexOf('.');
                var name1 = name.substring(0, pos);
                var name2 = name.substring(pos + 1, name.length);
                if (json[name1] != null)
                    return getProperty(json[name1], name2);
                else
                    return null;
            }
            else {
                json[name] = value;
            }
        }

    };

    //控件全局参数
    easyweb.grid.defaults = {
        noRecordMsg: easyweb.language == "cn" ? "系统中暂时没有相关信息。" : "No datas in project",
        rowNumberTitle: easyweb.language == "cn" ? "序号" : "No",
        rowNumberField: "AutoRowNumber",
        bindContent: "text",//text-数据源为文本格式，html-数据源为Html格式
        rowNumberWidth: 50,
        showRowNumber: true,
        hideSelection: false,
        defaultColWidth: 100,
        defaultRowHeight: 30,
        rowBackColor: "#FFFFFF",
        rowAlternateColor: "#FFFFFF",
        rowHoverColor: "#EAF2FF",
        rowSelectColor: "#DFE8F6",
        headerBG: "linear-gradient(to bottom,#F9F9F9 0,#efefef 100%)",
        headerColor: "black",
        allowCellEdit: false,
        allowCreateRow: false,
        allowPaging: false,
        editMode: false,
        curPage: 1,
        pageSize: 50
    }

})();


/*
* Name     : Arvato Web Pager
* Version  : 2.0.0(07/04/2014)
* Author   : BudStudio 程瀚
* Site     : http://www.arvato.com.cn/easyweb/pager/ 
*/

(function () {
    easyweb.pager = function (container, options) {
        var settings = $.extend({}, easyweb.pager.defaults, options),
            pager = $('<div class="e-pager e-unselect"><div class="infoPanel">每页10条，共0条</div><div class="controlPanel"><div class="e-theme-bg button btnFirst active"></div><div class="e-theme-bg button btnPrev active"></div><div class="e-theme-bg button btnNext active"></div><div class="e-theme-bg button btnLast active"></div><div class="e-theme-bg button btnJump active"></div><div class="pageBox"><input class="txtCurPage" type="text" value="1" /><label class="txtSpace">/</label><label class="txtPageCount">1</label></div></div></div>'),
            infoPanel = pager.find('.infoPanel'),
            controlPanel = pager.find('.controlPanel'),
            btnFirst = pager.find('.btnFirst'),
            btnPrev = pager.find('.btnPrev'),
            btnNext = pager.find('.btnNext'),
            btnLast = pager.find('.btnLast'),
            btnJump = pager.find('.btnJump'),
            txtCurPage = pager.find('.txtCurPage'),
            txtPageCount = pager.find('.txtPageCount'),
            instance = this;

        this.serviceUrl = null;
        this.serviceParm = {};
        this.dataSource = null;
        this.pageList = null;

        this.curPage = settings.curPage ? settings.curPage : 1;
        this.pageCount = 1;
        this.pageSize = settings.pageSize ? settings.pageSize : 20;
        this.recordCount = 0;

        this.dataBind = getPageList;
        this.onDataBind = null;

        initialize();

        // 初始化控件
        function initialize() {
            createControl();
            bindEvent();
        }

        // 创建控件至DOM
        function createControl() {
            pager.css('background-color', settings.backgroundcolor);
            pager.css('background', settings.background);
            infoPanel.css('color', settings.color);
            txtCurPage.css('color', settings.color);
            txtPageCount.css('color', settings.color);
            container.empty().append(pager);
        }

        // 绑定控件中的相关事件
        function bindEvent() {
            btnFirst.click(function () {
                instance.curPage = 1;
                getPageList();
            });

            btnPrev.click(function () {
                if (instance.curPage > 1) {
                    instance.curPage--;
                    getPageList();
                }
            });

            btnNext.click(function () {
                if (instance.curPage < instance.pageCount) {
                    instance.curPage++
                    getPageList();
                }
            });

            btnLast.click(function () {
                instance.curPage = instance.pageCount;
                getPageList();
            });

            btnJump.click(function () {
                var page = parseInt(txtCurPage.val());
                if (!easyweb.validate.isUint(page)) page = 1;
                if (page < 1) instance.curPage = 1;
                else if (page > instance.pageCount) instance.curPage = instance.pageCount;
                else instance.curPage = page;
                getPageList();
            });
        }

        // 根据当前页及页大小取得当前分页后的数据
        function getPageList() {
            var isPageByService = instance.serviceUrl != null && instance.serviceUrl != "";
            var getPageListFunc = isPageByService ? getPageListByService : getPageListByClient;
            getPageListFunc();
        }

        function getPageListByService() {
            instance.serviceParm.CurPage = instance.curPage;
            instance.serviceParm.PageSize = instance.pageSize;
            easyweb.server.load(instance.serviceUrl, instance.serviceParm, function (serverData) {
                if (!serverData.PageList) {
                    console.error('所指定的分页数据源无效。');
                    return;
                }

                instance.dataSource = serverData;
                instance.pageList = serverData.PageList;
                instance.recordCount = serverData.RecordCount;
                instance.pageCount = serverData.PageCount;
                instance.curPage = serverData.CurPage;

                //if (instance.curPage > instance.pageCount) { instance.curPage = instance.pageCount; getPageListByService(); }

                setControlStatus();
                if ($.isFunction(instance.onDataBind)) instance.onDataBind();
            });

        }

        function getPageListByClient() {

            if (instance.dataSource == null || instance.dataSource.length == 0) return;

            instance.pageList = [];
            instance.recordCount = instance.dataSource.length;
            instance.pageCount = Math.ceil(instance.recordCount / instance.pageSize);

            if (instance.curPage > instance.pageCount) instance.curPage = 1;

            var first = (instance.curPage - 1) * instance.pageSize + 1;
            var last = instance.curPage * instance.pageSize;

            for (var n = 0; n < instance.dataSource.length; n++) {
                if (n + 1 >= first && n + 1 <= last) {
                    instance.pageList.push(instance.dataSource[n]);
                }
            }

            setControlStatus();
        }

        function setControlStatus() {
            txtCurPage.val(instance.curPage);
            txtPageCount.html(instance.pageCount);
            var pSize = easyweb.language == "cn" ? '每页：' : 'Page size:';
            var pSize1 = easyweb.language == "cn" ? '条，共' : ' , ';
            var pSize2 = easyweb.language == "cn" ? '条' : 'Total record:';

            if (easyweb.language == "cn") infoPanel.html(pSize + instance.pageSize + pSize1 + instance.recordCount + pSize2);
            else infoPanel.html('Page Size:' + instance.pageSize + ' ,Total Record: ' + instance.recordCount);

            btnFirst.addClass('active').removeClass('disable');
            btnPrev.addClass('active').removeClass('disable');
            btnNext.addClass('active').removeClass('disable');
            btnLast.addClass('active').removeClass('disable');


            if (instance.curPage == 1) {
                btnFirst.addClass('disable').removeClass('active');
                btnPrev.addClass('disable').removeClass('active');
            }
            if (instance.curPage == instance.pageCount) {
                btnNext.addClass('disable').removeClass('active');
                btnLast.addClass('disable').removeClass('active');
            }
        }

    };

    easyweb.pager.defaults = {
        curPage: 1,
        color: '#3366ff',
        background: 'linear-gradient(to bottom,#F9F9F9 0,#efefef 100%)',
        backgroundcolor: '#F1F1F1'
    };
})();

/*
* Name     : Arvato Web Repeater
* Version  : 2.0.0(03/28/2014)
* Author   : BudStudio 程瀚
* Site     : http://www.arvato.com.cn/easyweb/repeater/ 
*/
(function () {
    //控件对象定义
    easyweb.repeater = function (control, options) {
        var instance = this;

        this.animate = false;        // 是否采用动画方式显示
        this.animateTime = 400;     // 动画方式时间
        this.htmlControl = control;
        this.htmlMode = true;
        this.tmplate = control.find('.e-template');
        this.dataSource = [];       // 数据源 - 通常为一个对象数组
        this.onDataBinding = null;                          // 开始绑定数据时事件
        this.onDataBindFinish = null;
        this.databind = function () {
            var tmplateHtml = $('<div></div>').append(instance.tmplate.clone()).html(),
                controlHtml = tmplateHtml.replaceAll('e-template', 'e-dataitem'),
                totalControl = [],
                otherControl = [];

            control.find('.e-dataitem').remove();
            control.children().each(function () {
                var child = $(this);
                if (!child.hasClass('e-template')) {
                    otherControl.push(child);
                    child.remove();
                }
            });

            for (var n = 0; n < instance.dataSource.length; n++) {
                var data = instance.dataSource[n];
                if ($.isFunction(instance.onDataBinding)) {
                    var html = instance.onDataBinding(controlHtml, data);
                    totalControl.push(html);
                }
                else {
                    var html = easyweb.getHtmlByTemplate(controlHtml, data, instance.htmlMode);
                    totalControl.push(html);
                }
            }

            if (!instance.animate) {
                var html = totalControl.join('');
                $(html).insertAfter(instance.tmplate);
                for (var n = 0; n < otherControl.length; n++) {
                    control.append(otherControl[n]);
                }
                if ($.isFunction(instance.onDataBindFinish)) instance.onDataBindFinish(instance.htmlControl);
            }
            else {
                for (var n = 0; n < otherControl.length; n++) {
                    totalControl.push(otherControl[n]);
                }
                var i = 0;
                var stepTime = instance.animateTime / totalControl.length
                function animateShow() {
                    if (i < totalControl.length) {
                        control.append($(totalControl[i]));
                        i++;
                        setTimeout(animateShow, stepTime);
                    }
                    else {
                        if ($.isFunction(instance.onDataBindFinish)) instance.onDataBindFinish(instance.htmlControl);
                    }
                }
                animateShow();
            }
        };


    };

})();


/*
* Name     : Arvato Web progressBar
* Version  : 1.0.0(07/16/2014)
* Author   : 程瀚
* Site     : http://www.arvato.com.cn/easyweb/progressbar/ 
*/
(function () {
    easyweb.progressBar = function (control, options) {
        var settings = $.extend({}, easyweb.progressBar.defaults, options),
            progress = $('<div class="process"></div>').appendTo(control),
            bar = $('<div class="bar"></div>').appendTo(progress),
            instance = this;

        this.length = null;                                 // 进度条的长度，可以不指定
        this.progressBarColor = settings.progressBarColor;  // 进度条的颜色 
        this.showPercentage = settings.showPercentage;      // 是否在进度条上显示当前进度

        this.setValue = setProgress;                        // 设置进度

        initialize();



        //========================   控件私有方法定义   ========================//
        function initialize() {
            initControl();
        };

        function initControl() {
            var controlWidth = control.width();
            var controlHeigt = control.height();

            if (!instance.length || instance.length > controlWidth)
                progress.css('width', controlWidth - 50);
            else progress.css('width', instance.length);

            var progressBarPosition = (controlHeigt - progress.outerHeight()) / 2;

            progress.css({ 'margin-top': progressBarPosition, 'margin-left': 'auto', 'margin-right': 'auto' });  // 使进度条居中
            bar.css('background-color', instance.progressBarColor);
        }

        function setProgress(value) {
            if (value) {
                bar.animate({ "width": value + "%" }, { duration: 100 });   //  控制进度条长度
                if (instance.showPercentage) bar.html(String(value) + "%");  //  显示百分比
            }
        }
    }

    easyweb.progressBar.defaults = {
        progressBarColor: '#14A85D',
        showPercentage: true
    }
})();

// UploadDialog
(function () {


    var userAgent = navigator.userAgent.toLowerCase();

    // 浏览器类型检测
    easyweb.browser = {
        version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(userAgent),
        opera: /opera/.test(userAgent),
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
        msie6: /msie/.test(userAgent) && !/opera/.test(userAgent) && ((userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]) == 6,
        msie7: /msie/.test(userAgent) && !/opera/.test(userAgent) && ((userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]) == 7,
        msie8: /msie/.test(userAgent) && !/opera/.test(userAgent) && ((userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]) == 8,
        msie6_8: /msie/.test(userAgent) && !/opera/.test(userAgent) && ((userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]) < 9
    };

    // 检查浏览器是否支持Flash
    easyweb.isSupportFlash = function () {
        var support = false;
        if (easyweb.browser.msie) {
            try {
                support = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch (error) {
                support = false;
            }
        }
        else {
            support = navigator.plugins["Shockwave Flash"];
        }
        return (support);
    }

    easyweb.dialog.uploadFile = function (dialogSetting, uploadSetting, dialogOnShow, uploadComplete) {
        if (!easyweb.isSupportFlash()) { easyweb.dialog.info('Please install Flash Player and make sure it was been enabled.'); return; }

        var controlId = 'uploadify' + new Date().getTime(),
            dialogSettings = $.extend({}, easyweb.dialog.uploadFile.dialogSetting, dialogSetting),
            uploadSettings = $.extend({}, easyweb.dialog.uploadFile.uploadSetting, uploadSetting),
            uploadBox = $('<div class="e-form"><div class="e-form-caption"></div><div id="fileQueue" class="e-form-main"></div><div id="btnBrowser" class="e-form-btnArea"><input type="file" name="' + controlId + '" id="' + controlId + '" /></div></div>'),
            caption = uploadBox.find('.e-form-caption').text(dialogSettings.caption),
            tip = uploadBox.find('.e-form-tip').text(dialogSettings.tip),
            uploadTipbox = null,
            successTipBox = null,
            isSuccess = false,
            fileNames = [],
            ctlUpload = uploadBox.find('#' + controlId),
            fileQueue = uploadBox.find('#fileQueue'),
            files = [];

        var dialog = new easyweb.dialog();

        dialog.title = dialogSettings.title;
        dialog.control = uploadBox;
        dialog.buttons = [{ text: easyweb.language == "cn" ? '上传' : 'Upload', click: btnUpload_onClick }, { text: easyweb.language == "cn" ? '取消' : 'Cancel', click: btnCancel_onClick }];
        dialog.onShow(dialog_onShown);
        dialog.onClose(dialog_onClose);
        dialog.show();

        function dialog_onShown() {
            uploadSettings["onUploadSuccess"] = uploadSuccess;
            uploadSettings["onQueueComplete"] = queueComplete;
            uploadSettings["onSelect"] = onSelectFile;
            uploadSettings["onCancel"] = onCancelFile;

            ctlUpload.uploadify(uploadSettings);
            if ($.isFunction(dialogOnShow)) dialogOnShow(dialog.control);
        }

        function dialog_onClose() {
            dialog.control.find('#btnBrowser').hide();
            ctlUpload.uploadify('destroy');
        }

        function btnUpload_onClick() {
            if (!isFileValid()) return; // 检查文件是否符合约定。
            if ($.isFunction(uploadSettings.customUpload)) uploadSettings.customUpload(files, uploadFiles);
            else uploadFiles();
        }

        function btnCancel_onClick() {
            dialog.close();
        }

        function uploadSuccess(file, data, response) {
            var serverData = $.parseJSON(data);
            if (!easyweb.server.isSuccess(serverData))
                isSuccess = false;
            else {
                fileNames.push(serverData.ContextData);
                isSuccess = true;
            }
            //ctlUpload.uploadify('cancel', '*');
        }

        function queueComplete(queueData) {
            dialog.close();
            setTimeout(function () {
                uploadTipbox.close();

                if (isSuccess) {
                    if ($.isFunction(uploadComplete)) uploadComplete(fileNames);
                }
            }, 500);




        }

        function onSelectFile(file) {
            files.push(file);
        }

        function onCancelFile(file) {
            for (var n = 0; n < files.length; n++) {
                if (files[n].id == file.id) {
                    files.splice(n, 1);
                }
            }
        }

        function isFileValid() {
            if (files.length == 0) {
                easyweb.dialog.alert('请您选择所要导入的文件。');
                return false;
            }

            if (uploadSettings.fileMaxSize > 0) {
                var maxSize = 1024 * 1024 * uploadSettings.fileMaxSize;
                for (var n = 0; n < files.length; n++) {
                    if (files[n].size > maxSize) {
                        easyweb.dialog.alert(easyweb.language == "cn" ? '文件大小不能超过' : 'The size of the file can not be bigger than' + uploadSettings.fileMaxSize + easyweb.language == "cn" ? 'MB，请您重新选择。' : 'MB,please select again.');
                        return false;
                    }
                }
            }

            if (files.length > uploadSettings.fileLimit) {
                easyweb.dialog.alert('一次只可以导入' + uploadSettings.fileLimit + '个文件，请您移除多余的文件。');
                return false;
            }

            if (uploadSettings.fileTypeExts != "*.*") {
                var exts = uploadSettings.fileTypeExts.split(';');
                for (var n = 0; n < files.length; n++) {
                    if (exts.indexOf('*' + files[n].type) < 0) {
                        easyweb.dialog.alert('文件类型不符合要求，请您重新选择。');
                        return false;
                    }
                }
            }
            return true;
        }

        function uploadFiles() {
            uploadTipbox = easyweb.tipbox.uploading();
            ctlUpload.uploadify('upload', '*');
        }
    };

    easyweb.dialog.uploadFile.dialogSetting = {
        title: easyweb.language == "cn" ? '上传文件' : 'Upload file',
        caption: easyweb.language == "cn" ? '上传文件' : 'Upload data file to cloud server',
        tip: easyweb.language == "cn" ? '选择文件：' : 'Select file'
    };

    easyweb.dialog.uploadFile.uploadSetting = {
        auto: false,                                        // 文件选择完成后，是否自动上传
        buttonText: easyweb.language == "cn" ? '选择文件' : 'Select file',                             // “浏览”按钮上的文字
        formData: {},                                       // 所要传递给服务端的参数
        fileObjName: 'PostFile',                            // 服务端用于获取文件的标记，如Context.Request.Files["Filedata"]
        fileSizeLimit: 0,                                   // 最大允许的文件大小，0表示无限制。已过时，使用fileMaxSize代替。
        fileMaxSize: 0,                                     // 最大允许的文件大小，0表示无限制。单位MB。
        fileTypeDesc: easyweb.language == "cn" ? '所有文件' : 'All file',                           // 打开对话框中文件描述
        fileTypeExts: '*.*',                                // 打开对话框中可以查看的文件类型
        muti: true,                                         // 打开对话框中是否允许多选
        queueID: 'fileQueue',                               // 上传队列控件的Id,通常为Div
        queueSizeLimit: 999,                                // 队列的最大长度
        width: 109,                                         // “浏览”按钮的宽度
        height: 30,                                         // “浏览”按钮的高度
        removeCompleted: false,                             // 在一个文件上传成功后，是否从队列中移除
        removeTimeout: 1,                                   // 移出上传成功的队例，单位：秒
        preventCaching: false,                              // 是否不要缓存SWF文件
        swf: '/JS/lib/uploadify.swf',                           // 上传所需的swf控件路径
        uploader: '/Services/ImportForestService.ashx'      // 后台处理路径
    }

})();


