using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class ItemInfoEntity
    {
        public int IID { get; set; }
        public int Togcn { get; set; }
        public string ICNo { get; set; }
        public string ICName { get; set; }
        public string ShortName { get; set; }
        public string Unit { get; set; }
        public decimal MinQnty { get; set; }
        public decimal MaxQnty { get; set; }
        public decimal OdQnty { get; set; }
        public decimal SRate { get; set; }
        public string Remarks { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
        public DateTime EntryDate { get; set; }
        public int ITCode { get; set; }
    }
}
