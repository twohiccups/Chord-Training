const width = 800;
const height = 850;
const radius = 200;
const outerRadius = radius + 50;
var s = Snap(width, height);
var scaleDegrees = []



var cir = s.circle(width/2, height/2, radius);
cir.attr({
    stroke: "#ccee99",
    fill:  "#ddffaa",
    "stroke-width":  14,
});


for (i = 0; i < 12; i++) {
    scaleDegrees.push(
        s.circle(width/2 + Math.sin(Math.PI/6 * i) * radius, height/2 - Math.cos(Math.PI/6 * i) * radius, 20)
    )
        s.text(width/2 + Math.sin(Math.PI/6 * i) * outerRadius - 20, height/2 - Math.cos(Math.PI/6 * i) * outerRadius, "(" + i + ") " + ratiosMap[i+1].name);
}

function color(chord) {
    for (i = 0; i < scaleDegrees.length; i++) {
        scaleDegrees[i].attr({
            fill: "#333"
        });
    }
    chord.forEach((item) => {
        scaleDegrees[item-1].attr({
            fill: "#ffbbff"
        })
    })
}

var poly;

function renderChord(chord) {
    
    if (poly) {poly.remove();}
    const polylineArray = getPolylineArray(chord)
    
    poly = s.polyline(polylineArray)
        poly.attr({
        fill: "transparent",
        stroke: "black",
        "stroke-width": 4
    });

    $(cir.node).after($(poly.node));
    
    firstTimePoly = false;
    
    
}

function getPolylineArray(chord) {
    var polylineArray = []
    for (i = 0; i < chord.length - 1; i++) {
        for (j = i + 1; j < chord.length; j++) {
            polylineArray.push(scaleDegrees[chord[i]-1].attr("cx"));
            polylineArray.push(scaleDegrees[chord[i]-1].attr("cy")); 
            polylineArray.push(scaleDegrees[chord[j]-1].attr("cx")); 
            polylineArray.push(scaleDegrees[chord[j]-1].attr("cy"));
            polylineArray.push(scaleDegrees[chord[i]-1].attr("cx"));
            polylineArray.push(scaleDegrees[chord[i]-1].attr("cy"));    
        }
    }
    return polylineArray;
}

function distancesDistribution(chord) {
    var distances = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(i = 0; i < chord.length - 1; i++) {
        for(j = i + 1; j < chord.length; j++) {
            distances[Math.abs(chord[j] - chord[i])]++;
        }
    }
    return distances.slice(1);   
}

function distancesDistributionSym6(chord) {
    var distances = distancesDistribution(chord)
    
    for(i = 0; i < 5; i++) {
        distances[i] += distances[distances.length - 1 - i]
    }
    
    return distances.slice(0, 6);   
}

var histrogram;
function distanceHistrogramSym(distribution) {
    if (histrogram) {
        histrogram.clear()
    }
    histrogram = s.group()
    var total = 0;
    for(i = 0; i < distribution.length; i++) {
        total+=distribution[i]
    }
    for(i = 0; i < distribution.length; i++) {
        const rectY = 100
        const rectHeight =  distribution[i]/total * 100 + 5;
        const rectWidth = 50;
        var rect = s.rect(rectWidth * i + 3, rectY - rectHeight, rectWidth, rectHeight)
        rect.attr({
            fill: "#eee",
            stroke: "#333",
            "stroke-width": 4
        })
        histrogram.add(rect)
        histrogram.add(s.text(rectWidth * i + 3, rectY + 20, ratiosMap[i+2].name))        
}
    
}

//function pathGraph() {
//    
//}