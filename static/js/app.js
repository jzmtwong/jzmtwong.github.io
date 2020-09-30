//create plot function when id select
function getPlots(id) {
//read samples.json using d3
    d3.json("static/js/samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)

        // format data
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels);

// retrieve top 10 otu ids for the plot OTU. reverse order as well. 
    var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();

    // format OTU id's in chart
    var OTU_id = OTU_top.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`)
        
    // create labels for top 10 OTUs
    var labels =  sampledata.samples[0].otu_labels.slice(0,10);
    console.log(`OTU_labels: ${labels}`);

    //fill in trace for plot details
    var trace = {
        x: sampleValues,
        y: OTU_id,
        text: labels,
        marker: {
        color: 'blue'},
        type:"bar",
        orientation: "h",
    };
    //create variable for the data set
    var data = [trace];

    //create layout variable to format plotly plot
    var layout = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            //
            b: 30
        }
    };
    // create bar plot
    Plotly.newPlot("bar", data, layout);
    // add bubble chart items
    var traceBelly = {
        x: sampledata.samples[0].otu_ids,
        y: sampledata.samples[0].sample_values,
        mode: "markers",
        marker: {
//marker colors and sizes as specified
            size: sampledata.samples[0].sample_values,
            color: sampledata.samples[0].otu_ids
        },
        text:  sampledata.samples[0].otu_labels

    };

    // set layout for the bubble plot
    var layoutBubble = {
        xaxis:{title: "OTU ID"},

        height: 550,
        width: 1100
    };

    // creating data1 variable with corresponding data
    var dataBelly = [traceBelly];

    // create the bubble plot
    Plotly.newPlot("bubble", dataBelly, layoutBubble); 
    
    });
}

//create data retrival function for demographic info - metadata
function getPanelInfo(id) {
    //read sample.json for data
    d3.json("static/js/samples.json").then((data)=> {
// store metadata in variable
        var metadata = data.metadata;
        console.log(metadata)

// filter metadata by id
        var filtered = metadata.filter(meta => meta.id.toString() === id)[0];
// select dempgrahic info to put in demographic panel
        var panelInfo = d3.select('#sample-metadata')

// clear demographic panel before getting new id input
        panelInfo.html("");

//retrieve info and append to panel,
        Object.entries(filtered).forEach((key) => {   
            panelInfo.append("h5").text(key[0].toUpperCase() + ":  " + key[1] + "\n");    
        });
    })
};

// create the function for the change event optionChanged in the index.html
function optionChanged(id) {
    getPlots(id);
    getPanelInfo(id);
}

// function for initial data 
function initData() {

    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("static/js/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getPanelInfo(data.names[0]);
        getGauge(data.wfreq[0])
    });
};
//bonus
//create gauge
// reference to the code below:  I found a plot.ly blogger who found a good way to customize the gauge in plot.ly, url link below:
//https://com2m.de/blog/technology/gauge-charts-with-plotly/
// using that code to customize plot.ly

//belly button cleaning function
    //function entered must be between 0 and 180 to appear
    // since frequency from 1-9, mutliples of 20 should work
    function getGauge(wfreq) {
        var level = parseFloat(wfreq)*20;
        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        // Path: may have to change to create a better triangle
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
        var data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 14, color:'850000'},
        showlegend: false,
        name: 'Freq',
        text: level,
        hoverinfo: 'text+name'},
    
        //modified values to match the sections of the gauge bar
        // the gauge is acutally a pie chart, so made bottom half completely white to hide it from view
        { values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5','3-4','2-3','1-2','0-1',''],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:[
            "rgba(0, 100, 10, .5)",
            "rgba(10, 120, 20, .5)",
            "rgba(50, 150, 0, .5)",
            "rgba(100, 150, 20, .5)",
            "rgba(170, 200, 40, .5)",
            "rgba(202, 210, 60, .5)",
            "rgba(210, 200, 80, .5)",
            "rgba(230, 230, 100, .5)",
            "rgba(240, 230, 215, .5)",
            "rgba(255, 255, 255, 0)"
        ]},
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];
    
        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
            color: '850000'
            }
        }],
        height: 400,
        width: 400,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };
    
        Plotly.newPlot('gauge', data, layout);
    };

initData();