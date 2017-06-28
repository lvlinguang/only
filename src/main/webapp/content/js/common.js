var common = {

	// 事件延迟对象
	lazyObject : null,
	// 事件延迟 对象｜事件一｜事件二｜事件一延迟时间｜事件二延迟时间｜事件一｜事件二
	lazyEvent : function(obj, event1, event2, Time1, Time2, func1, func2) {

		if (obj && event1 && event2 && Time1 && Time2 && func1) {

			obj.each(function() {

				var target = $(this);

				// 绑定事件一
				target.bind(event1, function(e) {

					if (common.lazyObject) {

						clearTimeout(common.lazyObject);
					}
					common.lazyObject = setTimeout(function() {
						func1(target);
					}, Time1);

				}).
				// 绑定事件二
				bind(event2, function(e) {

					if (common.lazyObject) {

						clearTimeout(common.lazyObject);
					}
					if (func2) {

						common.lazyObject = setTimeout(function() {
							func2(target);
						}, Time2);
					}
				});
			});
		}
	},
	// 格式化json日期 str:json日期，type格式化类型
	jsonDateF : function(str, type) {

		if ($.trim(str) == "") {
			return;
		}

		var date = new Date(parseInt(str.substring(6, str.length - 2)));

		type == null ? type = "yyyy-MM-dd" : "";

		return (common.Dateformat(date, type));

	},
	// 格式化时间戳日期 str:json日期，type格式化类型
	timeStampF : function(str, type) {

		if ($.trim(str) == "") {
			return;
		}

		var date = new Date(str);

		type == null ? type = "yyyy-MM-dd" : "";

		return (common.Dateformat(date, type));

	},
	// 日期格式化属性
	Dateformat : function format(date, format) {
		var o = {
			// 月
			"M+" : date.getMonth() + 1,
			// 天
			"d+" : date.getDate(),
			// 小时
			"h+" : date.getHours(),
			// 分钟
			"m+" : date.getMinutes(),
			// 秒数
			"s+" : date.getSeconds(),
			// 季
			"q+" : Math.floor((date.getMonth() + 3) / 3),
			// 毫秒
			"S" : date.getMilliseconds()
		}
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (date.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	},
	// 得到两日期相减的天数（适用于2015-4-7格式）
	DateDiff : function(sDate1, sDate2) {
		var aDate, oDate1, oDate2, iDays
		aDate = sDate1.split("-")
		oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) // 转换12-18-2002格式
		aDate = sDate2.split("-")
		oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
		iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) // 把相差的毫秒數轉抽象為天數
		return iDays
	},
	// 日期比较适用于2012-10-10这种
	CompareDate : function(date1, date2, sign) {
		var beginDate = new Date(date1.replace(/-/g, "/"));
		var EndDate = new Date(date2.replace(/-/g, "/"));
		if (sign == ">") {
			if (beginDate > EndDate) {
				return true;
			}
		}
		if (sign == ">=") {
			if (beginDate >= EndDate) {
				return true;
			}
		}
		if (sign == "<") {
			if (beginDate < EndDate) {
				return true;
			}
		}
		if (sign == "<=") {
			if (beginDate <= EndDate) {
				return true;
			}
		}
		return false;
	},
	// 字符串转换成json对象
	sringToJson : function(data) {
		return eval('(' + data + ')');
	},
	// 获取url参数
	request : function(paras) {
		var url = location.href;
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split(
				"&");
		var paraObj = {}
		for (i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j
					.substring(j.indexOf("=") + 1, j.length);
		}
		var returnValue = paraObj[paras.toLowerCase()];
		if (typeof (returnValue) == "undefined") {
			return "";
		} else {
			return returnValue;
		}
	},
	// 禁用html jquery对象｜样式｜添加模式｜文本
	disableAtag : function(target, css, Addcss, text) {
		var a = target.clone();
		a.insertAfter(target);
		target.hide();
		a.removeAttr("onclick");
		// 添加样式
		if (css) {
			// 添加样式
			if (Addcss)
				a.addClass(css);
			// 改变样式
			else
				a.attr("class", css);
		}
		// 改变文本
		if (text) {
			a.html(text);
		}
	},
	// 启用html
	enableAtag : function(target) {
		target.show();
		target.next().first().remove();
	},
	// 单位
	units : '个十百千万@#%亿^&~',
	// 字符
	chars : '零一二三四五六七八九',
	// 数字转中文
	numberToChinese : function(number) {
		var a = (number + '').split(''), s = [], t = this;
		if (a.length > 12) {
			throw new Error('too big');
		} else {
			for (var i = 0, j = a.length - 1; i <= j; i++) {
				if (j == 1 || j == 5 || j == 9) {// 两位数 处理特殊的 1*
					if (i == 0) {
						if (a[i] != '1')
							s.push(t.chars.charAt(a[i]));
					} else {
						s.push(t.chars.charAt(a[i]));
					}
				} else {
					s.push(t.chars.charAt(a[i]));
				}
				if (i != j) {
					s.push(t.units.charAt(j - i));
				}
			}
		}
		// return s;
		return s.join('').replace(/零([十百千万亿@#%^&~])/g, function(m, d, b) {// 优先处理
			// 零百
			// 零千 等
			b = t.units.indexOf(d);
			if (b != -1) {
				if (d == '亿')
					return d;
				if (d == '万')
					return d;
				if (a[j - b] == '0')
					return '零'
			}
			return '';
		}).replace(/零+/g, '零').replace(/零([万亿])/g, function(m, b) {// 零百 零千处理后
			// 可能出现
			// 零零相连的
			// 再处理结尾为零的
			return b;
		}).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g,
				function(m) {
					return {
						'@' : '十',
						'#' : '百',
						'%' : '千',
						'^' : '十',
						'&' : '百',
						'~' : '千'
					}[m];
				}).replace(/([亿万])([一-九])/g, function(m, d, b, c) {
			c = t.units.indexOf(d);
			if (c != -1) {
				if (a[j - c] == '0')
					return d + '零' + b
			}
			return m;
		});
	},
	// 得到文本长度
	getStrLength : function(str) {
		var len = str.length;
		var reLen = 0;
		for (var i = 0; i < len; i++) {
			if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
				// 全角
				reLen += 2;
			} else {
				reLen++;
			}
		}
		return reLen;
	},
	// 得到当前时间
	getCurData : function(format) {

		var now = new Date();

		if (format) {

			return common.Dateformat(now, format);
		} else {

			return common.Dateformat(now, "yyyy-MM-dd hh:mm:ss");
		}
	},
	// 数字验证 比较值，比较符号> <
	checkNumber : function(e, num, sign) {
		var re = /^\d+(?=\.{0,1}\d+$|$)/
		if (e.value != "") {
			if (!re.test(e.value)) {
				ymui.msgtip("请输入正确的数字", "error");
				e.value = "";
				e.focus();
			}

			// 有比较
			if (num != undefined) {

				// 大于
				if (sign == undefined || sign == ">") {

					if (e.value <= num) {

						ymui.msgtip("数值必须大于" + num, "error");
						e.value = "";
						e.focus();
					}
				}
				// 小于
				else {
					if (e.value >= num) {

						ymui.msgtip("数值必须小于" + num, "error");
						e.value = "";
						e.focus();
					}

				}
			}
		}
	},
	// 得到url文件名
	getFileNameForUrl : function(o) {
		var pos = o.lastIndexOf("/");
		return o.substring(pos + 1);
	}
}

// 调用星光UI插件使用
$.parser.url = window.location.host;

// 图片上传
common.ImgUpload = function(target, url, callback) {

	var objEvt = $._data($(target), "events");

	if (!(objEvt && objEvt["change"])) {

		$(target).change(function() {

			var data = new FormData();

			$.each($(target)[0].files, function(i, file) {

				data.append('upload_file', file);
			});

			$.ajax({
				url : url,
				type : 'POST',
				data : data,
				cache : false,
				contentType : false,
				processData : false,
				success : function(data) {

					if (callback) {

						callback(data);
					}
				}
			});

		});
	}

}

// 设置表格大小/固定表头 表格对象，表头对象，列，是否冻结表头，是否有行标，是否有复选框
function InitXguiTable(target, fixbar, columns, frozenHeader, rownumbers,
		checkbox) {

	// 改变窗口大小重设表格大小
	$(window).
	// 改变大小事件
	bind("resize", function() {

		// 设置表格大小
		resize();
	});

	// 设置表格大小
	resize();

	// 固定头部
	if (frozenHeader == true) {

		// 冻结表格标题
		$(target).freeze({

			// 固定栏
			fixbar : $(fixbar),
			// 固定时事件
			fixEvent : function(title) {

				// 给固定标题添加样式
				$(title).addClass("xgui-datagrid-title-fix");
			},
			// 不固定时事件
			unfixEvent : function(title) {

				// 去掉给固定标题样式
				$(title).removeClass("xgui-datagrid-title-fix");
			}

		});
	}

	// 重设大小
	function resize() {

		// 表头
		var gtitle = $(target).find(".xgui-datagrid-title");

		// 表格
		var gbody = $(target).find(".xgui-datagrid-body");

		// 表格宽减内边距
		var tableWidth = $(target).width()
				- (gbody.outerWidth() - gbody.width());

		// 设置表头宽
		gtitle.find("table:first").outerWidth(tableWidth);

		// 设置内容表格宽
		gbody.find("table:first").outerWidth(tableWidth);

		// 总列数大小
		var columnWidth = 0;

		// 行标
		if (rownumbers == true) {

			tableWidth -= $(target).find(".xgui-datagrid-cell-number")
					.outerWidth();
		}

		// 复选框
		if (checkbox == true) {

			tableWidth -= $(target).find(".xgui-datagrid-header-check")
					.outerWidth();
		}

		for (var i = 0; i < columns.length; i++) {

			columnWidth += columns[i].width || 100;

		}

		// 单元格宽度比例
		var rate = tableWidth / columnWidth;

		// padding值
		var padding = $(target).find(".xgui-datagrid-cell:eq(0)").outerWidth()
				- $(target).find(".xgui-datagrid-cell:eq(0)").width();

		for (var i = 0; i < columns.length; i++) {

			var w = columns[i].width || 100;

			w = parseInt(w * rate) - padding;

			$(target).find(
					"td[field=" + columns[i].field + "] .xgui-datagrid-cell")
					.width(w);
		}
	}
}

// 星光UI验证插件扩展
$.extend($.fn.validatebox.defaults.rules, {
	checkCharLen : {
		validator : function(value, param, fuc) {
			var len = common.getStrLength(value);
			this.message = '不可超过' + param[0] / 2 + '个中文或' + param[0] + '个西文';
			fuc(len <= param[0]);
		},
		message : '字符数不正确'
	},
	// 验证活动现有期数
	checkaAtivityNumber : {
		validator : function(value, param, fuc) {

			var target = this;

			// 调用数值验证
			$.fn.validatebox.defaults.rules.Integer.validator(value, param,
					function(success) {

						// 规则验证失败
						if (!success) {

							// 提示信息
							target.message = '请输入非0的整数值';

							fuc(success);
						}
						// 否则再进行后台验证
						else {

							// 后台验证
							xgui.Ajax("/Activity/GetNewActivieNumber", {
								ID : ID
							}, "json", true, function(o) {

								if (o != null) {

									// 提示信息
									target.message = '活动期数不能小于当前已完成的期数'
											+ o.Number + "！";

									fuc(value > o.Number);
								} else {

									fuc(true);
								}
							});

						}
					});
		},
		message : '请输入数字！'
	},
	// 整数验证
	Integer : {
		validator : function(value, param, fuc) {

			fuc(/^[0-9]*[1-9][0-9]*$/i.test(value));
		},
		message : '请输入非0的整数值'
	},
	// 人次验证
	UserNumber : {
		validator : function(value, param, fuc) {

			var target = this;

			// 调用数值验证
			$.fn.validatebox.defaults.rules.Integer.validator(value, param,
					function(success) {

						// 规则验证失败
						if (!success) {

							// 提示信息
							target.message = '请输入非0的整数值';

							fuc(success);
						}
						// 否则再进行其它验证
						else {

							fuc(true);

							// //商品分组
							// var Group =
							// $("#GroupID").combobox("getSelected");

							// if (Group != null) {

							// //提示信息
							// target.message = '人次不被商品分组单价整除！';

							// fuc(value % Group.Price == 0)
							// }
							// else {

							// fuc(true);
							// }
						}
					});
		},
		message : '请输入非0的整数值'
	}
});