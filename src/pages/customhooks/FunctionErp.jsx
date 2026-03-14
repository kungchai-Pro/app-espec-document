import React, { useState } from "react";
import axios from "axios";

export const urlerp=`https://www.pppi-fulfil.com/services/erp/api/v1/`;

  
export default class FetchErp {

    FethcPost(url, values) {

        return axios.post(urlerp + url, values).then((response) => {
            if (response.data) {
                return response.data;
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    FethcPostlogin(url, values) {

        return axios.post(urlerp + url, values).then((response) => {
            if (response) {
                console.log(response.status)
                return response;
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    FethcGet(url) {

        return axios.get(urlerp + url)
            .then((response) => {
                return response.data
            })
            .catch((err) => {

            })
            .finally(() => {

            });
    }


    FethcDelete(url) {

        return axios.delete(urlerp + url)
            .then((response) => {
                return response
            })
            .catch((err) => {

            })
            .finally(() => {

            });
    }

    FethcUpdate(url, values) {

        return axios.put(urlerp + url, values).then((response) => {
            if (response.data) {
                return response.data;
            }
        }).catch((err) => {
            console.log(err)
        })
    }


}