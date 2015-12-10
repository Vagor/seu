﻿//我的主页页面初始加载信息
$(function(){
	// 加载个人信息，加载用户名
	$.post(
	"./php/stuInfro.php",
	{},function(a){
		var data= JSON.parse(a);
		var year = data.year;//入学年份
			$("#select_term,#add_data_grade_term").append("<option value=1>"+parseInt(year)
			+"年秋季</option><option value=2>"+(++year)
			+"年春季</option><option value=3>"+(year)
			+"年秋季</option><option value=4>"+(++year)
			+"年春季</option><option value=5>"+(year)
			+"年秋季</option><option value=6>"+(++year)
			+"年春季</option><option value=7>"+(year)
			+"年秋季</option><option value=8>"+(++year)
			+"年春季</option>");//个人成绩页面的年级检索下拉框

		$('#username').append(data.name +"<span class='caret'></span>");

		$("#infro-name").val(data.name);
		$("#infro-stuid").val(data.stuid);
		$("#infro-college").val(data.college);
		$("#infro-major").val(data.major);
		$("#infro-nation").val(data.nation);
		$("#infro-gender").val(data.gender);
		$("#infro-birthday").val(data.birthday);
		$("#infro-bloodType").val(data.bloodType);
		$("#infro-placeOfOrigin").val(data.placeOfOrigin);
		$("#infro-religion").val(data.religion);
		$("#infro-nationality").val(data.nationality);
		});
	// 加载个人照片
	$.post(
	"./php/stuPhoto.php",
	{},function(a){
		var data= JSON.parse(a);
		var link= "./images/"+data.url;
		$("#stu-photo").attr("src",link);
	});
	// 加载成绩
	$.post(
	"./php/stuGrade.php",
	{},function(a){
		var data = JSON.parse(a);
		for (i in data) {
					$("#content_mypage tbody").append("<tr><td>"+data[i]['term']
					+"</td><td>"+data[i]['grade']
					+"</td><td>"+data[i]['tech']
					+"</td><td>"+data[i]['prac']
					+"</td><td>"+data[i]['total']
				+"</td></tr>"
				);
		};
	});
});


//个人成绩 页面初始加载信息
$(function(){
	// 加载个人成绩
	$.post(
	"./php/stuScore.php",
	{
		term:$("#select_term option:selected").val(),
		kind:$("#select_kind option:selected").val()
	},function(a){
		var data = JSON.parse(a);

		for (i in data) {
			$("#content_grade tbody").append("<tr data="+data[i]['id']+"><td>"+data[i]['course']
				+"</td><td>"+data[i]['credit']	
				+"</td><td>"+data[i]['grade']
				+"</td><td>"+data[i]['kind']
				+"<td><a  class='pull-right del_data_grade' style='margin-right: 5px;' href='#' onclick='delDataGrade();'>删除</a></td></tr>"
				);
		};
	});
});



//改变select value时返回新数据
$("#select_term,#select_kind").change(function(){
	$.post(
	"./php/stuScore.php",
	{
		term:$("#select_term option:selected").val(),
		kind:$("#select_kind option:selected").val()
	},function(a){
		var data = JSON.parse(a);
		$("#content_grade tbody").empty();
		for (i in data) {
		
			//加入一个empty tbody
			
			$("#content_grade tbody").append("<tr><td>"+data[i]['course']
					+"</td><td>"+data[i]['credit']
					+"</td><td>"+data[i]['grade']
					+"</td><td>"+data[i]['kind']
				+"</td></tr>"
				);
		};
	});
});




//社会实践页面初始加载信息
$(function(){

	// 加载社会实践
	$.post(
	"./php/stuSocial.php",
	{},function(a){
		var data = JSON.parse(a);

		for (i in data) {
			$("#content_prac tbody").append("<tr data-id="+data[i]['id']+"><td>"+data[i]['time']
					+"</td><td>"+data[i]['place']
					+"</td><td>"+data[i]['content']
					+"</td><td>"+data[i]['grade']
					+"</td><td><a href='#' class='change_data_prac pull-right' data-toggle='modal' data-target='#change_prac' style='margin-right: 5px;'>修改</a><a href='#' class='del_data_prac pull-right' style='margin-right: 5px;'>删除</a></td></tr>"
				);
			
		};
		
	});
});

//科技竞赛 页面初始加载信息
$(function(){

	// 加载科技竞赛
	$.post(
	"./php/stuSci.php",
	{},function(a){
		var data = JSON.parse(a);

		for (i in data) {
			$("#content_tech tbody").append("<tr data-id="+data[i]['id']+"><td>"+data[i]['name']
				+"</td><td>"+data[i]['time']
				+"</td><td>"+data[i]['result']
				+"</td><td>"+data[i]['grade']
				+"</td><td><a href='#' class='add_data_tech pull-right' data-toggle='modal' data-target='#change_tech' style='margin-right: 5px;'>修改</a><a href='#' class='pull-right del_data_tech' style='margin-right: 5px;' onclick='delSciData();'>删除</a></td></tr>"
				);
		};
		
	});
});



//选择左侧边栏，显示页面
	$("#tab_mypage").click(function(){
		$("#sidebar-left li").attr("class","");
		$("#tab_mypage").attr("class", "item_active");
		$(".main").css("display","none");
		$("#content_mypage").css("display", "block");
	});
	$("#tab_grade").click(function(){
		$("#sidebar-left li").attr("class","");
		$("#tab_grade").attr("class", "item_active");
		$(".main").css("display","none");
		$("#content_grade").css("display", "block");
	});
	$("#tab_tech").click(function(){
		$("#sidebar-left li").attr("class","");
		$("#tab_tech").attr("class", "item_active");
		$(".main").css("display","none");
		$("#content_tech").css("display", "block");
	});
	$("#tab_prac").click(function(){
		$("#sidebar-left li").attr("class","");
		$("#tab_prac").attr("class", "item_active");
		$(".main").css("display","none");
		$("#content_prac").css("display", "block");
	});



//选择学期时，加载学科
$("#add_data_grade_term,#add_data_grade_kind").change(function(){
	$.post(
	"./php/stuScore/",
	{
		term:$("#add_data_grade_term option:selected").val(),
		kind:$("#add_data_grade_kind option:selected").val()
	},function(a){
		var data = JSON.parse(a);
		$("#add_data_grade_course").empty();//清空course下拉框
		for (i in data) {
			$("#add_data_grade_course").append("<option><a href='#'>"+
				data[i]+"</a></option>"); 
		};
	});
});



//登出
$(".logout").click(function(){
	if (confirm("确定要退出账号吗？")) {
	$(".logout").attr("href", './login/index.html');
	};
})
