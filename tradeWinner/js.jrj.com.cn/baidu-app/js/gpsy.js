function initStock(){
	var sel = document.getElementById('stock_stockType');
	for(var i = 0;i<secTax.length;i++){
		sel.options[sel.length] = new Option(secTax[i].name,i); 
	}
	changeRate_stock();
}
function changeRate_stock(){
	document.getElementById('stock_rate').value = secTax[document.getElementById('stock_stockType').value].commision + secTax[document.getElementById('stock_stockType').value].stampTax;
}
/*
买入交易额=买入价格*交易数量
买入税费=买入价格*综合交易费率%*交易数量
买入成本=买入交易额+买入税费=买入价格*(1+综合交易费率%)*交易数量

卖出交易额=卖出价格*交易数量
卖出税费=卖出价格*综合交易费率%*交易数量
卖出金额=卖出交易额-卖出税费

参考保本价=买入价格×(1＋综合交易费率％)÷(1－综合交易费率％)
盈亏额=卖出金额－买入成本
收益率＝盈亏额/买入成本
*/
function exec_stock(){
	var rate = document.getElementById('stock_rate').value/100;
	var tradeAmount = document.getElementById('stock_tradeAmount').value;
	var buyPrice = document.getElementById('stock_buyPrice').value;
	var sellPrice = document.getElementById('stock_sellPrice').value;
	var str_alert = "";
	if(checkNumber(tradeAmount)==false)
		str_alert += '--请输入交易数量，且必须为数字\r\n';
	if(checkNumber(buyPrice)==false)
		str_alert += '--请输入买入价格，且必须为数字\r\n';
	if(checkNumber(sellPrice)==false)
		str_alert += '--请输入卖出价格，且必须为数字';			
	if(str_alert!=''){
		alert(str_alert);
		return;
	}
	
	document.getElementById('stock_buyTradeSum').value = formatFloat(buyPrice*tradeAmount,2);
	document.getElementById('stock_buyTax').value = formatFloat(buyPrice*rate*tradeAmount,2);
	document.getElementById('stock_buyCost').value = formatFloat(Number(document.getElementById('stock_buyTradeSum').value) + Number(document.getElementById('stock_buyTax').value),2);
	
	document.getElementById('stock_sellTradeSum').value =formatFloat(sellPrice*tradeAmount,2);
	document.getElementById('stock_sellTax').value = formatFloat(sellPrice*rate*tradeAmount,2);
	document.getElementById('stock_gainSum').value = formatFloat(Number(document.getElementById('stock_sellTradeSum').value) - Number(document.getElementById('stock_sellTax').value),2);
	
	document.getElementById('stock_reCapitalPrice').value = Math.round(100*buyPrice*(1+rate)/(1-rate))/100;
	document.getElementById('stock_profitSum').value = Math.round(100*(Number(document.getElementById('stock_gainSum').value) - Number(document.getElementById('stock_buyCost').value)))/100;
	document.getElementById('stock_yield').value = Math.round(100*document.getElementById('stock_profitSum').value*100/document.getElementById('stock_buyCost').value)/100;
}