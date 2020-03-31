'use strict'
$(document).ready(function () {
    function Horns(newhornObj) {

        this.name = newhornObj.title;
        this.imgpic = newhornObj.image_url;
        this.disc = newhornObj.description;
        this.keywords = newhornObj.keyword;
        this.horns = newhornObj.horns;
        
    }
    Horns.all = [];
    let option = [];
    // console.log(Horns.all);
    var selectedKeyword
    
    

    
    Horns.prototype.displayContent = function () {

        let $hornClone = $("#photo-template").html();
      console.log($hornClone)
        typeof($hornClone)
        var render = Mustache.render($hornClone, this)
        console.log(this);
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
    
// })
// function showSelectedHorns(selectedKeyword){
//     $('section').css('display','none')
//     option.forEach((value, index)=>{

        
//     })

// }


    const readJson = () => {
        $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(hornData => {
            hornData.forEach((imgItem) => {

                let newhornObj = new Horns(imgItem);
                Horns.all.push(newhornObj)
                // console.log(newhornObj.keywords);
                

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
    
    readJson();
    
    let displaySelectedItem = $('select').on('change',function(){
        
        $('section').hide()
        selectedKeyword = $('select').find(":selected").text()
       Horns.all.forEach( value =>{
         
         if(value.keywords === selectedKeyword){
            
            $(`.${value.keywords}`).show()           
       }
           
       })

    }) 

})               