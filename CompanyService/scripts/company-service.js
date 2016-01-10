var CompanyService = (function () {

    function CompanyService(popupSelector) {

        this.popupSelector = popupSelector;
        this.companies = [];
    };

    CompanyService.prototype.getCompany = function (companyId) {
        return this.companies.filter(function (el) { return el.id === companyId; })[0];
    };

    CompanyService.prototype.view = function (companyId) {
        var that = this,
            $popup = $(this.popupSelector),
            viewUri = "/Api/Company/Get/",
            company = {};

        $.get(viewUri, { id: companyId })
            .done(function (companyFromDb) {
                company = new Company(companyFromDb.Id, companyFromDb.ParentId || "#", companyFromDb.Name, companyFromDb.EstimatedEarnings);

                populateCompaniesDropdown(that.popupSelector + " #parent", that.companies, company);
                fillPopupFromCompany($popup, company, true);

                $popup.find("#saveButton").attr('disabled', true);
                $popup.fadeOut();

                $popup.fadeIn();
            });
    }

    CompanyService.prototype.add = function (onSuccess) {

        var that = this,
            $popup = $(this.popupSelector),
            newCompany = new Company(0, "#", "", 0),
            saveUri = "/Api/Company/Save/";

        populateCompaniesDropdown(that.popupSelector + " #parent", that.companies, newCompany);
        fillPopupFromCompany($popup, newCompany);

        $popup.find("#saveButton")
            .off("click")
            .on("click", function () {

                fillCompanyFromPopup($popup, newCompany);
                if (newCompany.parentId === "#") {
                    newCompany.parentId = null;
                }
                $.post(saveUri, { id: newCompany.id, parentId: newCompany.parentId, name: newCompany.name, estimatedEarnings: newCompany.estimatedEarnings })
                .done(function (company) {
                    $popup.fadeOut();
                    onSuccess();

                });

            });

        $popup.fadeIn();


    };

    CompanyService.prototype.edit = function (companyId, onSuccess) {

        var that = this,
            $popup = $(this.popupSelector),
            getUri = "/Api/Company/Get/",
            saveUri = "/Api/Company/Save/",
            company = {};

        $.get(getUri, { id: companyId })
            .done(function (companyFromDb) {
                company = new Company(companyFromDb.Id, companyFromDb.ParentId || "#", companyFromDb.Name, companyFromDb.EstimatedEarnings);

                populateCompaniesDropdown(that.popupSelector + " #parent", that.companies, company);
                fillPopupFromCompany($popup, company);

                $popup.find("#saveButton")
                      .off("click")
                      .on("click", function () {
                          fillCompanyFromPopup($popup, company);

                          $.post(saveUri, { id: company.id, parentId: company.parentId, name: company.name, estimatedEarnings: company.estimatedEarnings })
                              .done(function (savedCompany) {
                                  $popup.fadeOut();
                                  onSuccess();
                              });

                      });

                $popup.fadeIn();

            });
    };

    CompanyService.prototype.delete = function (companyId, onSuccess) {

        var deleteUri = "/Api/Company/DeleteCompany";

        $.post(deleteUri, { id: companyId })
            .done(function (companiesForDelete) {
                onSuccess();
            });
    };

    var fillCompanyFromPopup = function ($popup, company) {

        company.name = $popup.find("#companyName").val();
        company.estimatedEarnings = parseFloat($popup.find("#estimatedEarnings").val());
        company.parentId = $popup.find("#parent option:selected").val();
    };

    var fillPopupFromCompany = function ($popup, company, isReadOnly) {

        $popup.find("#companyName").val(company.name).attr('disabled', isReadOnly);
        $popup.find("#estimatedEarnings").val(company.estimatedEarnings).attr('disabled', isReadOnly);
        $popup.find("#parent").val(company.parentId).attr('disabled', isReadOnly);
    };

    var populateCompaniesDropdown = function (dropdownSelector, companies, company) {

        var $select = $(dropdownSelector).html("");

        //add empty company
        $select.append($("<option />").val("#").text(""));

        for (var i = 0; i < companies.length; i++) {
            if (companies[i].id != company.id && companies[i].getNestingLevel() < 5) {
                $select.append($("<option />").val(companies[i].id).text(companies[i].name));
            }
        }

    };

    CompanyService.updateHierarchy = function (companies) {

        for (var i = 0; i < companies.length; i++) {

            //use == because parentId is String and id is Number
            companies[i].children = companies.filter(function (el) { return el.parentId == companies[i].id; });

            for (var j = 0; j < companies[i].children.length; j++) {
                companies[i].children[j].parent = companies[i];
            }

        }
    };

    return CompanyService;

})();