$(function(){ showAndHide()})
   function showAndHide(){
       setInterval(function(){
        $(".banner1").fadeToggle(50).delay(10000).fadeToggle(50)
       },20000);
       $(".navCon>li").mouseenter(
        function(){$(".subNav").css("display", "flex")}
        );
       
    
        $(".subNav").hover(
            function(){$(".subNav").css("display", "flex")}
        , function(){$(".subNav").css("display", "none")})  
      }

       