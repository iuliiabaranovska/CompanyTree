using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.InteropServices;

namespace CompanyService.Data
{
    public class CompanyRepository
    {
        private readonly CompanyContext _context = new CompanyContext();

        public Company Get(int id)
        {
            return _context.Companies.Find(id);
        }

        public List<Company> GetAll()
        {
            return _context.Companies.ToList();
        }

        public List<Company> GetAllDescendants(int id)
        {
            var allDescendants = new List<Company>();
            var children =  _context.Companies.Where(c => c.ParentId == id).ToList();

            foreach (var child in children)
            {
                allDescendants.AddRange(GetAllDescendants(child.Id));
            }

            allDescendants.AddRange(children);
            return allDescendants;
        }

        public void Delete(int id)
        {
            var company = Get(id);
            var companiesToDelete = GetAllDescendants(id);
            companiesToDelete.Add(company);

            _context.Companies.RemoveRange(companiesToDelete);
            _context.SaveChanges();
        }

        public Company Save(Company company)
        {
            if (company.Id == 0)
            {
                _context.Companies.Add(company);
            }
            else
            {
                _context.Companies.Attach(company);
                _context.Entry(company).State = EntityState.Modified;
            }
            _context.SaveChanges();
            return company;
        }

    }
}
