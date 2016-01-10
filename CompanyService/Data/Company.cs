using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyService.Data
{
    [Table("Companies")]
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public Company Parent { get; set; }

        public string Name { get; set; }

        public decimal EstimatedEarnings { get; set; }
        
    }
}