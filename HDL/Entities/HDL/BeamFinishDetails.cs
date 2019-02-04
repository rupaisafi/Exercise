using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class TblBeamFinishDetails
    {
        public int BIID { get; set; }
        public Nullable<int> BID { get; set; }
        public string Loom { get; set; }
        public Nullable<int> SetNo { get; set; }
        public Nullable<int> SS { get; set; }
        public string BeamNo { get; set; }
        public string Remarks { get; set; }

        //User-defined Type
        public string MNo { get; set; }
        public string SaveStatus { get; set; }

    }
}
