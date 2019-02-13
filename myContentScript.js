//Recieves a one-time message from myPopupScript.js
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) 
{
    
	if (request.greeting == "hello")
	{
		var allInputs = document.getElementsByTagName("input");
		
		if(allInputs.length > 0)
		{
			for(var i = 0; i < allInputs.length; i++)
			{
				if(allInputs[i].type != "input")
					allInputs.splice(i,1);
			}

			myInput.value = "it works, jeanette!!!!1!";  
			console.log("it works!");    
			sendResponse({farewell: "goodbye"});
		}
		else
		{
			var allDivs = document.getElementsByTagName("div");
			allDivs = document.getElementsByTagName("iframe");
			allInputs = allDivs[4];
			for(var i = 0; i < allDivs.length; i++)
				allInputs = allDivs[i].querySelectorAll("input");
		}
	}
});
