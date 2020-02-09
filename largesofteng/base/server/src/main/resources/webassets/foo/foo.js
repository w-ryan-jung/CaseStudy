/*
 * Model/view/controller for the foo tab.
 * Author: Rasmus Ros, rasmus.ros@cs.lth.se
 */
var base = base || {};
// Defines the base namespace, if not already declared. Through this pattern it doesn't matter which order
// the scripts are loaded in.
base.fooController = function() {
    'use strict' // add this to avoid some potential bugs

    // List of all foo data, will be useful to have when update functionality is added in lab 2.
    let model = [];

    const FooViewModel = function(_foo) {
        // We call the parameter _foo to avoid accidentally using the old version, we might otherwise end up in a
        // scenario where foo and this.foo are different things.
        this.foo = _foo;
        // This assignment is used below where 'this' is not available
        const viewModel = this;

        this.render = function(template) {
            this.update(template.content.querySelector('tr'));
            const clone = document.importNode(template.content, true);
            template.parentElement.appendChild(clone);
        };

        // Update a single table row to display a foo
        this.update = function(trElement) {
            const tds = trElement.children;
            tds[0].textContent = viewModel.foo.cityName;
            tds[1].textContent = viewModel.foo.productName;
            tds[2].textContent = viewModel.foo.amount;
            const d = viewModel.foo.createdDate;
            tds[3].textContent = d.toLocaleDateString();
        };

        this.tbUpdate = function (tr) {
            const tds = tr.children;
            tds[0].textContent = viewModel.foo.cityName;
            tds[1].textContent = viewModel.foo.productName;
            tds[2].textContent = viewModel.foo.amount;
            const d = viewModel.foo.createdDate;
            tds[3].textContent = d.toLocaleDateString();



            let table = document.getElementById("table");
            for(var i = 1; table.rows.length; i++){

                table.rows[i].cells[0].innerHTML = viewModel.foo.cityName;
                table.rows[i].cells[1].innerHTML = viewModel.foo.productName;
                table.rows[i].cells[2].innerHTML = viewModel.foo.amount;
                const d = viewModel.foo.createdDate;
                table.rows[i].cells[3].innerHTML = d.toLocaleDateString();
                console.log(table.rows[i].cells[0]);
                console.log(table.rows[i].cells[1]);
                console.log(table.rows[i].cells[2]);
                console.log(table.rows[i].cells[3]);

            }

            //console.log(viewModel);
        }
    };

    const view = {
        // Creates HTML for each foo in model
        render: function() {
            // A template element is a special element used only to add dynamic content multiple times.
            // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
            const t = this.template();
            model.forEach(d => d.render(t));
        },

        update: function(){
            const t = this.template().content.querySelector('tr');
            model.forEach(d => d.tbUpdate(t));
        },

        template: function() {
            return document.getElementById('foo-template');
        }
    };

    const controller = {
        load: function() {
            // Adds callback to the form.
            document.getElementById('foo-form').onsubmit = function(event) {
                event.preventDefault();
                controller.submitFoo();
                return false;
            };
            // Loads all foos from the server through the REST API, see res.js for definition.
            // It will replace the model with the foos, and then render them through the view.
            base.rest.getFoos()
                .then(function(foos) {
                model = foos.map(f => new FooViewModel(f));
                view.render();
            });

            document.getElementById('display-by').onchange = function(event){
                const v = document.getElementById('query');
                const query = v.options[v.selectedIndex].value;
                base.rest.getItemsOrderBy(query)
                    .then(function(foos) {
                        model = foos.map(f => new FooViewModel(f));
                        //view.update();

                        let table = document.getElementById("table");
                        for(var i = 1; table.rows.length; i++){

                            table.rows[i].cells[0].innerHTML = model[i-1].foo.cityName;
                            table.rows[i].cells[1].innerHTML = model[i-1].foo.productName;
                            table.rows[i].cells[2].innerHTML = model[i-1].foo.amount;
                            const d = model[i-1].foo.createdDate;
                            table.rows[i].cells[3].innerHTML = d.toLocaleDateString();

                        }
                    });
            };
        },

        // Add a new foo to the table, based on the text content in the input field.
        submitFoo: function() {
            // Fetch an object reference to the input element with id 'foo-input' using the DOM API.
            const city = document.getElementById('city');
            const product = document.getElementById('product');
            const inAndOut = document.getElementById('in-out');
            const amount = document.getElementById('amount');
            if(inAndOut.value === '-1'){
                amount.value = (amount.value * -1);
            }

            const postData = {"cityName":city.value, "productName":product.value, "amount": amount.value};
            // Call the REST API, see file rest.js for definitions.
            base.rest.addFoo(postData)
                .then(function(foo) {
                    // Foo is the response from the server, it will have this form:
                    // {id: 123, userId: 1, payload: 'data', created: 1525343407}
                    const vm = new FooViewModel(foo);
                    model.push(vm);          // append the foo to the end of the model array
                    vm.render(view.template());             // append the foo to the table
                    if(inAndOut.value === '-1'){
                        amount.value = (amount.value * -1);
                    }
                });
        }
    };

    return controller;
};
