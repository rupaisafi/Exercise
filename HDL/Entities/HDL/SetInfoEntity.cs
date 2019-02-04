using System;

namespace Entities.HDL
{
    public class SetInfoEntity
    {
        public int SetId { get; set; }
        public int SetNo { get; set; }
        public string StyleNo { get; set; }
        public string StyleCode { get; set; }
        public string Weave { get; set; }
        public string Colour { get; set; }
        public string SetNo1 { get; set; }
        public DateTime WarpDate { get; set; }
        public int Length { get; set; }
        public int EndsPerBeam { get; set; }
        public int TotalBeam { get; set; }
        public int TotalEnds { get; set; }
        public int DrumPreasure { get; set; }
        public string YarnTension { get; set; }
        public int BeamCreel { get; set; }
        public string MachineNo { get; set; }
        public int ProductionTypeCode { get; set; }
        public int SetStatusCode { get; set; }
        public string Remarks { get; set; }
        public string UserName { get; set; }
        public DateTime EditDate { get; set; }
    }
}
