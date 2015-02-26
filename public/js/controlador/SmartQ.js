$(document).bind("mobileinit", function() {
    // Código de inicio para jQM


    $.mobile.loadingMessage = "Bienvenido a Smart Queu";
    $.mobile.pageLoadErrorMessage = "Lo sentimos esta información no esta disponible";

    // Eventos de gestos

    $("zona").bind("tap", function() {

    });

    $("zona").bind("taphold", function() {

    });

    $("zona").bind("swipeleft", function() {

    });

    $("zona").bind("swiperight", function() {

    });

    // Eventos de mouse virtuales

    $("zona").bind("vclick", function() {

    });

    // Eventos de orientación

    $(document).bind("orientationchange", function() {

    });

    // Eventos de scroll

    $(document).bind("scrollstart", function() {

    });

    $(document).bind("scrollstop", function() {

    });

    // Eventos de página

    $("pagina1").bind("pageinit", function() {

    });

    // Eventos de página externa
    $(document).bind("pageloadfailed", function() {
        alert("Falló la carga de la página");
    });

    $("pagina1").bind("pagechange", function() {

    });

    $("pagina1").bind("pageshow", function() {

    });

    $("pagina1").bind("pagehide", function() {

    });


    // Eventos layout

    $(document).bind("updatelayout", function() {

    });

    $(document).bind("animacionComplete", function() {

    });

//Autenticacion y session
    $( document ).ready(function() {
        $('#my_button').click(function() {
            var username ="Anon" ;
            var roomName="defaultRoom";

            if(typeof(Storage) !== "undefined") {



                var webSocket = new WebSocket('ws://'+endPoint_instituciones);

                webSocket.onerror = function(event) {
                    onError(event)
                };

                webSocket.onopen = function(event) {
                    onOpen(event);
                };

                webSocket.onmessage = function(event) {
                    onMessage(event)
                };

                function onMessage(event) {

                    var eventData = event.data;

                    //If event data starts with URL
                    if(eventData.indexOf('/URL') == 0){
                        //trim the /URL command string from message

                        eventData = 'URL has been set to '+event.data.substr(4);
                    } else if(eventData.indexOf('/VOTEVALUE') == 0){
                        //trim the /VOTEVALUE string from the message
                        eventData = 'A vote of  '+event.data.substr(10)+'has been received';
                    } else if(eventData.indexOf('Cleared server side chat & vote history.') ==0){
                        document.getElementById('messages').innerHTML = "";
                        //reset our vote value to unset
                        lastVote=-3;
                    } else if(eventData.indexOf('/NEWVOTE') == 0){
                        //Reset our vote value to unset
                        lastVote=-3;
                        return;
                    }

                    //obj= JSON.parse(eventData);
                    // alert(obj[0].nombreInstitucion)
                    try{
                        localStorage.instituciones=eventData;
                    }catch (e){
                        alert(e);
                    }


                    //  $("#content-inst").empty();
                    // jQuery.each(obj, function(index, object) {
                    //if (object.tipoInstitucion==tipoInst){
                    //         linea ="<li class='ui-last-child'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-rel='dialog' data-transition='slide' href='seleccionar-sucursal.html'>" + object.nombreInstitucion+"</a></li>" ;
                    //      $("#content-inst").append(linea);
                    //  }



                    //  });

                }

                function onOpen(event) {
                    webSocket.send("/SETROOM"+roomName);
                    webSocket.send("/SETNAME"+username);
                    webSocket.send("/getInstituciones");
                }





            } else {
                alert("navegador no soportado")
            }

            $.mobile.changePage("index.html", { transition: "slideup", changeHash: false });


            // alert(localStorage.instituciones)

        });









    });
    // institucion
    $(document).on('pagebeforeshow', "#selecinstitucion",function () {

        var parameters = $(this).data("url").split("?")[1];
        sucursal = parameters.replace("sucursal=","");
        tramite = $(this).data("url").split("?")[2].replace("tramite=","");;
        $("#sucursal-elegida").text("Sucursal "+ sucursal);
        $("#tramite-elegido").text("Tramite "+ tramite);



    });
    // tramites
    $(document).on('pagebeforeshow', "#tramites",function () {

        var parameters = $(this).data("url").split("?")[1];
        sucursal = parameters.replace("sucursal=","");

        var username ="Anon" ;
        var roomName="defaultRoom";

        if(typeof(Storage) !== "undefined") {



            var webSocket = new WebSocket('ws://'+endPoint_InstTramites);

            webSocket.onerror = function(event) {
                onError(event)
            };

            webSocket.onopen = function(event) {
                webSocket.send("/SETROOM"+roomName);
                webSocket.send("/SETNAME"+username);
                webSocket.send("/getObtenerInstTramite_1");
            };

            webSocket.onmessage = function(event) {
                onMessage(event)
            };

            function onMessage(event) {

                var eventData = event.data;

                //If event data starts with URL
                if(eventData.indexOf('/URL') == 0){
                    //trim the /URL command string from message

                    eventData = 'URL has been set to '+event.data.substr(4);
                } else if(eventData.indexOf('/VOTEVALUE') == 0){
                    //trim the /VOTEVALUE string from the message
                    eventData = 'A vote of  '+event.data.substr(10)+'has been received';
                } else if(eventData.indexOf('Cleared server side chat & vote history.') ==0){
                    document.getElementById('messages').innerHTML = "";
                    //reset our vote value to unset
                    lastVote=-3;
                } else if(eventData.indexOf('/NEWVOTE') == 0){
                    //Reset our vote value to unset
                    lastVote=-3;
                    return;
                }

                obj= JSON.parse(eventData);

                try{
                    //  alert(eventData)
                }catch (e){
                    alert(e);
                }


                  $("#content-tram").empty();
                jQuery.each(obj, function(index, object) {

                    //  divisor = "<li data-role='list-divider'>Santiago</li>"
                    //   $("#content-tram").append(divisor);
                    linea ="<li class='ui-last-child'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-rel='dialog' data-transition='slide' href='institucion.html?sucursal=xxx?tramite=yyy'>" + object.nombreTramite+"</a></li>" ;
                    linea = linea.replace("yyy",object.idTramite);
                    linea= linea.replace("xxx",sucursal);

                    $("#content-tram").append(linea);


                });

            }







        } else {
            alert("navegador no soportado")
        }

        // $.mobile.changePage("index.html", { transition: "slideup", changeHash: false });


        // alert(localStorage.instituciones)


    });
// sucursales
    $(document).on('pagebeforeshow', "#sucursal",function () {

        var parameters = $(this).data("url").split("?")[1];
        parameter = parameters.replace("paremeter=","");

        var username ="Anon" ;
        var roomName="defaultRoom";

        if(typeof(Storage) !== "undefined") {



            var webSocket = new WebSocket('ws://'+endPoint_sucursales);

            webSocket.onerror = function(event) {
                onError(event)
            };

            webSocket.onopen = function(event) {
                webSocket.send("/SETROOM"+roomName);
                webSocket.send("/SETNAME"+username);
                webSocket.send("/getObtenerSucursales_1");
            };

            webSocket.onmessage = function(event) {
                onMessage(event)
            };

            function onMessage(event) {

                var eventData = event.data;

                //If event data starts with URL
                if(eventData.indexOf('/URL') == 0){
                    //trim the /URL command string from message

                    eventData = 'URL has been set to '+event.data.substr(4);
                } else if(eventData.indexOf('/VOTEVALUE') == 0){
                    //trim the /VOTEVALUE string from the message
                    eventData = 'A vote of  '+event.data.substr(10)+'has been received';
                } else if(eventData.indexOf('Cleared server side chat & vote history.') ==0){
                    document.getElementById('messages').innerHTML = "";
                    //reset our vote value to unset
                    lastVote=-3;
                } else if(eventData.indexOf('/NEWVOTE') == 0){
                    //Reset our vote value to unset
                    lastVote=-3;
                    return;
                }

                obj= JSON.parse(eventData);
                // alert(obj[0].nombreInstitucion)
                try{
                    //  alert(eventData)
                }catch (e){
                    alert(e);
                }

                  $("#content-sucur").empty();
                jQuery.each(obj, function(index, object) {

                    divisor = "<li class='ui-li-divider ui-bar-b ui-first-child' role='heading' data-role='list-divider'>"+object.codigoSucursal+"</li>"

                    $("#content-sucur").append(divisor);
                    linea ="<li class='ui-last-child'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-rel='dialog' data-transition='slide' href='seleccionar-tramite.html?sucursal=xxx'>" + object.nombreSucursal+"</a></li>" ;
                    linea = linea.replace("xxx",object.codigoSucursal);
                    $("#content-sucur").append(linea);




                });

            }







        } else {
            alert("navegador no soportado")
        }

        // $.mobile.changePage("index.html", { transition: "slideup", changeHash: false });


        // alert(localStorage.instituciones)


    });

    // instituciones
    $(document).on('pagebeforeshow', "#sinstitucion",function () {
        var parameters = $(this).data("url").split("?")[1];
        tipoInst = parameters.replace("tipoIns=","");
        obj = "";
        try{
            alert(localStorage.instituciones);
            obj=  JSON.parse(localStorage.instituciones);
        }catch (e){
            alert(e);
        }

        $("#content-inst").empty();
        jQuery.each(obj, function(index, object) {
            if (object.tipoInstitucion==tipoInst){
                linea ="<li class='ui-last-child'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-rel='dialog' data-transition='slide' href='seleccionar-sucursal.html?paremeter=hola'>" + object.nombreInstitucion+"</a></li>" ;
                $("#content-inst").append(linea);
            }



        });



    });
    //Busqueda
    $(document).on('pagebeforeshow', "#buscar",function () {

        obj = "";
        try{

            obj=  JSON.parse(localStorage.instituciones);

        }catch (e){
            alert(e);
        }

        $("#content-bus").empty();
        auxTipo="";
        jQuery.each(obj, function(index, object) {

            if (object.tipoInstitucion!=auxTipo){

                divisor = "<li class='ui-li-divider ui-bar-b ui-first-child' role='heading' data-role='list-divider'>"+object.tipoInstitucion+"</li>"
                $("#content-bus").append(divisor);
            }
            linea ="<li data-filtertext="+"'"+object.nombreInstitucion+"'"+" class='ui-last-child'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-rel='dialog' data-transition='slide' href='seleccionar-sucursal.html?paremeter=xxx'>" + object.nombreInstitucion+"</a></li>" ;
            linea = linea.replace("xxx",object.codigoInstitucion);
            $("#content-bus").append(linea);
            auxTipo =object.tipoInstitucion





        });



    });
});