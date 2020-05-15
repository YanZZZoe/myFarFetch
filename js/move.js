
class Slider {
    constructor(selector, obj) {
        let defaultObj = {
            width: 692,
            height: 468,
            douWidth: 10,
            douHeight: 10,
            douColor: "green",
            douHighColor: "yellow",
            douIsCircle: true,
            timeLong: 3000,
            ord: 0,
            hrefs: ["index.html", "cariumaFes.html", "goodsList.html"]
        }
        for (let key in defaultObj) {
            this[key] = obj[key] == undefined ? defaultObj[key] : obj[key];
        }
        this.$box = $(selector);
        this.$sliderTime = this.timeLong / 3;
        this.$imgBox = this.$box.children("div");
        this.$imgs = this.$imgBox.children();
        this.$ul = this.$box.find("ul");
        this.$li = this.$box.find("li");
        this.$leftArrow = this.$box.find("span").eq(0);
        this.$rightArrow = this.$box.find("span").eq(1);
        this.$leftI = this.$leftArrow.find("i");
        this.$rightI = this.$rightArrow.find("i");
        this.myTimer = null;
        this.render();
        this.autoPlay();
        this.addEvent();

    }
    render() {
        this.$imgBox.css({ "position": "absolute", "left": 0, "top": 0, "width": "692px", "height":"468px"});

        this.$imgs.css({ "display": "block", "width": "100%", "height": "100%", "float": "left", "position": "absolute", "left": "692px" });

        this.$imgs.eq(0).css("left", 0)

        this.$ul.css({ "position": "absolute", "left": "50%", "transform": " translateX(-50%)", "bottom": "10px" });

        this.$li.css({ "display": "block", "height": "10px", "width": "10px", "background": this.douColor, "margin": "5px 10px", "float": "left" });

        if (this.douIsCircle) { this.$li.css("border-radius", "100%") }

        this.$li.eq(0).css("background", this.douHighColor);

        this.$leftArrow.css({ "width": "40px", "height": "40px","position": "absolute", "top": "220px", "line-height": "40px", "color": "green", "left": "5px" });

        this.$rightArrow.css({ "width": "40px", "height": "40px", "position": "absolute", "top": "220px", "line-height": "40px",  "color": "green", "right": "5px" });

        this.$leftI.css("font-size", "34px");
        this.$rightI.css("font-size", "30px");

    }

    autoPlay() {
        if (this.myTimer !== null) {
            return;
        }
        this.myTimer = setInterval(() => {
            this.goImg(this.ord + 1);
        }, this.timeLong);
    }

    stopPlay() {
        window.clearInterval(this.myTimer);
        this.myTimer = null;
    }

    goImg(transOrd) {
        let outOrd = this.ord;
        this.ord = transOrd;
        if (this.ord > this.$imgs.length - 1) { this.ord = 0 } else if (this.ord < 0) { this.ord = this.$imgs.length - 1; }
        this.$imgs.eq(outOrd).animate({ "left": -this.width }, this.timeLong / 3);
        this.$imgs.eq(this.ord).css("left", this.width)
        this.$imgs.eq(this.ord).animate({ "left": 0 }, this.timeLong / 3);
        this.$li.eq(outOrd).css("background", this.douColor);
        this.$li.eq(this.ord).css("background", this.douHighColor);


    }
    addEvent() {
        this.$box.mouseover(() => { this.$box.css("cursor", "pointer"); this.stopPlay(); });
        this.$box.mouseout(() => { this.autoPlay() });

        this.$li.click(() => { this.stopPlay(); this.goImg($(event.target).index()) })


        this.$leftArrow.click(() => {
            this.goImg(this.ord - 1)
        })

        this.$rightArrow.click(() => {
            this.goImg(this.ord + 1)
        })

        this.$imgBox.click(() => { this.hrefs[this.ord] && window.open(this.hrefs[this.ord]) })


        window.onblur = () => { this.stopPlay(); }
        window.onfocus = () => { this.autoPlay(); }
    }


}


$(function () { new Slider(".skirtBox", {}) })


