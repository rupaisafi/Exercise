using System;

namespace Entities.HDL
{
    public class MachineEntity
    {
        public int MID { get; set; }
        public int UnitCode { get; set; }
        //UnitName
        public int MNo { get; set; }
        public string MName { get; set; }
        public string MachineName { get; set; }
        public int GCode { get; set; }
        public string GName { get; set; }
        public int UCode { get; set; }
        public string UName { get; set; }
        public int TCode { get; set; }
        //[TName]        [nvarchar](50) NULL,
        public int NoOfMC { get; set; }
        public int TotalMC { get; set; }
        public float ProdCapacity { get; set; }
        public string Unit { get; set; }
        public float CapacityRPM { get; set; }
        public string CountryOfOrgin { get; set; }
        public float Prod { get; set; }
        public string Remarks { get; set; }
        public string UserName { get; set; }
        public DateTime EDate { get; set; }
        public int PickPday { get; set; }

    }
}
