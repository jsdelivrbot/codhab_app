var app = angular.module('codhab.controllers.search',[]);
app.controller('SearchCtrl', function($scope, $state, $ionicLoading, $http) {


$scope.searchCPF = function (search) {
    console.log(search)
    $scope.result = "";
    $http.get('http://www.codhab.df.gov.br/habitacao/candidato/'+ search.cpf +'.json')
      .success(function(data, status, headers,config){
        var old = moment().diff(moment(data.born), 'years');
        if(old >= 60){
          data.olds = "Idoso";
        }else{
          data.olds = "Não";
        }
        console.log(data); // for browser console
        switch (data.civil_state_id) {
          case 1:
            data.civil_state_id = "Solteiro(a)";
            break;
          case 2:
            data.civil_state_id = "Casado(a)";
            break;
          case 3:
            data.civil_state_id = "Desq/Separado";
            break;
          case 4:
            data.civil_state_id = "Viuvo(a)";
            break;
          case 5:
            data.civil_state_id = "Divorciado(a)";
            break;
          case 6:
            data.civil_state_id = "Sep. Jud. Lit";
            break;
          case 7:
            data.civil_state_id = "União Estável";
            break;
        }
        switch (data.program_id) {
          case 1:
            data.program_id = "RII";
            break;
          case 2:
            data.program_id = "RIE";
            break;
          case 3:
            data.program_id = "REGULARIZAÇÃO";
            break;
          case 4:
            data.program_id = "VULNERAVEIS";
            break;
          case 5:
            data.program_id = "DEFICIENTES";
            break;
          case 6:
            data.program_id = "CADASTRO ANTIGO";
            break;
          case 7:
            data.program_id = "IDOSO";
            break;
          case 8:
            data.program_id = "SEM VÍNCULO";
            break;
        }

        switch (data.special_condition_id) {
          case 1:
            data.special_condition_id = "Sem Condição Especial";
            break;
          case 2:
            data.special_condition_id = "Deficiente";
            break;
          case 4:
            data.special_condition_id = "Idoso";
            break;
        }

        $scope.result = data; // for UI


      })
      .error(function(data, status, headers,config){
        console.log('data error');
      })
      .then(function(result){
        things = result.data;
      });
    }
});