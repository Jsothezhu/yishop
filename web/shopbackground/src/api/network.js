import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:7001';
axios.defaults.timeout=2000;
axios.defaults.withCredentials=true;
//带上cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    get:function(path='',data={}){
        return new Promise((resolve,reject)=>{
            axios.get(path, {
                params:data
            }).then(function (response) {
                resolve(response)
            }).catch(function(error){
                reject(error)
            })
        })
    },
    post:function(path='',data={}){
        return new Promise((resolve,reject)=>{
            axios.post(path, data)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error.response)
                });
        })
    },
    delete:function(path='',data={}){
        return new Promise((resolve,reject)=>{
            axios.delete(path,{data:data})
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                });
        })
    },
    put:function(path='',data={}){
        return new Promise((resolve,reject)=>{
            axios.put(path,data)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                });
        })
    },
    all: function (list) {
        return new Promise(function (resolve, reject) {
            axios.all(list)
                .then(axios.spread(function (...result) {
                    // 两个请求现在都执行完成
                    resolve(result)
                }))
                .catch(function (err) {
                    reject(err)
                })
        })
    }
}