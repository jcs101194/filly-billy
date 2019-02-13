var pageName = "myPopupScript.js";

function filly()
{
	chrome.tabs.query(
	{
		active:true,
		currentWindow:true
	}
	,function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id,{greeting:"hello"});
	});
}
function newProfile()
{
	window.open("newProfile.html");	
}
function test()
{
	console.log("From " + pageName);
	for(var i = 0; i < chrome.extension.getViews().length; i++)
	{
		console.log(chrome.extension.getViews()[i].document.URL);
	}
	console.log("");
	chrome.runtime.sendMessage({subject:"customTest",info:""});
}
function addProfile(message)
{
	//Precondition:message is the new profile
	console.log(message.firstName);
}
document.addEventListener('DOMContentLoaded', function()
{
	//Initialize appropiate buttons on html page 
	var utilityString = "";

	chrome.runtime.sendMessage({subject:"popupInfo"});

	document.getElementById('filly').addEventListener('click',filly);
	document.getElementById('newProfile').addEventListener('click',newProfile);
	document.getElementById('practice').addEventListener('click',test);
});
