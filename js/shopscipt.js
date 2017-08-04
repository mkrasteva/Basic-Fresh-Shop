$(document).ready(function() {

  function requestProducts(selectedSizes, minPrice, maxPrice) {

    $.ajax({
      async: true,
      url: 'data.json',
      datatype: "json",
      type: 'get',
      cache: false,
      success:
        function(data) {

          var productsShown = [];

          data = $.parseJSON(data.replace(/;$/, ''));

          for (var i = 0; i < selectedSizes.length; i++) {
            var productsFound = data.filter(productType => productType.size == selectedSizes[i] && productType.price >= minPrice && productType.price <= maxPrice);
            if (productsFound.length > 0) {
              productsShown.push(productsFound);
            }
          }
          if (productsShown.length > 0) {
            var productsOffered = '';
            for( var i=0; i < productsShown.length; ++i ) {
              for (var j=0; j < productsShown[i].length; ++j) {
                productsOffered += '<div class="product' + productsShown[i][j]['id'] + '"><img src="images/' + productsShown[i][j]['picture'] + '" /><div class="productTitle">' + productsShown[i][j]['title'] + '</div><div class="productPrice">BGN' + productsShown[i][j]['price'] + '</div></div>';
              }
            }
            document.getElementById( 'products' ).innerHTML = productsOffered;
          } else {
            document.getElementById( 'products' ).innerHTML = "<span>Please, select your search criterias.</span>";
          }

        }      
    });
  }

  $(".cross").hide();

  $(".hamburger").click(function() {
    $(".menu").slideToggle("slow", function() {
      $(".menu").addClass("toggled");
      $(".hamburger").hide();
      $(".cross").show();
    });
  });

  $(".cross").click(function() {
    $(".menu").slideToggle("slow", function() {
      $(".cross").hide();
      $(".hamburger").show();
    });
  });

  $(window).resize(function() {
    if ($(window).width() < 1024) {
      $(".cross").hide();
      $(".hamburger").show();
      $(".menu").css("display", "block");
      $(".menu").hide();
    } else {
      $(".cross").hide();
      $(".hamburger").hide();
      $(".menu").css("display", "-webkit-box");
      $(".menu").show();
    }
  });

  $("input[name='size']").change(function() {
    searchCriteriaChanged();
  });

  $( "#slider-range" ).on( "slidechange", function( event, ui ) {
    searchCriteriaChanged();
  } );

  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 2,
      max: 6,
      values: [ 2, 6 ],
      slide: function( event, ui ) {
        $( "#amount" ).val("BGN" + ui.values[ 0 ] + " - BGN" + ui.values[ 1 ]);
      }
    });
    $( "#amount" ).val("BGN" + $( "#slider-range" ).slider( "values", 0 ) +
      " - BGN" + $( "#slider-range" ).slider( "values", 1 ));
  } );

  function searchCriteriaChanged() {
      var selectedSizes = [];
      $.each($("input[name='size']:checked"), function(){
              selectedSizes.push($(this).val());
      });
      var minPrice = $( "#slider-range" ).slider( "values", 0 );
      var maxPrice = $( "#slider-range" ).slider( "values", 1 );
      requestProducts(selectedSizes, minPrice, maxPrice);
  }

  $(window).load(function() {
      searchCriteriaChanged();
  });

});
