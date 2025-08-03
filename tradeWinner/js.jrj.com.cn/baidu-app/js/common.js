/**
 * 计算器通用js
 * Author: xiaohong.liu
 * Date: 2008-9-11
 */
 
var validRegExp= /[<>%#^&~]/;

/**
 * 验证一个值是否为数字
 * @param value：值
 */
function checkNumber(value)
{
    var reNumber = /^[0-9]+.?[0-9]*$/;
    if (!reNumber.test(value))
    {
        return false;
    }
    return true;
}

/**
 * 验证一个值是否为整数
 * @param value：值
 */
function checkInteger(value)
{
    var reNumber = /^[-]{0,1}[0-9]{1,}$/;
    if (!reNumber.test(value))
    {
        return false;
    }
    return true;
}

/**
 * 返回今日日期，格式如：2008-8-8
 */
function getTodayDate(){
    var today=new Date();
    var year=today.getFullYear();
    var month=today.getMonth()+1;
    var day=today.getDate();
    return year+"-"+month+"-"+day;
}

/**
 * 根据起始日期和终止日期获得间隔天数
 * @param startDate  起始日期，格式如:2008-8-8
 * @param endDate    终止日期，格式如：2008-8-8
 * @return 间隔天数，失败返回0
 */
function getIntervalDays(startDate,endDate){
    try{
        var arrStartDay=startDate.split("-");
        var arrEndDay=endDate.split("-");
        if(!checkInteger(arrStartDay[0])||!checkInteger(arrStartDay[1])||!checkInteger(arrStartDay[2])){
            throw "e";
        }
        if(!checkInteger(arrEndDay[0])||!checkInteger(arrEndDay[1])||!checkInteger(arrEndDay[2])){
            throw "e";
        }
        if(arrStartDay[0].length!=4||arrStartDay[0]<1000||arrStartDay[1]<1||arrStartDay[1]>12||arrStartDay[2]<1||arrStartDay[2]>31){throw "e"};
        if(arrEndDay[0].length!=4||arrEndDay[0]<1000||arrEndDay[1]<1||arrEndDay[1]>12||arrEndDay[2]<1||arrEndDay[2]>31){throw "e"};
        var interval=(new Date(arrEndDay[0],arrEndDay[1],arrEndDay[2]).getTime()-new Date(arrStartDay[0],arrStartDay[1],arrStartDay[2]).getTime())/(1000*60*60*24);
        interval=parseInt(interval);
        return interval;
    }catch(e){
        return 0;
    }
}

/**
 * 增加年数
 * @param startDate 格式如2008-8-8
 * @param num 年数
 */
function AddYears(startDate,num){
    var arrStartDay=startDate.split("-");
    arrStartDay[0]=parseInt(arrStartDay[0])+num;
    document.getElementById("saving_endDate").value =arrStartDay[0]+"-"+arrStartDay[1]+"-"+arrStartDay[2];
}

/**
 * 增加月数
 * @param startDate 格式如2008-8-8
 * @param num 月数
 */
function AddMonths(startDate,num){
    var arrStartDay=startDate.split("-");
    arrStartDay[0]=parseInt(arrStartDay[0]);
    arrStartDay[1]=parseInt(arrStartDay[1]);
    if((arrStartDay[1]+num)>12){
        arrStartDay[0]=arrStartDay[0]+1;
        arrStartDay[1]=(arrStartDay[1]+num)-12;
    }else{
        arrStartDay[1]=arrStartDay[1]+num;
    }
    document.getElementById("saving_endDate").value =arrStartDay[0]+"-"+arrStartDay[1]+"-"+arrStartDay[2];
}
/**
 * 增加日数
 * @param startDate 格式如2008-8-8
 * @param num 日数
 */
function AddDays(startDate,num){
    var arrStartDay=startDate.split("-");
    arrStartDay[0]=parseInt(arrStartDay[0]);
    arrStartDay[1]=parseInt(arrStartDay[1]);
    arrStartDay[2]=parseInt(arrStartDay[2]);
    var monthDaysNum=30;
    //1,3,5,7,8,10,12 大月31天
    if(arrStartDay[1]==1||arrStartDay[1]==3||arrStartDay[1]==5||arrStartDay[1]==7||arrStartDay[1]==8||arrStartDay[1]==10||arrStartDay[1]==12){
        monthDaysNum=31;
    }else if(arrStartDay[1]==2){
        if(0==arrStartDay[0]%4&&((arrStartDay[0]%100!=0)||(arrStartDay[0]%400==0))){
            monthDaysNum=29;//闰年29天
        }else{
            monthDaysNum=28;//平年28天
        }
    }else{
        monthDaysNum=30;
    }
    if((arrStartDay[2]+num)>monthDaysNum){
        arrStartDay[2]=arrStartDay[2]+num-monthDaysNum;
            if((arrStartDay[1]+1)>12){
                arrStartDay[0]=arrStartDay[0]+1;
                arrStartDay[1]=(arrStartDay[1]+1)-12;
            }else{
                arrStartDay[1]=arrStartDay[1]+1;
            }

    }else{
        arrStartDay[2]=arrStartDay[2]+num;
    }
    document.getElementById("saving_endDate").value =arrStartDay[0]+"-"+arrStartDay[1]+"-"+arrStartDay[2];
}

/**
 * 取小数点后两位并四舍五入
 * @param value：数字
 * @return 四舍五入后的数据
 */
function getRound(value)
{
    return Math.round((Math.floor(value*1000)/10))/100;
}

/**
 *去前后空格
 */
String.prototype.trim = function()  {return this.replace(/(^\s*)|(\s*$)/g,"");} 


/**
 * 校验字符串中是否包含非法字符
 * @ parm string 
 * @ since 1.0
 */
function checkLegalChar(string){
	var isValid=validRegExp.test(string); 
	if (isValid){
		alert("您输入的值\""+ string +"\"包含非法字符(<,>,%,#,^,&,~)！");	
		return true; 
	} 
	else{
		return false; 
	}
}

/**
 * 校验表单中的所有输入控件中是否有非法字符
 * 如果不传参数,默认是 forms[0]
 */
function checkLegalTextInForm(formName){
	var formObj;
	if (formName == null || formName == "") {
		formObj = document.forms[0];  
	} else {
		formObj = document.forms[formName]; 
	} 
	var formEle = formObj.elements;    
	for (var i=0; i<formEle.length; i++)     {  
		var element = formEle[i];         
		if (element.type == "text") { 
			if(element.readOnly==true){
				continue;
			}else if(checkLegalChar(element.value)){
				//alert("您输入的值\""+ element.value +"\"包含非法字符(<,>,#,^,&,~)！");
				return true;
			}
		}         
		if (element.type == "textarea") { 
			if(element.readOnly==true){
			continue;
		}else if(checkLegalChar(element.value)){
			//alert("您输入的值\""+ element.value +"\"包含非法字符(<,>,#,^,&,~)！");
			return true;
		}
		}         
	} 
}

/**
 * 校验电话号码格式是否正确
 * 以下格式的电话可以输入
 * 区号-电话；(区号)电话；区号电话；电话；手机号；0手机号
 * 其中，区号是必须以0开头，共三位或者四位数字的号码
 * 电话是3到8位数字的号码
 * 手机号是必须以13或者15开头，共11位数字的号码
 * @ parm string 
 * @ since 1.0
 */
function checkLegalTel(string){
	/*var validRegExp=/^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;*/
	var validRegExp=/(^0[0-9]{2,3}\-?[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\(0[0-9]{2,3}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)/;
	var isValid=validRegExp.test(string); 
	if (isValid){
		return true; 
	} else {
		return false; 
	}
}




/**
 * 清空form表单(不可以清空复选框，单选钮)
 * 如果不传参数,默认清空forms[0]
 * @ parm string 
 */
function clearForm(formName) {
   var formObj;
   if (formName == null || formName == "") {
   	 formObj = document.forms[0];  
   } else {
   	 formObj = document.forms[formName]; 
   }  
   var formEle = formObj.elements;    
   for (var i=0; i<formEle.length; i++)     {  
	 var element = formEle[i];         
	 if (element.type == "submit") { continue; }      
	 if (element.type == "reset") { continue; }         
	 if (element.type == "button") { continue; }         
	 if (element.type == "hidden") { continue; } 
	 if (element.type == "checkbox") { continue; }         
	 if (element.type == "radio") { continue; }
	 if (element.type == "text") { element.value = ""; }         
	 if (element.type == "textarea") { element.value = ""; }         
	 if (element.type == "select-multiple") { element.selectedIndex = ""; }         
	 if (element.type == "select-one") { element.selectedIndex = ""; }   
	   
   }  
}
/**
 * 清空form表单(可以清空复选框，单选钮)
 * 如果不传参数,默认清空forms[0]
 * @ parm string 
 */
function clearForm2(formName) {   
   var formObj;
   if (formName == null || formName == "") {
   	 formObj = document.forms[0];  
   } else {
   	 formObj = document.forms[formName]; 
   }  
   var formEle = formObj.elements;    
   for (var i=0; i<formEle.length; i++)     {  
	 var element = formEle[i];         
	 if (element.type == "submit") { continue; }      
	 if (element.type == "reset") { continue; }         
	 if (element.type == "button") { continue; }         
	 if (element.type == "hidden") { continue; } 
	 if (element.type == "checkbox") { element.checked = false; }         
	 if (element.type == "radio") { element.checked = false; }
	 if (element.type == "text") { element.value = ""; }         
	 if (element.type == "textarea") { element.value = ""; }         
	 if (element.type == "select-multiple") { element.selectedIndex = -1; }         
	 if (element.type == "select-one") { element.selectedIndex = -1; }   
	   
   }  
}
/**
 * 格式化float类型，保留小数点若干位
 * @param {Object} src
 * @param {Object} pos
 */
function formatFloat(src, pos){
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}