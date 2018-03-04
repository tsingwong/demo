/*
 * @Author: tsingwong 
 * @Date: 2018-03-03 18:53:19 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2018-03-04 09:26:24
 */

//  例如将下面层级 JSON 转换为 平级 JSON
// {
//     "A": {
//         "a1": 1,
//         "a2": 2
//     },
//     "B": {
//         "b": 3
//     }
// }

// {
//     "A.a1": 1,
//     "A.a2": 2,
//     "B.b": 3
// }

var data = {
    a: {
        a1: 1,
        a5: 5,
        a8: {
            a11: 1,
            a22: null,
            a33: {
                a555: 1,
                a666: 'string',
                null: null,
                undefined: undefined,
                array: [],
                number: 12
            }
        }
    },
    b: {},
    c: 123,
    妹子: '真妹子'
};
/**
 * 递归处理数据
 * 
 * @param {object} input 
 * @param {string} [prefix=''] 
 * @param {map} [map=new Map()] 
 * @returns {map} map
 */
function recusive(input, prefix = '', map = new Map()) {
    Object.entries(input).forEach(([key, value]) => {
        let k = key;
        if ((Object.prototype.toString.call(value) === '[object Object]') && (Object.keys(value).length !== 0)) {
            recusive(value, prefix ? `${prefix}.${k}` : `${k}`, map);
        } else {
            map.set(prefix ? `${prefix}.${k}`: `${k}`, value);
        }
    });
    return map;
}
/**
 * 将 Map 转换为 Object
 * 
 * @param {map} strMap 
 * @returns {object} obj
 */
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

console.log(strMapToObj(recusive(data)));

