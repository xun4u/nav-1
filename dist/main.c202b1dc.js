// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var siteListObj = localStorage.getItem('siteList');
var hashMap = JSON.parse(siteListObj) || [{
  logo: 'A',
  url: 'acfun.cn'
}];
var $siteList = $(".siteList");
var $lastLi = $siteList.find('li.last'); //简化url 需要用到字符串替换和正则

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
}; //渲染 先清空list的dom 然后遍历数组挨个添加dom


var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\"><svg class=\"icon\">\n                <use xlink:href=\"#icon-delete\"></use>\n            </svg></div>\n            </div>\n    </li>")).insertBefore($lastLi); //添加点击跳转事件(代替a标签)和删除事件

    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      console.log('del');
      e.stopPropagation();
      hashMap.splice(index, 1);
      setStorage();
      alert('删除成功');
      render();
    });
  });
};

render(); //新增网站

$(".addbutton").on('click', function () {
  var url = window.prompt('请输入要添加的网址？');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  } //将新的数据push到数组后 重新渲染


  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  setStorage();
  render();
}); //网站关闭时保存hash到localstorage
// window.onbeforeunload = () => {
//         const hashStr = JSON.stringify(hashMap)
//         localStorage.setItem('siteList', hashStr)
//     }
//改为每次增加和删除都操作localStorage

var setStorage = function setStorage() {
  var hashStr = JSON.stringify(hashMap);
  localStorage.setItem('siteList', hashStr);
}; //键盘事件


$(document).on('keypress', function (e) {
  console.log(e.key);
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.c202b1dc.js.map