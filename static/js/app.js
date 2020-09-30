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
    //create gauge
    var dataGauge = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 270,
            title: { text: "Speed" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layoutGauge = { 
        width: 600, 
        height: 500, 
        margin: { t: 500, b: 500 } };
    Plotly.newPlot('myDiv', dataGauge, layoutGauge);
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

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getPanelInfo(data.names[0]);
    });
};
//check point
initData();