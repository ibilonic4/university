import $ from 'jquery';

class Search{
    // 1. describe and create the object
constructor(){

    this.addSearchHTML();

    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.resultsDiv = $("#search-overlay__results");
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.searchTerm = $(".search-term");
    this.previousValue;
    this.typingTimer;
    this.events();
    
}

//2. events
events(){

    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
    this.searchTerm.on("keyup", this.typingLogic.bind(this));

}
//3. methods
typingLogic(){

    if(this.searchTerm.val() != this.previousValue){
        clearTimeout(this.typingTimer);

        if(this.searchTerm.val()){
            if(!this.isSpinnerVisible){
                this.resultsDiv.html('<div class="spinner-loader"></div>');
                this.isSpinnerVisible = true;}
            
              this.typingTimer = setTimeout(this.getResults.bind(this), 750);
        }else{
            this.resultsDiv.html("");
            this.isSpinnerVisible = false;
        }
    }
  this.previousValue = this.searchTerm.val();

 
}

getResults(){
//asinkrona verzija -> requestovi se izvršavaju istovremeno

  $.when($.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchTerm.val()),
  $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchTerm.val())
  ).then((posts, pages) => {
    var combinedResults = posts[0].concat(pages[0]);
    this.resultsDiv.html(`
    <h2 class="search-overlay__section-title"> General Info </h2>
    ${combinedResults.length ? '<ul class="link-list min-list">' : '<p> No general information matches your search </p>'}
    ${combinedResults.map(item => `<li> <a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
    ${combinedResults.lenght ? '</ul>' : ''}
       `);
       this.isSpinnerVisible = false;
  }, ()=> {
    this.resultsDiv.html('<p> Unexpected Error </p>');
  });


//ovo ispod results ==>{} odnosno parametar(izostavlja se ime funkcije ovo je samo varijabla koju prosljeđujem) zove se arrow function, koristi se umjesto anonimnih tj closure funkcija jer onda ne moram stavljat bind(this)
//sinkrona verzija   -> requestovi cekaju te se izvrsavaju jedan po jedan

// $.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchTerm.val(), posts =>{
//       $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchTerm.val(), pages => {
//         var combinedResults = posts.concat(pages);
//         this.resultsDiv.html(`
//         <h2 class="search-overlay__section-title"> General Info </h2>
//         ${combinedResults.length ? '<ul class="link-list min-list">' : '<p> No general information matches your search </p>'}
//         ${combinedResults.map(item => `<li> <a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
//         ${combinedResults.lenght ? '</ul>' : ''}
//            `);
//            this.isSpinnerVisible = false;
//       });      
      
//    });

}

openOverlay(){

    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchTerm.val('');
    setTimeout(() => this.searchTerm.focus(), 301);
    console.log("Open method just ran");

    this.isOverlayOpen = true;
}

closeOverlay(){
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    console.log("Close method just ran");

    this.isOverlayOpen = false;
   
}

keyPressDispatcher(e){
    
    if(e.keyCode == 83 && this.isOverlayOpen == false && !$("input, textarea").is(":focus")){
        this.openOverlay();
    }if(e.keyCode === 27 && this.isOverlayOpen == true){
        this.closeOverlay();
    }

}

addSearchHTML(){
    $("body").append(`
    <div class="search-overlay">

<div class="search-overlay__top">
  <div class="container"> 
   <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
  <input type="text" class="search-term" placeholder="What ere you looking for" id="search-term">
  <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>

  </div>

</div>
<div class="container">
  <div id="search-overlay__results">


    
  </div>
</div>
</div>
    `);
}

}

export default Search