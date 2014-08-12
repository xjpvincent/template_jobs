
 $(document).ready(function() {
        	// $(".more-icon").click(function(event) {
        	// 	 Act on the event 
        	// 	$(this).addClass('down-icon')
        		
        	// });  
        	// addClass("down-icon")
                $("[class='test-icon']").click(function(event) {
                //          Act on the event 
                         // $(this).attr("classtest-icon')
                         $(this).attr({
                                 class : 'more-icon',
                                 // property2: 'value2'
                         });
             
                 });

                $("[class='more-icon h']").click(function(event) {
                //          Act on the event 
                         // $(this).attr("classtest-icon')
                         $(this).attr({
                                 class : 'test-icon',
                                 // property2: 'value2'
                         });
             
                 });
                
        	
        });