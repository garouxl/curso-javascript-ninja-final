(function(win, doc, DOM, XHR, UTIL) {
  "use strict";
  let app = (() => {
    const $inputs = DOM('[data-js="form-register"] input');
    const $submit = DOM('[data-js="submit"]');
    const $reset = DOM('[data-js="reset"]');
    const $status = DOM('[data-js="status"]');
    const $table = DOM('[data-js="registered-cars"]');
    const $tableWrapper = DOM('[data-js="table-wrapper"]');
    const $select = DOM('[data-js="select-me"]');
    const $remove = DOM('[data-js="remove-me"]');
    
    return {
      init: function init () {
        app.setCompanyName(UTIL.setCompanyInfo);
        UTIL.removeBlock($inputs);
        UTIL.removeBlock($submit);
        $submit.on("click", app.handleSubmit);
        $select.on("change", app.highlight);
        $reset.on("click", app.reset);
        $remove.on("click", app.remove);
      },

      setCompanyName: function setCompanyName(callBack) {
        const getCompany = XHR("company.json", "get", "text", callBack);
        getCompany.init();
      },

      handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        let events = { //TODO: refazer mais simples
          true: () => {
            let inputsData = UTIL.getData($inputs);
            UTIL.setStatusMessage($status,"none");
            populateTableHeader.call(inputsData, $table);
            populateTableBody.call(inputsData, $table);
            UTIL.populateSelect($select, $table);
            UTIL.showTable($tableWrapper.get());
            UTIL.setStatusMessage($status,"success");
            //app.reset();
          },
          false: () => {
            UTIL.setStatusMessage($status,"error");
          }
        };
        events[UTIL.validateFields($inputs).toString()]();
      },

      reset: function reset(event) {
        if (event) event.preventDefault();
        $inputs.forEach(item => {
          item.value = "";
          item.placeholder = "";
          item.classList.value = item.classList.remove("error");
        });
        UTIL.setStatusMessage($status, "none");
      },

      remove: function remove() {
        return UTIL.verifyAndRemove($table, $select, $tableWrapper);
      },

      highlight: function highlight () {
        let value = $select.get().value;
        let tableBody = $table.get().querySelector("tbody");
        Array.prototype.forEach.call(tableBody.children, function (item) {
          item.classList.remove("highlight");
        })
        tableBody.children[value].classList.add("highlight");  
      }
    };

    function populateTableHeader(table) {
      if ( UTIL.isTableHeaderRendered(table) )
        return;
      let domFragmentHeader = doc.createDocumentFragment();
      this.forEach(item => {
        let $th = doc.createElement("th");
        $th.innerText = item.name;
        domFragmentHeader.appendChild($th);
      });
      table.get().children[1].firstElementChild.appendChild(domFragmentHeader);
    }

    function populateTableBody(table) {
      let domFragmentBody = doc.createDocumentFragment();
      let $tr = doc.createElement("tr");
      this.forEach(item => {
        let $td = doc.createElement("td");
        if (item.name === "imagem") {
            let $img = doc.createElement("img");
            $img.setAttribute("src", item.value);
            $td.appendChild($img);
            return $tr.appendChild($td);
        }
        $td.innerText = item.value;
        return $tr.appendChild($td);
      });
      domFragmentBody.appendChild($tr);
      table.get().lastElementChild.appendChild(domFragmentBody);
    }

  })();

  win.app = app;

})(window, document, window.DOM, window.XHR, window.UTIL);

app.init();
