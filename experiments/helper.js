// import jquery
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// load a .json file into a js object
const load_json = (json_file) => {
    return load_json = function () {
        var jsonTemp = null;
            $.ajax({
                'async': false,
                'url': json_file,
                'success': function (data) {
                    jsonTemp = data;
                }
            });
        return jsonTemp;
    }();
}

const trios = ["experiment_first_trio", "experiment_second_trio"]

/**
 * This function searches for a given value in a js obj.
 * Assumes the object only contains key value pairs with value == string or
 * one time nested arrays. 
 * Returns the key, false if value is not present.
 * 
 * @param {a json file parsed in a js object} obj 
 * @param {a value that is searched for} valueLookup
 */
const searchJson = (obj, valueLookup) => {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object") { // assume this is an array
            for (val of value) {
                if (valueLookup === val) {
                    return key
                }
            }
        } else {
            if (valueLookup === value) {
                return key
            }
        }
    }

    return false
}

const determine_position = (json_config) => {
    const experimentUrl = window.location.href
    const key = searchJson(json_config)
    const experiment_position = json_config[key].indexOf(experimentUrl) // determines experiment position

    return (key, experiment_position)
}





