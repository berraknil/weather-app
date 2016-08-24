$(document).ready(function() {

  var currentTemp = "Celsius";

  //Constructor Function
  function Forecast(data) {
    var d = data.current_observation;
    var days = data.forecast.simpleforecast.forecastday;
    var today = days[0];
    var day1 = days[1];
    var day2 = days[2];
    var day3 = days[3];

    this.day1 = day1;
    this.day2 = day2;
    this.day3 = day3;

    this.city = d.display_location.city;
    this.state = d.display_location.state_name;
    this.country = d.display_location.country;
    this.hour = data.forecast.txt_forecast.date;     this.currentF = Math.round(d.temp_f);
    this.currentC = Math.round(d.temp_c);
    this.weather = today.conditions;
    this.day = today.date.weekday_short;
    this.icon = today.icon_url;
    this.date = today.date.weekday + ', ' + today.date.monthname_short + ' ' + today.date.day;

    this.todayLowC = today.low.celsius;
    this.todayHighC = today.high.celsius;
    this.todayLowF = today.low.fahrenheit;
    this.todayHighF = today.high.fahrenheit;

    this.day1Name = day1.date.weekday_short;
    this.day1Icon = day1.icon_url;
    this.day1Cond = day1.conditions;

    this.day2Name = day2.date.weekday_short;
    this.day2Icon = day2.icon_url;
    this.day2Cond = day2.conditions;

    this.day3Name = day3.date.weekday_short;
    this.day3Icon = day3.icon_url;
    this.day3Cond = day3.conditions;

    this.day1LowC = day1.low.celsius;
    this.day1HighC = day1.high.celsius;
    this.day1LowF = day1.low.fahrenheit;
    this.day1HighF = day1.high.fahrenheit;

    this.day2LowC = day2.low.celsius;
    this.day2HighC = day2.high.celsius;
    this.day2LowF = day2.low.fahrenheit;
    this.day2HighF = day2.high.fahrenheit;

    this.day3LowC = day3.low.celsius;
    this.day3HighC = day3.high.celsius;
    this.day3LowF = day3.low.fahrenheit;
    this.day3HighF = day3.high.fahrenheit;

  }

  //weather icons
  var icons = {
    clear: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0clear.svg',
    cloudy: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0cloudy.svg',
    flurries: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0flurries.svg',
    fog: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0fog.svg',
    haze: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0haze.svg',
    mostlyCloudy: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0mostlycloudy.svg',
    mostlySunny: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0clear.svg',
    partlyCloudy: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0partlycloudy.svg',
    partlySunny: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0partlycloudy.svg',
    freezingRain: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0freezingrain.svg',
    rain: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0rain.svg',
    sleet: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0sleet.svg',
    snow: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0snow.svg',
    sunny: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0clear.svg',
    thunderstorms: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0thunderstorm.svg',
    thunderstorm: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0thunderstorm.svg',
    unknown: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0unknown.svg',
    overcast: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0overcast.svg',
    scatteredClouds: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/460540/0scatteredclouds.svg'
  }

  //API Request
  $.ajax({
    url: 'http://api.wunderground.com/api/6b256b790612d6d5/forecast/conditions/q/autoip.json',
    dataType: 'jsonp',
    success: function(data) {

      var forecast = new Forecast(data);

      $('#city').text(forecast.city);
      //$('#country').text(forecast.state + ',' + forecast.country);

      $('#current-temp').text(forecast.currentC + '°');
      $('#condition').text(forecast.weather);

      $('#day').text(forecast.day);
      $('#date').text(forecast.date);
      $('#clock').text(forecast.hour);

      //$('#weatherIco').attr('src', forecast.icon);

      $('#minmax').text(forecast.todayLowC + '° /' + ' ' + forecast.todayHighC + '°');

      $('#day1 h3').text(forecast.day1Name);
      $('#day1 h4').text(forecast.day1LowC + '° /' + ' ' + forecast.day1HighC + '°');
        //$('#day1 img').attr('src', forecast.day3Icon);
        $('#day1 p').text(forecast.day1Cond);

      $('#day2 h3').text(forecast.day2Name);
      $('#day2 h4').text(forecast.day2LowC + '° /' + ' ' + forecast.day2HighC + '°');
        //$('#day2 img').attr('src', forecast.day2Icon);
       $('#day2 p').text(forecast.day2Cond);

      $('#day3 h3').text(forecast.day3Name);
      $('#day3 h4').text(forecast.day3LowC + '° /' + ' ' + forecast.day3HighC + '°');
        //$('#day3 img').attr('src', forecast.day3Icon);
       $('#day3 p').text(forecast.day3Cond);



       //Button to Switch Between F and C
      $("#switch").click(function(e) {
        e.preventDefault();

        if (currentTemp === "Celsius") {
          $("#switch").text("Switch to °C");
          $("#current-temp").text(forecast.currentF + "°");
					$('#minmax').text(forecast.todayLowF + '° /' + ' ' + forecast.todayHighF + '°');
					$('#day1 h4').text(forecast.day1LowF + '° /' + ' ' + forecast.day1HighF + '°');
					$('#day2 h4').text(forecast.day2LowF + '° /' + ' ' + forecast.day2HighF + '°');
					$('#day3 h4').text(forecast.day3LowF + '° /' + ' ' + forecast.day3HighF + '°');
          currentTemp = "Fahrenheit";
        } else if (currentTemp === "Fahrenheit") {
          $("#switch").text("Switch to °F");
          $("#current-temp").text(forecast.currentC + "°");
					$('#minmax').text(forecast.todayLowC + '° /' + ' ' + forecast.todayHighC + '°');
					$('#day1 h4').text(forecast.day1LowC + '° /' + ' ' + forecast.day1HighC + '°');
					$('#day2 h4').text(forecast.day2LowC + '° /' + ' ' + forecast.day2HighC + '°');
					$('#day3 h4').text(forecast.day3LowC + '° /' + ' ' + forecast.day3HighC + '°');
          currentTemp = "Celsius";
        }
      });


        //Main Icon Switch
      switch (forecast.weather) {
        case "Clear":
          {
            $('#weatherIco').attr('src', icons.clear);
          }
          break;
        case "Cloudy":
          {
            $('#weatherIco').attr('src', icons.cloudy);
          }
          break;
				case "Chance of Rain":
          {
            $('#weatherIco').attr('src', icons.rain);
          }
          break;
        case "Flurries":
          {
            $('#weatherIco').attr('src', icons.flurries);
          }
          break;
        case "Fog":
          {
            $('#weatherIco').attr('src', icons.fog);
          }
          break;
        case "Haze":
          {
            $('#weatherIco').attr('src', icons.haze);
          }
          break;
        case "Mostly Cloudy":
          {
            $('#weatherIco').attr('src', icons.mostlyCloudy);
          }
          break;
        case "Mostly Sunny":
          {
            $('#weatherIco').attr('src', icons.mostlySunny);
          }
          break;
        case "Partly Cloudy":
          {
            $('#weatherIco').attr('src', icons.partlyCloudy);
          }
          break;
        case "Partly Sunny":
          {
            $('#weatherIco').attr('src', icons.partlySunny);
          }
          break;
        case "Freezing Rain":
          {
            $('#weatherIco').attr('src', icons.freezingRain);
          }
          break;
        case "Rain":
          {
            $('#weatherIco').attr('src', icons.rain);
          }
          break;
        case "Sleet":
          {
            $('#weatherIco').attr('src', icons.sleet);
          }
          break;
        case "Snow":
          {
            $('#weatherIco').attr('src', icons.snow);
          }
          break;
        case "Sunny":
          {
            $('#weatherIco').attr('src', icons.sunny);
          }
          break;
        case "Thunderstorms":
          {
            $('#weatherIco').attr('src', icons.thunderstorms);
          }
          break;
        case "Thunderstorm":
          {
            $('#weatherIco').attr('src', icons.thunderstorm);
          }
          break;
        case "Chance of a Thunderstorm":
          {
            $('#weatherIco').attr('src', icons.thunderstorm);
          }
          break;
        case "Unknown":
          {
            $('#weatherIco').attr('src', icons.unknown);
          }
          break;
        case "Overcast":
          {
            $('#weatherIco').attr('src', icons.overcast);
          }
          break;
        case "Scattered Clouds":
          {
            $('#weatherIco').attr('src', icons.scatteredClouds);
          }
          break;
        default:
          $('#weatherIco').attr('src', icons.unknown);
      }

      //Day 1 Icons
      switch (forecast.day1.conditions) {
        case "Clear":
          {
            $('#day1 img').attr('src', icons.clear);
          }
          break;
        case "Cloudy":
          {
            $('#day1 img').attr('src', icons.cloudy);
          }
          break;
					case "Chance of Rain":
          {
            $('#day1 img').attr('src', icons.rain);
          }
          break;
        case "Flurries":
          {
            $('#day1 img').attr('src', icons.flurries);
          }
          break;
        case "Fog":
          {
            $('#day1 img').attr('src', icons.fog);
          }
          break;
        case "Haze":
          {
            $('#day1 img').attr('src', icons.haze);
          }
          break;
        case "Mostly Cloudy":
          {
            $('#day1 img').attr('src', icons.mostlyCloudy);
          }
          break;
        case "Mostly Sunny":
          {
            $('#day1 img').attr('src', icons.mostlySunny);
          }
          break;
        case "Partly Cloudy":
          {
            $('#day1 img').attr('src', icons.partlyCloudy);
          }
          break;
        case "Partly Sunny":
          {
            $('#day1 img').attr('src', icons.partlySunny);
          }
          break;
        case "Freezing Rain":
          {
            $('#day1 img').attr('src', icons.freezingRain);
          }
          break;
        case "Rain":
          {
            $('#day1 img').attr('src', icons.rain);
          }
          break;
        case "Sleet":
          {
            $('#day1 img').attr('src', icons.sleet);
          }
          break;
        case "Snow":
          {
            $('#day1 img').attr('src', icons.snow);
          }
          break;
        case "Sunny":
          {
            $('#day1 img').attr('src', icons.sunny);
          }
          break;
        case "Thunderstorms":
          {
            $('#day1 img').attr('src', icons.thunderstorms);
          }
          break;
        case "Thunderstorm":
          {
            $('#day1 img').attr('src', icons.thunderstorm);
          }
          break;
        case "Chance of a Thunderstorm":
          {
            $('#day1 img').attr('src', icons.thunderstorm);
          }
          break;
        case "Unknown":
          {
            $('#day1 img').attr('src', icons.unknown);
          }
          break;
        case "Overcast":
          {
            $('#day1 img').attr('src', icons.overcast);
          }
          break;
        case "Scattered Clouds":
          {
            $('#day1 img').attr('src', icons.scatteredClouds);
          }
          break;
        default:
          $('#day1 img').attr('src', icons.unknown);
      }

      //Day 2 Icons
      switch (forecast.day2.conditions) {
        case "Clear":
          {
            $('#day2 img').attr('src', icons.clear);
          }
          break;
        case "Cloudy":
          {
            $('#day2 img').attr('src', icons.cloudy);
          }
          break;
					case "Chance of Rain":
          {
            $('#day2 img').attr('src', icons.rain);
          }
          break;
        case "Flurries":
          {
            $('#day2 img').attr('src', icons.flurries);
          }
          break;
        case "Fog":
          {
            $('#day2 img').attr('src', icons.fog);
          }
          break;
        case "Haze":
          {
            $('#day2 img').attr('src', icons.haze);
          }
          break;
        case "Mostly Cloudy":
          {
            $('#day2 img').attr('src', icons.mostlyCloudy);
          }
          break;
        case "Mostly Sunny":
          {
            $('#day2 img').attr('src', icons.mostlySunny);
          }
          break;
        case "Partly Cloudy":
          {
            $('#day2 img').attr('src', icons.partlyCloudy);
          }
          break;
        case "Partly Sunny":
          {
            $('#day2 img').attr('src', icons.partlySunny);
          }
          break;
        case "Freezing Rain":
          {
            $('#day2 img').attr('src', icons.freezingRain);
          }
          break;
        case "Rain":
          {
            $('#day2 img').attr('src', icons.rain);
          }
          break;
        case "Sleet":
          {
            $('#day2 img').attr('src', icons.sleet);
          }
          break;
        case "Snow":
          {
            $('#day2 img').attr('src', icons.snow);
          }
          break;
        case "Sunny":
          {
            $('#day2 img').attr('src', icons.sunny);
          }
          break;
        case "Thunderstorms":
          {
            $('#day2 img').attr('src', icons.thunderstorms);
          }
          break;
        case "Thunderstorm":
          {
            $('#day2 img').attr('src', icons.thunderstorm);
          }
          break;
        case "Chance of a Thunderstorm":
          {
            $('#day2 img').attr('src', icons.thunderstorm);
          }
          break;
        case "Unknown":
          {
            $('#day2 img').attr('src', icons.unknown);
          }
          break;
        case "Overcast":
          {
            $('#day2 img').attr('src', icons.overcast);
          }
          break;
        case "Scattered Clouds":
          {
            $('#day2 img').attr('src', icons.scatteredClouds);
          }
          break;
        default:
          $('#day2 img').attr('src', icons.unknown);
      }

      //Day 3 Icons
      switch (forecast.day3.conditions) {
        case "Clear":
          {
            $('#day3 img').attr('src', icons.clear);
          }
          break;
        case "Cloudy":
          {
            $('#day3 img').attr('src', icons.cloudy);
          }
          break;
        	case "Chance of Rain":
          {
            $('#day3 img').attr('src', icons.rain);
          }
          break;
				case "Flurries":
          {
            $('#day3 img').attr('src', icons.flurries);
          }
          break;
        case "Fog":
          {
            $('#day3 img').attr('src', icons.fog);
          }
          break;
        case "Haze":
          {
            $('#day3 img').attr('src', icons.haze);
          }
          break;
        case "Mostly Cloudy":
          {
            $('#day3 img').attr('src', icons.mostlyCloudy);
          }
          break;
        case "Mostly Sunny":
          {
            $('#day3 img').attr('src', icons.mostlySunny);
          }
          break;
        case "Partly Cloudy":
          {
            $('#day3 img').attr('src', icons.partlyCloudy);
          }
          break;
        case "Partly Sunny":
          {
            $('#day3 img').attr('src', icons.partlySunny);
          }
          break;
        case "Freezing Rain":
          {
            $('#day3 img').attr('src', icons.freezingRain);
          }
          break;
        case "Rain":
          {
            $('#day3 img').attr('src', icons.rain);
          }
          break;
        case "Sleet":
          {
            $('#day3 img').attr('src', icons.sleet);
          }
          break;
        case "Snow":
          {
            $('#day3 img').attr('src', icons.snow);
          }
          break;
        case "Sunny":
          {
            $('#day3 img').attr('src', icons.sunny);
          }
          break;
        case "Thunderstorms":
          {
            $('#day3 img').attr('src', icons.thunderstorms);
          }
          break;
        case "Thunderstorm":
          {
            $('#day3 img').attr('src', icons.thunderstorm);
          }
          break;
        case "Chance of a Thunderstorm":
          {
            $('#day3 img').attr('src', icons.thunderstorm);
          }
          break;
        case "Unknown":
          {
            $('#day3 img').attr('src', icons.unknown);
          }
          break;
        case "Overcast":
          {
            $('#day3 img').attr('src', icons.overcast);
          }
          break;
        case "Scattered Clouds":
          {
            $('#day3 img').attr('src', icons.scatteredClouds);
          }
          break;
        default:
          $('#day3 img').attr('src', icons.unknown);
      }




    }
  });

});
