// load a .json file into a js object
const load_json = (json_file) => {
    return function () {
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

/**
 * Determines what position the experiment has, based on a loaded .json config file
 * 
 * @param {*} json_config the json file loaded as javascript obj
 * @returns an object holding all relevant information:
 * - what group the experiment belongs to (1 or 2)
 * - what position the experiment has within its group
 * - whether the experiment is the last one
 */
const determine_position = (json_config) => {
    const experimentUrl = window.location.href
    const key = searchJson(json_config, experimentUrl)
    if (!key) {
        throw new Error(`couldn't find "${experimentUrl}" in given json_config`)
    }

    const temp_arr = json_config[key]
    const experiment_position = temp_arr.indexOf(experimentUrl) // determines experiment position

    return {
        "group": key,
        "position": experiment_position,
        "isLast": experiment_position === temp_arr.length - 1
    }
}

const get_next_url = (experiment_data, json_config) => {
    if (experiment_data.isLast === true) {
        throw new Error("this experiment has no next experiment as it is the last in its group")
    }
    return json_config[experiment_data.group][experiment_data.position + 1]

}





