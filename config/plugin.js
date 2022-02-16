'use strict';

/** @type Egg.EggPlugin */
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};
// 数据校验
exports.validate = {
    enable: true,
    package: 'egg-validate',
};
//跨域问题
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
