using System;

namespace Entities.HDL
{
    public class ProdQualityEntity
    {
        public int QID { get; set; }
        public int QCode { get; set; }
        public string QName { get; set; }
        public string UserName { get; set; }
        public DateTime EDate { get; set; }
        public string Remarks { get; set; }
        public float Rate { get; set; }
    }
}
/*QID
QCode
QName
UserName
EDate
Remarks
Rate*/
