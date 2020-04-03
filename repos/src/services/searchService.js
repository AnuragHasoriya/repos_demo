import axios from 'axios';
import Promise from 'bluebird';

export const searchService = {
    getSearchedRepo,
}

function getSearchedRepo(username) {

    return new Promise(function (resolve, reject) {
        axios({
            url: `https://api.github.com/users/${username}/repos?per_page=100`,
            method: 'get',
        }).then((result) => {
            return resolve(result.data);
        }, (error) =>{
             return reject(error)
        })
    });
}