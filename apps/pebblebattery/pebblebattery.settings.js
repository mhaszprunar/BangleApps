(function(back) {
    const SETTINGS_FILE = "pebblebattery.json";

    // initialize with default settings...
    var s = {'bg': '#0f0', 'color': 'Green', 'showBatteryNumber': true, "refresh":15};

    // ...and overwrite them with any saved values
    // This way saved values are preserved if a new version adds more settings
    const storage = require('Storage');
    let settings = storage.readJSON(SETTINGS_FILE, 1) || s;
    const saved = settings || {};
    for (const key in saved) {
        s[key] = saved[key];
    }

    function save() {
        settings = s;
        storage.write(SETTINGS_FILE, settings);
    }

    var color_options = ['Green','Orange','Cyan','Purple','Red','Blue'];
    var bg_code = ['#0f0','#ff0','#0ff','#f0f','#f00','#00f'];
    var number_options = ["on","off"];
    var refresh_options = [15,30,60];

    E.showMenu({
        '': { 'title': 'Pebble + battery' },
        '< Back': back,
        'Color': {
            value: 0 | color_options.indexOf(s.color),
            min: 0, max: 5,
            format: v => color_options[v],
            onchange: v => {
                s.color = color_options[v];
                s.bg = bg_code[v];
                save();
            },
        },
        "number": {
            value: !!s.showBatteryNumber,
            format: v => v ? "on" : "off",
            onchange: v => {
                s.showBatteryNumber = v;
                save();
            }

        },
       "refresh sec": {
            value: 0 | refresh_options.indexOf(s.refresh),
            min:0,max:2,
            format: v => refresh_options[v],
            onchange: v => {
                s.refresh = refresh_options[v];
                save();
            }

        }
    });
});
