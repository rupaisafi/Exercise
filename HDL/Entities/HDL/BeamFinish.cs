using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblBeamFinish
    {
        public int BID { get; set; }
        public Nullable<System.DateTime> BDate { get; set; }
        public Nullable<int> UCode { get; set; }
        public string UName { get; set; }
        public string Remarks { get; set; }
        public string SaveStatus { get; set; }

    }
}
