import axios from 'axios';
import _ from 'lodash';

const obj = {};

['get', 'post', 'patch'].forEach(function(method) {
    obj[method] = function(url, payload, settings = {}) {
        /* Request will be aborted after 30 seconds */

        settings = {
            timeout: 30000,
            ...settings,
        };

        return new Promise(function(resolve, reject) {
            let methodArgs = [];
            /*
                If ajax.post is used, by default sending form data
                use postJSON instead for json data
            */
            axios[method].apply({} , [url, payload, settings])
                .then(function(data = {}, ...restSuccessArgs) {
                    if (!_.isObject(_.get(data, 'data'))) {
                        data.data = {};
                    }

                    const statusCode = _.get(data, 'status');
                    /*
                        Send only api resonse
                    */
                    let responseData = { statusCode };

                    responseData = { ...responseData, ..._.get(data, 'data') };

                    if (payload) {
                        responseData.requestPayload = payload;
                    }

                    resolve(responseData, ...restSuccessArgs);
                }, function(data = {}, ...restErrorArgs) {
                    if (!_.isObject(_.get(data, 'data'))) {
                        data.data = {};
                    }

                    const statusCode = _.get(data, 'response.status', -1);
                    let responseData = { statusCode };

                    responseData = { ...responseData, ..._.get(data, 'response.data') };

                    if (payload) {
                        responseData.requestPayload = payload;
                    }

                    reject(responseData, ...restErrorArgs);
                });
        });
    };
});

export default obj;
