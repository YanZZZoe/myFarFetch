let userNumber = getCookie("userNumber");
function getShoppingCar() {
    $.get("./php/getShoppingCart.php", { "vipName":userNumber }, function (datas) {
        let htmlStr = "";
        datas.forEach(goods => {
            htmlStr += `
            <li>
                <div class="listShow">
                    <div class="checkBox floatLeft">
                        <input class="check" type="checkbox">
                    </div>
                    <div class="itemImg floatLeft">
                        <a href="#" target="_blank">
                            <img src="${goods.goodsImg}">
                        </a>
                    </div>
                    <div class="itemDetail floatLeft">
                        <div class="itemBrand floatLeft">
                            <a href="#">${goods.beiyong6}</a>
                            <p>${goods.goodsName}</p>
                            <span>Farfetch特定编号: <em class="goodsId">${goods.goodsId}</em></span></div>
                            <div class="itemPrice floatLeft">
                                <i>￥</i><span> ${goods.goodsPrice}</span>
                            </div>
                            <div class="itemNumber floatLeft">
                                <div class="itemSize">
                                    <p>尺码</p>
                                    <span>均码</span>
                                </div>
                                <div class="itemQuantity">
                                    <p>数量</p>
                                        <div class="quantityBox clear_fix">
                                        <input class="reduceBtn" type="button" value=" － ">
                                        <input type="text" value=${goods.goodsCount}>
                                        <input class="addBtn" type="button" value=" ＋ ">
                                        <input class="delBtn" type="button" value="删除">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </li>
            `
        });
        $(".itemList").html(htmlStr);
        jQuery.fn.extend({
            check: function ($subCheck) {
                this.click(function () {
                    $subCheck.prop("checked", this.checked)
                });
                $subCheck.click(function () {
                    subChange();
                });
                var subChange = () => {
                    let allCheck = true;
                    $subCheck.each(function () {
                        if (this.checked != true) { allCheck = false; }
                    });
                    this.prop("checked", allCheck)
                }
            }
        })
    
        $(".checkAll").check($(".checkBox :checkbox"))
    
        $(".addBtn").css("cursor", "pointer");
        $(".reduceBtn").css("cursor", "pointer");

        $(".addBtn").click(function () {
            let goodsId=$(this).parentsUntil(".listShow").find(".goodsId").html()
            let count =$(this).prev().val();
            count++;
            updateCount(goodsId,count,()=>{
                $(this).prev().val(count);
                totalmoney();})
        });
    
        $(".reduceBtn").click(function () {
            let goodsId=$(this).parentsUntil(".listShow").find(".goodsId").html()
            let count = $(this).next().val();
            count--;
            if (count <= 0) { count = 0 }
            updateCount(goodsId,count,()=>{
                $(this).next().val(count)
                if (count == 0) {
                    $(this).parentsUntil(".listShow").parent().find(".check").prop("checked",false);
                }
                totalmoney()})
            
        })
    
        $(".delBtn").click(function () {
            let goodsId=$(this).parentsUntil(".listShow").find(".goodsId").html();
            deleteCount(goodsId,()=>{
                $(this).parentsUntil(".listShow").parent().parent().remove();
            })
           
            totalmoney()
        })
    
        function totalmoney() {
            let money = 0;
            let $li = $(".itemList > li")
            $li.each(function () {
                if ($(this).find(":checkbox").prop("checked")) {
                    money += parseFloat($(this).find(".itemPrice").find("span").html()*$(this).find(".reduceBtn").next().val());
                }
            });
            $(".sumMoney >i").html(money);
            $(".totalMoney >i").html(money)
        }
    
    
        $(".itemList > li").click(function(){totalmoney()})
    }, "json")

}


function updateCount(goodsId,goodsCount,cb){
    $.get("./php/updateGoodsCount.php",{"vipName":userNumber,"goodsId":goodsId,"goodsCount":goodsCount},function(data){
        if(data==0){alert("服务器出错，修改数量失败")}
        else{cb();}
    })
}

function deleteCount(goodsId,cb){
    $.get("./php/deleteGoods.php",{"vipName":userNumber,"goodsId":goodsId},function(data){
        if(data==0){alert("服务器出错，删除失败")}
        else{cb()}
    })
}
