    
    mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2ViYXJiZXIiLCJhIjoiY2pvNjBicmU5MGU0MzNrb2I3aG02OWthciJ9.czMAn4iRicWIeUrok9O7NQ';
    var beforeMap = new mapboxgl.Map({
        container: 'before',
        style: 'mapbox://styles/jessebarber/cjuulddn444d01fmn08ldmrpm',
        center: [-122.273, 37.876],
        zoom: 12.3
    });

    var afterMap = new mapboxgl.Map({
        container: 'after',
        style: 'mapbox://styles/jessebarber/cjuuqpgph20611fmxpdq8qdpm',
        center: [-122.273, 37.876],
        zoom: 12.3
    });

    var map = new mapboxgl.Compare(beforeMap, afterMap, {
        // Set this to enable comparing two maps by mouse movement:
        // mousemove: true
    });
   
    // makes cursor the default
    // map.getCanvas().style.cursor = 'default';

    afterMap.on('load', function() {
  
        var layers = ['C-1', 'C-T', 'C-N', 'C-SO', 'C-N(H)', 'C-W', 'C-NS', 
        'C-SA', 'C-NS(H)', 'C-E', 'C-DMU Buffer', 'C-DMU Core', 'C-DMU Outer Core',
        'C-DMU Corridor', 'M', 'MM', 'MULI', 'MUR', 'R1', 'R-1A', 'R-1H', 'R-2', 'R-2A',
         'R-2AH', 'R-3', 'R-3H', 'R-4', 'R-4H', 'R-5', 'R-5H', 'R-S', 'R-SMU', 'SP', 'X', 'U', 'ES-R'];
        var colors = ['#DA0D0D', '#F99595', '#ED4646', '#FA6767', '#ED4646', 
        '#FD4B4B', '#FB6767', '#FB8585', '#FB6767', '#FB6767', '#E036B8', 
        '#630947', '#A80BA4', '#9B1646', '#DAF0FC', '#C1D8FD', '#8AD4FC', 
        '#69B4FE', '#FCFBC0', '#FBF98F', '#FBFAC0', '#FBD75E', '#F9A900', '#FAB000', 
        '#FB9300', '#FB9300', '#D86F00', '#D86F00', '#BA7028', '#BA7028', '#7F693B', 
        '#6800DA', '#BEEE8F', '#4A33C8', '#D1D1D1', '#B9A69B'];
        
        for (i = 0; i < layers.length; i++) {
          var layer = layers[i];
          var color = colors[i];
          var item = document.createElement('div');
          var key = document.createElement('span');
          key.className = 'legend-key';
          key.style.backgroundColor = color;

          var value = document.createElement('span');
          value.innerHTML = layer;
          item.appendChild(key);
          item.appendChild(value);
          legend.appendChild(item);
            }

        // This section creates hover information and displays it in title box 

        beforeMap.on('mousemove', function(e) {
          var zones = beforeMap.queryRenderedFeatures(e.point, {
            layers: ['1949zoning']
          });

          if (zones.length > 0) {
            document.getElementById('pd').innerHTML = '<p><strong>Land use: ' + zones[0].properties.zoning + '</strong></p>' + '<p><a href="https://www.cityofberkeley.info/planning/" target="_blank">Learn about zoning codes here</a></p>';
          } else {
            document.getElementById('pd').innerHTML = '<p><strong>Land use: </strong></p>' + '<p><a href="https://www.cityofberkeley.info/planning/" target="_blank">Learn about zoning codes here</a></p>';
          }
        });

        afterMap.on('mousemove', function(e) {
          var zones = afterMap.queryRenderedFeatures(e.point, {
            layers: ['2018zoning']
          });

          if (zones.length > 0) {
            document.getElementById('pd').innerHTML = '<p><strong>Land use: ' + zones[0].properties.zoning + '</strong></p>'+ '<p><a href="https://www.cityofberkeley.info/planning/" target="_blank">Learn about zoning codes here</a></p>';
          } else {
            document.getElementById('pd').innerHTML = '<p><strong>Land use: </strong></p>' + '<p><a href="https://www.cityofberkeley.info/planning/" target="_blank">Learn about zoning codes here</a></p>';
          }
        });

  beforeMap.getCanvas().style.cursor = 'default';
  afterMap.getCanvas().style.cursor = 'default';
  // afterMap.addControl(new mapboxgl.NavigationControl());
  var nav = new mapboxgl.NavigationControl();
  beforeMap.addControl(nav, 'top-left');
  beforeMap.addControl(new mapboxgl.ScaleControl({position: 'bottom-left'}));
       

    });
