// não utlizado na V2 pois usei os metodos call e apply script principal

(function(win, doc) {
  "use strict";
  var util = function() {
    return {

      removeBlock: function removeBlock(target) {
        return Array.prototype.forEach.call(target.element, function(item) {
          item.removeAttribute("disabled");
        });
      },

      isTableHeaderRendered: function isTableHeaderRendered(table) {
        return Boolean(table.get().querySelector("thead tr th"));
      },

      getData: function getData(inputs) {
        return inputs.map(item => {
          return { name: item.id, value: item.value };
        });
      },

      setStatusMessage: function setStatusMessage(statusElem, message) {
        const statusMessage = {
          error: "Preencha o campo sinalizado em vermelho",
          success: "Carro cadastrado com sucesso",
          none: "",
          loading: "Carregando dados..."
        };
        statusElem.get().innerText = statusMessage[message];
      },

      validateFields: function validateFields(fields) {
        let evaluetad = fields.map(function(item) {
          UTIL.evaluateField(item);
          return Boolean(item.value.length);
        });
        return evaluetad.every(item => {
          return item === true;
        });
      },
  
      evaluateField: function evaluateField(field) {//TODO: refazer validação para ser campo a campo
        if (field.value === ""){ // e não ao validar
          field.placeholder = UTIL.formatInput(field).error;
          return field.classList.add("error")
        }
        return field.classList.remove("error");
      },
      
      formatInput: function formatInput(field) {
          let type = field.title;
          let regex = undefined;
          let errorMessages = {
            imagem: {
              message: "informe uma url de imagem"
            },
            placa: {
              message: "placa inválida"
            },
            ano: {
              message: "ano inválido"
            },
            cor: {
              message: "informe uma cor"
            },
            modelo: {
              message: "informe um modelo"
            }
          }
        if (field.value)
          console.log(field.value);
  
        return {error: errorMessages[type] 
          ? errorMessages[type].message
          : "Campo inválido", regex}
      },
      //TODO: refazer esse metodo
      verifyAndRemove: function verifyAndRemove(table, select, wrapper) {
        let value = select.get().value;
        let tableBody = table.get().querySelector("tbody");
        let removeLastItem = !Boolean(value);
        if (removeLastItem) {
          app.removeCar((data) => {console.log("Removido")}, tableBody.lastElementChild.querySelector("[data-js='plate']").innerText);
          tableBody.lastElementChild.remove();
        } else {
          app.removeCar((data) => {console.log("Removido")}, tableBody.children[value].querySelector("[data-js='plate']").innerText);
          tableBody.children[value].remove();
        }
        UTIL.populateSelect(select, table);
        return UTIL.showTable(wrapper.get());
      },

      populateSelect: function populateSelect(select, table) {
        let tableTRCount = table.get().firstElementChild.nextElementSibling.nextElementSibling.childElementCount;
        let domFragmentBody = doc.createDocumentFragment();
        let $optGroup = doc.createElement("optgroup");
        let $fOption = select.get().firstElementChild.firstElementChild.cloneNode(true);
        select.get().innerHTML = "";
        $optGroup.appendChild($fOption);
        for (let i = 0; tableTRCount > i; i++ ) {
          let $option = doc.createElement("option");
          $option.value = "" + i;
          $option.innerText = "" + (i + 1);
          $optGroup.appendChild($option);
        }
        domFragmentBody.appendChild($optGroup);
        select.get().appendChild(domFragmentBody);
      },

      showTable: function showTable(table) {
        let hasChild = Boolean(table.querySelector("tbody").childElementCount)
        if (hasChild)
          return table.classList.add("show");
        return table.classList.remove("show");
      },

      clearTable: function clear() {
        this.querySelector("tbody").innerHTML = "";
      },

      setCompanyInfo: function setCompanyInfo(data) {
        const $company = DOM('[data-js="companyInfo"]');
        $company.get().firstElementChild.textContent = data.name;
        $company.get().lastElementChild.textContent = data.phone;
      }

    };
  };
  win.UTIL = util();
})(window, document);
