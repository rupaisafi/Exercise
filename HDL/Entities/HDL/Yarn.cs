using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class Yarn
    {
        public int YarnId { get; set; }
        public string YarnName { get; set; }
        public string YarnCode { get; set; }
        public string YarnCode1 { get; set; }
        public string SupplierId { get; set; }
        public string ICode { get; set; }
        public string YarnSpecification { get; set; }
        public string SlubLengthCM { get; set; }
        public string PauseCM { get; set; }
        public string ThiknessTime { get; set; }
        public string SlubPerMtr { get; set; }


        public string SupplierName { get; set; }
        public string ItemName { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
    }
}
