using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblStock11
    {
        public int ID { get; set; }
        public Nullable<System.DateTime> TracDate { get; set; }
        public System.DateTime SDate { get; set; }
        public string Ref { get; set; }
        public Nullable<int> DID { get; set; }
        public Nullable<int> DCode { get; set; }
        public string DName { get; set; }
        public Nullable<int> UCode { get; set; }
        public string UName { get; set; }
        public Nullable<int> TotalProd { get; set; }
        public Nullable<int> CProd { get; set; }
        public Nullable<int> Gramending { get; set; }
        public string UserName { get; set; }
        public Nullable<System.DateTime> EDate { get; set; }
        public Nullable<int> InsFloorCode { get; set; }
        public string InsFloorName { get; set; }
        public string SaveStatus { get; set; }
    }
}
