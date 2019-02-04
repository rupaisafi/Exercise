using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class InspFlagginDetail
    {
        public int IID { get; set; }
        public int ID { get; set; }
        public int DCode { get; set; }
        public string DName { get; set; }
        public string OName { get; set; }
        public string OCode { get; set; }
        public string CapName { get; set; }
        public string CapCode { get; set; }
        public string RollNo { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public int YdsOpOBS { get; set; }
        public int YdsReChOBS { get; set; }
        public int DeffOpOBS { get; set; }
        public int DeffReChOBS { get; set; }
        public string QOpOBS { get; set; }
        public string QReChOBS { get; set; }
        public string PointOpOBS { get; set; }
        public string PointReChOBS { get; set; }
        public string WidthAvg { get; set; }
        public int SinglePoint { get; set; }
        public string Remarks { get; set; }
        public string UserName { get; set; }
    }
}
