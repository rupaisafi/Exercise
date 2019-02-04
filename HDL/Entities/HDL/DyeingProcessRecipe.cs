using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class DyeingProcessRecipe
    {
        public int ID { get; set; }
        public int? SetNo { get; set; }
        public string RecipeType { get; set; }
        public int? QuantityGpl { get; set; }
        public int? ItemCode { get; set; }
        public string ItemName { get; set; }
        public string Remark { get; set; }
        public string EntryBy { get; set; }
        public DateTime? EntryDate { get; set; }
        public string UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string SaveStatus { get; set; }
    }
}
