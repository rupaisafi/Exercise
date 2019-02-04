using System;

namespace Entities.HDL
{
    public class MaterialConsumptionDetails
    {
        public int MConDtlID { get; set; }
        public int MConID { get; set; }
        public int ItemCode { get; set; }

        public string Unit { get; set; }
        public float Qnty { get; set; }

        public int DepartmentCode { get; set; }

        public string UserName { get; set; }
        public DateTime EDate { get; set; }

        //-------------------------------
        public string ItemName { get; set; }
        public string DepartmentName { get; set; }
    }
}
