 
$(document).on("mobileinit", function(){

	$(function(){

		 $("#main").on("pageinit", function(){

		 	navigator.geolocation.getCurrentPosition(success);

			function success(position){
				let lat= position.coords.latitude;
				let long= position.coords.longitude;
				//alert('Your latitude is: '+lat+'and longitude is '+long); 

			}

		$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=055cbdecc7321d265bcdddf979cb43af", function(resp){

				let lat= resp;
				let long= resp;

				$.each( function(index, item) {
					$("#ciudad1").append("city.name");

				});

	
		});

		


		});

///////////


		 $("#buscador").on("pageinit", function(){
		 		$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
		        var $ul = $( this ),
		            $input = $( data.input ),
		            value = $input.val(),
		            html = "";
		        $ul.html( "" );
		        if ( value && value.length > 2 ) {
		            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
		            $ul.listview( "refresh" );
		            $.ajax({
		                url: "http://gd.geobytes.com/AutoCompleteCity",
		                dataType: "jsonp",
		                crossDomain: true,
		                data: {
		                    q: $input.val()
		                }
		            })
		            .then( function ( response ) {
		                $.each( response, function ( i, val ) {
		                    html += "<li>" + val + "</li>";
		                });
		                $ul.html( html );
		                $ul.listview( "refresh" );
		                $ul.trigger( "updatelayout");
		            });
		        }
		    });

		 });

		
			/////////	




	});

});

//pedir localizacion a la api de html 5 
//hacer peticion json a web del tiempo
//con el response, coger ciudad y grados
//pintar ciudad y grados en el




//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=055cbdecc7321d265bcdddf979cb43af