//TODO: moedotos get e set de classes

(function(win, doc) {
  "use strict";

  function DOM(elements) {
    // força o new, tornando desencessário oa instanciar
    if (!(this instanceof DOM)) return new DOM(elements);
    this.element = this.getDOMElements.call(elements);
  }

  DOM.prototype.getDOMElements = function getDOMElements() {
    return doc.querySelectorAll(this);
  };

  DOM.prototype.on = function on(event, callBack) {
    this.setListener(event, callBack, "addEventListener");
  };

  DOM.prototype.off = function off(event, callBack) {
    this.setListener(event, callBack, "removeEventListener");
  };

  DOM.prototype.setListener = function(event, callBack, eventListener) {
    return Array.prototype.forEach.call(this.element, function(item) {
      item[eventListener](event, callBack, false);
    });
  };

  DOM.prototype.get = function get() {
    return this.element.length > 1 ? this.element : this.element[0];
  };
  // adiciona funcionalidades de Array no objeto DOM:
  DOM.prototype.arrayHandler = function arrayHandler(method, callBack) {
    return Array.prototype[method].apply(this.element, callBack);
  };

  DOM.prototype.forEach = function forEach() {
    return this.arrayHandler("forEach", arguments);
  };

  DOM.prototype.map = function map() {
    return this.arrayHandler("map", arguments);
  };

  DOM.prototype.filter = function filter() {
    return this.arrayHandler("filter", arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return this.arrayHandler("reduce", arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return this.arrayHandler("reduceRight", arguments);
  };

  DOM.prototype.every = function every() {
    return this.arrayHandler("every", arguments);
  };

  DOM.prototype.some = function some() {
    return this.arrayHandler("some", arguments);
  };

  // Métodos estáticos

  // retorna o tipo:
  DOM.typeOfObject = obj => {
    return Object.prototype.toString
      .call(obj)
      .replace(/\[object (\w+)\]/g, "$1")
      .toLowerCase();
  };

  // teste de validação para tipos especificos
  DOM.isArray = obj => DOM.typeOfObject(obj) === "array";

  DOM.isFunction = obj => DOM.typeOfObject(obj) === "function";

  DOM.isObject = obj => DOM.typeOfObject(obj) === "object";

  DOM.isArguments = obj => DOM.typeOfObject(obj) === "arguments";

  DOM.isNumber = obj => DOM.typeOfObject(obj) === "number";

  DOM.isString = obj => DOM.typeOfObject(obj) === "string";

  DOM.isBoolean = obj => DOM.typeOfObject(obj) === "boolean";

  DOM.isNull = obj => DOM.typeOfObject(obj) === "null";

  DOM.isUndefined = obj => DOM.typeOfObject(obj) === "undefined";

  win.DOM = DOM;
})(window, document);
