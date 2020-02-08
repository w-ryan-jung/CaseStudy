var base = base || {};

base.reportController = function() {
    'use strict' // add this to avoid some potential bugs

    let model = [];

    const ItemModel = function(items) {

        this.items = items;

        const viewModel = this;

        this.render = function(template) {
            this.update(template.content.querySelector('tr'));
            const clone = document.importNode(template.content, true);
            template.parentElement.appendChild(clone);
        };

        // Update a single table row to display a foo
        this.update = function(trElement) {
            const tds = trElement.children;
            tds[0].textContent = viewModel.items.cityName;
            tds[1].textContent = viewModel.items.productName;
            tds[2].textContent = viewModel.items.total;
        };
    };

    const view = {
        render: function() {
            const t = this.template();
            model.forEach(d => d.render(t));
        },

        template: function() {
            return document.getElementById('report-template');
        }
    };

    const controller = {

        load: function() {
            base.rest.getTotalStock().then(function(items) {
                model = items.map(item => new ItemModel(item));
                view.render();
            });
        }
    };

    return controller;
};
