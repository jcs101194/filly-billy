var testMode = true;
var printAvailableConnections = true;
var currentId = 0;
var pageName = "myBackgrondScript.js"
var profileList = 
{
	profileZero:"",
	profileOne:"",
	profileTwo:"",
	numberOfProfiles:0,
	selectedProfile:-1
};

chrome.runtime.onMessage.addListener
(
	function(myData)
	{
		if(myData.subject == "popupInfo" || myData.subject == "newProfile" || myData.subject != "custonTest")
		{	
	
			//This function will be a lobby that will direct myData to their respective function
			if(printAvailableConnections)
			{
				console.log("From " + pageName);
				for(var i = 0; i < chrome.extension.getViews().length; i++)
				{
					console.log(chrome.extension.getViews()[i].document.URL);
				}
				console.log("");
			}
			if(myData.subject == "popupInfo")
				getPopupInfo();
			if(myData.subject == "newProfile")
				serializeNewProfile(myData);
			if(myData.subject == "customTest")
				testSpace();
		}		
	}
);

function getPopupInfo()
{
	if(profileList.numberOfProfiles == 0)
		return;

	var i = 0;
	var views = "";
	var utilityString = "";
	var desiredList = "";
	var currentProfile = "";
	var desiredElement = "";	

	chrome.storage.local.get(function(result)
	{
		views = chrome.extension.getViews({type: "popup"});
		views = views[0];
	
		desiredList = result;
		for(i;i<profileList.numberOfProfiles;i++)
		{
			switch(i)
			{
				case 0:
					currentProfile = profileList.profileZero;
					utilityString = currentProfile.firstName + " " + currentProfile.lastName;
					desiredElement = views.document.getElementById("profile0");
					desiredElement.addEventListener('click',function(){makeSelectedProfile(profileList.profileZero);});
					desiredElement.innerHTML = utilityString; 

				break;
				case 1:
					currentProfile = profileList.profileOne;
					utilityString = currentProfile.firstName + " " + currentProfile.lastName;
					desiredElement = views.document.getElementById("profile1");
					desiredElement.addEventListener('click',function(){makeSelectedProfile(profileList.profileOne);});
					desiredElement.innerHTML = utilityString; 

				break;
				case 2:
					currentProfile = profileList.profileTwo;
					utilityString = currentProfile.firstName + " " + currentProfile.lastName;
					desiredElement = views.document.getElementById("profile2");
					desiredElement.addEventListener('click',function(){makeSelectedProfile(profileList.profileTwo);});
					desiredElement.innerHTML = utilityString; 

				break;
			}
		}
	});

}
function serializeNewProfile(myData)
{
	if(currentId > 2)
	{
		return;
	}

	//Precondition: myData is a profile
	//myData = {firstName,lastName,...,subject/*number ID, only one digit*/}

	myData.subject = currentId;
	
	switch(currentId)
	{
		case 0:
			profileList.profileZero = myData;
		break;
		case 1:
			profileList.profileOne = myData;
		break;
		case 2:
			profileList.profileTwo = myData;
		break;
	}

	currentId++;
	profileList.numberOfProfiles++;
	
	chrome.storage.local.set(myData);
}
function testSpace()
{
	serializeNewProfile({firstName:"foster",lastName:"walhberg",subject:0});
	serializeNewProfile({firstName:"pickle",lastName:"paddle",subject:1});
	serializeNewProfile({firstName:"next",lastName:"toMe",subject:2});	
}
function makeSelectedProfile(desiredProfile)
{
	console.log(desiredProfile);
	profileList.selectedProfile = desiredProfile.subject;
}
