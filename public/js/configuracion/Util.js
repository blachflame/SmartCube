/**
 * Created by root on 24-02-15.
 */

var username ="Anon" ;
var roomName="defaultRoom";

function setRoom() {
    var roomName = getRoom();
    webSocket.send("/SETROOM"+roomName);
    //document.getElementById('messages').innerHTML = "";
    return false;
}

function getRoom(){
    return roomName;
}

function setName() {
    var myName = getName();
    webSocket.send("/SETNAME"+myName);
    if(myName!=''){
        setCookie("username", myName, 365);
    }
    return false;
}

function getAccion() {

    webSocket.send("/getInstituciones");

    return false;
}

function getName(){
    return username;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function onError(event) {
    alert("An error has occurred. More info:\n"+event.data);
}

function send() {
    var message = document.getElementById('inputmessage').value;
    webSocket.send(message);
    document.getElementById('inputmessage').value = "";
    return false;
}