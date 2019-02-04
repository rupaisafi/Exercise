using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
   public class RubberBeltDetail
    {
        public int RIID { get; set; }
        public int RID { get; set; }
        public string GDate { get; set; }
        public decimal BeforeThickness { get; set; }
        public decimal AfterThickness { get; set; }
        public decimal AfterHardness { get; set; }
        public decimal ProdQnty { get; set; }
        public string Remarks { get; set; }
    }
}
