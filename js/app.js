'use strict'
$(document).ready(function () {
    function Horns(newhornObj) {

        this.name = newhornObj.title;
        this.imgpic = newhornObj.image_url;
        this.disc = newhornObj.description;
        this.keywords = newhornObj.keyword;
        this.horns = newhornObj.horns;
        Horns.all.push(this)
    }
    Horns.all = [];
    let option = [];
    var selectedKeyword

    Horns.prototype.displayContent = function () {

        let $hornClone = $("#photo-template").html();
        console.log(this)
        // console.log(typeof($hornClone));

        var render = Mustache.render($hornClone, this)

        // console.log(this);
        // $hornClone.find('h2').text(this.name);
        // $hornClone.find('img').attr('src', this.imgpic);
        // $hornClone.find('p').text(this.disc);

        // $hornClone.removeAttr("id");
        // $hornClone.attr("class", this.keywords);
        $("main").append(render);

    }
    // let displaySelectedItem = $('select').on('change',function(){
    //     // console.log(displaySelectedItem.val());
    //     // $('section').css('display','none')
    //     // //    Horns.prototype.displaySelectedItm2= function(){
    //     //     if('unicorn' === displaySelectedItem.val()){
    //     //         console.log('match');
    //     //        let $hey= $("<p></p>").text("love ")
    //     //       $('main').append($hey)
    //     for(let i = 0; i < option; i++){
    //     }
    //    }
    // // }
    // }) function showSelectedHorns(selectedKeyword){
    //     $('section').css('display','none')
    //     option.forEach((value, index)=>{
    //     })
    // }

    const readJson = (page) => {
        $.ajax(`data/${page}.json`, { method: "GET", dataType: "JSON" }).then(hornData => {
            hornData.forEach((imgItem) => {

                let newhornObj = new Horns(imgItem);

                if (!(option.includes(imgItem.keyword))) {
                    option.push(imgItem.keyword)
                    let $newOpt = $("#opt").clone()
                    $newOpt.text(imgItem.keyword)
                    $newOpt.attr('id', imgItem.keyword)
                    $newOpt.attr('value', imgItem.keyword)
                    $('select').append($newOpt)
                }
                newhornObj.displayContent();
            });
        });
    };
    let page1 = "page-1"
    let page2 = "page-2"
    readJson(page1);

    $('select').on('change', function () {

        $('section').hide()
        selectedKeyword = $('select').find(":selected").text()
        Horns.all.forEach(value => {

            if (value.keywords === selectedKeyword) {

                $(`.${value.keywords}`).show()
            }
        })
    })

    $('button').on('click', () => {
        if (event.target.id === 'firstPage') {
            $('section').remove()
            Horns.all = []
            readJson(page1)
        } else {
            $('section').remove()
            Horns.all = []
            readJson(page2)
        }
    })

    $('input').on('change', () => {
        if (event.target.id === 'byName') {
            Horns.all.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
                if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 }
            })

            $('section').remove()
            Horns.all.forEach(function (value) {
                let render = Mustache.render($("#photo-template").html(), value)
                $('main').append(render)
            })
        } else {
            Horns.all.sort((a, b) => {
                if (a.horns < b.horns) { return 1 }
                if (a.horns > b.horns) { return -1 }
            })
            $('section').remove()
            Horns.all.forEach(function (value) {
                let render = Mustache.render($("#photo-template").html(), value)
                $('main').append(render)
            })
        }
    })
})               