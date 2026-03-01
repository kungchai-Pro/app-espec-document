import React, { useState } from "react";
import axios from "axios";

// export const host = `http://localhost:4001/api/spec`;       
export const host=`https://packingspecsheet.com/v1/api/spec`;   
export const urlerp=`https://www.pppi-fulfil.com/services/erp/api/v1/`;

export default class FetchApi {

    FethcPost(url, values) {

        return axios.post(host + url, values).then((response) => {
            if (response.data) {
                return response.data;
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    FethcPostlogin(url, values) {

        return axios.post(host + url, values).then((response) => {
            if (response) {
                return response;
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    FethcGet(url) {

        return axios.get(host + url)
            .then((response) => {
                return response.data
            })
            .catch((err) => {

            })
            .finally(() => {

            });
    }


    FethcDelete(url) {

        return axios.delete(host + url)
            .then((response) => {
                return response
            })
            .catch((err) => {

            })
            .finally(() => {

            });
    }

    FethcUpdate(url, values) {

        return axios.put(host + url, values).then((response) => {
            if (response.data) {
                return response.data;
            }
        }).catch((err) => {
            console.log(err)
        })
    }

}