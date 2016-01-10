var Tree = function (selector) {
    this.selector = selector;
    this.selectedNodeId = 0;
};

Tree.prototype.build = function (companiesArray) {
    var that = this,
        index,
        params = {
            core: {
                data: []
            }
        };

    for (index = 0; index < companiesArray.length; index++) {
        params.core.data[index] = {
            id: companiesArray[index].id,
            parent: companiesArray[index].parentId,
            text: companiesArray[index].getFriendlyName()
        };
    }

    $(this.selector).jstree("destroy") //delete old tree
                    .jstree(params)
                    .on('changed.jstree', function (e, data) {
                        if (data.action === "select_node") {
                            that.selectedNodeId = parseInt(data.node.id);
                        }
                    });
};