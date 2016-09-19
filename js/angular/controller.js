/**
 * Created by sinukoll on 6/1/15.
 * controller
 */

(function(angular){
    'use strict';
    function fad_main_ctrl($scope,getData){

        var vm = this;
        vm.returnData = {};

        vm.inputPrefix = {'LA':'Local Area','ST':'State'};
        vm.inputMeasureCode = {'03':'Unemployment Rate', '04':'Unemployment', '05':'Employment', '06':'Labor force'};
        vm.inputSeasonalCode = {'S':'Seasonally','U':'Not Seasonally Adjusted'};
        vm.inputYear = [];
              for(var i=1978;i<=2016;i++)
              vm.inputYear.push(i);
        vm.inputMonth = { 'M01':'January',
                          'M02':'February',
                          'M03':'March',
                          'M04':'April',
                          'M05':'May',
                          'M06':'June',
                          'M07':'July',
                          'M08':'August',
                          'M09':'September',
                          'M10':'October',
                          'M11':'November',
                          'M12':'December',
                          };
        vm.inputState = [
                          {id:'01', name:	'Alabama'},
                          {id:'02', name:	'Alaska'},
                          {id:'04', name:	'Arizona'},
                          {id:'05', name:	'Arkansas'},
                          {id:'06', name:	'California'},
                          {id:'08', name:	'Colorado'},
                          {id:'09', name:	'Connecticut'},
                          {id:'10', name:	'Delaware'},
                          {id:'11', name:	'District of Columbia'},
                          {id:'12', name:	'Florida'},
                          {id:'13', name:	'Georgia'},
                          {id:'15', name:	'Hawaii'},
                          {id:'16', name:	'Idaho'},
                          {id:'17', name:	'Illinois'},
                          {id:'18', name:	'Indiana'},
                          {id:'19', name:	'Iowa'},
                          {id:'20', name:	'Kansas'},
                          {id:'21', name:	'Kentucky'},
                          {id:'22', name:	'Louisiana'},
                          {id:'23', name:	'Maine'},
                          {id:'24', name:	'Maryland'},
                          {id:'25', name:	'Massachusetts'},
                          {id:'26', name:	'Michigan'},
                          {id:'27', name:	'Minnesota'},
                          {id:'28', name:	'Mississippi'},
                          {id:'29', name:	'Missouri'},
                          {id:'30', name:	'Montana'},
                          {id:'31', name:	'Nebraska'},
                          {id:'32', name:	'Nevada'},
                          {id:'33', name:	'New Hampshire'},
                          {id:'34', name:	'New Jersey'},
                          {id:'35', name:	'New Mexico'},
                          {id:'36', name:	'New York'},
                          {id:'37', name:	'North Carolina'},
                          {id:'38', name:	'North Dakota'},
                          {id:'39', name:	'Ohio'},
                          {id:'40', name:	'Oklahoma'},
                          {id:'41', name:	'Oregon'},
                          {id:'42', name:	'Pennsylvania'},
                          {id:'44', name:	'Rhode Island'},
                          {id:'45', name:	'South Carolina'},
                          {id:'46', name:	'South Dakota'},
                          {id:'47', name:	'Tennessee'},
                          {id:'48', name:	'Texas'},
                          {id:'49', name:	'Utah'},
                          {id:'50', name:	'Vermont'},
                          {id:'51', name:	'Virginia'},
                          {id:'53', name:	'Washington'},
                          {id:'54', name:	'West Virginia'},
                          {id:'55', name:	'Wisconsin'},
                      //    {id:'56', name:	'Wyoming'},
                        //  {id:'72', name:	'Puerto Rico'},
                        //  {id:'80', name:	'Census Regions and Divisions'},
        ];
        vm.userSelection = {
          prefix:'LA',
          seasonalCode:'U',
          areaType:'ST',
          stateCode:'',
          areaCode:'00000000000',
          measureCode:'03',
          year:'',
          period:''
        };
        vm.requestData ={
          'seriesid': ['LEU0254555900'],
          'startyear': '2002',
          'endyear': '2012'
        };
        vm.getJson = function(){

          var userRequestedData = generateSeriesId(vm);

            if(userRequestedData)
               vm.requestData.seriesid = userRequestedData;



      getData.getAPIData(vm.requestData).then(function(returnedData){
             vm.returnData = angular.fromJson(returnedData);

             angular.forEach(vm.returnData.Results.series[0].data,function(dataValue,datKey){
                dataValue.year = dataValue.year * 1;
                dataValue.value = dataValue.value * 1;
             });

              console.log(vm.returnData.Results.series[0].data);

          });

        };
        vm.drawGraph = function(){
          vm.graphData =  vm.returnData.Results.series[0].data;
        };
        // Testing Data
        vm.salesData=[
                        {hour: 1,sales: 54},
                        {hour: 2,sales: 66},
                        {hour: 3,sales: 77},
                        {hour: 4,sales: 70},
                        {hour: 5,sales: 60},
                        {hour: 6,sales: 63},
                        {hour: 7,sales: 55},
                        {hour: 8,sales: 47},
                        {hour: 9,sales: 55},
                        {hour: 10,sales: 30}
                    ];
    };
    function generateSeriesId(vm){
      /*************************************************************
                            1         2
                   12345678901234567890
      Series ID    LAUCN281070000000003
      Positions   Value          Field Name
      1-2         LA             Prefix
      3           U              Seasonal Adjustment Code
      4-5         CN             Area Type Code
      6-18        2810700000000  Area Code
      19-20       03             Measure Code
      -------------------------- * -----------------------------------
      Measure Code
      -----------------
      06 Labor force,
      05 Employment,
      04 Unemployment, and
      03 Unemployment rate.
      -------------------------- * -----------------------------------

      LA U CN 28 1070 0000000 03
      LA U ST 01 0000 0000000 03


      ****************************************************************/

      var seriesIds = [];
      var seriesId = '';

      if(vm.userSelection.stateCode =="")
      {
         angular.forEach(vm.inputState,function(tempVal,tempKey){
           seriesId = vm.userSelection.prefix +  vm.userSelection.seasonalCode + vm.userSelection.areaType +  tempVal.id + vm.userSelection.areaCode + vm.userSelection.measureCode;
           seriesIds.push(seriesId);
         });


      }
      else {
        seriesId = vm.userSelection.prefix +  vm.userSelection.seasonalCode + vm.userSelection.areaType +  vm.userSelection.stateCode + vm.userSelection.areaCode + vm.userSelection.measureCode;
        seriesIds.push(seriesId);
      }



      return seriesIds;

    }
    angular
        .module('hari_app')
        .controller('hariMainCtrl',['$scope','getData',fad_main_ctrl])
})(window.angular);
