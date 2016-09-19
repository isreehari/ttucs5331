/**
 * Created by sinukoll on 2/20/2016.
 */

(function(angular) {
    'use strict';

    function linearChart($window){
      return{
             restrict: "EA",
             scope:false,
             template: "<svg width='850' height='200'></svg>",
             link: function(scope, elem, attrs){

                                var salesDataToPlot=[];



                                var padding = 20;
                                var pathClass="path";
                                var xScale, yScale, xAxisGen, yAxisGen, lineFun;

                                var d3 = $window.d3;
                                var rawSvg=elem.find('svg');
                                var svg = d3.select(rawSvg[0]);

                                function setChartParameters(){

                                    xScale = d3.scale.linear()
                                        .domain([salesDataToPlot[0].year, salesDataToPlot[salesDataToPlot.length-1].year])
                                        .range([padding + 5, rawSvg.attr("width") - padding]);

                                    yScale = d3.scale.linear()
                                        .domain([0, d3.max(salesDataToPlot, function (d) {
                                            return d.value;
                                        })])
                                        .range([rawSvg.attr("height") - padding, 0]);

                                    xAxisGen = d3.svg.axis()
                                        .scale(xScale)
                                        .orient("bottom")
                                        .ticks(salesDataToPlot.length - 1);

                                    yAxisGen = d3.svg.axis()
                                        .scale(yScale)
                                        .orient("left")
                                        .ticks(5);

                                    lineFun = d3.svg.line()
                                        .x(function (d) {
                                            return xScale(d.year);
                                        })
                                        .y(function (d) {
                                            return yScale(d.value);
                                        })
                                        .interpolate("basis");
                                }
                                function drawLineChart() {

                                      setChartParameters();

                                      svg.append("svg:g")
                                          .attr("class", "x axis")
                                          .attr("transform", "translate(0,180)")
                                          .call(xAxisGen);

                                      svg.append("svg:g")
                                          .attr("class", "y axis")
                                          .attr("transform", "translate(20,0)")
                                          .call(yAxisGen);

                                      svg.append("svg:path")
                                          .attr({
                                              d: lineFun(salesDataToPlot),
                                              "stroke": "blue",
                                              "stroke-width": 2,
                                              "fill": "none",
                                              "class": pathClass
                                          });
                                  }
                                scope.drawGraph = function(){

                                  angular.forEach(scope.main.returnData.Results.series[0].data,function(dataValue,datKey){
                                     dataValue.year = dataValue.year * 1;
                                     dataValue.value = dataValue.value * 1;
                                  });

                                  salesDataToPlot=scope.main.returnData.Results.series[0].data;

                                  if(salesDataToPlot)
                                        drawLineChart();
                                };

                            }
           };
    };
    angular
        .module('hari_app')
        .directive('linearChart',['$window',linearChart])
    })(window.angular);
