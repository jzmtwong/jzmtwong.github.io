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



