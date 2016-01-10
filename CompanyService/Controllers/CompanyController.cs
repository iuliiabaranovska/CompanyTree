using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web.Http;
using CompanyService.Data;

namespace CompanyService.Controllers
{
    public class CompanyController : ApiController
    {
        private readonly CompanyRepository _companyRepository = new CompanyRepository();

        [HttpGet]
        [Route("Api/Company/Get")]
        public Company Get(int id)
        {
            return _companyRepository.Get(id);
        }

        [HttpGet]
        [Route("Api/Company/GetAll")]
        public List<Company> GetAll()
        {
            return _companyRepository.GetAll();
        }

        [HttpPost]
        [Route("Api/Company/DeleteCompany")]
        public void DeleteCompany(Company company)
        {
            _companyRepository.Delete(company.Id);
        }

        [HttpPost]
        [Route("Api/Company/Save")]
        public Company Save(Company company)
        {
            return _companyRepository.Save(company);
        }
    }
}