﻿<?php

    //链接数据库
    @$link = mysql_connect("10.161.196.219","root","123456");
    if(!$link)  
    {  
      echo "mysql connect failed";
    }   

    //设置数据库编码   
    mysql_query("set names utf8");
    
    //选择数据库
    mysql_select_db("seu_tlw",$link);                            
?>