function getPlots(id) {
    //read samples.json using d3
        d3.json("../../data/samples.json").then (sampledata =>{
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
                    b: 100
                }
            };
        // create bar plot
        Plotly.newPlot("bar", data, layout);
        // add bubble chart
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
            //
            height: 600,
            width: 500
        };

        // creating data1 variable with corresponding data
        var dataBelly = [traceBelly];

    // create the bubble plot
    Plotly.newPlot("bubble", dataBelly, layoutBubble); 
    
    });
}
//status check