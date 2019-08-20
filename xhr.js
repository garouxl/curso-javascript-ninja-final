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
    function XHR (url, urlType, afterCallBack, beforeCallBack, sendData) {
        if (!(this instanceof XHR)) 
            return new XHR(url, urlType, afterCallBack, beforeCallBack, sendData);
        this.url = url;
        this.urlType = urlType;
        this.beforeCallBack = beforeCallBack;
        this.afterCallBack = afterCallBack;
        this.sendData = sendData;
        
        return {
            init: () => {
                const xhr = new win.XMLHttpRequest();
                xhr.open(urlType, url);
                chooseSendType(xhr, this.sendData);
                //renderBeforeCallBack.call(beforeCallBack);
                xhr.addEventListener("progress", validateBeforeCallback); 
                xhr.addEventListener("readystatechange", initiateXhr); 
            }
        }
    
        /* 
        //FIXME: validar o evento progress pra ver se precisa manter essa funcão, teztar carregando uma imagem grande por exemplo
        function renderBeforeCallBack() {
            return this() || undefined;
        } */
    
        function chooseSendType (xhr, sendData) {
            if (sendData) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                return xhr.send(formatSendData(sendData))
            }
            return xhr.send();
        }
        
        function formatSendData(data) {
            let formatedString = "";
            for (let i in data) {
                formatedString += `${data[i].name}=${data[i].value}&`;
            };
            return formatedString.substring(formatedString.length - 1, 0);
        }

        function validateBeforeCallback() {
            if (this.beforeCallBack === undefined)
                return "";
            return this.beforeCallBack(); 
        }
        
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
                data = this;
                if (!JSON.parse(this.responseText)) throw new Error("empty JSON, trying to return XML...");
                data = JSON.parse(this.responseText);
            } catch (error) {
                console.error(error);
                console.warn(
                    `Please verify the DOM.xhr params: \nResponseURL: ${
                        this.responseURL
                    }\nResponse: ${this}`
                );
                data = this.responseXML;
            }
            return callBack(data);
        }
    
    }

    win.XHR = XHR;
})(window);

