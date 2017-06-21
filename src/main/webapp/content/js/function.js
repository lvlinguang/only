/*
 *   名称：后台js
 */

/*
 *   名称：角色管理
 */
var role = {

	mark : 1,
	// 修改
	update : function() {
		// 得到treegrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		window.location.href = config.path + '/role/update?id=' + data.id;
	},
	// 保存
	save : function(target) {

		if (!$('#dlg-form').form("validate")) {

			return;
		}

		var permissions = [];
		$('.selected_group .listRow li').each(function() {
			permissions.push($(this).find('a:first').attr('id').substr(11));
		});

		if (permissions.length == 0) {

			xgui.msgtip("请选择角色权限", "error");
			return;
		}

		// 设置权限值
		$("input[name=permissions]").val(permissions.join(','));

		// 添加
		if (role.mark == 1) {

			xgui.Ajax(config.path + "/role/add", $("#dlg-form").serialize(),
					"json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success", function() {

								window.location.href = config.path + '/role/';
							});
						} else {

							xgui.msgtip(o.msg, "error");

							// 启用按钮
							common.enableAtag($(target));
						}

					}, null, function() {

						// 禁用按钮
						common.disableAtag($(target));

						// 显示loading
						xgui.loading("show");

					}, function() {

						// 隐藏loading
						xgui.loading("hide");
					});
		}
		// 修改
		else {

			xgui.Ajax(config.path + "/role/update", $("#dlg-form").serialize(),
					"json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success", function() {

								// window.location.href = '/permission/index';
								window.history.go(-1);
							});
						} else {

							xgui.msgtip(o.msg, "error");

							// 启用按钮
							common.enableAtag($(target));
						}

					}, null, function() {

						// 禁用按钮
						common.disableAtag($(target));

						// 显示loading
						xgui.loading("show");

					}, function() {

						// 隐藏loading
						xgui.loading("hide");
					});

		}

	},
	// 初始化
	init : function() {

		// 权限添加（全选）
		$('.select_group')
				.click(
						function(e) {
							var obj = $(this);
							var parent = $(this).parent().clone();
							var next = $(this).parent().next().clone();
							$('.selected_group .tit .remove_group').each(
									function() {
										if ($(this).attr('rel') == obj
												.attr('rel')) {
											$(this).parent().next().remove();
											$(this).parent().remove();
										}
									});

							parent.find('a').removeClass('select_group')
									.removeClass('btn-s').addClass(
											'remove_group').addClass('close')
									.addClass('fr').text('');
							next
									.find('li')
									.append(
											'<a class="close" href="javascript:void(0)">&nbsp;</a>');
							$('.selected_group').append(parent);
							$('.selected_group').append(next);

							e.preventDefault();
						});

		// 权限添加（单个）
		$('.group_options .listRow a')
				.click(
						function(e) {
							var obj = $(this);
							var exists = false;
							$('.selected_group .listRow a').each(function(e) {
								if ($(this).text() == obj.text()) {
									exists = true;
									return;
								}
							});

							if (!exists) {
								var exists_group = false;
								$('.selected_group .tit a.remove_group').each(
										function(e) {
											if ($(this).attr('rel') == obj
													.attr('rel')) {
												exists_group = true;
												return;
											}
										});

								if (exists_group) {
									$('.selected_group .tit a')
											.each(
													function(e) {
														if ($(this).attr('rel') == obj
																.attr('rel')) {
															$(this)
																	.parent()
																	.next()
																	.append(
																			'<li><a rel="'
																					+ obj
																							.attr('rel')
																					+ '" id="'
																					+ obj
																							.attr('id')
																					+ '" href="javascript:void(0)">'
																					+ obj
																							.text()
																					+ '</a><a class="close" href="javascript:void(0)">&nbsp;</a></li>');
														}
													});
								} else {
									var parent = obj.parent().parent().prev()
											.clone();
									parent.find('a')
											.removeClass('select_group')
											.removeClass('btn-s').addClass(
													'remove_group').addClass(
													'close').addClass('fr')
											.text('');
									$('.selected_group').append(parent);
									$('.selected_group')
											.append(
													'<ul class="listRow"><li><a rel="'
															+ obj.attr('rel')
															+ '" id="'
															+ obj.attr('id')
															+ '" href="javascript:void(0)">'
															+ obj.text()
															+ '</a><a class="close" href="javascript:void(0)">&nbsp;</a></li></ul>');
								}
							}
							e.preventDefault();
						});

		// 权限移除(全部)
		$(".selected_group").on("click", "a.remove_group", function(e) {
			$(this).parent().next().remove();
			$(this).parent().remove();
			e.preventDefault();
		});

		// 权限移除（单个）
		$(".selected_group").on("click", ".listRow a.close", function(e) {
			$(this).parent().remove();
			e.preventDefault();
		});

		// 提交
		$('.js-submit').click(function() {

			role.save(this);
		});
		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 每页大小
							pageSize : 20,
							// 地址
							url : config.path + "/role/list",
							// 远程参数
							queryParams : {
								keyWord : ''
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											role.update();
										});

							},
							// 列
							columns : [ [
									{
										field : 'name',
										title : '角色',
										width : 300
									},
									{
										field : 'createdate',
										title : '创建时间',
										width : 80,
										formatter : function(value) {
											return common.timeStampF(value);
										}
									},
									{
										title : '操作',
										field : 'RoleID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								role.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});

	}
}

/*
 * 名称：用户管理
 */
var user = {

	mark : 1,
	// 修改
	update : function() {
		console.log('update');
		// 得到treegrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		window.location.href = config.path + '/user/update?id=' + data.id;
	},
	// 保存
	save : function(target) {

		if (!$('#dlg-form').form("validate")) {

			return;
		}

		var permissions = [];

		$('.selected_group .listRow li').each(function() {
			permissions.push($(this).find('a:first').attr('id').substr(11));
		});

		if (permissions.length == 0) {

			xgui.msgtip("请选择账号权限", "error");
			return;
		}

		// 设置权限值
		$("input[name=permissions]").val(permissions.join(','));

		// 添加
		if (user.mark == 1) {

			xgui.Ajax(config.path + "/user/adduser",
					$("#dlg-form").serialize(), "json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success", function() {

								window.location.href = config.path + '/user/';
							});
						} else {

							xgui.msgtip(o.msg, "error");

							// 启用按钮
							common.enableAtag($(target));
						}

					}, null, function() {

						// 禁用按钮
						common.disableAtag($(target));

						// 显示loading
						xgui.loading("show");

					}, function() {

						// 隐藏loading
						xgui.loading("hide");
					});
		}
		// 修改
		else {

			xgui.Ajax(config.path + "/user/updateuser", $("#dlg-form")
					.serialize(), "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success", function() {

						window.parent.location = config.path + '/user/';
					});
				} else {

					xgui.msgtip(o.msg, "error");

					// 启用按钮
					common.enableAtag($(target));
				}

			}, null, function() {

				// 禁用按钮
				common.disableAtag($(target));

				// 显示loading
				xgui.loading("show");

			}, function() {

				// 隐藏loading
				xgui.loading("hide");
			});

		}

	},
	// 初始化添加
	initadd : function() {
		// 保存roleId
		var roleIdValue = $('#roleId').combobox("getValue");
		// 用户角色改变得到权限
		$('#roleId').combobox(
				{
					onSelect : function(value, text) {

						var data = {
							roleId : value
						};
						$.get(config.path + '/role/getRolePermissions', data,
								function(result) {

									// 内容项
									var item = $(template('permission-item', {
										data : result
									}));

									$('.selected_group').html(item);
								});

					}
				});
		// 初始化设置roleId及相应权限
		$('#roleId').combobox("setValue", roleIdValue);
		if (user.mark == 1) {

			var data = {
				roleId : roleIdValue
			};
			$.get(config.path + '/role/getRolePermissions', data, function(
					result) {

				// 内容项
				var item = $(template('permission-item', {
					data : result
				}));

				$('.selected_group').html(item);
			});
		}
		// 添加权限(全选)
		$('.select_group')
				.click(
						function(e) {
							var obj = $(this);
							var parent = $(this).parent().clone();
							var next = $(this).parent().next().clone();
							$('.selected_group .tit .remove_group').each(
									function() {
										if ($(this).attr('rel') == obj
												.attr('rel')) {
											$(this).parent().next().remove();
											$(this).parent().remove();
										}
									});

							parent.find('a').removeClass('select_group')
									.removeClass('btn-s').addClass(
											'remove_group').addClass('close')
									.addClass('fr').text('');
							next
									.find('li')
									.append(
											'<a class="close" href="javascript:void(0)">&nbsp;</a>');
							$('.selected_group').append(parent);
							$('.selected_group').append(next);

							e.preventDefault();
						});

		// 添加权限（单个）
		$('.group_options .listRow a')
				.click(
						function(e) {
							var obj = $(this);
							var exists = false;
							$('.selected_group .listRow a').each(function(e) {
								if ($(this).text() == obj.text()) {
									exists = true;
									return;
								}
							});

							if (!exists) {
								var exists_group = false;
								$('.selected_group .tit a.remove_group').each(
										function(e) {
											if ($(this).attr('rel') == obj
													.attr('rel')) {
												exists_group = true;
												return;
											}
										});

								if (exists_group) {
									$('.selected_group .tit a')
											.each(
													function(e) {
														if ($(this).attr('rel') == obj
																.attr('rel')) {
															$(this)
																	.parent()
																	.next()
																	.append(
																			'<li><a rel="'
																					+ obj
																							.attr('rel')
																					+ '" id="'
																					+ obj
																							.attr('id')
																					+ '" href="javascript:void(0)">'
																					+ obj
																							.text()
																					+ '</a><a class="close" href="javascript:void(0)">&nbsp;</a></li>');
														}
													});
								} else {
									var parent = obj.parent().parent().prev()
											.clone();
									parent.find('a')
											.removeClass('select_group')
											.removeClass('btn-s').addClass(
													'remove_group').addClass(
													'close').addClass('fr')
											.text('');
									$('.selected_group').append(parent);
									$('.selected_group')
											.append(
													'<ul class="listRow"><li><a rel="'
															+ obj.attr('rel')
															+ '" id="'
															+ obj.attr('id')
															+ '" href="javascript:void(0)">'
															+ obj.text()
															+ '</a><a class="close" href="javascript:void(0)">&nbsp;</a></li></ul>');
								}
							}
							e.preventDefault();
						});

		// 移除权限（全选）
		$(".selected_group").on("click", "a.remove_group", function(e) {
			$(this).parent().next().remove();
			$(this).parent().remove();
			e.preventDefault();
		});

		// 移除权限（单个）
		$(".selected_group").on("click", ".listRow a.close", function(e) {
			$(this).parent().remove();
			e.preventDefault();
		});

		// 提交
		$('.js-submit').click(function() {

			user.save(this);

		});
	},
	reset : function() {
		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');
		console.log(data);
		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "重置密码");
		$("#dlg-form1").form('clear').form("load", data);

	},
	resetcode : function(target) {
		xgui.Ajax("/user/reset", $("#dlg-form1").serialize(), "json", true,
				function(o) {

					if (o.success) {

						xgui.msgtip(o.msg, "success");

						// 关闭dialog对话框
						$('#dlg1').dialog('close');

						// 刷新datagrid数据表格
						$("#grid").datagrid('reload');
					} else {
						xgui.alert(o.msg, "error");
					}

				}, null, function() {

					xgui.loading("show", "正在提交。。。");

					// 禁用
					common.disableAtag($(target));

				}, function() {

					xgui.loading("hide");

					// 启用
					common.enableAtag($(target));
				});
	},
	// 初始化
	init : function() {
		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 每页大小
							pageSize : 20,
							// 地址
							url : config.path + "/user/list",
							// 远程参数
							queryParams : {
								roleid : 0,
								name : ''
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											user.update();
										});

								// 删除
								$(".js-reset", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											user.reset();
										});
							},
							// 列
							columns : [ [
									{
										field : 'name',
										title : '用户名',
										width : 100
									},
									{
										field : 'account',
										title : '帐号',
										width : 100
									},
									{
										field : 'rolename',
										title : '角色',
										width : 80
									},
									{
										field : 'createdate',
										title : '创建时间',
										width : 120,
										formatter : function(value) {

											return common.timeStampF(value);
										}
									},
									{
										title : '操作',
										field : 'id',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="重置密码" class="js-reset man-opt-icon icon-right"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								user.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});
		// 搜索
		$(".js-search").click(function() {

			// 名称
			var keyword = $(".js-search-input").val();

			var roleId = $("#roleId").combobox("getValue") || 0;

			// 刷新数据
			$("#grid").datagrid("reload", {
				name : keyword,
				pageIndex : 1,
				roleid : roleId,
			});

		});
		// 绑定是（菜单）
		$(".js-submit1").click(function() {

			user.resetcode(this);
		});

		// 绑定否
		$(".js-cancel1").click(function() {

			// 关闭dialog对话框
			$('#dlg1').dialog('close');
		});
	}
}
/*
 * 名称：物流管理
 */
var expressCompany = {
	// 添加或修改标记
	mark : 1,
	// 添加
	add : function(a) {

		// 添加标记
		expressCompany.mark = 1;

		// 清除form数据
		$("#dlg-form1").form('clear');

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "添加物流");

	},
	// 修改
	update : function() {

		// 修改标记
		expressCompany.mark = 0;

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "修改物流");

		// 给form赋值
		$("#dlg-form1").form('clear').form("load",
				"/ExpressCompany/Details?ID=" + data.ExpressCompanyID);

	},
	// 删除
	del : function() {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/ExpressCompany/Delete", {
				ID : data.ExpressCompanyID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新datagrid数据表格
					$("#grid").datagrid('reload');
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

			}, function() {

				xgui.loading("hide");
			});
		});
	},
	// 保存
	save : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}

		// 添加
		if (expressCompany.mark == 1) {

			xgui.Ajax("/ExpressCompany/Add", $("#dlg-form1").serialize(),
					"json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
		// 修改
		else {

			xgui.Ajax("/ExpressCompany/Update", $("#dlg-form1").serialize(),
					"json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
	},
	// 初始化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/ExpressCompany/List",
							// 远程参数
							queryParams : {
								keyWord : ''
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											expressCompany.update();
										});

								// 删除
								$(".js-del", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											expressCompany.del();
										});
							},
							// 列
							columns : [ [
									{
										field : 'CompanyName',
										title : '物流公司',
										width : 180
									},
									{
										field : 'CompanyNum',
										title : '公司代号',
										width : 180
									},
									{
										field : 'CreateDate',
										title : '创建时间',
										width : 180,
										formatter : function(value) {
											return common.jsonDateF(value,
													"yyyy-MM-dd hh:mm");
										}
									},
									{
										field : 'UpdateDate',
										title : '修改时间',
										width : 180,
										formatter : function(value) {
											if (value == null)
												return "";
											else
												return common.jsonDateF(value,
														"yyyy-MM-dd hh:mm");
										}
									},
									{
										title : '操作',
										field : 'ExpressCompanyID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								expressCompany.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});

		// 搜索
		$(".js-search").click(function() {

			// 名称
			var keyword = $(".js-search-input").val();

			// 刷新数据
			$("#grid").datagrid("reload", {
				keyWord : keyword,
				pageIndex : 1
			});

		});

		// 添加
		$(".js-add").click(function() {

			expressCompany.add();
		});

		// 修改
		$(".js-update").click(function() {

			expressCompany.update();
		});

		// 删除
		$(".js-delete").click(function() {

			expressCompany.del();
		});

		// 绑定是（菜单）
		$(".js-submit1").click(function() {

			expressCompany.save(this);
		});

		// 绑定否
		$(".js-cancel1").click(function() {

			// 关闭dialog对话框
			$('#dlg1').dialog('close');
		});
	}

}
/*
 * 名称：商品类目管理
 */
var productCategory = {
	// 添加或修改标记
	mark : 1,
	// 上传图片
	myUpload : function() {
		// 上传图片
		$(".js-imgupload1").each(function() {
			console.log("Image upload.")
			var t = $(this);
			common.ImgUpload(this, "/Product/ImgUpload", function(data) {

				if (data.success) {

					if (data.url == "") {

						alert("此附件的格式不对");
						return;
					}

					t.next().attr("value", common.getFileNameForUrl(data.url));
					$("#iconpic").attr("src", data.url);
					console.log(data.url);
				} else {

					ymui.msgtip("图片超过限制");
				}
			});
		});
	},
	// 添加
	add : function(a) {

		// 添加标记
		productCategory.mark = 1;

		// 清除form数据
		$("#dlg-form1").form('clear');

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "添加类目");
		// 上传图片
		productCategory.myUpload();
		$("#iconpic").attr("src", "/Images/add_img.png");
	},
	// 修改
	update : function() {

		// 修改标记
		productCategory.mark = 0;

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "修改类目");

		// 给form赋值
		console.log("给form赋值");
		xgui.Ajax("/Category/Details", {
			ID : data.ProductCategoryID
		}, "json", true, function(o) {

			$("#dlg-form1").form('clear').form("load", o);

			// 上传图片
			productCategory.myUpload();

			// icon预览图
			console.log("icon预览图");
			var icon = $("#dlg-form1").find("input[name=Icon]").val();
			if (icon == "")
				$("#iconpic").attr("src", "/Images/add_img.png");
			else
				$("#iconpic").attr("src", "/upload/icon/small/" + icon);

		});

	},
	// 删除
	del : function() {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/Category/Delete", {
				ID : data.ProductCategoryID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新datagrid数据表格
					$("#grid").datagrid('reload');
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

			}, function() {

				xgui.loading("hide");
			});
		});
	},
	// 保存
	save : function(target) {
		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}
		var icon = $("#dlg-form1").find("input[name=Icon]").val();
		if (icon == "") {
			xgui.msgtip("请上传图标！", "error");
			return;
		}
		// 添加
		if (productCategory.mark == 1) {

			xgui.Ajax("/Category/Add", $("#dlg-form1").serialize(), "json",
					true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
		// 修改
		else {

			xgui.Ajax("/Category/Update", $("#dlg-form1").serialize(), "json",
					true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
	},
	// 初始化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/Category/List",
							// 远程参数
							queryParams : {
								keyWord : ''
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											productCategory.update();
										});

								// 删除
								$(".js-del", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											productCategory.del();
										});
							},
							// 列
							columns : [ [
									{
										field : 'ProductCategoryName',
										title : '类目名称',
										width : 80
									},
									{
										field : 'Icon',
										title : '图标',
										width : 60,
										formatter : function(value) {
											if (value == null) {
												return " ";
											} else
												return '<img style="width: 32px; height: 32px;padding-top:4px;" src="'
														+ '/upload/icon/small/'
														+ value + '">';
										}
									},
									{
										field : 'Sequence',
										title : '类目排序',
										width : 60
									},
									{
										field : 'CreateDate',
										title : '创建时间',
										width : 120,
										formatter : function(value) {
											return common.jsonDateF(value,
													"yyyy-MM-dd hh:mm");
										}
									},
									{
										field : 'CanShow',
										title : '显示',
										width : 60,
										formatter : function(value) {
											return value == 1 ? "是"
													: "<span style='color:red;'>否</span>";
										}
									},
									{
										field : 'Discription',
										title : '备注',
										width : 260
									},
									{
										title : '操作',
										field : 'ProductGroupID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								productCategory.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});
							},

						});

		// 搜索
		$(".js-search").click(function() {

			// 名称
			var keyword = $(".js-search-input").val();

			// 刷新数据
			$("#grid").datagrid("reload", {
				keyWord : keyword,
				pageIndex : 1
			});

		});

		// 添加
		$(".js-add").click(function() {

			productCategory.add();
		});

		// 修改
		$(".js-update").click(function() {

			productCategory.update();
		});

		// 删除
		$(".js-delete").click(function() {

			productCategory.del();
		});

		// 绑定是（菜单）
		$(".js-submit1").click(function() {

			productCategory.save(this);
		});

		// 绑定否
		$(".js-cancel1").click(function() {

			// 关闭dialog对话框
			$('#dlg1').dialog('close');
		});

		// 上传图片
		productCategory.myUpload();
	}

}
/*
 * 名称：商品分组管理
 */
var group = {
	// 添加或修改标记
	mark : 1,
	// 添加
	add : function(a) {

		// 添加标记
		group.mark = 1;

		// 清除form数据
		$("#dlg-form1").form('clear');

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "添加分组");

		// 顺序
		$("input[name=Sequence]").val(1);
		// 上传图片
		productCategory.myUpload();
		$("#iconpic").attr("src", "/Images/add_img.png");
		// 起步价
		$("input[name=Price]").val(1);

	},
	// 修改
	update : function() {

		// 修改标记
		group.mark = 0;

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "修改分组");

		// 给form赋值
		console.log("给form赋值");
		xgui.Ajax("/Group/Details", {
			ID : data.ProductGroupID
		}, "json", true, function(o) {

			$("#dlg-form1").form('clear').form("load", o);

			// 上传图片
			productCategory.myUpload();

			// icon预览图
			console.log("icon预览图");
			var icon = $("#dlg-form1").find("input[name=Icon]").val();
			if (icon == "")
				$("#iconpic").attr("src", "/Images/add_img.png");
			else
				$("#iconpic").attr("src", "/upload/icon/small/" + icon);

		});
	},
	// 删除
	del : function() {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/Group/Delete", {
				ID : data.ProductGroupID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新datagrid数据表格
					$("#grid").datagrid('reload');
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

			}, function() {

				xgui.loading("hide");
			});
		});
	},
	// 保存
	save : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}
		var icon = $("#dlg-form1").find("input[name=Icon]").val();
		if (icon == "") {
			xgui.msgtip("请上传图标！", "error");
			return;
		}
		// 添加
		if (group.mark == 1) {

			xgui.Ajax("/Group/Add", $("#dlg-form1").serialize(), "json", true,
					function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
		// 修改
		else {

			xgui.Ajax("/Group/Update", $("#dlg-form1").serialize(), "json",
					true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
	},
	// 初使化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 每页大小
							pageSize : 10,
							// 地址
							url : "/Group/List",
							// 远程参数
							queryParams : {
								keyWord : ''
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											group.update();
										});

								// 删除
								$(".js-del", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											group.del();
										});
							},
							// 列
							columns : [ [
									{
										field : 'ProductGroupName',
										title : '分组名称',
										width : 300
									},
									{
										field : 'Icon',
										title : '图标',
										width : 80,
										formatter : function(value) {
											console.log(value);
											if (value == null) {
												return " ";
											} else
												return '<img style="width: 75px; height: 75px;padding-top:4px;" src="'
														+ '/upload/icon/small/'
														+ value + '">';
										}
									},
									{
										field : 'Price',
										title : '每人次价格',
										width : 80
									},
									{
										field : 'Sequence',
										title : '顺序',
										width : 80
									},
									{
										title : '操作',
										field : 'ProductGroupID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								group.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});

		// 搜索
		$(".js-search").click(function() {

			// 名称
			var keyword = $(".js-search-input").val();

			// 刷新数据
			$("#grid").datagrid("reload", {
				keyWord : keyword,
				pageIndex : 1
			});

		});

		// 添加
		$(".js-add").click(function() {

			group.add();
		});

		// 修改
		$(".js-update").click(function() {

			group.update();
		});

		// 删除
		$(".js-delete").click(function() {

			group.del();
		});

		// 绑定是（菜单）
		$(".js-submit1").click(function() {

			group.save(this);
		});

		// 绑定否
		$(".js-cancel1").click(function() {

			// 关闭dialog对话框
			$('#dlg1').dialog('close');
		});
	}

}

/*
 * 名称：商品管理
 */
var product = {

	mark : 1,
	// 修改
	update : function() {

		// 得到treegrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		window.location.href = '/Product/Update?ID=' + data.ProductID;
	},
	// 删除
	del : function(target) {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		// 数据存在
		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/Product/Delete", {
				ids : data.ProductID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				common.enableAtag($(target));

			});
		});
	},
	// 批量删除
	batchDel : function(target) {

		// 得到datagrid的当前勾选项
		var data = $("#grid").datagrid('getSelections');

		var ids = [];

		for (i = 0; i < data.length; i++) {

			ids.push(data[i].ProductID);
		}

		if (ids.length == 0) {

			xgui.alert("请勾选要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除勾选的<i class='alert-del-info'>" + ids.length
				+ "条</i>数据吗？", function() {

			xgui.Ajax("/Product/Delete", {
				ids : ids.join(',')
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				common.enableAtag($(target));
			});
		});

	},
	// 上架/下架
	UpAndDown : function(target, tag) {

		// 得到datagrid的当前勾选项
		var data = $("#grid").datagrid('getSelected');

		if (tag != 1) {

			text = "下架";
		} else {
			text = "上架";
		}

		// 数据不存在
		if (!data) {

			xgui.alert("请先选择要" + text + "的数据！", "warn");

			return;
		}

		xgui.confirm("确定要" + text + "吗？", function() {

			xgui.Ajax("/Product/DownProduct", {
				ids : data.ProductID,
				tag : tag
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				common.enableAtag($(target));
			});
		});

	},
	// 批量上架/下架
	batchUpAndDown : function(target, tag) {

		// 得到datagrid的当前勾选项
		var data = $("#grid").datagrid('getSelections');

		var ids = [];

		for (i = 0; i < data.length; i++) {

			ids.push(data[i].ProductID);
		}

		if (tag != 1) {

			text = "下架";
		} else {
			text = "上架";
		}

		if (ids.length == 0) {

			xgui.alert("请勾选要" + text + "的数据！", "warn");

			return;
		}
		xgui.confirm("确定要" + text + "吗？", function() {

			xgui.Ajax("/Product/DownProduct", {
				ids : ids.join(','),
				tag : tag
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				common.enableAtag($(target));
			});
		});

	},
	// 保存商品
	save : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form").form("validate")) {
			return;
		}

		// 大图
		var bigpic = $("#Showbig1").attr("src");

		if (bigpic == defaultimg) {

			xgui.msgtip("请上传主图！", "error");
			return;
		}

		// 区域
		var RegionId = 0;

		// 栏目
		var province1 = $("#province1").combobox("getValue");

		var province2 = $("#province2").combobox("getValue");

		var province3 = $("#province3").combobox("getValue");

		if (province3 != "") {

			RegionId = province3
		} else if (province2 != "") {

			RegionId = province2
		} else {

			RegionId = province1
		}

		// 发布类别
		var Flag = $(target).attr("type");

		// 设置大图
		$("#BigPicture").val(common.getFileNameForUrl(bigpic));

		// 细节图
		var smallImgs = "";
		for (var i = 1; i < 5; i++) {
			var smallImg = $("#Showsmall" + i).attr("src");
			if (smallImg != defaultimg)
				smallImgs += common.getFileNameForUrl(smallImg) + ",";
		}
		if (smallImgs.indexOf(",") > 0) {

			smallImgs = smallImgs.substring(0, smallImgs.length - 1);
		}

		$("#Thumbnail").val(smallImgs);

		// 有格式内容
		$("#Description").val(ue.getContent());

		if (product.mark == 1) {

			xgui
					.Ajax('/Product/Add', $("#dlg-form").serialize() + "&Flag="
							+ Flag + "&RegionId=" + RegionId, "json", true,
							function(o) {

								if (o.success) {

									xgui.msgtip(o.msg, "success", function() {

										window.parent.location = backurl
												|| '/product?tag=' + Flag;
									});
								} else {

									xgui.msgtip(o.msg, "error");

									// 启用按钮
									common.enableAtag($(target));

									// 启用旁边按钮
									common.enableAtag($(target).siblings(
											".js-submit"));
								}

							}, null, function() {

								// 禁用旁边按钮
								common.disableAtag($(target).siblings(
										".js-submit"));

								// 禁用按钮
								common.disableAtag($(target));

								// 显示loading
								xgui.loading("show");

							}, function() {

								// 隐藏loading
								xgui.loading("hide");
							});

		} else {

			xgui.Ajax('/Product/Update', $("#dlg-form").serialize() + "&Flag="
					+ Flag + "&RegionId=" + RegionId + "&ProductID="
					+ ProductID, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success", function() {

						window.parent.location = backurl || '/product?tag='
								+ Flag;
					});
				} else {

					xgui.msgtip(o.msg, "error");

					// 启用按钮
					common.enableAtag($(target));

					// 启用旁边按钮
					common.enableAtag($(target).siblings(".js-submit"));
				}

			}, null, function() {

				// 禁用旁边按钮
				common.disableAtag($(target).siblings(".js-submit"));

				// 禁用按钮
				common.disableAtag($(target));

				// 显示loading
				xgui.loading("show");

			}, function() {

				// 隐藏loading
				xgui.loading("hide");
			});
		}
	},
	// 初使化添加
	initadd : function() {

		// 编辑器
		ue = UE.getEditor('editor');

		// 一级分类
		$("#category1").combobox({
			url : '/Category/ListForCom',
			valueField : 'ProductCategoryID',
			textField : 'ProductCategoryName',
			name : 'CategoryID',
			width : 360,
			panelHeight : 220,
			emptyCon : "一级栏目检索"
		});

		// 省
		$("#province1").combobox(
				{
					url : '/City/GetProvince',
					valueField : 'ProvinceId',
					textField : 'ProvinceName',
					width : 360,
					panelHeight : 220,
					editable : false,
					required : true,
					mode : "Static",
					emptyCon : "选择省",
					onSelect : function(value) {

						xgui.Ajax('/City/GetCity', {
							id : value
						}, "json", true, function(o) {

							// 验证
							$("#province2,#province3").combobox('rest', {
								required : false
							});

							// 市和区
							$("#province2,#province3").combobox("clear")
									.combobox("disable");

							if (o.length > 0) {

								// 验证
								$("#province2").combobox('rest', {
									required : true
								});

								// 市
								$("#province2").combobox({
									localData : o
								}).combobox("enable");
							}

						});
					}
				});

		// 市
		$("#province2").combobox({
			valueField : 'RegionId',
			textField : 'RegionName',
			width : 360,
			panelHeight : 220,
			editable : false,
			disabled : true,
			mode : "Static",
			emptyCon : "选择市",
			onSelect : function(value) {

				xgui.Ajax('/City/GetArea', {
					id : value
				}, "json", true, function(o) {

					// 验证
					$("#province3").combobox('rest', {
						required : false
					});

					// 区
					$("#province3").combobox("clear").combobox("disable");

					if (o.length > 0) {

						// 验证
						$("#province3").combobox('rest', {
							required : true
						});

						// 区
						$("#province3").combobox({
							localData : o
						}).combobox("enable");
					}
				});
			}
		});

		// 区
		$("#province3").combobox({
			valueField : 'RegionId',
			textField : 'RegionName',
			// name: 'RegionId',
			width : 360,
			panelHeight : 220,
			editable : false,
			disabled : true,
			mode : "Static",
			emptyCon : "选择区"
		});

		// 图片上传
		$(".js-imgupload1").each(function() {

			var t = $(this);

			common.ImgUpload(this, "/product/ImgUpload", function(data) {

				if (data.success) {

					t.parent().find("img").attr("src", data.url);

				} else {

					xgui.msgtip(data.text, "error");
				}
			});
		});

		// 图片事件
		$(".commodity-create-delete-box")

		.mouseenter(function() {

			if ($(this).find("img").attr("src") != defaultimg) {

				$(this).find(".js-del-pic").fadeIn();
			}
		}).mouseleave(function() {

			$(this).find(".js-del-pic").fadeOut();
		});

		// 绑定图片删除事件
		$(".js-del-pic").click(function() {

			var t = $(this);

			xgui.confirm("确定要删除图片吗？", function() {

				t.siblings("img").attr("src", defaultimg);

				xgui.msgtip("操作成功", "success");
			});
		});

		// 提交
		$(".js-submit").click(function() {

			product.save(this);
		});
	},
	// 初使化修改
	initupdate : function() {

		product.initadd();

		// 设置大图
		$("#Showbig1").attr(
				"src",
				"/upload/product/" + ProductID + "/small/"
						+ $("#BigPicture").val());

		// 细节图
		var thumb = $("#Thumbnail").val();

		if (thumb != "") {
			var pic = thumb.split(",");
			for (var i = 1; i < (pic.length + 1); i++) {
				$("#Showsmall" + i)
						.attr(
								"src",
								"/upload/product/" + ProductID + "/small/"
										+ pic[i - 1]);
			}
		}

		// 省
		$("#province1").combobox("setValue", province1);

		// 市
		xgui.Ajax('/City/GetCity', {
			id : province1
		}, "json", true, function(o) {

			// 添加必填验证
			$("#province2").combobox('rest', {
				required : true
			});

			$("#province2").combobox({
				localData : o
			}).combobox("enable").combobox("setValue", province2);

		});

		if (province3 != 0) {

			// 区
			xgui.Ajax('/City/GetArea', {
				id : province2
			}, "json", true, function(o) {

				// 添加必填验证
				$("#province3").combobox('rest', {
					required : true
				});

				$("#province3").combobox({
					localData : o
				}).combobox("enable").combobox("setValue", province3);

			});
		}
	},
	// 初使化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 是否分页
							pagination : true,
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/Product/List",
							// 远程参数
							queryParams : {
								CategoryID : 0,
								keyWord : '',
								Flag : Flag
							},
							// 行标
							// rownumbers: true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											product.update();
										});

								// 删除
								$(".js-del", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											product.del();
										});

								// 上架
								$(".js-upanddown1", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											var type = $(this).attr("type");

											product.UpAndDown($(this), type);
										});
							},
							// 列
							columns : [ [
									{
										field : 'ProductID',
										checkbox : true
									},
									{
										field : 'ProductName',
										title : '商品名称',
										width : 160,
										formatter : function(value, rowData,
												rowIndex) {
											return '<div class="pro-info"><img src="/upload/product/'
													+ rowData.ProductID
													+ '/small/'
													+ rowData.BigPicture
													+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
													+ value
													+ '</div><div class="pro-price">￥'
													+ rowData.Price
													+ '</div></div></div>';
										}
									},
									{
										field : 'CategoryName',
										title : '商品分类',
										width : 140
									},
									{
										field : 'CreateDate',
										title : '创建时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									},
									{
										title : '操作',
										field : 'ProductID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {

											var btn = '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';

											if (Flag != 1) {
												btn += '<a href="javascript:;" title="上架" class="js-upanddown1 man-opt-icon icon-sj" type="1"></a>';
											} else {
												btn += '<a href="javascript:;" title="下架" class="js-upanddown1 man-opt-icon icon-xj" type="3"></a>';
											}

											return btn;
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								product.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});

		// 一级分类
		$("#category1").combobox({
			url : '/Category/ListForCom',
			valueField : 'ProductCategoryID',
			textField : 'ProductCategoryName',
			width : 160,
			panelHeight : 200,
			emptyCon : "一级栏目检索"
		});

		// 搜索
		$(".js-search").click(function() {

			// 类目
			var CategoryID = $("#category1").combobox("getValue") || 0;

			// 名称
			var keyword = $(".js-search-input").val();

			// 刷新数据
			$("#grid").datagrid("reload", {
				CategoryID : CategoryID,
				keyWord : keyword,
				pageIndex : 1
			});

		});

		// 编辑
		$(".js-update").click(function() {

			product.update();
		});

		// 删除
		$(".js-delete1").click(function() {

			product.del();
		});

		// 批量删除
		$(".js-delete2").click(function() {

			product.batchDel(this);
		});

		// 上架/下架
		$(".js-upanddown1").click(function() {

			var type = $(this).attr("type");

			product.UpAndDown(this, type);
		});

		// 批量上架/下架
		$(".js-upanddown2").click(function() {

			var type = $(this).attr("type");

			product.batchUpAndDown(this, type);
		});

	}
}

/*
 * 名称：活动管理
 */
var activity = {

	mark : 1,
	// 修改
	update : function() {

		// 得到treegrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		window.location.href = '/Activity/Update?ID=' + data.ID;
	},
	// 删除
	del : function(target) {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		// 数据存在
		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}
		if (data.Status == 2) {

			xgui.alert("请先停止活动！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/Activity/Delete", {
				ids : data.ID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				common.enableAtag($(target));

			});
		});
	},
	// 保存活动
	save : function(target) {

		// 添加
		if (activity.mark == 1) {

			// 数据合法性验证
			if (!$("#dlg-form").form("validate")) {
				return;
			}

			var provinceids = [];

			// 区域限制
			var AreaLimit = $(".js-AreaLimit").combobox("getValue");

			// 是
			if (AreaLimit == "true") {

				// 市项
				var proitem = $(".province2");

				// 市
				$.each(proitem, function(a, b) {

					// 市
					provinceids.push($(b).combobox("getValue"));
				});
			}

			xgui.Ajax('/Activity/Add', $("#dlg-form").serialize()
					+ "&Province=" + provinceids.join(','), "json", true,
					function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success", function() {

								var type = $(".js-ActivityType").combobox(
										"getValue");

								window.parent.location = backurl
										|| '/activity?activitytype=' + type;
							});
						} else {

							xgui.msgtip(o.msg, "error");

							// 启用按钮
							common.enableAtag($(target));
						}

					}, null, function() {

						// 禁用按钮
						common.disableAtag($(target));

						// 显示loading
						xgui.loading("show");

					}, function() {

						// 隐藏loading
						xgui.loading("hide");
					});
		}
		// 修改
		else {

			// 禁用按钮
			common.disableAtag($(target));

			// 显示loading
			xgui.loading("show", "正在提交。。。");

			// 异步验证
			$("#dlg-form").form(
					'asyncValidate',
					function(o) {

						if (o) {

							var provinceids = [];

							// 区域限制
							var AreaLimit = $(".js-AreaLimit").combobox(
									"getValue");

							// 是
							if (AreaLimit == "true") {

								// 市项
								var proitem = $(".province2");

								// 市
								$.each(proitem,
										function(a, b) {

											// 市
											provinceids.push($(b).combobox(
													"getValue"));
										});
							}

							xgui.Ajax('/Activity/Update', $("#dlg-form")
									.serialize()
									+ "&Province="
									+ provinceids.join(',')
									+ "&ID=" + ID, "json", true, function(o) {

								if (o.success) {

									xgui.msgtip(o.msg, "success", function() {

										window.parent.location = backurl
												|| "/activity?activitytype="
												+ ActivityType;
									});
								} else {

									xgui.alert(o.msg, "error");

									// 启用按钮
									common.enableAtag($(target));
								}

								// 隐藏loading
								xgui.loading("hide");

							});
						} else {

							// 隐藏loading
							xgui.loading("hide");

							// 启用按钮
							common.enableAtag($(target));
						}
					});
		}
	},
	// 设置停止、启动状态
	setstatus : function() {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		// 数据存在
		if (!data) {

			xgui.alert("请先选择要更改的数据！", "warn");

			return;
		}

		xgui.confirm("确定要更改启动状态吗？", function() {

			xgui.Ajax("/Activity/StartAndStop", {
				ID : data.ID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				// common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				// common.enableAtag($(target));

			});
		});
	},
	// 初使化省、市
	initprovince : function(target) {

		// 省
		$(".province1", $(target)).combobox({
			url : '/City/GetProvince',
			valueField : 'ProvinceId',
			textField : 'ProvinceName',
			name : 'province1',
			// editable: false,
			width : 165,
			emptyCon : "请选择省",
			onSelect : function(value) {

				xgui.Ajax('/City/GetCity', {
					id : value
				}, "json", true, function(o) {

					// 市
					$(".province2", $(target)).combobox("clear");

					if (o.length > 0) {

						// 市
						$(".province2", $(target)).combobox({
							localData : o
						});
					}
				});
			}
		});

		// 市
		$(".province2", $(target)).combobox({
			valueField : 'RegionId',
			textField : 'RegionName',
			name : 'province2',
			required : true,
			// editable: false,
			width : 165,
			mode : 'Static',
			left : 20,
			emptyCon : "请选择市"
		});

		// 新增区域
		$(".js-column-add")
				.unbind("click")
				.bind(
						"click",
						function() {

							// 栏目项
							var item = $(
									'<div class="js-column-item clearfix" style="margin-top:10px;"><span class="province1"></span><span class="province2"></span><a href="javascript:;" title="删除" class="js-column-del man-opt-icon icon-del"></a></div>')
									.appendTo(".js-column");

							// 初使化省、市
							activity.initprovince(item);
						});

		// 绑定删除
		$(target).find(".js-column-del").click(function() {

			$(target).remove();
		});
	},
	// 初使化添加
	initadd : function() {

		// 商品
		$('#ProductID')
				.combogrid(
						{

							url : "/Product/Search",
							// queryParams: { },
							// 行标
							rownumbers : true,
							idField : 'ProductID',
							textField : 'ProductName',
							// 远程检索
							queryMode : "remote",
							// name属性
							name : "ProductID",
							width : 360,
							panelWidth : 600,
							panelHeight : 400,
							required : true,
							mode : 'Static',
							// 列
							columns : [ [
									{
										field : 'ProductName',
										title : '商品名称',
										width : 260,
										formatter : function(value, rowData,
												rowIndex) {
											return '<div class="pro-info"><img src="/upload/product/'
													+ rowData.ProductID
													+ '/small/'
													+ rowData.BigPicture
													+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
													+ value
													+ '</div><div class="pro-price">￥'
													+ rowData.Price
													+ '</div></div></div>';
										}
									}, {
										field : 'CategoryName',
										title : '商品分类',
										width : 140
									}, {
										field : 'CreateDate',
										title : '创建时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									} ] ]
						});

		// 所属分组
		$("#GroupID").combobox({
			url : '/Group/ListForCom',
			valueField : 'ProductGroupID',
			textField : 'ProductGroupName',
			width : 360,
			panelHeight : 220,
			required : true,
			mode : 'Static',
			emptyCon : "商品分组"
		});

		// 日期插件
		jeDate({
			dateCell : "#js-startdate",
			format : 'YYYY-MM-DD hh:mm',
			isinitVal : true,
			isTime : true,
			festival : true
		});

		// 活动类别
		$(".js-ActivityType").combobox(
				{

					onSelect : function(value) {

						// 设置活动类别
						ActivityType = value;

						// 夺宝
						if (value == 1) {

							// 显示夺宝项
							$(".js-activity-1").show();

							// 隐藏团购项
							$(".js-activity-2").hide();

							// 夺宝项
							$.each($(".js-activity-1-item"), function(a, b) {

								// 插件类别
								var ptype = $(b).attr("type");

								// combobox
								if (ptype == 1) {

									// (combobox)
									$(b).combobox("rest", {
										mode : "Static",
										required : true
									});
								}
							});

							// 团购项
							$.each($(".js-activity-2-item"), function(a, b) {

								// 插件类别
								var ptype = $(b).attr("type");

								// validatebox
								if (ptype == 2) {

									// (validatebox)
									$(b).validatebox('rest', {
										mode : "Real",
										required : false
									});
								}
							});

							// 启用区域限制
							$(".js-AreaLimit").combobox("enable");
						}
						// 团购
						else {

							// 隐藏夺宝项
							$(".js-activity-1").hide();

							// 显示团购项
							$(".js-activity-2").show();

							// 夺宝项
							$.each($(".js-activity-1-item"), function(a, b) {

								// 插件类别
								var ptype = $(b).attr("type");

								// combobox
								if (ptype == 1) {

									// (combobox)
									$(b).combobox("rest", {
										mode : "Real",
										required : false
									});
								}
							});

							// 团购项
							$.each($(".js-activity-2-item"), function(a, b) {

								// 插件类别
								var ptype = $(b).attr("type");

								// validatebox
								if (ptype == 2) {

									// (validatebox)
									$(b).validatebox('rest', {
										mode : "Static",
										required : true
									});
								}
							});

							// 开奖方式(隐藏)
							$(".js-Type").combobox("setValue", 2);

							// 禁用区域限制
							$(".js-AreaLimit").combobox("setValue", false)
									.combobox("disable");

							// 判断是否要隐藏区域限制
							if (!$(".js-province").is(":hidden")) {

								// 隐藏外框
								$(".js-province").hide();

								// 清空插件
								$(".js-column").html("");
							}
						}
					}

				}).combobox("setValue", 1);

		// 金额购买
		$(".js-FullPurchase").combobox({

			onSelect : function(value) {

				// 金额购买不限发行数量
				if (ActivityType == 2) {

					return;
				}

				// 是
				if (value == "true") {

					if ($(".js-LssueNumber")[0]) {

						// 重设插件，目的是清除验证提示
						$(".js-LssueNumber").validatebox('rest', {
							mode : "Static",
							required : true
						});
					}

					$(".js-LssueNumber-item").show();
				} else {

					// 显示外框
					$(".js-LssueNumber-item").hide();

					// 重设插件，目的是清除验证提示
					$(".js-LssueNumber").validatebox('rest', {
						mode : "Real",
						required : false
					});
				}
			}
		});

		// 开奖方式
		$(".js-Type").combobox({

			onSelect : function(value) {

				// 人员满开奖
				if (value == 1) {

					if ($(".js-TimeSlot")[0]) {

						// 重设插件，目的是清除验证提示
						$(".js-TimeSlot").validatebox('rest', {
							mode : "Real",
							required : false
						});
					}

					$(".js-LotteryTime-item").hide();
				} else {

					// 显示外框
					$(".js-LotteryTime-item").show();

					// 重设插件，目的是清除验证提示
					$(".js-TimeSlot").validatebox('rest', {
						mode : "Static",
						required : true
					});
				}
			}
		});

		// 活动期数
		$(".js-PeriodsType").combobox({

			onSelect : function(value) {

				// 无限制
				if (value == 2) {

					if ($(".js-Periods")[0]) {

						// 重设插件，目的是清除验证提示
						$(".js-Periods").validatebox('rest', {
							mode : "Real",
							required : false
						});
					}

					$(".js-Periods-item").hide();
				} else {

					// 显示外框
					$(".js-Periods-item").show();

					// 重设插件，目的是清除验证提示
					$(".js-Periods").validatebox('rest', {
						mode : "Static",
						required : true
					});
				}
			}
		});

		// 区域选择
		$(".js-AreaLimit")
				.combobox(
						{

							onSelect : function(value) {

								// 是
								if (value == "true") {

									// 显示外框
									$(".js-province").show();

									var pitem = '<div class="js-column-item clearfix"><span class="province1"></span><span class="province2"></span><a href="javascript:;" title="新增" class="js-column-add man-opt-icon icon-add"></a></div>';

									// 输出html
									$(".js-column").html(pitem);

									// 初使化省、市
									activity.initprovince($(".js-column-item"));
								} else {

									if ($(".js-column-item")[0]) {

										// 市项
										var proitem = $(".province2");

										// 市
										$.each(proitem, function(a, b) {

											// 市
											$(b).combobox('rest');
										});

										// 清空插件
										$(".js-column").html("");
									}

									// 隐藏外框
									$(".js-province").hide();
								}
							}
						});

		// 提交
		$(".js-submit").click(function() {

			activity.save(this);
		});
	},
	// 初使化修改
	initupdate : function() {

		activity.initadd();

		// 夺宝
		if (ActivityType == 1) {

			// 发行数量
			if (FullPurchase == "True") {

				// 显示外框
				$(".js-LssueNumber-item").show();

				// 重设插件，目的是清除验证提示
				$(".js-LssueNumber").validatebox('rest', {
					mode : "Static",
					required : true
				});

				$(".js-LssueNumber").val(LssueNumber);
			}

			// 开奖方式
			$(".js-Type").combobox("setValue", type);

			// 时间到开奖
			if (type == 2) {

				// 显示外框
				$(".js-LotteryTime-item").show();

				// 重设插件，目的是清除验证提示
				$(".js-TimeSlot").validatebox('rest', {
					mode : "Static",
					required : true
				});

				$(".js-TimeSlot").val(TimeSlot);
			}
		}

		// 金额购买
		$(".js-FullPurchase").combobox("setValue",
				FullPurchase == "True" ? true : false);

		// 区域选择
		$(".js-AreaLimit").combobox("setValue",
				AreaLimit == "True" ? true : false);

		// 活动期数（无限制）
		if (Periods == 0) {

			$(".js-PeriodsType").combobox("setValue", 2);
		}
		// 固定值
		else {
			$(".js-PeriodsType").combobox("setValue", 1);

			$(".js-Periods-item").show();

			// 重设插件，目的是清除验证提示
			$(".js-Periods").validatebox('rest', {
				mode : "Static",
				required : true
			});

			$(".js-Periods").val(Periods);

		}

		// 区域限制
		if (AreaLimit == "True") {

			// 显示外框
			$(".js-province").show();

			var pitem = '<div class="js-column-item clearfix"><span class="province1"></span><span class="province2"></span><a href="javascript:;" title="新增" class="js-column-add man-opt-icon icon-add"></a></div>';

			// 输出html
			$(".js-column").html(pitem);

			// 初使化省、市
			activity.initprovince($(".js-column-item"));

			var data = common.sringToJson(AddressJson);

			// 设置省、市项（方法）
			function setProvinceItem(target, provinceid, cityid) {

				// 设置省
				$(".province1", target).combobox("setValue", provinceid);

				// 设置市
				xgui.Ajax('/City/GetCity', {
					id : provinceid
				}, "json", true, function(o) {

					// 市
					$(".province2", $(target)).combobox("clear");

					if (o.length > 0) {

						// 市
						$(".province2", $(target)).combobox({
							localData : o
						}).combobox("setValue", cityid);
					}
				});
			}

			// 设置第一项数据
			setProvinceItem($(".js-column-item")[0], data[0].ProvinceID,
					data[0].CityID)

			for (i = 1; i < data.length; i++) {

				// 栏目项
				var item = $(
						'<div class="js-column-item clearfix" style="margin-top:10px;"><span class="province1"></span><span class="province2"></span><a href="javascript:;" title="删除" class="js-column-del man-opt-icon icon-del"></a></div>')
						.appendTo(".js-column");

				// 初使化省、市
				activity.initprovince(item);

				// 设置数据
				setProvinceItem($(".js-column-item")[i], data[i].ProvinceID,
						data[i].CityID)
			}
		}

	},
	// 初使化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 是否分页
							pagination : true,
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/Activity/List",
							// 远程参数
							queryParams : {
								ActivityType : ActivityType,
								ProductID : 0,
								GroupID : 0,
								CategoryID : 0,
								AuditStatus : 0
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											activity.update();
										});

								// 删除
								$(".js-del", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											activity.del();
										});

								// 更改状态
								$(".js-update-status", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											activity.setstatus();
										});
							},
							// 列
							columns : [ [
									{
										field : 'ProductName',
										title : '商品名称',
										width : 200,
										formatter : function(value, rowData,
												rowIndex) {
											return '<div class="pro-info"><img src="/upload/product/'
													+ rowData.ProductID
													+ '/small/'
													+ rowData.BigPicture
													+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
													+ value
													+ '</div></div></div>';
										}
									},
									{
										field : 'Periods',
										title : '活动期数',
										width : 80,
										formatter : function(value, rowData,
												rowIndex) {
											if (value == 0) {
												return "长期";
											}
											return '共' + value + "期";
										}
									},
									{
										field : 'ActivityNumber',
										title : '当前期数',
										width : 100,
										formatter : function(value, rowData,
												rowIndex) {

											if (value != null) {

												var html = '<a href="/Activity/Number?ID='
														+ rowData.ID
														+ '" style="color:red" title="单击进入查看！">第'
														+ value.Number + '期';

												if (ActivityType == 1) {

													if (value.Status == 1) {

														html += '[正在进行]</a>';
													} else if (value.Status == 2) {
														html += '[正在揭晓]</a>';
													} else if (value.Status == 3) {
														html += '[已结束]</a>';
													} else if (value.Status == 4) {

														html += '[作废]</a>';
													} else {
														html += '[你逗我]</a>';
													}
												}
												// 团购
												else {
													if (value.Status == 1) {

														html += '[正在进行]</a>';
													} else if (value.Status == 3) {
														html += '[已成团]</a>';
													} else if (value.Status == 4) {

														html += '[未成团]</a>';
													} else {
														html += '[你逗我]</a>';
													}
												}

												return html;
											}
											return "未开始";
										}
									},
									{
										field : 'Status',
										title : '活动状态',
										width : 80,
										formatter : function(value, rowData,
												rowIndex) {
											if (value == 1) {
												return "未启动";
											} else if (value == 2) {
												return "启动";
											} else {
												return "停止";
											}

										}
									},
									{
										field : 'AuditStatus',
										title : '审核状态',
										width : 80,
										formatter : function(value, rowData,
												rowIndex) {
											if (value == 1) {
												return "未审核";
											} else if (value == 2) {
												return "审核通过";
											}
											return "<span style='color:red;'>审核不通过</span>";
										}
									},
									{
										field : 'CreateDate',
										title : '创建时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									},
									{
										title : '操作',
										field : 'ID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {

											var btn = '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';

											if (rowData.Status == 2) {
												btn += '<a href="javascript:;" title="停止" class="js-stop js-update-status man-opt-icon icon-tz"></a>'
											}
											if (rowData.Status == 3) {
												btn += '<a href="javascript:;" title="生效" class="js-start js-update-status man-opt-icon icon-qd"></a>'
											}

											return btn;
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								activity.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});

		var activitydata = [];

		var column1 = {};
		column1["ID"] = 1;
		column1["Name"] = "夺宝";
		activitydata.push(column1);

		var column2 = {};
		column2["ID"] = 2;
		column2["Name"] = "团购";
		activitydata.push(column2);

		// 活动类别
		$("#js-ActivityType").combobox({
			localData : activitydata,
			valueField : 'ID',
			textField : 'Name',
			editable : false,
			value : ActivityType,
			width : 140,
			panelHeight : 220,
			onSelect : function(value, text) {

				window.location.href = '/activity?activitytype=' + value;
			}
		});

		// 商品
		$('#js-product')
				.combogrid(
						{

							url : "/Product/Search",
							// queryParams: { },
							// 行标
							rownumbers : true,
							idField : 'ProductID',
							textField : 'ProductName',
							// 远程检索
							queryMode : "remote",
							// name属性
							name : "ProductID",
							width : 140,
							panelWidth : 600,
							panelHeight : 400,
							// 列
							columns : [ [
									{
										field : 'ProductName',
										title : '商品名称',
										width : 260,
										formatter : function(value, rowData,
												rowIndex) {
											return '<div class="pro-info"><img src="/upload/product/'
													+ rowData.ProductID
													+ '/small/'
													+ rowData.BigPicture
													+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
													+ value
													+ '</div><div class="pro-price">￥'
													+ rowData.Price
													+ '</div></div></div>';
										}
									}, {
										field : 'CategoryName',
										title : '商品分类',
										width : 140
									}, {
										field : 'CreateDate',
										title : '创建时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									} ] ]
						});

		// 活动分类
		$("#js-category").combobox({
			url : '/Category/ListForCom',
			valueField : 'ProductCategoryID',
			textField : 'ProductCategoryName',
			width : 140,
			panelHeight : 220
		});

		// 活动分组
		$("#js-group").combobox({
			url : '/Group/ListForCom',
			valueField : 'ProductGroupID',
			textField : 'ProductGroupName',
			width : 140,
			panelHeight : 220
		});

		// 搜索
		$(".js-search").click(function() {

			// 商品
			var ProductID = $("#js-product").combogrid("getValue") || 0;

			// 活动分类
			var CategoryID = $("#js-category").combobox("getValue") || 0;

			// 活动分组
			var GroupID = 0;

			if (ActivityType == 1) {

				GroupID = $("#js-group").combobox("getValue") || 0;
			}

			// 审核状态
			var AuditStatus = $(".js-AuditStatus").combobox("getValue") || 0;

			// 刷新数据
			$("#grid").datagrid("reload", {
				ProductID : ProductID,
				CategoryID : CategoryID,
				GroupID : GroupID,
				AuditStatus : AuditStatus,
				pageIndex : 1
			});
		});

		// 编辑
		$(".js-update").click(function() {

			activity.update();
		});

		// 删除
		$(".js-delete").click(function() {

			activity.del();
		});

		// 得到地址
		$(".js-url").click(function() {

			// 得到treegrid的当前选中项
			var data = $("#grid").datagrid('getSelected');

			if (!data) {

				xgui.alert("请先选择要修改的数据！", "warn");

				return;
			}
			if (data.Status != 2) {
				xgui.alert("活动未启动，请等待活动启动！", "warn");

				return;
			}

			xgui.alert(url + "activity/ActivityDetails?id=" + data.ID);
			$(".msg-alert").width(420);

		});
	}
}

/*
 * 名称：活动审核
 */
var activityaudit = {

	// 审核
	audit : function() {

		// 得到treegrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		if (data.AuditStatus != 1) {

			xgui.alert("活动已审核，不可操作！", "warn");

			return;
		}

		window.location.href = '/Activity/Audit?ID=' + data.ID;
	},
	// 删除
	del : function(target) {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		// 数据存在
		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		if (data.AuditStatus != 1) {

			xgui.alert("活动已审核，不可操作！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/Activity/Delete", {
				ids : data.ID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				common.enableAtag($(target));

			});
		});
	},
	// 保存活动
	save : function(target) {

		// 禁用旁边按钮
		common.disableAtag($(target).siblings(".js-submit"));

		// 禁用按钮
		common.disableAtag($(target));

		// 显示loading
		xgui.loading("show", "正在提交。。。");

		// 异步验证
		$("#dlg-form")
				.form(
						'asyncValidate',
						function(o) {

							if (o) {

								var provinceids = [];

								// 区域限制
								var AreaLimit = $(".js-AreaLimit").combobox(
										"getValue");

								// 是
								if (AreaLimit == "true") {

									// 市项
									var proitem = $(".province2");

									// 市
									$.each(proitem, function(a, b) {

										// 市
										provinceids.push($(b).combobox(
												"getValue"));
									});
								}

								// 审核状态
								var AuditStatus = $(target).attr("type");

								xgui
										.Ajax(
												'/Activity/Audit',
												$("#dlg-form").serialize()
														+ "&Province="
														+ provinceids.join(',')
														+ "&ID=" + ID
														+ "&AuditStatus="
														+ AuditStatus,
												"json",
												true,
												function(o) {

													if (o.success) {

														xgui
																.msgtip(
																		o.msg,
																		"success",
																		function() {

																			window.parent.location = backurl
																					|| "/activity/manage?activitytype="
																					+ ActivityType;
																		});
													} else {

														xgui.msgtip(o.msg,
																"error");

														// 启用按钮
														common
																.enableAtag($(target));

														// 启用旁边按钮
														common
																.enableAtag($(
																		target)
																		.siblings(
																				".js-submit"));
													}

													// 隐藏loading
													xgui.loading("hide");
												});
							} else {
								// 隐藏loading
								xgui.loading("hide");

								// 启用按钮
								common.enableAtag($(target));

								// 启用旁边按钮
								common.enableAtag($(target).siblings(
										".js-submit"));
							}
						});
	},
	// 初使化添加
	initadd : function() {

		// 商品
		$('#ProductID')
				.combogrid(
						{

							url : "/Product/Search",
							// queryParams: { },
							// 行标
							rownumbers : true,
							idField : 'ProductID',
							textField : 'ProductName',
							// 远程检索
							queryMode : "remote",
							// name属性
							name : "ProductID",
							width : 360,
							panelWidth : 600,
							panelHeight : 400,
							required : true,
							mode : 'Static',
							// 列
							columns : [ [
									{
										field : 'ProductName',
										title : '商品名称',
										width : 260,
										formatter : function(value, rowData,
												rowIndex) {
											return '<div class="pro-info"><img src="/upload/product/'
													+ rowData.ProductID
													+ '/'
													+ rowData.BigPicture
													+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
													+ value
													+ '</div><div class="pro-price">￥'
													+ rowData.Price
													+ '</div></div></div>';
										}
									}, {
										field : 'CategoryName',
										title : '商品分类',
										width : 140
									}, {
										field : 'CreateDate',
										title : '创建时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									} ] ]
						});

		// 所属分组
		$("#GroupID").combobox({
			url : '/Group/ListForCom',
			valueField : 'ProductGroupID',
			textField : 'ProductGroupName',
			width : 360,
			panelHeight : 220,
			required : true,
			mode : 'Static',
			emptyCon : "商品分组"
		});

		// 金额购买
		$(".js-FullPurchase").combobox({

			onSelect : function(value) {

				// 金额购买不限发行数量
				if (ActivityType == 2) {

					return;
				}

				// 是
				if (value == "true") {

					if ($(".js-LssueNumber")[0]) {

						// 重设插件，目的是清除验证提示
						$(".js-LssueNumber").validatebox('rest', {
							mode : "Static",
							required : true
						});
					}

					$(".js-LssueNumber-item").show();
				} else {

					// 显示外框
					$(".js-LssueNumber-item").hide();

					// 重设插件，目的是清除验证提示
					$(".js-LssueNumber").validatebox('rest', {
						mode : "Real",
						required : false
					});
				}
			}
		});

		// 开奖方式(不用隐藏的方式，原因是隐藏后还可验证，有验证图标)
		$(".js-Type").combobox({

			onSelect : function(value) {

				// 人员满开奖
				if (value == 1) {

					if ($(".js-TimeSlot")[0]) {

						// 重设插件，目的是清除验证提示
						$(".js-TimeSlot").validatebox('rest', {
							mode : "Real",
							required : false
						});
					}

					$(".js-LotteryTime-item").hide();
				} else {

					// 显示外框
					$(".js-LotteryTime-item").show();

					// 重设插件，目的是清除验证提示
					$(".js-TimeSlot").validatebox('rest', {
						mode : "Static",
						required : true
					});
				}
			}
		});

		// 活动期数
		$(".js-PeriodsType").combobox({

			onSelect : function(value) {

				// 无限制
				if (value == 2) {

					if ($(".js-Periods")[0]) {

						// 重设插件，目的是清除验证提示
						$(".js-Periods").validatebox('rest', {
							mode : "Real",
							required : false
						});
					}

					$(".js-Periods-item").hide();
				} else {

					// 显示外框
					$(".js-Periods-item").show();

					// 重设插件，目的是清除验证提示
					$(".js-Periods").validatebox('rest', {
						mode : "Static",
						required : true
					});
				}
			}
		});

		// 区域选择
		$(".js-AreaLimit")
				.combobox(
						{

							onSelect : function(value) {

								// 是
								if (value == "true") {

									// 显示外框
									$(".js-province").show();

									var pitem = '<div class="js-column-item clearfix"><span class="province1"></span><span class="province2"></span><a href="javascript:;" title="新增" class="js-column-add man-opt-icon icon-add"></a></div>';

									// 输出html
									$(".js-column").html(pitem);

									// 初使化省、市
									activity.initprovince($(".js-column-item"));
								} else {

									if ($(".js-column-item")[0]) {

										// 市项
										var proitem = $(".province2");

										// 市
										$.each(proitem, function(a, b) {

											// 市
											$(b).combobox('rest');
										});

										// 清空插件
										$(".js-column").html("");
									}

									// 隐藏外框
									$(".js-province").hide();
								}
							}
						});

		// 提交
		$(".js-submit").click(function() {

			activityaudit.save(this);
		});
	},
	// 初使化修改
	initupdate : function() {

		activityaudit.initadd();

		// 夺宝
		if (ActivityType == 1) {

			// 发行数量
			if (FullPurchase == "True") {

				// 显示外框
				$(".js-LssueNumber-item").show();

				// 重设插件，目的是清除验证提示
				$(".js-LssueNumber").validatebox('rest', {
					mode : "Static",
					required : true
				});

				$(".js-LssueNumber").val(LssueNumber);
			}

			// 开奖方式
			$(".js-Type").combobox("setValue", type);

			// 时间到开奖
			if (type == 2) {

				// 显示外框
				$(".js-LotteryTime-item").show();

				// 重设插件，目的是清除验证提示
				$(".js-TimeSlot").validatebox('rest', {
					mode : "Static",
					required : true
				});

				$(".js-TimeSlot").val(TimeSlot);
			}
		}

		// 金额购买
		$(".js-FullPurchase").combobox("setValue",
				FullPurchase == "True" ? true : false);

		// 区域选择
		$(".js-AreaLimit").combobox("setValue",
				AreaLimit == "True" ? true : false);

		// 活动期数（无限制）
		if (Periods == 0) {

			$(".js-PeriodsType").combobox("setValue", 2);
		}
		// 固定值
		else {
			$(".js-PeriodsType").combobox("setValue", 1);

			$(".js-Periods-item").show();

			// 重设插件，目的是清除验证提示
			$(".js-Periods").validatebox('rest', {
				mode : "Static",
				required : true
			});

			$(".js-Periods").val(Periods);

		}

		// 区域限制
		if (AreaLimit == "True") {

			// 显示外框
			$(".js-province").show();

			var pitem = '<div class="js-column-item clearfix"><span class="province1"></span><span class="province2"></span><a href="javascript:;" title="新增" class="js-column-add man-opt-icon icon-add"></a></div>';

			// 输出html
			$(".js-column").html(pitem);

			// 初使化省、市
			activity.initprovince($(".js-column-item"));

			var data = common.sringToJson(AddressJson);

			// 设置省、市项（方法）
			function setProvinceItem(target, provinceid, cityid) {

				// 设置省
				$(".province1", target).combobox("setValue", provinceid);

				// 设置市
				xgui.Ajax('/City/GetCity', {
					id : provinceid
				}, "json", true, function(o) {

					// 市
					$(".province2", $(target)).combobox("clear");

					if (o.length > 0) {

						// 市
						$(".province2", $(target)).combobox({
							localData : o
						}).combobox("setValue", cityid);
					}
				});
			}

			// 设置第一项数据
			setProvinceItem($(".js-column-item")[0], data[0].ProvinceID,
					data[0].CityID)

			for (i = 1; i < data.length; i++) {

				// 栏目项
				var item = $(
						'<div class="js-column-item clearfix" style="margin-top:10px;"><span class="province1"></span><span class="province2"></span><a href="javascript:;" title="删除" class="js-column-del man-opt-icon icon-del"></a></div>')
						.appendTo(".js-column");

				// 初使化省、市
				activity.initprovince(item);

				// 设置数据
				setProvinceItem($(".js-column-item")[i], data[i].ProvinceID,
						data[i].CityID)
			}

		}
	},
	// 初使化
	init : function() {

		// 定义列集合
		var columns = new Array();

		var column1 = {};

		column1["field"] = "ProductName";
		column1["title"] = "商品名称";
		column1["width"] = 200;
		column1["formatter"] = function(value, rowData, rowIndex) {

			return '<div class="pro-info"><img src="/upload/product/'
					+ rowData.ProductID
					+ '/small/'
					+ rowData.BigPicture
					+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
					+ value + '</div></div></div>';
		}

		columns.push(column1);

		var column2 = {};

		column2["field"] = "Periods";
		column2["title"] = "活动期数";
		column2["width"] = 80;

		column2["formatter"] = function(value, rowData, rowIndex) {
			if (value == 0) {
				return "长期";
			}
			return '共' + value + "期";
		}

		columns.push(column2);

		var column3 = {};

		column3["field"] = "TotalCount";
		column3["title"] = "总需人次";
		column3["width"] = 80;

		columns.push(column3);

		// 夺宝
		if (ActivityType == 1) {

			var column4 = {};

			column4["field"] = "GroupName";
			column4["title"] = "商品分组";
			column4["width"] = 90;

			columns.push(column4);
		} else {
			var column4 = {};

			column4["field"] = "GroupPrice";
			column4["title"] = "团购价";
			column4["width"] = 90;

			columns.push(column4);
		}

		var column5 = {};

		column5["field"] = "AuditStatus";
		column5["title"] = "审核状态";
		column5["width"] = 80;
		column5["formatter"] = function(value, rowData, rowIndex) {
			if (value == 1) {
				return "未审核";
			} else if (value == 2) {
				return "审核通过";
			}
			return "审核不通过";
		}

		columns.push(column5);

		var column6 = {};

		column6["field"] = "CreateDate";
		column6["title"] = "创建时间";
		column6["width"] = 100;
		column6["formatter"] = function(value) {
			return common.jsonDateF(value);
		}

		columns.push(column6);

		var column7 = {};

		column7["field"] = "ID";
		column7["title"] = "操作";
		column7["width"] = 60;

		column7["formatter"] = function(value, rowData, rowIndex) {
			return '<a href="javascript:;" title="审核" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';
		}

		columns.push(column7);

		// 加载数据表格
		$("#grid").datagrid(
				{
					// 是否分页
					pagination : true,
					// 每页大小
					pageSize : 20,
					// 地址
					url : "/Activity/ManageList",
					// 远程参数
					queryParams : {
						ActivityType : ActivityType,
						ProductID : 0,
						CategoryID : 0,
						GroupID : 0,
						AuditStatus : 0
					},
					// 行标
					rownumbers : true,
					// 其它方法
					BindExternalEvents : function() {

						// 审核
						$(".js-update", $("#grid")).click(
								function() {

									// 行标
									var rowindex = $(this).parents(
											".xgui-datagrid-row").attr(
											"datagrid-row-index");

									// 设置行选中
									$("#grid").datagrid("selectRow", rowindex);

									activityaudit.audit();
								});

						// 删除
						$(".js-del", $("#grid")).click(
								function() {

									// 行标
									var rowindex = $(this).parents(
											".xgui-datagrid-row").attr(
											"datagrid-row-index");

									// 设置行选中
									$("#grid").datagrid("selectRow", rowindex);

									activityaudit.del();
								});
					},
					// 列
					columns : [

					columns ],
					// 双击操作
					onDblClickRow : function(rowData) {

						activityaudit.audit();

					},
					// 右击操作
					onRowContextMenu : function(e, rowData) {

						// 阻止右键菜单
						e.preventDefault();

						$('#ContextMenu').menu('show', {
							left : e.pageX,
							top : e.pageY
						});

					}
				});

		var activitydata = [];

		var column10 = {};
		column10["ID"] = 1;
		column10["Name"] = "夺宝";
		activitydata.push(column10);

		var column11 = {};
		column11["ID"] = 2;
		column11["Name"] = "团购";
		activitydata.push(column11);

		// 活动类别
		$("#js-ActivityType").combobox(
				{
					localData : activitydata,
					valueField : 'ID',
					textField : 'Name',
					editable : false,
					value : ActivityType,
					width : 140,
					panelHeight : 220,
					onSelect : function(value, text) {

						window.location.href = '/activity/manage?activitytype='
								+ value;
					}
				});

		// 商品
		$('#js-product')
				.combogrid(
						{

							url : "/Product/Search",
							// queryParams: { },
							// 行标
							rownumbers : true,
							idField : 'ProductID',
							textField : 'ProductName',
							// 远程检索
							queryMode : "remote",
							// name属性
							name : "ProductID",
							width : 140,
							panelWidth : 600,
							panelHeight : 400,
							// 列
							columns : [ [
									{
										field : 'ProductName',
										title : '商品名称',
										width : 260,
										formatter : function(value, rowData,
												rowIndex) {
											return '<div class="pro-info"><img src="/upload/product/'
													+ rowData.ProductID
													+ '/small/'
													+ rowData.BigPicture
													+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
													+ value
													+ '</div><div class="pro-price">￥'
													+ rowData.Price
													+ '</div></div></div>';
										}
									}, {
										field : 'CategoryName',
										title : '商品分类',
										width : 140
									}, {
										field : 'CreateDate',
										title : '创建时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									} ] ]
						});

		// 活动分类
		$("#js-category").combobox({
			url : '/Category/ListForCom',
			valueField : 'ProductCategoryID',
			textField : 'ProductCategoryName',
			width : 140,
			panelHeight : 220
		});

		// 活动分组
		$("#js-group").combobox({
			url : '/Group/ListForCom',
			valueField : 'ProductGroupID',
			textField : 'ProductGroupName',
			width : 140,
			panelHeight : 220
		});

		// 搜索
		$(".js-search").click(function() {

			// 商品
			var ProductID = $("#js-product").combogrid("getValue") || 0;

			// 活动分类
			var CategoryID = $("#js-category").combobox("getValue") || 0;

			// 活动分组
			var GroupID = 0;

			// 夺宝
			if (ActivityType == 1) {

				GroupID = $("#js-group").combobox("getValue") || 0;
			}

			// 审核状态
			var AuditStatus = $(".js-AuditStatus").combobox("getValue") || 0;

			// 刷新数据
			$("#grid").datagrid("reload", {
				ProductID : ProductID,
				CategoryID : CategoryID,
				GroupID : GroupID,
				AuditStatus : AuditStatus,
				pageIndex : 1
			});
		});

		// 编辑
		$(".js-update").click(function() {

			activityaudit.audit();
		});

		// 删除
		$(".js-delete").click(function() {

			activityaudit.del();
		});

	}
}

/*
 * 名称：活动期数
 */
var activitynumber = {

	// 详情
	detail : function() {

		// 选中数据
		var data = $("#grid").datagrid("getSelected");

		if (!data) {

			xgui.alert("请先选择要查看的数据！", "warn");

			return;
		}

		// 打开对话框
		$("#number-dlg").dialog("open");

		// 历史违纪
		$("#user-grid")
				.datagrid(
						{
							// 高
							height : 400,
							// 地址
							url : "/activity/OrderRecordList",
							// 远程参数
							queryParams : {
								ActivityID : data.ID,
								KeyWord : ""
							},
							// 行标
							rownumbers : true,
							frozenHeader : false,
							// 标识
							idField : 'ID',
							// 列
							columns : [ [
									{
										field : 'Nickname',
										title : '姓名',
										width : 100,
										formatter : function(value, rowdata) {
											return '<img src='
													+ rowdata.HeadImgUrl
													+ ' class="user-avatar" />'
													+ value;
										}
									}, {
										field : 'Sex',
										title : '性别',
										width : 80,
										formatter : function(value) {
											if (value == 1) {
												return "男";
											} else if (value == 2) {
												return "女";
											}
											return "未知";
										}
									}, {
										field : 'IPAddress',
										title : 'IP地址',
										width : 120
									}, {
										field : 'JoinCount',
										title : '参与人次',
										width : 80
									}, {
										field : 'CreateDate',
										title : '参与时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									} ] ],
							onLoadSuccess : function() {

								// 设置对话框居中
								xgui.setcenter($("#number-dlg"));
							}
						});
	},
	// 初使化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 是否分页
							pagination : true,
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/Activity/NumberList",
							// 远程参数
							queryParams : {
								ActivityID : ActivityID,
								Status : 0,
								GroupID : 0
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 详情
								$(".js-detail", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											activitynumber.detail();
										});
							},
							// 列
							columns : [ [
									{
										field : 'Number',
										title : '活动期数',
										width : 80,
										formatter : function(value, rowData,
												rowIndex) {

											return '第' + value + "期";
										}
									},
									{
										field : 'TotalCount',
										title : '总需人次',
										width : 80
									},
									{
										field : 'ExcessCount',
										title : '剩余人次',
										width : 80
									},
									{
										field : 'Price',
										title : '成本',
										width : 80,
										formatter : function(value, rowData,
												rowIndex) {

											return "￥" + value;
										}
									},
									{
										field : 'Status',
										title : '活动状态',
										width : 80,
										formatter : function(value, rowData,
												rowIndex) {

											// 夺宝
											if (rowData.ActivityType == 1) {
												if (value == 1) {
													return "进行中";
												} else if (value == 2) {
													return "正在揭晓";
												} else if (value == 3) {
													return "已结束";
												}
												return "作废"
											}
											// 团购
											else {
												if (value == 1) {
													return "进行中";
												} else if (value == 3) {
													return "已成团";
												} else if (value == 4) {
													return "未成团";
												}
												return "未知错误"
											}
										}
									},
									{
										field : 'CreateDate',
										title : '开始时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value);
										}
									},
									{
										title : '操作',
										field : 'ID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="详情" class="js-detail man-opt-icon icon-detail"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								activitynumber.detail();
							}
						});

		// //商品
		// $('#js-product').combogrid({

		// url: "/Product/Search",
		// //queryParams: { },
		// //行标
		// rownumbers: true,
		// idField: 'ProductID',
		// textField: 'ProductName',
		// //远程检索
		// queryMode: "remote",
		// //name属性
		// name: "ProductID",
		// width: 140,
		// panelWidth: 600,
		// panelHeight: 400,
		// //列
		// columns: [[
		// {
		// field: 'ProductName', title: '商品名称', width: 260,
		// formatter: function (value, rowData, rowIndex) {
		// return '<div class="pro-info"><img src="/upload/product/' +
		// rowData.ProductID + '/' + rowData.BigPicture + '"
		// class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
		// + value + '</div><div class="pro-price">￥' + rowData.Price +
		// '</div></div></div>';
		// }
		// },
		// { field: 'CategoryName', title: '商品分类', width: 140 },
		// {
		// field: 'CreateDate', title: '创建时间', width: 100,
		// formatter: function (value) {
		// return common.jsonDateF(value);
		// }
		// }
		// ]]
		// });

		// //搜索
		// $(".js-search").click(function () {

		// //商品
		// var ProductID = $("#js-product").combogrid("getValue") || 0;

		// //刷新数据
		// $("#grid").datagrid("reload", { ProductID: ProductID, pageIndex: 1
		// });
		// });

		// 搜索2
		$(".js-search2").click(function() {

			// 商品
			var keyword = $("#Name").validatebox("getValue");

			// 刷新数据
			$("#user-grid").datagrid("reload", {
				KeyWord : keyword,
				pageIndex : 1
			});
		});
	}
}

/*
 * 名称：订单管理
 */
var order = {

	// 日志列表
	List : function(PageIndex) {

		var isLoad = true;

		if (!isLoad) {
			return;
		}

		// 物流方式
		var ExpressType = $("#js-express").combobox("getValue") || 0;

		// 订单状态
		var OrderStatus = $("#js-orderstatus").combobox("getValue") || 0;

		// 揭晓时间
		var OrderStartDate = $("#js-startdate").datebox("getValue");

		// 揭晓时间
		var OrderEndDate = $("#js-enddate").datebox("getValue");

		// 关键字
		var keyWord = $(".js-search-input").val();

		// 购买方式
		var type = $("#js-type").combobox("getValue") || 0;

		xgui.Ajax("/Order/List", {
			PageIndex : PageIndex,
			ExpressType : ExpressType,
			OrderStatus : OrderStatus,
			OrderStartDate : OrderStartDate,
			OrderEndDate : OrderEndDate,
			keyWord : keyWord,
			Type : type
		}, "json", true, function(o) {

			if (o.success) {

				$(".js-data-list").html(o.data);

				// 绑定日志载入事件
				order.Event();
			} else {

				xgui.alert(o.msg, "error");
			}
		}, null, function() {

			isLoad = false;
			xgui.loading("show", "数据载入中");

		}, function() {

			isLoad = true;
			xgui.loading("hide");
		});
	},
	// 列表事件
	Event : function() {

		// 表格样式
		$(".order-item").bind("mouseenter", function() {

			$(this).addClass("current");

			$(this).find(".js-order-opt").show();
		}).bind("mouseleave", function() {

			$(this).removeClass("current");

			$(this).find(".js-order-opt").hide();
		});

		// 备注
		$(".js-order-remark")
				.click(
						function() {

							// 给from赋值
							$("#dlg-form1").form('clear');

							var orderid = $(this).parents(".order-item").attr(
									"dataid");

							$("#dlg-form1").find("input[name=OrderID]").val(
									orderid);

							var text = $(this).parents(".order-item").find(
									".js-remark-info").text();

							// 设置值
							$(".js-desc", $("#dlg1")).val(text);

							$("#dlg1").dialog("open");
						});

		// 订单发货
		$(".js-delivery").click(function() {

			var orderid = $(this).parents(".order-item").attr("dataid");

			order.delivery(orderid);
		});

		// 全选
		$(".js-check-all").bind(
				'click',
				function() {

					if (this.checked) {

						$(".order-item").find(".datagrid-header-check:enabled")
								.attr("checked", true);
					} else {

						$(".order-item").find(".datagrid-header-check:enabled")
								.attr("checked", false);
					}
				});

		// 绑定分页
		$(".list-page a").unbind("click").
		// 单击事件
		bind("click", function() {

			// 分页
			var pageIndex = $(this).attr("page");

			// 载入列表
			order.List(pageIndex);
		});
	},
	// 添加备注
	addRemark : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}

		xgui
				.Ajax(
						'/Order/AddRemark',
						$("#dlg-form1").serialize(),
						"json",
						true,
						function(o) {

							if (o.success) {

								xgui.msgtip(o.msg, "success");

								var text = '<span class="info-tit">备注：</span><span class="js-remark-info">'
										+ $(".js-desc").val() + '</span>';

								var id = $("#dlg-form1").find(
										"input[name=OrderID]").val();

								// 设置值
								$(".order-item[dataid=" + id + "]").find(
										".order-remark").html(text);

								$("#dlg1").dialog("close");
							} else {

								xgui.msgtip(o.msg, "error");
							}

						}, null, function() {

							// 显示loading
							xgui.loading("show");

						}, function() {

							// 隐藏loading
							xgui.loading("hide");
						});

	},
	// 订单发货
	delivery : function(ids) {

		// 打开dialog框并设置标题
		$("#dlg2").dialog("open").dialog("setTitle", "订单发货");

		xgui.Ajax("/Order/DeliveryList", {
			Type : OrderType,
			ids : ids
		}, "json", true, function(o) {

			if (o.success) {

				var data = $("#dlg2").find(".dlg-form1").html(o.data);

				// 重设插件
				$.parser.parse(data);

				// 重设对话框居中
				xgui.setcenter($("#dlg2"));
			} else {
				xgui.alert(o.msg, "error");
			}

		}, null, function() {

			xgui.loading("show", "正在加载。。。");

		}, function() {

			xgui.loading("hide");
		});
	},
	// 保存（订单发货）
	save : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form2").form("validate")) {
			return;
		}

		var jsondata = "";

		var datarow = $("#dlg2").find(".order-item");

		$.each(datarow, function(a, b) {

			var item = $(b);

			var id = item.attr("dataid");

			// 快递类别
			var ExpressCompany = item.find(".js-ExpressCompany").combobox(
					"getValue");

			// 快递单号
			var ExpressNum = item.find(".ExpressNum").val();

			jsondata += id + "," + ExpressCompany + "," + ExpressNum + "|";
		});

		jsondata = jsondata.substring(0, jsondata.length - 1);

		xgui.Ajax("/Order/DeliverySave", {
			jsondata : jsondata,
			Type : OrderType
		}, "json", true, function(o) {

			if (o.success) {

				// 关闭dialog对话框
				$('#dlg2').dialog('close');

				xgui.msgtip(o.msg, "success", function() {

					window.location.href = window.location.href;
				});
			} else {
				xgui.alert(o.msg, "error");
			}

		}, null, function() {

			xgui.loading("show", "正在提交。。。");

			// 禁用
			common.disableAtag($(target));

		}, function() {

			xgui.loading("hide");

			// 启用
			common.enableAtag($(target));
		});

	},
	// 初使化
	init : function() {

		// 物流方式
		$("#js-express").combobox({
			url : '/Shipping/TypeListForCom',
			valueField : 'ExpressTypeID',
			textField : 'ExpressTypeName',
			width : 140,
			panelHeight : 220
		});

		// 订单状态
		$("#js-orderstatus").combobox({
			url : '/Order/StatusListForCom',
			valueField : 'OrderStatusID',
			textField : 'OrderStatusName',
			width : 140,
			panelHeight : 220
		});

		// 购买方式
		$("#js-type").combobox({
			// value: 1,
			onSelect : function(value, text) {

				window.location.href = "/order?type=" + value;
			}
		}).combobox("setValue", OrderType);

		// 搜索
		$(".js-search").click(function() {

			order.List(1);
		});

		// 订单导出
		$(".js-export")
				.click(
						function() {

							// 物流方式
							var ExpressType = $("#js-express").combobox(
									"getValue") || 0;

							// 订单状态
							var OrderStatus = $("#js-orderstatus").combobox(
									"getValue") || 0;

							// 揭晓时间
							var OrderStartDate = $("#js-startdate").datebox(
									"getValue");

							// 揭晓时间
							var OrderEndDate = $("#js-enddate").datebox(
									"getValue");

							// 关键字
							var keyWord = $(".js-search-input").val();

							// 购买方式
							var type = $("#js-type").combobox("getValue");

							window.location.href = "/order/ExportExcel?ExpressType="
									+ ExpressType
									+ "&OrderStatus="
									+ OrderStatus
									+ "&OrderStartDate="
									+ OrderStartDate
									+ "&OrderEndDate="
									+ OrderEndDate
									+ "&keyWord="
									+ keyWord
									+ "&type=" + type;

						});

		// 批量发货
		$(".js-batch-delivery").click(function() {

			var ids = [];

			var data = $(".order-item").find(".datagrid-header-check:checked");

			if (data.length == 0) {
				xgui.alert("请勾选要发货的数据！", "error");
				return;
			}

			for (i = 0; i < data.length; i++) {
				var item = $(data[i]);

				var id = item.parents(".order-item").attr("dataid");

				ids.push(id);
			}

			order.delivery(ids.join(','));
		});

		// 订单备注
		$(".js-submit1").click(function() {

			order.addRemark();
		});

		// 取消
		$(".js-cancel1").click(function() {

			$("#dlg1").dialog("close");
		});

		// 保存（订单发货）
		$(".js-submit2").click(function() {

			order.save();
		});

		// 取消（订单发货）
		$(".js-cancel2").click(function() {

			$("#dlg2").dialog("close");
		});

		// 表格事件
		order.Event();
	}
}

/*
 * 名称：订单详情
 */
var orderinfo = {

	// 修改
	update : function() {

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "修改收货信息");

		// 省
		$("#province1").combobox("setValue", province1);

		// 市
		xgui.Ajax('/City/GetCity', {
			id : province1
		}, "json", true, function(o) {

			$("#province2").combobox({
				localData : o
			}).combobox("setValue", province2);

		});

		// 区
		xgui.Ajax('/City/GetArea', {
			id : province2
		}, "json", true, function(o) {

			$("#province3").combobox({
				localData : o
			}).combobox("setValue", province3);
		});

	},
	// 保存
	save : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}

		xgui.Ajax("/Order/Update", $("#dlg-form1").serialize(), "json", true,
				function(o) {

					if (o.success) {

						// 关闭dialog对话框
						$('#dlg1').dialog('close');

						xgui.msgtip(o.msg, "success", function() {

							window.location.href = window.location.href;
						});
					} else {
						xgui.alert(o.msg, "error");
					}

				}, null, function() {

					xgui.loading("show", "正在提交。。。");

					// 禁用
					common.disableAtag($(target));

				}, function() {

					xgui.loading("hide");

					// 启用
					common.enableAtag($(target));
				});

	},
	// 初使化
	init : function() {

		// 省
		$("#province1").combobox({
			url : '/City/GetProvince',
			valueField : 'ProvinceId',
			textField : 'ProvinceName',
			width : 140,
			panelHeight : 220,
			emptyCon : "选择省",
			onSelect : function(value) {

				xgui.Ajax('/City/GetCity', {
					id : value
				}, "json", true, function(o) {

					// 清除市和区
					$("#province2,#province3").combobox("clear");

					// if (o.length > 0) {

					$("#province2").combobox({
						localData : o
					});
					// }

				});
			}
		});

		// 市
		$("#province2").combobox({
			valueField : 'RegionId',
			textField : 'RegionName',
			width : 140,
			panelHeight : 220,
			emptyCon : "选择市",
			onSelect : function(value) {

				xgui.Ajax('/City/GetArea', {
					id : value
				}, "json", true, function(o) {

					// 清除区
					$("#province3").combobox("clear");

					// if (o.length > 0) {

					$("#province3").combobox({
						localData : o
					});
					// }
				});
			}
		});

		// 区
		$("#province3").combobox({
			valueField : 'RegionId',
			textField : 'RegionName',
			name : 'RegionID',
			width : 140,
			required : true,
			panelHeight : 220,
			emptyCon : "选择区"
		});

		// 修改地址
		$(".js-update-address").click(function() {

			orderinfo.update();
		});

		// 绑定是（菜单）
		$(".js-submit1").click(function() {

			orderinfo.save(this);
		});

		// 绑定否
		$(".js-cancel1").click(function() {

			// 关闭dialog对话框
			$('#dlg1').dialog('close');
		});
	}
}

/*
 * 名称：收入管理
 */
var income = {

	// 初使化
	init : function() {

		// 一元夺宝
		if (OrderType == 1) {

			$("#grid")
					.datagrid(
							{
								// 是否分页
								pagination : true,
								// 每页大小
								pageSize : 10,
								// 地址
								url : "/Income/List",
								// 远程参数
								queryParams : {
									Type : 1
								},
								// 行标
								// rownumbers: true,
								// 其它方法
								BindExternalEvents : function() {
									// var id =
									// item.parents(".order-item").attr("dataid");

								},
								// 列
								columns : [ [

										{
											field : 'ProductName',
											title : '商品名称',
											width : 240,
											formatter : function(value,
													rowData, rowIndex) {
												return '<div class="pro-info"><img src="/upload/product/'
														+ rowData.ProductID
														+ '/small/'
														+ rowData.BigPicture
														+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
														+ value
														+ '</div><div class="pro-price">第'
														+ rowData.Number
														+ '期</div></div></div>';
											}
										},
										{
											field : 'FinalLotteryTime',
											title : '揭晓时间',
											width : 100,
											formatter : function(value) {
												return common.jsonDateF(value,
														"yyyy-MM-dd hh:mm");
											}
										},
										{
											field : 'OrderNum',
											title : '订单号',
											width : 100
										},
										{
											field : 'Nickname',
											title : '获得者',
											width : 80
										},
										{
											field : 'OrderPrice',
											title : '订单金额',
											width : 80
										},
										{
											field : 'Price',
											title : '成本',
											width : 80
										},
										{
											field : 'cc',
											title : '盈利',
											width : 80,
											formatter : function(value,
													rowData, rowIndex) {
												return rowData.OrderPrice
														- rowData.Price;
											}
										} ] ]

							});
		} else if (OrderType == 2) {

			$("#grid")
					.datagrid(
							{
								// 是否分页
								pagination : true,
								// 每页大小
								pageSize : 10,
								// 地址
								url : "/Income/List",
								// 远程参数
								queryParams : {
									Type : 2
								},
								// 行标
								// rownumbers: true,
								// 其它方法
								BindExternalEvents : function() {
									// var id =
									// item.parents(".order-item").attr("dataid");

								},
								// 列
								columns : [ [

										{
											field : 'ProductName',
											title : '商品名称',
											width : 240,
											formatter : function(value,
													rowData, rowIndex) {
												return '<div class="pro-info"><img src="/upload/product/'
														+ rowData.ProductID
														+ '/small/'
														+ rowData.BigPicture
														+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
														+ value
														+ '</div><div class="pro-price">第'
														+ rowData.Number
														+ '期</div></div></div>';
											}
										},
										{
											field : 'OrderTime',
											title : '购买时间',
											width : 100,
											formatter : function(value) {
												return common.jsonDateF(value,
														"yyyy-MM-dd hh:mm");
											}
										},
										{
											field : 'OrderNum',
											title : '订单号',
											width : 100
										},
										{
											field : 'Nickname',
											title : '购买者',
											width : 80
										},
										{
											field : 'MarketPrice',
											title : '商品单价',
											width : 80
										},
										{
											field : 'JoinCount',
											title : '购买数量',
											width : 80
										},
										{
											field : 'aa',
											title : '订单金额',
											width : 80,
											formatter : function(value,
													rowData, rowIndex) {
												return rowData.MarketPrice
														* rowData.JoinCount;
											}
										},
										{
											field : 'bb',
											title : '成本',
											width : 80,
											formatter : function(value,
													rowData, rowIndex) {
												return rowData.Price
														* rowData.JoinCount;
											}
										},
										{
											field : 'cc',
											title : '盈利',
											width : 80,
											formatter : function(value,
													rowData, rowIndex) {
												return ((rowData.MarketPrice * rowData.JoinCount) - (rowData.Price * rowData.JoinCount));
											}
										} ] ]

							});
		} else {
			$("#grid")
					.datagrid(
							{
								// 是否分页
								pagination : true,
								// 每页大小
								pageSize : 10,
								// 地址
								url : "/Income/GroupList",
								// 远程参数
								// queryParams: { Type: 3 },
								// 行标
								// rownumbers: true,
								// 其它方法
								BindExternalEvents : function() {
									// var id =
									// item.parents(".order-item").attr("dataid");

								},
								// 列
								columns : [ [
										{
											field : 'ActivityNumberID',
											title : '活动期号',
											width : 60
										},
										{
											field : 'ProductName',
											title : '团购商品',
											width : 240,
											formatter : function(value,
													rowData, rowIndex) {
												return '<div class="pro-info"><img src="/upload/product/'
														+ rowData.ProductID
														+ '/small/'
														+ rowData.BigPicture
														+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
														+ value
														+ '</div><div class="pro-price">第'
														+ rowData.Number
														+ '期</div></div></div>';
											}
										},
										{
											field : 'LotteryTime',
											title : '结束时间',
											width : 100,
											formatter : function(value) {
												return common.jsonDateF(value,
														"yyyy-MM-dd hh:mm");
											}
										},
										{
											field : 'GroupPrice',
											title : '拼团价格',
											width : 80
										},
										{
											field : 'HaveCount',
											title : '拼团数量',
											width : 80
										},
										{
											field : 'bb',
											title : '成本',
											width : 80,
											formatter : function(value,
													rowData, rowIndex) {
												return rowData.Price
														* rowData.HaveCount;
											}
										},
										{
											field : 'cc',
											title : '盈利',
											width : 80,
											formatter : function(value,
													rowData, rowIndex) {
												return (rowData.OrderPrice - rowData.Price
														* rowData.HaveCount);
											}
										} ] ]

							});
		}

		// 购买方式
		$("#js-type").combobox({
			// value: 1,
			onSelect : function(value, text) {

				window.location.href = "/income?type=" + value;
			}
		}).combobox("setValue", OrderType);

		// 搜索
		$(".js-search").click(function() {

			// 揭晓时间
			var OrderStartDate = $("#js-startdate").datebox("getValue");

			// 揭晓时间
			var OrderEndDate = $("#js-enddate").datebox("getValue");

			// 刷新数据
			$("#grid").datagrid("reload", {
				OrderStartDate : OrderStartDate,
				OrderEndDate : OrderEndDate,
				pageIndex : 1
			});

		});

		// 订单导出
		$(".js-export")
				.click(
						function() {

							// 揭晓时间
							var OrderStartDate = $("#js-startdate").datebox(
									"getValue");

							// 揭晓时间
							var OrderEndDate = $("#js-enddate").datebox(
									"getValue");

							window.location.href = "/Income/ExportExcel?OrderStartDate="
									+ OrderStartDate
									+ "&OrderEndDate="
									+ OrderEndDate /*
													 * + "&keyWord=" + keyWord
													 */+ "&type=" + OrderType;
						});

	}
}

/*
 * 名称：交易记录
 */
var incomerecord = {

	// 初使化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 是否分页
							pagination : true,
							// 每页大小
							pageSize : 10,
							// 地址
							url : "/Income/RecordList",
							// 远程参数
							queryParams : {
								StartDate : "",
								EndDate : "",
								keyWord : ""
							},
							// 行标
							// rownumbers: true,
							// 其它方法
							BindExternalEvents : function() {

							},
							// 列
							columns : [ [
									{
										field : 'ProductName',
										title : '商品名称',
										width : 160,
										formatter : function(value, rowData,
												rowIndex) {
											return '<div class="pro-info"><img src="/upload/product/'
													+ rowData.ProductID
													+ '/small/'
													+ rowData.BigPicture
													+ '" class="pro-pic"><div class="pro-info-detail"><div class="pro-name">'
													+ value
													+ '</div><div class="pro-price">第'
													+ rowData.Number
													+ '期</div></div></div>';
										}
									},
									{
										field : 'Nickname',
										title : '购买者',
										width : 80
									},
									{
										field : 'CreateDate',
										title : '购买时间',
										width : 100,
										formatter : function(value) {
											return common.jsonDateF(value,
													"yyyy-MM-dd hh:mm");
										}
									}, {
										field : 'JoinCount',
										title : '购买数量',
										width : 80
									}, {
										field : 'AmountPayable',
										title : '支付金额',
										width : 80
									} ] ]
						});

		// 搜索
		$(".js-search").click(function() {

			// 起始时间
			var StartDate = $("#js-startdate").datebox("getValue");

			// 结束时间
			var EndDate = $("#js-enddate").datebox("getValue");

			// 关键字
			var keyWord = $(".js-search-input").val();

			// 刷新数据
			$("#grid").datagrid("reload", {
				StartDate : StartDate,
				EndDate : EndDate,
				keyWord : keyWord,
				pageIndex : 1
			});

		});

	}
}

/*
 * 名称：banner管理
 */
var banner = {
	mark : 1,
	// 初始化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/Banner/List",
							// 远程参数
							queryParams : {
								keyWord : ''
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											banner.update();
										});

								// 删除
								$(".js-del", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											banner.del();
										});
							},
							// 列
							columns : [ [
									{
										field : 'Title',
										title : '广告条名称',
										width : 80
									},
									{
										field : 'Img',
										title : '缩略图',
										width : 80,
										formatter : function(value) {
											if (value == null) {
												return " ";
											} else
												return '<img style="width: 64px; height: 32px;padding-top:4px;" src="'
														+ '/upload/banner/'
														+ value + '">';
										}
									},
									{
										field : 'ProductName',
										title : '活动商品',
										width : 120
									},
									{
										field : 'StartDate',
										title : '开始时间',
										width : 80,
										formatter : function(value) {
											return value == null ? "" : common
													.jsonDateF(value,
															"yyyy-MM-dd");
										}
									},
									{
										field : 'IsValid',
										title : '是否有效',
										width : 60,
										formatter : function(value) {
											return value == 1 ? "是"
													: "<span style='color:red;'>否</span>"
										}
									},
									{
										field : 'Sort',
										title : '排序',
										width : 60
									},
									{
										title : '操作',
										field : 'BannerId',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="修改" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {

								banner.update();

							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});
							},

						});

		// 搜索
		$(".js-search").click(function() {

			// 名称
			var keyword = $(".js-search-input").val();

			// 刷新数据
			$("#grid").datagrid("reload", {
				keyWord : keyword,
				pageIndex : 1
			});

		});

		// 添加
		$(".js-add").click(function() {

			banner.add();
		});

		// 修改
		$(".js-update").click(function() {

			banner.update();
		});

		// 删除
		$(".js-delete").click(function() {

			banner.del();
		});

		// 绑定是（菜单）
		$(".js-submit1").click(function() {

			banner.save(this);
		});

		// 绑定否
		$(".js-cancel1").click(function() {

			// 关闭dialog对话框
			$('#dlg1').dialog('close');
		});

		// 上传图片
		productCategory.myUpload();
	},
	// 添加
	add : function() {
		// 添加标记
		banner.mark = 1;

		// 清除form数据
		$("#dlg-form1").form('clear');

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "添加广告条");

		// 上传图片
		productCategory.myUpload();
		$("#iconpic").attr("src", "/Images/add_img.png");

		// 活动
		$("#activity").combobox({
			url : "/Activity/ListForCom",
			valueField : "ID",
			textField : "ProductName",
		});
	},
	// 修改
	update : function() {

		// 修改标记
		banner.mark = 0;

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "修改广告条");

		// 给form赋值
		console.log("给form赋值");
		xgui.Ajax("/Banner/Details", {
			ID : data.BannerId
		}, "json", true, function(o) {

			$("#dlg-form1").form('clear').form("load", o);
			var activityId = $("input[name=ActivityID]").val();
			// 上传图片
			productCategory.myUpload();

			// icon预览图
			console.log("icon预览图");
			var icon = $("#dlg-form1").find("input[name=Img]").val();
			if (icon == "")
				$("#iconpic").attr("src", "/Images/add_img.png");
			else
				$("#iconpic").attr("src", "/upload/banner/" + icon);

			// 活动
			xgui.Ajax("/Activity/ListForCom", {}, "json", true, function(o) {
				$("#activity").combobox({
					localData : o,
					valueField : "ID",
					textField : "ProductName"
				}).combobox("setValue", activityId);
				// $("#activity").combobox("setValue", activityId);
			});
		});
	},
	// 删除
	del : function() {
		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/Banner/Delete", {
				ID : data.BannerId
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新datagrid数据表格
					$("#grid").datagrid('reload');
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

			}, function() {

				xgui.loading("hide");
			});
		});
	},
	// 保存
	save : function(target) {
		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}

		// 添加
		if (banner.mark == 1) {

			xgui.Ajax("/Banner/Add", $("#dlg-form1").serialize(), "json", true,
					function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
		// 修改
		else {

			xgui.Ajax("/Banner/Update", $("#dlg-form1").serialize(), "json",
					true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
	}
}

/*
 * 名称：晒单管理
 */
var comment = {
	// 初始化
	init : function() {
		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/Comment/List",
							// 远程参数
							queryParams : {
								keyWord : '',

							},
							// 行标
							// rownumbers: true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											comment.alter();
										});

							},
							// 列
							columns : [ [
									{
										field : 'ID',
										checkbox : true
									},
									{
										field : 'Nickname',
										title : '昵称',
										width : 80
									},
									{
										field : 'Title',
										title : '标题',
										width : 160
									},
									// {
									// field: 'Pic', title: '图片', width: 60,
									// formatter: function (value) {
									// var img = "";
									// if (value == "") {
									// img = "无";
									// }
									// else {
									// var imglist = [];
									// imglist = value.split(",");
									// var imgNum = imglist.length;
									// // while (imgNum--) {
									// // img += "<img style='width: 32px;
									// height:
									// 32px;padding-top:4px;'
									// src='"+config.wechaturl+"share/"+""+"/small/"
									// +
									// imglist[imgNum] + "'>";
									// // }
									// img = "<span style='color:red'>" + imgNum
									// + "</span>";
									// }
									// return img;
									// }
									// },
									/*
									 * { field: 'Img', title: '缩略图', width: 80,
									 * formatter: function (value) { if (value ==
									 * null) { return " ";} else return '<img
									 * style="width: 32px; height:
									 * 32px;padding-top:4px;" src="' + value +
									 * '">'; } },
									 */
									// { field: 'Content', title: '内容', width:
									// 260 },
									{
										field : 'ProductName',
										title : '活动商品',
										width : 160
									},
									{
										field : 'ActivityNumberID',
										title : '活动期数',
										width : 60
									},
									{
										field : 'CreateDate',
										title : '发表时间',
										width : 80,
										formatter : function(value) {
											return value == null ? "" : common
													.jsonDateF(value,
															"yyyy-MM-dd");
										}
									},
									{
										field : 'IsShow',
										title : '显示',
										width : 60,
										formatter : function(value) {
											return value == 1 ? "是"
													: "<span style='color:red;'>否</span>";
										}
									},
									{
										title : '操作',
										field : 'ID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="更改状态" class="js-update man-opt-icon icon-edit"></a>';
										}
									} ] ],
							// 双击操作
							onDblClickRow : function(rowData) {
								comment.zoomIn();
							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});

		// 搜索
		$(".js-search").click(function() {

			// 名称
			var keyword = $(".js-search-input").val();
			var dateFrom = $("#dateFrom").datebox("getValue");
			var dateTo = $("#dateTo").datebox("getValue");
			var isShow = $("#isShow").combobox("getValue");
			// 刷新数据
			$("#grid").datagrid("reload", {
				keyWord : keyword,
				dateFrom : dateFrom,
				dateTo : dateTo,
				pageIndex : 1,
				isShow : isShow,
			});

		});
		// 放大
		$(".js-zoom").click(function() {
			comment.zoomIn();
		});
		// 修改
		$(".js-update").click(function() {
			comment.alter();
		});

		// 批量修改
		$(".js-update2").click(function() {
			comment.alterBatch(this);
		});
	},
	zoomIn : function() {
		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');
		if (!data) {

			xgui.alert("请先选择要查看的数据！", "warn");

			return;
		}
		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "查看晒单图文");
		// $("#dlg-form1").empty();
		$("#commentTitle").empty();
		$("#commentNickname").empty();
		$("#commentContent").empty();
		$("#commentPic").empty();
		// 给form赋值
		$("#commentTitle").append(data.Title);
		$("#commentNickname").append(
				data.Nickname + " " + common.jsonDateF(data.CreateDate));
		$("#commentContent").append(data.Content);
		var imgLen = 0;
		var imglist = [];
		if (data.Pic != "") {
			imglist = data.Pic.split(",");
		}
		imgLen = imglist.length;
		while (imgLen--) {
			$("#commentPic").append(
					'<img class="commentImg" src="' + config.wechaturl
							+ 'share/' + data.OrderID + '/big/'
							+ imglist[imgLen] + '">');
		}

		// 浏览器
		var win = $(window);

		// 对话框
		var dlg = $("#dlg1");

		var height = win.height() - 140;

		if (height > 600) {

			height = 640;
		}

		dlg.find("#dlg-form1").outerHeight(height);

		// 设置居中
		xgui.setcenter($("#dlg1"));

		// var state="改为显示";
		// if(data.IsShow){
		// state="改为隐藏";
		// }
		// $("#commentPic").append('<a href="javascript:;" class="toolbar-btn
		// red js-update">'+state+'</a>');
		// //修改
		// $(".js-update").click(function () {
		// comment.alter();
		// });

	},
	// 批量更改状态
	alterBatch : function(target) {
		// 得到datagrid的当前勾选项
		var data = $("#grid").datagrid('getSelections');
		var ids = [];

		for (i = 0; i < data.length; i++) {

			ids.push(data[i].ID);
		}

		if (ids.length == 0) {

			xgui.alert("请勾选要更改状态的数据！", "warn");

			return;
		}

		xgui.confirm("确定要更改勾选的<i class='alert-del-info'>" + ids.length
				+ "条</i>数据吗？", function() {

			xgui.Ajax("/Comment/Update", {
				ID : ids.join(',')
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新数据
					$("#grid").datagrid("reload");
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

				// 禁用
				common.disableAtag($(target));

			}, function() {

				xgui.loading("hide");

				// 启用
				common.enableAtag($(target));
			});
		});
	},
	// 更改状态
	alter : function() {
		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		xgui.confirm("确定要更改状态吗？", function() {

			xgui.Ajax("/Comment/Update", {
				ID : data.ID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 刷新datagrid数据表格
					$("#grid").datagrid('reload');
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

			}, function() {

				xgui.loading("hide");
			});
		});
	}
}

/*
 * 名称：问题管理
 */
var problem = {
	mark : 1,
	// 初始化
	init : function() {

		// 加载数据表格
		$("#grid")
				.datagrid(
						{
							// 是否分页
							pagination : true,
							// 每页大小
							pageSize : 20,
							// 地址
							url : "/ProblemManagement/List",
							// 远程参数
							queryParams : {
								keyWord : '',
							},
							// 行标
							rownumbers : true,
							// 其它方法
							BindExternalEvents : function() {

								// 修改
								$(".js-update", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											problem.edit();
										});

								// 删除
								$(".js-del", $("#grid")).click(
										function() {

											// 行标
											var rowindex = $(this).parents(
													".xgui-datagrid-row").attr(
													"datagrid-row-index");

											// 设置行选中
											$("#grid").datagrid("selectRow",
													rowindex);

											problem.del();
										});

							},
							// 列
							columns : [ [

									{
										field : 'Title',
										title : '标题',
										width : 300
									},
									{
										field : 'Hits',
										title : '点击量',
										width : 60
									},
									{
										field : 'CreateDate',
										title : '发表时间',
										width : 80,
										formatter : function(value) {
											return value == null ? "" : common
													.jsonDateF(value,
															"yyyy-MM-dd");
										}
									},
									{
										field : 'IsTop',
										title : '置顶',
										width : 60,
										formatter : function(value) {
											return value == 1 ? "是"
													: "<span style='color:red;'>否</span>";
										}
									},
									{
										title : '操作',
										field : 'ID',
										width : 60,
										formatter : function(value, rowData,
												rowIndex) {
											return '<a href="javascript:;" title="更改状态" class="js-update man-opt-icon icon-edit"></a><a href="javascript:;" title="删除" class="js-del man-opt-icon icon-del"></a>';
										}
									}

							] ],
							// 双击操作
							onDblClickRow : function(rowData) {
								problem.edit();
							},
							// 右击操作
							onRowContextMenu : function(e, rowData) {

								// 阻止右键菜单
								e.preventDefault();

								$('#ContextMenu').menu('show', {
									left : e.pageX,
									top : e.pageY
								});

							}
						});

		ue = UE.getEditor('editor');

		// 搜索
		$(".js-search").click(function() {

			// 名称
			var keyword = $(".js-search-input").val();

			var isTop = $("#isTop").combobox("getValue");
			// 刷新数据
			$("#grid").datagrid("reload", {
				keyWord : keyword,
				pageIndex : 1,
				isTop : isTop,
			});

		});

		// 修改
		$(".js-update").click(function() {

			problem.edit();

		});

		// 添加
		$(".js-add").click(function() {

			problem.add();

		});

		// 绑定是（菜单）
		$(".js-submit1").click(function() {

			problem.save(this);
		});

		// 绑定否
		$(".js-cancel1").click(function() {

			// 关闭dialog对话框
			$('#dlg1').dialog('close');
		});

		// 删除
		$(".js-delete").click(function() {
			problem.del();
		})
	},
	// 添加
	add : function() {

		// 添加标记
		problem.mark = 1;

		// 清除form数据
		$("#dlg-form1").form('clear');

		$(".js-istop").combobox("setValue", false);

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "添加问题");

	},
	save : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}

		$("#Content").val(ue.getContent());

		if (ue.getContent() == "") {
			xgui.alert("请输入内容", "error");
			return;
		}

		// 添加
		if (problem.mark == 1) {

			xgui.Ajax("/ProblemManagement/Add", $("#dlg-form1").serialize(),
					"json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});

		}
		// 修改
		else {

			xgui.Ajax("/ProblemManagement/Update", $("#dlg-form1").serialize(),
					"json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").datagrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}

					}, null, function() {

						xgui.loading("show", "正在提交。。。");

						// 禁用
						common.disableAtag($(target));

					}, function() {

						xgui.loading("hide");

						// 启用
						common.enableAtag($(target));
					});
		}
	},
	del : function() {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			xgui.Ajax("/ProblemManagement/Delete", {
				ID : data.ID
			}, "json", true, function(o) {

				if (o.success) {

					xgui.msgtip(o.msg, "success");

					// 关闭dialog对话框
					$('#dlg1').dialog('close');

					// 刷新datagrid数据表格
					$("#grid").datagrid('reload');
				} else {
					xgui.alert(o.msg, "error");
				}

			}, null, function() {

				xgui.loading("show", "正在提交。。。");

			}, function() {

				xgui.loading("hide");
			});
		});
	},
	// 更改状态
	edit : function() {

		// 得到datagrid的当前选中项
		var data = $("#grid").datagrid('getSelected');

		if (!data) {

			xgui.alert("请先选择要修改的数据！", "warn");

			return;
		}

		ue.setContent(data.Content);

		// 添加标记
		problem.mark = 0;

		// 清除form数据并填充
		$("#dlg-form1").form('clear').form("load", data);

		// 打开dialog框并设置标题
		$("#dlg1").dialog("open").dialog("setTitle", "修改问题");

	}
}

/*
 * 名称：省市区管理
 */
var city = {

	mark : 1,
	// 添加市和区
	add : function() {

		city.mark = 1;

		var data = $('#grid').treegrid('getSelected');

		if (!data) {
			xgui.alert("请先选择要添加的根目录！", "warn");
			return;
		}

		if (data.Type == 2) {
			xgui.alert("不可增加下级区，最多三级区域！", "warn");
			return;
		}

		$('#dlg-form2').form('clear');

		// 添加市
		if (data.Type == 0) {

			// 隐藏区部分
			$(".js-area").hide();
			$(".js-city").show();

			// 所属省
			$(".js-ProvinceId").val(data.ID.replace('P', ''));

			// 级别
			$(".js-Indentation").val(1);

			$("#dlg2").dialog("open").dialog("setTitle", "添加市区");
		}
		// 添加区
		else {

			$(".js-area").show();
			$(".js-city").hide();

			var ProvinceID = $(".xgui-treegrid-row-select").parents(
					".xgui-treegrid-tr-tree").prev().attr("node-id");

			// 所属省
			$(".js-ProvinceId").val(ProvinceID.replace('P', ''));

			// 所属市
			$(".js-ParentRegionId").val(data.ID.replace('R', ''));

			// 级别
			$(".js-Indentation").val(2);

			$("#dlg2").dialog("open").dialog("setTitle", "添加市/区");
		}
	},
	// 添加省
	addProvince : function() {

		city.mark = 1;

		$("#dlg1").dialog("open").dialog("setTitle", "添加省");

		$('#dlg-form1').form('clear');
	},
	// 修改
	update : function() {

		city.mark = 0;

		var data = $('#grid').treegrid('getSelected');

		if (!data) {
			xgui.alert("请先选择要修改的数据！", "warn");
			return;
		}

		// 省
		if (data.Type == 0) {

			$("#dlg1").dialog("open").dialog("setTitle", "修改省");

			$('#dlg-form1').form('clear').form('load', data);

			var ID = data.ID.replace('P', '');

			// 设置ID
			$('#dlg-form1').find("input[name=ID]").val(ID)
		}
		// 市、区
		else {

			$("#dlg2").dialog("open").dialog("setTitle", "修改市/区");

			var ID = data.ID.replace('R', '');

			// 市
			if (data.Type == 1) {

				// 隐藏区部分
				$(".js-area").hide();
				$(".js-city").show();
			}
			// 区
			else {
				$(".js-area").show();
				$(".js-city").hide();
			}

			// 给form赋值
			xgui.Ajax("/city/getregion", {
				ID : ID
			}, "json", true, function(o) {

				$('#dlg-form2').form('clear').form('load', o);
			});
		}
	},
	// 保存
	save : function(target) {
		// 数据合法性验证
		if (!$("#dlg-form2").form("validate")) {
			return;
		}
		// add
		if (city.mark == 1) {
			xgui.Ajax("/city/addregion", $("#dlg-form2").serialize(), "json",
					true, function(o) {
						if (o.success) {
							xgui.msgtip(o.msg, "success");
							// 关闭dialog对话框
							$('#dlg2').dialog('close');
							// 刷新datagrid数据表格
							$("#grid").treegrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}
					}, null, function() {
						xgui.loading("show", "正在提交。。。");
						// 禁用
						common.disableAtag($(target));
					}, function() {
						xgui.loading("hide");
						// 启用
						common.enableAtag($(target));
					});
		}
		// edit
		else {
			xgui.Ajax("/city/updateregion", $("#dlg-form2").serialize(),
					"json", true, function(o) {
						if (o.success) {
							xgui.msgtip(o.msg, "success");
							// 关闭dialog对话框
							$('#dlg2').dialog('close');
							// 刷新datagrid数据表格
							$("#grid").treegrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}
					}, null, function() {
						xgui.loading("show", "正在提交。。。");
						// 禁用
						common.disableAtag($(target));
					}, function() {
						xgui.loading("hide");
						// 启用
						common.enableAtag($(target));
					});
		}
	},
	// 保存省
	saveProvince : function(target) {
		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}
		// add
		if (city.mark == 1) {

			xgui.Ajax("/city/addprovince", $("#dlg-form1").serialize(), "json",
					true, function(o) {
						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").treegrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}
					}, null, function() {
						xgui.loading("show", "正在提交。。。");
						// 禁用
						common.disableAtag($(target));
					}, function() {
						xgui.loading("hide");
						// 启用
						common.enableAtag($(target));
					});
		}
		// edit
		else {
			xgui.Ajax("/city/updateprovince", $("#dlg-form1").serialize(),
					"json", true, function(o) {

						if (o.success) {

							xgui.msgtip(o.msg, "success");

							// 关闭dialog对话框
							$('#dlg1').dialog('close');

							// 刷新datagrid数据表格
							$("#grid").treegrid('reload');
						} else {
							xgui.alert(o.msg, "error");
						}
					}, null, function() {
						xgui.loading("show", "正在提交。。。");
						// 禁用
						common.disableAtag($(target));
					}, function() {
						xgui.loading("hide");
						// 启用
						common.enableAtag($(target));
					});
		}
	},
	// 初使化
	init : function() {

		$("#grid").treegrid({
			// title: "地址管理",
			url : "/city/getaddresstree",
			idField : 'ID',
			parentID : 'PID',
			treeField : 'Name',
			columns : [ [ {
				field : 'Name',
				title : '地区',
				width : 200
			}, {
				field : 'Type',
				title : '级别',
				width : 100,
				formatter : function(value) {
					if (value == 0) {
						return "省";
					} else if (value == 1) {
						return "市";
					} else {
						return "区";
					}
				}
			}, {
				field : "ID",
				title : 'ID标识',
				width : 100
			}, {
				field : 'PID',
				title : '父ID',
				width : 100
			} ] ],
			// 双击操作
			onDblClickRow : function(rowData) {

				city.update();
			},
			// 右击操作
			onRowContextMenu : function(e, rowIndex, rowData) {

				// 阻止右键菜单
				e.preventDefault();

				$('#ContextMenu').menu('show', {
					left : e.pageX,
					top : e.pageY
				});
			}

		});

		// 编辑
		$('.js-update').click(function() {

			city.update();
		});

		// 添加省市
		$('.js-addProvince').click(function() {

			city.addProvince();
		});

		// 添加子类
		$('.js-add').click(function() {

			city.add();
		});

		// 删除
		$('.js-delete').click(function() {

			// city.delete();
		});

		// 保存
		$('.js-submit').click(function() {

			city.save(this);
		});

		// 保存省
		$('.js-submit-province').click(function() {

			city.saveProvince(this);
		});

		// 取消
		$('.js-cancel').click(function() {

			$('#dlg1').dialog('close');

			$('#dlg2').dialog('close');
		});
	}
}

/*
 * 名称：菜单管理
 */
var menu = {

	mark : 1,
	// 添加
	add : function() {

		menu.mark = 1;

		var data = $('#grid').treegrid('getSelected');

		$('#dlg-form1').form('clear');

		$("#dlg1").dialog("open").dialog("setTitle", "添加菜单");

		// 二级菜单
		if (data) {

			$(".js-pid").val(data.ID);
		}
		// 一级菜单
		else {

			$(".js-pid").val(0);
		}
	},
	// 修改
	update : function() {

		menu.mark = 0;

		var data = $('#grid').treegrid('getSelected');

		if (!data) {
			xgui.alert("请先选择要修改的数据！", "warn");
			return;
		}

		$("#dlg1").dialog("open").dialog("setTitle", "修改菜单");

		// 设置数据
		$('#dlg-form1').form('clear').form('load', data);
	},
	// 删除
	del : function(target) {

		// 得到treegrid的当前选中项
		var data = $("#grid").treegrid('getSelected');

		// 数据存在
		if (!data) {

			xgui.alert("请先选择要删除的数据！", "warn");

			return;
		}

		xgui.confirm("确定要删除吗？", function() {

			// 得到表格所有数据
			var alldata = $('#grid').treegrid('getData');

			// 当前选中行
			var curdata = $("#grid").treegrid('getSelected');

			alldata.splice($.inArray(curdata, alldata), 1);

			// 数据提交
			menu.submit(target);
		});
	},
	// 保存
	save : function(target) {

		// 数据合法性验证
		if (!$("#dlg-form1").form("validate")) {
			return;
		}

		// 得到弹出框值
		var item = {};
		item.Name = $(".js-name").val();
		item.Key = $(".js-key").val();
		item.Type = $(".js-type").combobox("getValue");
		item.Url = $(".js-url").val();
		item.PID = $(".js-pid").val();

		// 添加
		if (menu.mark == 1) {

			// 得到表格所有数据
			var data = $('#grid').treegrid('getData');

			data.push(item);
		}
		// 修改
		else {

			// 当前选中行
			var curdata = $("#grid").treegrid('getSelected');

			curdata.Name = item.Name;
			curdata.Key = item.Key;
			curdata.Type = item.Type;
			curdata.Url = item.Url;
		}

		// 数据提交
		menu.submit(target);
	},
	// 数据提交
	submit : function(target) {

		// 得到表格所有数据
		var data = $('#grid').treegrid('getData');

		xgui.Ajax("/menu/createmenu", {
			jsondata : JSON.stringify(data)
		}, "json", true, function(o) {

			if (o.success) {

				xgui.msgtip(o.msg, "success");

				// 关闭dialog对话框
				$('#dlg1').dialog('close');

				// 刷新treegrid数据表格
				$("#grid").treegrid('reload');
			} else {
				xgui.alert(o.msg, "error");
				// 刷新treegrid数据表格
				$("#grid").treegrid('reload');
			}
		}, null, function() {

			xgui.loading("show", "正在提交。。。");

			// 禁用
			common.disableAtag($(target));

		}, function() {

			xgui.loading("hide");

			// 启用
			common.enableAtag($(target));
		});
	},
	// 初使化
	init : function() {

		// 表格
		$("#grid").treegrid({
			url : "/menu/list",
			idField : 'ID',
			parentID : 'PID',
			treeField : 'Name',
			columns : [ [ {
				field : 'Name',
				title : '名称',
				width : 120
			}, {
				field : 'Key',
				title : 'Key',
				width : 100
			}, {
				field : 'Type',
				title : '级别',
				width : 100
			}, {
				field : 'Url',
				title : 'URL地址',
				width : 100
			}, {
				field : "ID",
				title : 'ID标识',
				width : 100
			}, {
				field : 'PID',
				title : '父ID',
				width : 100
			} ] ],
			// 双击操作
			onDblClickRow : function(rowData) {

				menu.update();
			},
			// 右击操作
			onRowContextMenu : function(e, rowIndex, rowData) {

				// 阻止右键菜单
				e.preventDefault();

				$('#ContextMenu').menu('show', {
					left : e.pageX,
					top : e.pageY
				});
			}
		});

		// 添加
		$('.js-add').click(function() {

			menu.add();
		});

		// 编辑
		$('.js-update').click(function() {

			menu.update();
		});

		// 删除
		$('.js-delete').click(function() {

			menu.del(this);
		});

		// 保存
		$('.js-submit').click(function() {

			menu.save(this);
		});

		// 取消
		$('.js-cancel').click(function() {

			$('#dlg1').dialog('close');

			$('#dlg2').dialog('close');
		});
	}
}
