using System;

namespace Entities.HDL
{
    public class MaterialConsumption
    {
        public int MConID { get; set; }
        public int SID { get; set; }
        public string Remarks { get; set; }
        public string UserName { get; set; }
        public DateTime EDate { get; set; }
        public string TermId { get; set; }

        //==========================
        public string StyleNo { get; set; }

        //  ----------------------------
        public string SaveStatus { get; set; }

    }
}
