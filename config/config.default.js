/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {{}}
   **/
  const config = exports = {};
  //安全配置
  config.security = {
    csrf: {
      enable:false
    },
  };
  //跨域配置
  config.cors = {
    origin: 'http://localhost:3000', // 表示允许的源
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 表示允许的http请求方式
    credentials:true
  };
  //配置sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'appshop',
    define: {
      freezeTableName: true,//表格不加复数
      timestamps: false,
    },
    timezone:'+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1637156139532_6120';
  //上传文件
  exports.multipart = {
    fileSize: '2mb',
    mode: 'file',
    fileExtensions:['.jpg', '.jpeg','.png']
  };


  // add your middleware config here
  config.middleware = ['auth'];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
