using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
   public class InspRefinishDetail
    {
        public int DID { get; set; }
        public int ID { get; set; }
        public int StyleCode { get; set; }
        public string StyleNo { get; set; }
        public string SetNo { get; set; }
        public string SS { get; set; }
        public string Beam { get; set; }
        public int FCode { get; set; }
        public string FType { get; set; }
        public decimal Prod { get; set; }
        public string FinishDate { get; set; }
        public string POCode { get; set; }
        public string POName { get; set; }
        public int ChqDCode { get; set; }
        public string ChqDName { get; set; }
        public int DCode { get; set; }
        public string DName { get; set; }
        public string Remarks { get; set; }
        
    }
}
