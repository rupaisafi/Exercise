using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class ImpLcDetails
    {
        public int Id { get; set; }
        public int LcId { get; set; }
        public int ItemCode { get; set; }
        public string YarnCode { get; set; }
        public decimal Qnty { get; set; }
        public string Unit { get; set; }
        public int CurrencyId { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public decimal ConvRate { get; set; }
        public decimal ValueTaka { get; set; }
        public string UserId { get; set; }
        public DateTime EDate { get; set; }
        public int GroupId { get; set; }

        public string ItemName { get; set; }
    }
}
