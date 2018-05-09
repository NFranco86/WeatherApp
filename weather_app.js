var city = "";
$(function () {
    var city = "San+Diego";
    currentWeather(city);
});

$('#selectedCityBut').keydown(function (event) {
    if (event.which == 13) {
        city = event.target.value;
        console.log(city);

        if (city) {
            currentWeather(city);
        }
    }
});

function fivedayForecast(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&mode=json&units=imperial&APPID=5ff6f1ebe5186ea7ff845fa308cf0039", function (json) {
        var forecast = [];

        for (var i = 0; i < json['list'].length; i++) {
            var date = new Date(json['list'][i]['dt_txt']);
            forecast[date.getDay()] = json['list'][i];
        }

        var forecastDay = 1;

        forecast.forEach(function (weather) {
            var day = new Date(weather["dt_txt"]).toDateString().split(" ");
            var temp = weather["main"]["temp"];
            var iconCode = weather["weather"][0]["icon"];
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

            $('#day' + forecastDay).text(day[0]);
            $('#temp' + forecastDay).text(temp);
            $('#img' + forecastDay).attr("src", iconUrl);
            $('#weather' + forecastDay).text(weather["weather"][0]["description"]);

            forecastDay++;
        });
    });
}

function currentWeather(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&mode=json&units=imperial&APPID=5ff6f1ebe5186ea7ff845fa308cf0039", function (json) {
        var iconCode = json['weather'][0]["icon"]
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        $('#cityName').text(json['name']);
        $('#ambientWeather').text(json['weather'][0]['description']);
        $('#iconDay').attr("src", iconUrl);
        $('#temp').text(json["main"]["temp"]);

        fivedayForecast(city);
        setBackgroundColor(json['weather'][0]['id']);

    });
}

function setBackgroundColor(condition) {
    var color = "#FFFFFF";

    // Weather Condition Codes From OpenWeatherMap:
    
    switch (true) {
        // Thunderstorms:
        case (condition >= 200 && condition <= 299):
            color = "#030303";
            break;
        // Drizzle:
        case (condition >= 300 && condition <= 399):
            color = "#1E90FF";
            break;
        // Rainfall:
        case (condition >= 500 && condition <= 599):
            color = "#104E8B";
            break;
        // Snow:
        case (condition >= 600 && condition <= 699):
            color = "#EEE9E9";
            break;
        // Atmospheric Conditions:
        case (condition >= 700 && condition <= 799):
            color = "#CDCDC1";
            break;
        // Clear Conditions
        case (condition == 800):
            color = "#B0E2FF";
            break;
        // Cloudy Conditions
        case (condition >= 801 && condition <= 899):
            color = "#4C4C4C";
            break;
        default:
            color = "#FFFFFF";
    }

    $('.formcontainer').css('background', 'linear-gradient(' + color + ', white 100%)');
};