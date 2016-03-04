(function(){
    'use strict';

    var URL = 'http://api.football-data.org/v1/teams/57/players';

    angular
        .module("Gunners")
        .factory("TeamService", TeamService);

    function TeamService($rootScope) {
        var model = {
            players: [
                {
                    name: "David Ospina",
                    position: "Keeper",
                    jerseyNumber: 13,
                    dateOfBirth: "1988-08-31",
                    nationality: "Colombia",
                    contractUntil: "2019-06-30",
                    marketValue: "8,000,000 €"
                },
                {
                    name: "Per Mertesacker",
                    position: "Centre Back",
                    jerseyNumber: 4,
                    dateOfBirth: "1984-09-29",
                    nationality: "Germany",
                    contractUntil: "2017-06-30",
                    marketValue: "15,000,000 €"
                },
                {
                    name: "Laurent Koscielny",
                    position: "Centre Back",
                    jerseyNumber: 6,
                    dateOfBirth: "1985-09-10",
                    nationality: "France",
                    contractUntil: "2017-06-30",
                    marketValue: "20,000,000 €"
                },
                {
                    name: "Kieran Gibbs",
                    position: "Left-Back",
                    jerseyNumber: 3,
                    dateOfBirth: "1989-09-26",
                    nationality: "England",
                    contractUntil: "2018-06-30",
                    marketValue: "13,000,000 €"
                },
                {
                    name: "Nacho Monreal",
                    position: "Left-Back",
                    jerseyNumber: 18,
                    dateOfBirth: "1986-02-26",
                    nationality: "Spain",
                    contractUntil: "2019-06-30",
                    marketValue: "12,000,000 €"
                },
                {
                    name: "Calum Chambers",
                    position: "Centre Back",
                    jerseyNumber: 21,
                    dateOfBirth: "1995-01-20",
                    nationality: "England",
                    contractUntil: "2020-06-30",
                    marketValue: "12,000,000 €"
                },
                {
                    name: "Héctor Bellerín",
                    position: "Right-Back",
                    jerseyNumber: 24,
                    dateOfBirth: "1995-03-19",
                    nationality: "Spain",
                    contractUntil: "2019-06-30",
                    marketValue: "5,000,000 €"
                },
                {
                    name: "Mathieu Flamini",
                    position: "Defensive Midfield",
                    jerseyNumber: 20,
                    dateOfBirth: "1984-03-07",
                    nationality: "France",
                    contractUntil: "2016-06-30",
                    marketValue: "4,000,000 €"
                },
                {
                    name: "Mikel Arteta",
                    position: "Central Midfield",
                    jerseyNumber: 8,
                    dateOfBirth: "1982-03-26",
                    nationality: "Spain",
                    contractUntil: "2016-06-30",
                    marketValue: "2,500,000 €"
                },
                {
                    name: "Francis Coquelin",
                    position: "Defensive Midfield",
                    jerseyNumber: 34,
                    dateOfBirth: "1991-05-13",
                    nationality: "France",
                    contractUntil: "2019-06-30",
                    marketValue: "7,000,000 €"
                },
                {
                    name: "Jack Wilshere",
                    position: "Central Midfield",
                    jerseyNumber: 10,
                    dateOfBirth: "1992-01-01",
                    nationality: "England",
                    contractUntil: "2018-06-30",
                    marketValue: "25,000,000 €"
                },
                {
                    name: "Aaron Ramsey",
                    position: "Central Midfield",
                    jerseyNumber: 16,
                    dateOfBirth: "1990-12-26",
                    nationality: "Wales",
                    contractUntil: "2018-06-30",
                    marketValue: "28,000,000 €"
                },
                {
                    name: "Mesut Özil",
                    position: "Attacking Midfield",
                    jerseyNumber: 11,
                    dateOfBirth: "1988-10-15",
                    nationality: "Germany",
                    contractUntil: "2018-06-30",
                    marketValue: "40,000,000 €"
                },
                {
                    name: "Tomás Rosicky",
                    position: "Attacking Midfield",
                    jerseyNumber: 7,
                    dateOfBirth: "1980-10-04",
                    nationality: "Czech Republic",
                    contractUntil: "2016-06-30",
                    marketValue: "1,500,000 €"
                },
                {
                    name: "Santi Cazorla",
                    position: "Central Midfield",
                    jerseyNumber: 19,
                    dateOfBirth: "1984-12-13",
                    nationality: "Spain",
                    contractUntil: "2017-06-30",
                    marketValue: "26,000,000 €"
                },
                {
                    name: "Alex Oxlade-Chamberlain",
                    position: "Right Wing",
                    jerseyNumber: 15,
                    dateOfBirth: "1993-08-15",
                    nationality: "England",
                    contractUntil: "2018-06-30",
                    marketValue: "20,000,000 €"
                },
                {
                    name: "Alexis Sánchez",
                    position: "Left Wing",
                    jerseyNumber: 17,
                    dateOfBirth: "1988-12-19",
                    nationality: "Chile",
                    contractUntil: "2018-06-30",
                    marketValue: "55,000,000 €"
                },
                {
                    name: "Theo Walcott",
                    position: "Right Wing",
                    jerseyNumber: 14,
                    dateOfBirth: "1989-03-16",
                    nationality: "England",
                    contractUntil: "2019-06-30",
                    marketValue: "25,000,000 €"
                },
                {
                    name: "Joel Campbell",
                    position: "Right Wing",
                    jerseyNumber: 28,
                    dateOfBirth: "1992-06-26",
                    nationality: "Costa Rica",
                    contractUntil: "2018-06-30",
                    marketValue: "5,000,000 €"
                },
                {
                    name: "Olivier Giroud",
                    position: "Centre Forward",
                    jerseyNumber: 12,
                    dateOfBirth: "1986-09-30",
                    nationality: "France",
                    contractUntil: "2018-06-30",
                    marketValue: "24,000,000 €"
                },
                {
                    name: "Danny Welbeck",
                    position: "Centre Forward",
                    jerseyNumber: 23,
                    dateOfBirth: "1990-11-26",
                    nationality: "England",
                    contractUntil: "2019-06-30",
                    marketValue: "17,000,000 €"
                },
                {
                    name: "Petr Cech",
                    position: "Keeper",
                    jerseyNumber: 33,
                    dateOfBirth: "1982-05-20",
                    nationality: "Czech Republic",
                    contractUntil: "2019-06-30",
                    marketValue: "12,000,000 €"
                },
                {
                    name: "Mohamed Elneny",
                    position: "Defensive Midfield",
                    jerseyNumber: 35,
                    dateOfBirth: "1992-07-11",
                    nationality: "Egypt",
                    contractUntil: "2020-06-30",
                    marketValue: "4,000,000 €"
                },
                {
                    name: "Gabriel Paulista",
                    position: "Centre Back",
                    jerseyNumber: 5,
                    dateOfBirth: "1990-11-26",
                    nationality: "Brazil",
                    contractUntil: "2019-06-30",
                    marketValue: "12,000,000 €"
                },
                {
                    name: "Matt Macey",
                    position: "Keeper",
                    jerseyNumber: 49,
                    dateOfBirth: "1994-09-09",
                    nationality: "England",
                    contractUntil: null,
                    marketValue: null
                },
                {
                    name: "Alex Iwobi",
                    position: "Left Wing",
                    jerseyNumber: 45,
                    dateOfBirth: "1996-05-03",
                    nationality: "Nigeria",
                    contractUntil: "2020-06-30",
                    marketValue: null
                }
            ],
            updatePlayers: updatePlayers
        };
        return model;

        function updatePlayers(){
            $.ajax({
                headers: { 'X-Auth-Token': 'e7d0b480d8e64eb5828355511253d108' },
                url: URL,
                dataType: 'json',
                type: 'GET',
            }).done(function(response) {
                var data = angular.fromJson(response)
                model.players = data;
            });
        }
    }
})();