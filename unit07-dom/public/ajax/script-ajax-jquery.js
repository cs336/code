"use strict";

$(document).ready(function() {
    $("#faqs h2").click(
        function() {
            $(this).next("div").toggleClass("open");
            $(this).toggleClass("minus");
        }
    );
    $("h2#fetch").click(
        function() {
            console.log('AJAX request issued...');
            $.ajax({
                url: "/fetch",
                type: "GET",
                data: {
                    name: "jQuery-AJAX"
                }
            })
             .done(function(result){
                 console.log('AJAX request succeeded...');
		 $("#fetchContent").html("<p>" + result.content + "</p>");
             })
             .fail(function(xhr, status, errorThrown) {
                 console.log('AJAX request failed...');
             })
        }
    );
});
