 
$(document).on("mobileinit", function(){

	$(function(){

		$("#main").on("pageinit", function(){

		 	navigator.geolocation.getCurrentPosition(success);

			function success(position){
				let lat= position.coords.latitude;
				let long= position.coords.longitude;
				//alert('Your latitude is: '+lat+'and longitude is '+long); 

				let url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&APPID=055cbdecc7321d265bcdddf979cb43af";
				
				$.getJSON(url).done(function(response){     
			
					let html = "<a href='#detalle' class='ui-btn ciudad'><div id='nombreciudad'>"+response.name+"</div><div id='temperaturaciudad'>"+response.main.temp+"º</div>";

					$("#menu").append(html);
				});
			}




				


				 let ciudades = JSON.parse(localStorage.getItem('elementos'));
				 let temps = JSON.parse(localStorage.getItem('temps'));
				 if(ciudades != null){
					// si hay - recorrer el array y pintar datos en la lista de ciudades - 
					$.each(ciudades, function(ind, val){ 
						//en #menu hasr un append (igual que en el clic) 

						let ciudad = "<a href='#detalle' class='ui-btn ciudad'><div id='nombreciudad'>"+ciudades[ind]+"</div><div id='temperaturaciudad'>"+temps[ind]+"º</div>";
						//let ciudad = "<a href='#detalle' class='ui-btn ciudad'><div id='nombreciudad'>"+ciudades[ind]+"</div>";
				 		$("#menu").append(ciudad);

					});
					

				 }
				

			
				
	///////////////
			
			

		});


///////////// BUSCADOR



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
		                    html += "<li class='elementos'><a href='#main'>" + val + "</a></li>";
		                });
		                $ul.html( html );
		                $ul.listview( "refresh" );
		                $ul.trigger( "updatelayout");
		            });
		        }
		    });

		 });

		
/////////	

// click en los resultados del buscador
		 $("#autocomplete").on("click", ".elementos",function(){
			//let tmperatura;
			//console.log($(this).text());
			let nomciudad = $(this).text();
				//let ciudad= "<a href='#detalle' class='ui-btn ciudad'><div id='nombreciudad'>"+response.name+"</div><div id='temperaturaciudad'>"+response.main.temp+"º</div>";
			
				//$("#menu").append(ciudad);

				let url = "http://api.openweathermap.org/data/2.5/weather?q="+nomciudad+"&units=metric&APPID=055cbdecc7321d265bcdddf979cb43af";
	
				$.getJSON(url).done(function(response){  

					let ciudad= "<a href='#detalle' class='ui-btn ciudad'><div id='nombreciudad'>"+response.name+"</div><div id='temperaturaciudad'>"+response.main.temp+"º</div>";
							 		
					let tmperatura = response.main.temp;
					 $("#menu").append(ciudad);
					 
					 let ciudades = JSON.parse(localStorage.getItem('elementos'));
					 let temps = JSON.parse(localStorage.getItem('temps'));
					 if(ciudades == null){
						ciudades = [];
						temps = [];
					 }
					
				 //  añadir ciudad al array(ciudades)
					 ciudades.push(nomciudad);
					 temps.push(tmperatura);
				  //guardar la ciudad en localStorage	
					localStorage.setItem('elementos', JSON.stringify(ciudades));
					localStorage.setItem('temps', JSON.stringify(temps));

		 		});
				 
			
		





		 });

	});

});










			
$(document).on("click", ".ciudad",function(){

	console.log($(this).find( "#nombreciudad" ).text());
	let nomciudad=$(this).find( "#nombreciudad" ).text();


	//navigator.geolocation.getCurrentPosition(success);

		
		
		let url = "http://api.openweathermap.org/data/2.5/weather?q="+nomciudad+"&units=metric&APPID=055cbdecc7321d265bcdddf979cb43af";

		$.getJSON(url).done(function(response){  
			console.log("llhkjh");

		let html = "<div id='box1'><div id='texto'><p>¿Qué tiempo hace?</p><h1>"+response.name+"</h1><h2>"+response.main.temp+"º</h2><p>Temp. Mínima  "+response.main.temp_min+"º</p><p>Temp. Máxima  "+response.main.temp_max+"º</p><h4>¿Hay sol?</h4></div></div>";
							
		$("#detalleciudad").append(html);


		});



});

