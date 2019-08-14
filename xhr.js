/*AJAX simples v0.2
    v0.2: portado para construtor
    v0.1: implementado retorno para json, documento e texto
    
    @url string: a url da requisição
    @urlType string: o tipo de requisição: GET ou POST
    @type string: o tipo de retorno da requisição: json, document ou text
    @afterCallBack function: callback a ser executado depois da requisição
    @beforeCallBack function / undefined: callback a ser executado antes da requisição
    */
((win) => {
    "use strict";
    function XHR (url, urlType, type, afterCallBack, beforeCallBack) {
        if (!(this instanceof XHR)) 
            return new XHR(url, urlType, type, afterCallBack, beforeCallBack);
        this.url = url;
        this.urlType = urlType;
        this.type = type;
        this.beforeCallBack = beforeCallBack;
        this.afterCallBack = afterCallBack;
        
        return {
            init: () => {
                const xhr = new win.XMLHttpRequest();
                xhr.responseType = type;
                xhr.open(urlType, url);
                xhr.send();
                //renderBeforeCallBack.call(beforeCallBack);
                xhr.addEventListener("progress", beforeCallBack); 
                xhr.addEventListener("readystatechange", initiateXhr); 
            }
        }
    
        /* 
        //FIXME: validar o evento progress pra ver se precisa manter essa funcão, teztar carregando uma imagem grande por exemplo
        function renderBeforeCallBack() {
            return this() || undefined;
        } */
    
        function initiateXhr() {
            return isRequestOk.call(this)
                ? handleXhr.call(this, afterCallBack)
                : "";
        }
        function isRequestOk() {
            return this.readyState === 4 && this.status === 200;
        }
    
        function handleXhr(callBack) {
            let data;
            try {
                data = responseHandler.call(this);
                if (data === null) throw new Error("reponseType error");
            } catch (error) {
                console.error(error);
                console.warn(
                    `Please verify the DOM.xhr params: \nResponseURL: ${
                        this.responseURL
                    }\nResponseType: ${this.responseType}\nText: ${
                        this.Text
                    }\nResponseXML: ${this.responseXML}`
                );
                return (data = this);
            }
            return callBack(data);
        }
    
        function responseHandler() {
            let responseType = this.responseType;
            let handlers = {
                text: () => JSON.parse(this.responseText),
                document: () => this.responseXML,
                //FIXME:
                //text: () => this.responsetext
            };
            return handlers[responseType]();
        }
    }

    win.XHR = XHR;
})(window);

