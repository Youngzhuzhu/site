window.onload = function() {
	var lists = document.getElementsByTagName('li');
	lists[0].onclick = requestFood;
	requestFood();
}
function requestFood() {
	var request;
	if(window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			var response = request.responseText;
			showInView(response);
		}
	}
	request.open("GET","data/foodList.json",true);
	request.send();
}


function showInView(responseText) {
	var responseTextObj = JSON.parse(responseText);
	var menuHead = document.getElementById('menu-head');
	var menuH= document.createElement('h2');
	menuH.style.textAlign = 'center';
	menuH.style.paddingTop = '20px';
	menuH.style.marginTop = '0px';
	menuH.innerHTML = 'Menu Categories';
	var menuP = document.createElement('p');
	menuP.style.textAlign = 'center';
	menuP.innerHTML = '<em id="menuP">Substituting white rice with brown rice or fried rice after 3:00pm will be $1.50 for a pint and $2.50 for a quart.</em>';
	if(!document.getElementById("menuP")) {
		menuHead.appendChild(menuH);
		menuHead.appendChild(menuP);
		menuHead.parentNode.style.backgroundColor = 'purple';
	}
	

	var menu = document.getElementById('menu-content');
	for(var i = 0; i < responseTextObj.length; i++) {
		var divTag = document.createElement('div');
		divTag.setAttribute('class','menu-box');
		menu.appendChild(divTag);

		var imgTag = document.createElement('img');
		imgTag.setAttribute('src',responseTextObj[i].image);
		imgTag.setAttribute('class','menu-img');
		divTag.appendChild(imgTag);
		var spanTag = document.createElement('span');
		spanTag.setAttribute('class','menu-span');
		spanTag.innerHTML = responseTextObj[i].name;
		divTag.appendChild(spanTag);
	}
}