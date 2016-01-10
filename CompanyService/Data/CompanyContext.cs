using System.Data.Entity;

namespace CompanyService.Data
{
    public class CompanyContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
    }
}