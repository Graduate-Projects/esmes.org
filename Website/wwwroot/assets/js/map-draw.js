const school_list = [
    {
        id: 29,
        name: 'Al-Zarnooji Technical School',
        img: null,
        description: 'Zarnooji Technical School is a large vocational school that serves several villages in the west of Irbid. The school is located in the village of Kafr Yuba, approximately 600 students attend the school.'
    },
    {
        id: 25,
        name: 'Bait Yafa School',
        img: 'assets/img/schools/25.jpg',
        description: 'Bait Yafa School for girls is located to the west of Irbid and serves several villages; The school is located in the village of Bait Yafa, located 7 km south-west of the city of Irbid. Approximately 850 students attend the school.'
    },
    {
        id: 26,
        name: 'Tenth School',
        img: 'assets/img/schools/26.jpg',
        description: 'USAID supported Tenth Secondary School in terms of construction and furniture, it is located in the 10 th residential area in Aqaba, approximately 1,100 students attend the school.'
    },
    {
        id: 28,
        name: 'King Abdullah Ii School For Excellence',
        img: null,
        description: 'King Abdullah II School for Excellence was establishing within a holistic plan to build a school for excellence in each governorate, targeting “gifted students”. The school is located in the city of Madaba. Approximately 400 students attend the school.'
    },
    {
        id: 30,
        name: 'Al-Turra High School',
        img: null,
        description: 'Al-Turra high school is a traditional all male high school. The school is located in the village of Al-Turra, east of Al-Ramtha, approximately 800 students attend the school.'
    },
    {
        id: 32,
        name: 'Jrainah Technical School',
        img: null,
        description: 'Jrainah Technical school is the main agricultural and veterinary technical school in the area. The school is located in the suburbs of Madaba, 30 km south of Amman. Approximately 310 students attend the school.'
    },
    {
        id: 35,
        name: 'Al-Mansheya Secondary School For Girls',
        img: null,
        description: 'The school is located in the town of Al-Karak, 140 km south of Amman. Approximately 385 students attend the school.'
    },
    {
        id: 36,
        name: 'Madaba Technical School',
        img: null,
        description: 'Madaba Technical School for boys is the main technical secondary school in the governorate. The school is located in Madaba, 30 km south of Amman. Approximately 400 students attend the school.'
    },
    {
        id: 38,
        name: 'Mobes School',
        img: null,
        description: 'Mobes High School is an all female school. The school is located 15 km north of Amman, in Ain Albasha, Al-Balqa governorate. Approximately 535 students attend the school.'
    },
]
function load_countries(left, top, mw, mh) {

    document.getElementById('geochart-map').style.top = left + 'px';
    document.getElementById('geochart-map').style.left = top + 'px'; 

    google.charts.load('current', {
        'packages': ['geochart'],
        'mapsApiKey': 'AIzaSyBJfOsYsobb3UOj8UymzMwxzq6daR9X_Dg'
    }).then(function () {
        //var data = google.visualization.arrayToDataTable([
        //    ['Country', 'Region', 'value'],
        //    ['Jordan', 'JO', get_school_location('JO').getNumberOfRows()],
        //    ['Tunisia', 'TN', get_school_location('TN').getNumberOfRows()],
        //    ['Lebanon', 'LB', get_school_location('LB').getNumberOfRows()],
        //    ['Italy', 'IT', get_school_location('IT').getNumberOfRows()],
        //    ['Spain', 'ES', get_school_location('ES').getNumberOfRows()]
        //]);
        //for (var i = 0; i < data.getNumberOfRows(); i++) {
        //    var value = data.getValue(i, 2);
        //    data.setValue(i, 2, i);
        //    data.setFormattedValue(i, 2, `${value} schools`);
        //}
        //var chart = new google.visualization.GeoChart(document.getElementById('geochart-map'));
        //init_map(data, chart, get_option('world', mw, mh));
        var gdpData = {
            "JO": 90.63,
            "TN": 11.58,
            "LB": 600.97,
            "IT": 158.97,
            "ES": 300.97,
    };
        //$('#geochart-map').vectorMap({ map: 'world_mill' });
       
        $('#geochart-map').vectorMap({
            map: 'world_mill',
            backgroundColor: '#f3f5fa',
            regionStyle: {
                initial: {
                    fill: '#e4e4e4',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                }
            },
            series: {
                regions: [{
                    attribute: 'fill',
                    //values: gdpData,
                    //scale: ['#C8EEFF', '#0071A4'],
                    //normalizeFunction: 'polynomial'
                    values: { JO: '#019087', ES: '#f6892c', IT: '#ec2a60', TN: '#b84099', LB: '#008ecc' }
                }]
            },
            onRegionTipShow: function (e, el, code) {
                el.html(el.html() + ' (GDP - ' + gdpData[code] + ')');
            }
        });
        if ($('#get_map').length > 0) $('#get_map').remove();

    });
}
function init_map(data,chart,options) {
    google.visualization.events.addListener(chart, 'select', function () {
        var selection = chart.getSelection()[0];
        if (selection != null && selection.row != null) {
            var region_id = data.getValue(selection.row, 1);
            load_country(region_id);
        }
    });

    window.addEventListener('resize', function () {
        chart.draw(data, options);
    });
    chart.draw(data, options);
}
function get_option(region_id,mw,mh) {
    return {
        region: region_id,
        legend: 'none',
        colorAxis: {
            colors: ['#019087', '#008ecc', '#b84099', '#ec2a60', '#f6892c'],
            values: [0, 1, 2, 3, 4]
        },
        backgroundColor: '#f3f5fa',
        width: mw,
        height: mh, 
    };
}
function load_country(region_id) {
    google.charts.load('current', {
        'packages': ['map'],
        'mapsApiKey': 'AIzaSyBJfOsYsobb3UOj8UymzMwxzq6daR9X_Dg'
    }).then(function () {
        var data = get_school_location(region_id);
        if (data.getNumberOfRows() > 0) {
            var options = {
                region: region_id,
                displayMode: 'markers',
                resolution: 'provinces',
                legend: 'none',
                backgroundColor: '#f3f5fa',
                datalessRegionColor: '#f3f5fa'
            };
            var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
            google.visualization.events.addListener(chart, 'select', function () {
                var selection = chart.getSelection()[0];
                if (selection != null && selection.row != null) {
                    var school = data.getValue(selection.row, 2);
                    var school_id = parseInt(school.split('.')[0]);
                    init_modal(school_id);
                    load_school_data(school_id);
                    $("#modal-school-data").modal('show');
                }
            });
            window.addEventListener('resize', function () {
                chart.draw(data, options);
            });
            chart.draw(data, options);
            $('.map-geochart').append('<button id="get_map" onclick="load_countries()" class="btn btn-close position-absolute"></button>');
        }
        else {
            alert("no data");
        }
    });
}
function init_modal(school_id) {
    $('#voltage-value').html('<div class="salign-middle spinner-border spinner-border-sm text-bg-success"> </div>');
    $('#current-value').html('<div class="salign-middle spinner-border spinner-border-sm text-bg-success"> </div>');
    $('#power-factor-value').html('<div class="salign-middle spinner-border spinner-border-sm text-bg-success"> </div>');
    $('#power-active-value').html('<div class="salign-middle spinner-border spinner-border-sm text-bg-success"> </div>');
    $('#power-reactive-value').html('<div class="salign-middle spinner-border spinner-border-sm text-bg-success"> </div>');
    $('#active-energy-value').html('<div class="salign-middle spinner-border spinner-border-sm text-bg-success"> </div>');
    var school_data = school_list.filter(item => item.id == school_id)[0];
    $('.school-name').text(school_data.name);
    $('#school-img').attr('src', (school_data.img != null ? school_data.img : 'assets/img/schools/no-image.jpg'));
    $('#school-description').text(school_data.description);
}
function get_school_location(region_id) {
    switch (region_id) {
        case 'JO':
            return google.visualization.arrayToDataTable([
                ['Lat', 'Long', 'Name'],
                [32.55597343226554, 35.807391378235536, '29.Al-Zarnooji Technical School'],
                [32.51859930723672, 35.78425984169499, '25.Bait Yafa School'],
                [29.67114726605255, 34.988020270237314, '26.Tenth School'],
                [32.34788845463756, 35.747275709982446, '28.King Abdullah II School For Excellence'],
                [32.6435555, 35.98851061, '30.Al-Turra High School'],
                [31.761394154548267, 35.7947140935332, '32.Jrainah Technical school'],
                [31.18221876, 35.74125077, '35.Al-Mansheya Secondary School For Girls'],
                [31.71982028, 35.79332665, '36.Madaba Technical School'],
                [32.09704527, 35.88770548, '38.Mobes School'],
            ]);
        case 'TN':
            return google.visualization.arrayToDataTable([
                ['Lat', 'Long', 'Name'],
            ]);
        case 'LB':
            return google.visualization.arrayToDataTable([
                ['Lat', 'Long', 'Name'],
            ]);
        case 'IT':
            return google.visualization.arrayToDataTable([
                ['Lat', 'Long', 'Name'],
            ]);
        case 'ES':
            return google.visualization.arrayToDataTable([
                ['Lat', 'Long', 'Name'],
            ]);
    }
    return null;
}
function load_school_data(school_id) {
    $.ajax({
        url: `https://esmes.ngrok.io/rest/1/projects/ESMES_PROJECT/onlinevalues/.json?value=${school_id};U_Effective;L1&value=${school_id};I_Effective;L1&value=${school_id};PowerActive;L1&value=${school_id};PowerReactivefund;L1&value=${school_id};Powerfactor;L1&value=${school_id};ActiveEnergy;L1`,
        type: 'GET',
        dataType: 'jsonp',
        cors: true,
        contentType: 'application/json',
        secure: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (result) {
            var data = analyisiz_json(school_id, result.value);
            if (data.U_Effective != null) $('#voltage-value').text(data.U_Effective);
            if (data.I_Effective != null) $('#current-value').text(data.I_Effective);
            if (data.Powerfactor != null) $('#power-factor-value').text(data.Powerfactor);
            if (data.PowerActive != null) $('#power-active-value').text(data.PowerActive);
            if (data.PowerReactivefund != null) $('#power-reactive-value').text(data.PowerReactivefund);
            if (data.ActiveEnergy != null) $('#energy-value').text(data.ActiveEnergy);
            refresh_data(school_id);
        }
    })
}
function refresh_data(school_id) {
    if ($("#modal-school-data").is(':visible'))
        setTimeout(load_school_data(school_id), 3 * 1000);
}
function analyisiz_json(school_id, json_result) {
    var data_school = {
        ActiveEnergy: 'NaN',
        I_Effective: 'NaN',
        PowerActive: 'NaN',
        PowerReactivefund: 'NaN',
        Powerfactor: 'NaN',
        U_Effective: 'NaN',
    };
    var keys_school = $(Object.keys(json_result)).filter(function (index, item) { return item.startsWith(school_id) })
    $(keys_school).each(function (index, item) {
        var key = item.split('.')[1];
        var value = json_result[item];
        if (value != 'NaN') {
            data_school[key] = value.round(3);
        }
        else {
            data_school[key] = null;
        }
    });
    return data_school;
}
Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}
load_countries(400,400,800,800);


           