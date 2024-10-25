function getvisitor(){
    var xhr = new XMLHttpRequest();
    var url = 'https://api.countapi.xyz/hit/digitalmayu.vercel.app/visits';
    xhr.onloadend = function(){
    data = JSON.parse(this.responseText);
    document.getElementById("visits").textContent = data.value
    };
    xhr.open("GET", url, true);
    xhr.send();
    }