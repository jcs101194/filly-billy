function handleInput()
{
	//Note that these inputs are not sanatized yet
	var myProfile = {
				firstName:'',
				lastName:'',
				subject:'newProfile'
			};

	myProfile.firstName = document.getElementById('firstName').value;
	myProfile.lastName  = document.getElementById('lastName').value;
	
	chrome.runtime.sendMessage(myProfile);
	window.close();
}

document.addEventListener('DOMContentLoaded',function()
{
	document.getElementById('submitButton').addEventListener('click',handleInput);
});

