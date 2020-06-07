const path = require('path');

exports.getHomePage = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/home.html'));
};

exports.getInstall = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/install.html'));
};

exports.getConclusion = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/conclusion.html'));
};

exports.getCredits = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/credits.html'));
};

exports.getWhyBulma = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/whybulma.html'));
};

exports.getWhyNodeJs = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/whynodejs.html'));
};

exports.getTutorialPage = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/layout.html'));
};

exports.getDemoPage = (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public/html' + '/demo.html'));
};

