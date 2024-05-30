
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    let $$ = selector => Array.from( document.querySelectorAll( selector ) );
    let $ = selector => document.querySelector( selector );

    let tryPromise = fn => Promise.resolve().then( fn );

    let toJson = obj => obj.json();
    let toText = obj => obj.text();

    let cy;

    let stylesheet = "MetabolomicsStyle2024.json";
    let getStylesheet = name => {
      let convert = res => name.match(/[.]json$/) ? toJson(res) : toText(res);

      return fetch(`stylesheets/${name}`).then( convert );
    };
    let applyStylesheet = stylesheet => {
      cy.style().fromJson( stylesheet ).update();

    };
    let applyStylesheetFromSelect = () => Promise.resolve( stylesheet ).then( getStylesheet ).then( applyStylesheet );



    let $dataset = $('#data');
    let getDataset = name => fetch(`datasets/${name}`).then( toJson );

    let getDatasetDesc = loadDoc =>  {

      function urlExists(testUrl) {
        var http = jQuery.ajax({
            type:"HEAD", //Not get
            url: testUrl,
            async: false
        })
        return http.status!=404;
    }
    
    //Usage
    txtfilename = `datasets/${$dataset.value.replace(/\.[^/.]+$/, "")}.txt`;
    // check if file exists, if it does not then return null, otherwise return text file content
    if(!urlExists(txtfilename)) {
       document.getElementById("p0").innerHTML = null;
    } else {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        document.getElementById("p0").innerHTML = this.responseText;
      };
      xhttp.open("GET",  txtfilename);
      xhttp.send();
    }

    }

    let applyDataset = dataset => {
      // if ($dataset.value == "cytoJS_formatted_Comorbid.json"){
      //   document.getElementById("p0").innerHTML ="Network for the Model Adjusted for Age, Sex, BMI,  Hispanic Background, Alcohol Use (never, former, current), Smoking (never, former, current), Total physical activity (MET-min/day), Hypertension status, Statin usage, Diabetes Stage"
      // } 
      // else {document.getElementById("p0").innerHTML = null}

      // so new eles are offscreen
      cy.zoom(0.001);
      cy.pan({ x: -9999999, y: -9999999 });

      // replace eles
      cy.elements().remove();
      cy.add( dataset );


    }
    let applyDatasetFromSelect = () => Promise.resolve( $dataset.value ).then( getDataset ).then( applyDataset ).then(getDatasetDesc);


    let layouts = {
      custom: { // replace with your own layout parameters
        name: 'preset',

        positions: undefined, // map of (node id) => (position obj); or function(node){ return somPos; }
        zoom: undefined, // the zoom level to set (prob want fit = false if set)
        pan: undefined, // the pan level to set (prob want fit = false if set)
        fit: true, // whether to fit to viewport
        padding: 30, // padding on fit
        animate: true, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
      }
    };

    let prevLayout;
    let getLayout = name => Promise.resolve( layouts[ name ] );
    let applyLayout = layout => {
      if( prevLayout ){
        prevLayout.stop();
      }

      let l = prevLayout = cy.makeLayout( layout );

      return l.run().promiseOn('layoutstop');
    }
    let applyLayoutFromSelect = () => Promise.resolve( 'custom' ).then( getLayout ).then( applyLayout );




    
   let getCXmenu = () => cy.cxtmenu({
      selector: 'node',

      commands: [
        {
          content: "Analysis Results",
          select: function(ele){

            //console.log( ele.id() )
            if (ele.data('Significant') == 1) {
              isSig = "Yes";
            } else {
              isSig = "No";
            };

            function formatData(ele_data){
              if (ele_data == ""){
                return("")
              } else {return(ele_data.toFixed(4))}
            }
            if (ele.data('Significant') == 1) {
              isSig = "Yes";
            } else {
              isSig = "No";
            }

            document.getElementById("p1").innerHTML = ['Name: ' +ele.data('canonicalName')]
            document.getElementById("p2").innerHTML = ['Beta: ' + formatData(ele.data('beta')) ]
            document.getElementById("p3").innerHTML = ['P-value: ' + formatData(ele.data('pvalue'))]
            document.getElementById("p4").innerHTML = ['Significant? (P<0.00013): ' + isSig]
            document.getElementById("p5").innerHTML = ['CI: ' +  formatData(ele.data('CI_2_5')) + ' - ' + formatData(ele.data('CI_2_5'))]
            document.getElementById("p6").innerHTML = null
            document.getElementById("p7").innerHTML = null
          }
        },

        {
          content: 'Info',
          select: function(ele){
            document.getElementById("p1").innerHTML = ['Name: ' +ele.data('canonicalName')]
            document.getElementById("p2").innerHTML = ['Category: ' + ele.data('Category') ]
            document.getElementById("p3").innerHTML = ['Type: ' + ele.data('Type') ]
            document.getElementById("p4").innerHTML = ['Pathway: ' + ele.data('Pathway') ]
            document.getElementById("p5").innerHTML = ['Reaction Pathway: ' + ele.data('Reaction_pathway')]
            document.getElementById("p6").innerHTML = ['KEGG: ' + ele.data('KEGG') ]
            document.getElementById("p7").innerHTML = ['HMDB: ' + ele.data('HMDB') ]
          },
          enabled: true
        }
      ]
    });


    
    let applyEmptyFields = () =>  {document.getElementById("p1").innerHTML = null
                                    document.getElementById("p2").innerHTML = null
                                    document.getElementById("p3").innerHTML = null
                                    document.getElementById("p4").innerHTML = null
                                    document.getElementById("p5").innerHTML = null
                                    document.getElementById("p6").innerHTML = null
                                    document.getElementById("p7").innerHTML = null};

    cy = window.cy = cytoscape({
      container: $('#cy')
    });





    tryPromise( applyDatasetFromSelect ).then( applyStylesheetFromSelect ).then( applyLayoutFromSelect ).then( getCXmenu );

    $dataset.addEventListener('change', function(){
      tryPromise( applyDatasetFromSelect ).then( applyLayoutFromSelect );
    });



    $('#redo-layout').addEventListener('click', applyLayoutFromSelect)
    $('#redo-layout').addEventListener('click' , applyEmptyFields);



    
  });
})();

