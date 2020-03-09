$(function () {


  // 结算条的清算
  var WinHei = $(window).height();	  												//屏幕可视区域高度
    var barDis = $(".car-box").height();  												//购物车里商品列表 的高度
    var dis = barDis -WinHei;
    var scrol = 0;
    var _dis = 0;
    $(window).bind("scroll",scro);

    function scro() {
      scroll = $(window).scrollTop();
      _dis = dis - scroll;
      fixed();
    }
    function fixed() {
      if(_dis> -60){
        $(".car-toolbar").addClass("fixed-bottom");
      }else if(_dis<= -60){
        $(".car-toolbar").removeClass("fixed-bottom")
      }
    }

  //  选择框点击
  var prisAll = parseInt(0);
  var numAll = parseInt(0);
  var number,numdiv,pridiv,pris,totdiv,check,pri,barDis;

  // 点击
  $(".check-item").click(function () {
      number = $(this).parents(".item-single").find(".goods-num").text();
      
      pris = $(this).parents(".item-single").find(".total-money");
      pris = pris.text();
      if($(this).is(':checked')){                       //是选中状态· 商品数量`
          numAll += parseInt(number);
          
          prisAll += parseFloat(pris);
      }else {
        numAll -= parseInt(number);
        prisAll -= parseFloat(pris);
      }
      $("#total-price").text("￥" + prisAll.toFixed(2));
      $("#num-all").text(numAll);
  })
 

  // 商品数量加减
  $(".cgnum").click(function() {
    
      number = $(this).siblings(".goods-num").text(); //商品数量
      numdiv = $(this).siblings(".goods-num");      //商品
      pridiv = $(this).parents(".item-single").find(".price");
      totdiv = $(this).parents(".item-single").find(".total-money");
      check = $(this).parents(".item-single").find(".check-item");
      pri = pridiv.text();
      console.log(pri);
      // 数量减少
      if($(this).text()=="-"){
        
        if(number>1){
          number--;
          numdiv.text(number);
           pris = pri*number;
           console.log(pris);
            totdiv.text(pris.toFixed(2));
            if((check).is(':checked')){
                  prisAll = prisAll - parseFloat(pri);
                  numAll = numAll - 1;
                  $("#total-price").text("￥"+ prisAll.toFixed(2))
                  $("#num-all").text(numAll);
            }
        }
      }else {
        
        number++;
        numdiv.text(number);
        pris = pri * number;
        console.log(pris)
        totdiv.text(pris.toFixed(2));
          if((check).is(':checked')){
            prisAll += parseFloat(pri);
            numAll = numAll + 1;
            
            // console.log(prisAll);
            $("#total-price").text("￥"+prisAll.toFixed(2));
            $("#num-all").text(numAll);
          }
          
      }
  })
  // 删除本次购物
   $(".item-del").click(function () {
     check = $(this).parents(".item-single").find(".check-item");
     pris = $(this).parents(".item-single").find(".total-money");
     number = $(this).parents(".item-single").find(".goods-num").text();
      pri = pris.text();

      if(check.is(':checked')){
        prisAll -= parseFloat(pri);
        numAll = numAll - number;
      }
      $("#total-price").text("￥" + prisAll.toFixed(2));
      $("#num-all").text(numAll);
    $(this).parents(".item-single").remove();
    barDis = $(".car-box").height();
    dis = barDis - WinHei;
    scro();
   });
    // 全选

    $(".check-all").click(function () {
      if($(this).is(':checked')){
        console.log(this)
        $(".check-item").each(function () {
          if(!this.checked){
            $(this).click()
          }
        })
      }else {
        $(".check-item").each(function () {
          $(this).removeAttr('checked');
              prisAll = 0;
              numAll = 0 ;
              $("#total-price").text("￥" + prisAll.toFixed(2));
    			 $("#num-all").text(numAll);

        });
      }
    });
//  删除选中
$(".del-all").click(function(){
  $(".check-item").each(function(){											//针对每个选择框
    check = $(this).parents(".item-single").find(".check-item");	
      pris = $(this).parents(".item-single").find(".total-money");
      number =  $(this).parents(".item-single").find(".goods-num").text();
      pri = pris.text();
    if($(this).is(':checked')){												//如果选中框是勾中的则删除，并从总金额里扣掉被删减商品的金额
      prisAll -=  parseFloat(pri);
      numAll  = numAll -number;
      $(this).parents(".item-single").remove();
    }
    $("#total-price").text("￥" + prisAll.toFixed(2));
    $("#num-all").text(numAll);
    
  });
  barDis = $(".car-box").height();
dis = barDis -WinHei;
scro();
});
})