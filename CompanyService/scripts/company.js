var Company = function (id, parentId, name, estimatedEarnings) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.estimatedEarnings = estimatedEarnings;
    this.children = [];
    this.parent = null;
};

Company.prototype.getFriendlyName = function () {

    return this.name + " | "
         + numberHelper.formatCurrency(this.estimatedEarnings)
         + (this.children.length !== 0
                                ? " | " + numberHelper.formatCurrency(this.getSummaryEarnings())
                                : "")
         + ";";
};

Company.prototype.getSummaryEarnings = function () {
    var sum = this.estimatedEarnings,
        index;

    for (index = 0; index < this.children.length; index++) {
        sum += this.children[index].getSummaryEarnings();
    }

    return sum;
};

Company.prototype.getNestingLevel = function () {

    var indexOfNestingLevel = 0;

    if (this.parent != null && this.parent != undefined) {
        indexOfNestingLevel = this.parent.getNestingLevel() + 1;
    }

    return indexOfNestingLevel;

};